import { io } from "socket.io-client";
import { store } from "../store";
import {
  receiveMessage,
  messageRead,
  userOnline,
  userOffline,
  userTyping,
  userStoppedTyping,
  markChatAsRead,
} from "../store/chatSlice";

const SOCKET_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

class SocketService {
  constructor() {
    this.socket = null;
    this.currentToken = null;
    this.currentChatId = null;
    this.isManuallyDisconnected = false;
  }

  connect(token, onConnectCallback) {
    if (!token) {
      console.error("❌ Không có token — không thể kết nối socket");
      return;
    }

    if (
      this.socket &&
      this.socket.connected &&
      this.currentToken &&
      this.currentToken !== token
    ) {
      this.disconnect(true);
    }

    if (this.socket && this.socket.connected) return;

    this.currentToken = token;
    this.isManuallyDisconnected = false;

    this.socket = io(SOCKET_URL, {
      transports: ["websocket"],
      auth: { token },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this._registerEvents(onConnectCallback);
  }

  // chat.socket.js
off(event, callback) {
  if (!this.socket) return;
  if (callback) {
    this.socket.off(event, callback); // remove cụ thể listener
  } else {
    this.socket.off(event); // remove tất cả listener cho event
  }
}

  setActiveChat(chatId) {
    if (this.currentChatId === chatId) return;
    this.currentChatId = chatId;

    store.dispatch(markChatAsRead({ chatId }));
  }

  updateToken(newToken) {
    if (!newToken || this.currentToken === newToken) return;
    this.currentToken = newToken;

    if (this.socket && this.socket.connected) {
      this.socket.auth = { token: newToken };
      this.socket.disconnect();
      this.socket.connect();
    }
  }

  disconnect(forReconnect = false) {
    if (this.socket) {
      this.isManuallyDisconnected = !forReconnect;
      this.socket.disconnect();
      this.socket = null;
      console.log(forReconnect ? "♻️ Socket reconnecting..." : "🛑 Socket disconnected manually.");
    }
  }

  emit(event, data) {
    if (this.socket?.connected) this.socket.emit(event, data);
    else console.warn("⚠️ Socket chưa kết nối. Không thể emit:", event);
  }

  on(event, callback) {
    if (!this.socket) {
      console.warn("⚠️ Socket chưa khởi tạo. Không thể listen:", event);
      return;
    }
    this.socket.on(event, callback);
  }

  _registerEvents(onConnectCallback) {
    this.socket.on("connect", () => {
      if (onConnectCallback) onConnectCallback();
    });

    this.socket.on("disconnect", (reason) => {
      console.log("⚡ Socket disconnected:", reason);
      if (!this.isManuallyDisconnected && reason === "io server disconnect") {
        this.socket.connect();
      }
    });

    this.socket.on("connect_error", (error) => {
      console.error("❌ Socket error:", error.message);
      if (error.message === "Authentication error") this.disconnect();
    });

    // --- App-level Events ---
    this.socket.on("receive_message", (rawMessage) => {
      const state = store.getState();
      const currentUserId = state.auth.currentUser?.id;
      console.log("CurrentUserId:", currentUserId);
      console.log("rawMessage:", rawMessage);
      
      // ✅ Chuẩn hoá dữ liệu read_by
      const parseReadBy = (() => {
        const raw = rawMessage.read_by;
        if (!raw) return [];
      
        try {
          let arr = raw;
      
          // nếu là string
          if (typeof raw === "string") {
            arr = JSON.parse(raw);       // parse 1 lần
            if (typeof arr === "string") {
              arr = JSON.parse(arr);     // parse 2 lần nếu nested
            }
          }
      
          if (!Array.isArray(arr)) return [];
          return arr.map(r => Number(r)).filter(id => !isNaN(id));
        } catch (err) {
          console.warn("parseReadBy error:", rawMessage.read_by, err);
          return [];
        }
      })();
      
      console.log("parseReadBy:", parseReadBy);
      
      const message = {
        ...rawMessage,
        chatId: rawMessage.chat_id,
        senderId: rawMessage.sender_id,
        readBy: parseReadBy,
        currentUserId,
      };
    
      store.dispatch(receiveMessage(message));
    });
    
    

    this.socket.on("message_read", (data) => {
      
      const state = store.getState();
      const currentUserId = state.auth.currentUser?.id;
    
      // Chuyển dữ liệu server về dạng slice hiểu
      const messageIds = Array.isArray(data.updatedMessages)
        ? data.updatedMessages.map(msg => msg.id)
        : [];
    
      store.dispatch(messageRead({
        chatId: data.chatId,
        messageIds,
        userId: data.readerId,
        currentUserId
        }));
    });
    

    this.socket.on("user_online", (userId) => store.dispatch(userOnline(userId)));
    this.socket.on("user_offline", (userId) => store.dispatch(userOffline(userId)));
    this.socket.on("user_typing", (data) => store.dispatch(userTyping(data)));
    this.socket.on("user_stopped_typing", (data) => store.dispatch(userStoppedTyping(data)));
  }
}

const socketService = new SocketService();
export default socketService;

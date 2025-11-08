import { io } from "socket.io-client";
import { store } from "../store";
import {
  receiveMessage,
  messageRead,
  userOnline,
  userOffline,
  userTyping,
  userStoppedTyping,
  addUnreadMessage,
  markMessagesAsRead,
} from "../store/chatSlice";

const SOCKET_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

class SocketService {
  constructor() {
    this.socket = null;
    this.currentToken = null;
    this.currentChatId = null;
    this.isManuallyDisconnected = false;
  }

  /**
   * ✅ Kết nối socket với token được truyền từ ngoài
   * Không tự lấy từ store để tránh bị lệch khi token refresh
   */
  connect(token, onConnectCallback) {
    if (!token) {
      console.error("❌ Không có token — không thể kết nối socket");
      return;
    }

    // Nếu socket đang kết nối với token cũ → disconnect trước
    if (
      this.socket &&
      this.socket.connected &&
      this.currentToken &&
      this.currentToken !== token
    ) {
      this.disconnect(true); // reconnect flag
    }

    // Nếu socket đã kết nối hợp lệ → bỏ qua
    if (this.socket && this.socket.connected) {
      console.log("⚡ Socket đã kết nối, bỏ qua connect()");
      return;
    }

    this.currentToken = token;
    this.isManuallyDisconnected = false;

    // --- Tạo socket instance ---
    this.socket = io(SOCKET_URL, {
      transports: ["websocket"],
      auth: { token },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // --- Event listeners ---
    this._registerEvents(onConnectCallback);
  }

  /**
   * ✅ Gọi khi user đổi chat → đánh dấu đã đọc tin nhắn
   */
  setActiveChat(chatId) {
    this.currentChatId = chatId;
    store.dispatch(markMessagesAsRead({ chatId }));
  }

  /**
   * ✅ Gọi khi token được refresh (ví dụ axios interceptor làm mới)
   */
  updateToken(newToken) {
    if (!newToken) return;
    if (this.currentToken === newToken) return;

    console.log("🔄 Cập nhật token cho socket...");
    this.currentToken = newToken;

    if (this.socket && this.socket.connected) {
      this.socket.auth = { token: newToken };
      this.socket.disconnect();
      this.socket.connect();
    }
  }

  /**
   * ✅ Ngắt kết nối socket (thủ công hoặc để reconnect)
   */
  disconnect(forReconnect = false) {
    if (this.socket) {
      this.isManuallyDisconnected = !forReconnect;
      this.socket.disconnect();
      this.socket = null;
      console.log(forReconnect ? "♻️ Socket reconnecting..." : "🛑 Socket disconnected manually.");
    }
  }

  /**
   * ✅ Gửi event ra server
   */
  emit(event, data) {
    if (this.socket?.connected) {
      this.socket.emit(event, data);
    } else {
      console.warn("⚠️ Socket chưa kết nối. Không thể emit:", event);
    }
  }

  /**
   * ✅ Lắng nghe event từ server
   */
  on(event, callback) {
    if (!this.socket) {
      console.warn("⚠️ Socket chưa khởi tạo. Không thể listen:", event);
      return;
    }
    this.socket.on(event, callback);
  }

  /**
   * 📦 Private: Đăng ký tất cả event mặc định
   */
  _registerEvents(onConnectCallback) {
    this.socket.on("connect", () => {
      console.log("✅ Socket connected:", this.socket.id);
      if (onConnectCallback) onConnectCallback();
    });

    this.socket.on("disconnect", (reason) => {
      console.log("⚡ Socket disconnected:", reason);
      if (!this.isManuallyDisconnected && reason === "io server disconnect") {
        console.log("↻ Tự động reconnect...");
        this.socket.connect();
      }
    });

    this.socket.on("connect_error", (error) => {
      console.error("❌ Socket error:", error.message);
      if (error.message === "Authentication error") this.disconnect();
    });

    // --- App-level Events ---
    this.socket.on("receive_message", (message) => {
      store.dispatch(receiveMessage(message));
      if (this.currentChatId !== message.chatId) {
        store.dispatch(addUnreadMessage({ chatId: message.chatId }));
      }
    });

    this.socket.on("message_read", (data) => {
      store.dispatch(messageRead(data));
    });

    this.socket.on("user_online", (userId) => {
      store.dispatch(userOnline(userId));
    });

    this.socket.on("user_offline", (userId) => {
      store.dispatch(userOffline(userId));
    });

    this.socket.on("user_typing", (data) => {
      store.dispatch(userTyping(data));
    });

    this.socket.on("user_stopped_typing", (data) => {
      store.dispatch(userStoppedTyping(data));
    });
  }
}

const socketService = new SocketService();
export default socketService;

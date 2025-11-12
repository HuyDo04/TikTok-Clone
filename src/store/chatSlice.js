import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: {},       // { chatId: [message,...] }
  unreadCounts: {},   // { chatId: number }
  onlineUsers: [],    // [userId,...]
  typingUsers: {},    // { chatId: [userId,...] }
};

const ensureArray = (value) => {
  // Convert string JSON hoặc object thành array an toàn
  if (Array.isArray(value)) return value.map(Number);
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed.map(Number) : [];
    } catch {
      return [];
    }
  }
  return [];
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // --- Set toàn bộ messages cho chat ---
    setMessages: (state, action) => {
      const { chatId, messages, currentUserId } = action.payload;

      const stateMessages = messages.map(msg => ({
        ...msg,
        chatId: msg.chat_id ?? msg.chatId,
        senderId: msg.sender_id ?? msg.senderId,
        readBy: ensureArray(msg.readBy ?? msg.read_by),
      }));

      state.messages[chatId] = stateMessages;

      // Tính lại unreadCount
      if (currentUserId) {
        state.unreadCounts[chatId] = stateMessages.filter(
          msg => msg.senderId !== currentUserId && !msg.readBy.includes(currentUserId)
        ).length;
      } else {
        state.unreadCounts[chatId] = 0;
      }
    },

    // --- Thêm message mới ---
    receiveMessage: (state, action) => {
      const rawMessage = action.payload;
      const chatId = rawMessage.chatId ?? rawMessage.chat_id;
      const currentUserId = rawMessage.currentUserId ?? null;

      const message = {
        ...rawMessage,
        chatId,
        senderId: rawMessage.senderId ?? rawMessage.sender_id,
        readBy: ensureArray(rawMessage.readBy ?? rawMessage.read_by),
      };

      if (!state.messages[chatId]) state.messages[chatId] = [];
      state.messages[chatId].push(message);

      // Tăng unread nếu sender khác currentUser
      if (currentUserId && message.senderId !== currentUserId && !message.readBy.includes(currentUserId)) {
        state.unreadCounts[chatId] = (state.unreadCounts[chatId] || 0) + 1;
      }
    },

    markChatAsRead: (state, action) => {
      const { chatId } = action.payload;
      state.unreadCounts[chatId] = 0;
    },

    addMessage: (state, action) => {
      const { chatId, message, currentUserId } = action.payload;
      const msg = { ...message, readBy: ensureArray(message.readBy ?? message.read_by) };

      if (!state.messages[chatId]) state.messages[chatId] = [];
      state.messages[chatId].push(msg);

      state.unreadCounts[chatId] = state.messages[chatId].filter(
        m => !m.readBy.includes(currentUserId)
      ).length;
    },

    messageRead: (state, action) => {
      const { chatId, messageIds, userId, currentUserId } = action.payload;
      if (!state.messages[chatId]) return;

      state.messages[chatId] = state.messages[chatId].map(msg => {
        const readBy = ensureArray(msg.readBy);
        if (Array.isArray(messageIds) && messageIds.includes(msg.id)) {
          if (!readBy.includes(userId)) {
            return { ...msg, readBy: [...readBy, userId] };
          }
        }
        return msg;
      });

      if (currentUserId) {
        state.unreadCounts[chatId] = state.messages[chatId].filter(
          msg => msg.senderId !== currentUserId && !msg.readBy.includes(currentUserId)
        ).length;
      }
    },

    markMessagesAsRead: (state, action) => {
      const { chatId, userId } = action.payload;
      if (!state.messages[chatId] || !userId) return;

      state.messages[chatId] = state.messages[chatId].map(msg => {
        const readBy = ensureArray(msg.readBy);
        if (!readBy.includes(userId)) return { ...msg, readBy: [...readBy, userId] };
        return msg;
      });

      state.unreadCounts[chatId] = state.messages[chatId].filter(
        msg => msg.senderId !== userId && !msg.readBy.includes(userId)
      ).length;
    },

    addUnreadMessage: (state, action) => {
      const { chatId } = action.payload;
      state.unreadCounts[chatId] = (state.unreadCounts[chatId] || 0) + 1;
    },

    userOnline: (state, action) => {
      const userId = action.payload;
      if (!state.onlineUsers.includes(userId)) state.onlineUsers.push(userId);
    },

    userOffline: (state, action) => {
      const userId = action.payload;
      state.onlineUsers = state.onlineUsers.filter(id => id !== userId);
    },

    userTyping: (state, action) => {
      const { chatId, userId } = action.payload;
      if (!state.typingUsers[chatId]) state.typingUsers[chatId] = [];
      if (!state.typingUsers[chatId].includes(userId)) state.typingUsers[chatId].push(userId);
    },

    userStoppedTyping: (state, action) => {
      const { chatId, userId } = action.payload;
      if (!state.typingUsers[chatId]) return;
      state.typingUsers[chatId] = state.typingUsers[chatId].filter(id => id !== userId);
    },
  },
});

export const {
  markChatAsRead,
  addMessage,
  setMessages,
  receiveMessage,
  messageRead,
  markMessagesAsRead,
  addUnreadMessage,
  userOnline,
  userOffline,
  userTyping,
  userStoppedTyping,
} = chatSlice.actions;

export default chatSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: {},          // { chatId: [message,...] }
  unreadCounts: {},      // { chatId: number }
  onlineUsers: [],       // [userId,...]
  typingUsers: {},       // { chatId: [userId,...] }
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      const { chatId, messages } = action.payload;
      state.messages[chatId] = messages;
    },
    receiveMessage: (state, action) => {
      const message = action.payload;
      const chatId = message.chatId;
      if (!state.messages[chatId]) state.messages[chatId] = [];
      state.messages[chatId].push(message);
    },
    messageRead: (state, action) => {
      const { chatId, messageIds } = action.payload;
      if (!state.messages[chatId]) return;
      state.messages[chatId].forEach(msg => {
        console.log("msg");
        
        if (messageIds.includes(msg.id)) msg.read = true;
      });
      // Reset unread count
      state.unreadCounts[chatId] = 0;
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
      if (!state.typingUsers[chatId].includes(userId))
        state.typingUsers[chatId].push(userId);
    },
    userStoppedTyping: (state, action) => {
      const { chatId, userId } = action.payload;
      if (!state.typingUsers[chatId]) return;
      state.typingUsers[chatId] = state.typingUsers[chatId].filter(id => id !== userId);
    },
    addUnreadMessage: (state, action) => {
      const { chatId } = action.payload;
      state.unreadCounts[chatId] = (state.unreadCounts[chatId] || 0) + 1;
    },
    markMessagesAsRead: (state, action) => {
      const { chatId } = action.payload;
      state.unreadCounts[chatId] = 0;
      if (state.messages[chatId]) {
        state.messages[chatId].forEach(msg => msg.read = true);
      }
    },
  },
});

export const {
  setMessages,
  receiveMessage,
  messageRead,
  userOnline,
  userOffline,
  userTyping,
  userStoppedTyping,
  addUnreadMessage,
  markMessagesAsRead,
} = chatSlice.actions;

export default chatSlice.reducer;

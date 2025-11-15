// src/store/notificationSlice.js
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  notifications: [],      // Mảng chứa các thông báo
  unreadCount: 0,         // Số thông báo chưa đọc
  loading: false,         // Có thể dùng khi fetch notifications từ server
  error: null,            // Lỗi nếu có
}

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    // Thêm 1 thông báo mới
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload) // đưa lên đầu
      state.unreadCount += 1
    },

    // Thêm nhiều thông báo (dùng cho "Xem thêm")
    addNotifications: (state, action) => {
      state.notifications.push(...action.payload); // Nối mảng mới vào cuối
      state.unreadCount += action.payload.filter(n => !n.read).length;
    },

    // Đặt tất cả notifications
    setNotifications: (state, action) => {
      state.notifications = action.payload
      // Tính lại số lượng chưa đọc
      state.unreadCount = action.payload.filter(n => !n.read).length
    },

    // Đánh dấu 1 notification là đã đọc
    markAsRead: (state, action) => {
      const notificationId = action.payload
      const notif = state.notifications.find(n => n.id === notificationId)
      if (notif && !notif.read) {
        notif.read = true
        state.unreadCount = Math.max(0, state.unreadCount - 1)
      }
    },

    // Đánh dấu tất cả notifications là đã đọc
    markAllAsRead: (state) => {
      state.notifications.forEach(n => (n.read = true))
      state.unreadCount = 0
    },

    // Tăng số lượng chưa đọc (dùng khi nhận socket)
    incrementUnreadCount: (state) => {
      state.unreadCount += 1
    },

    // Xóa 1 notification
    removeNotification: (state, action) => {
      const notificationId = action.payload
      const index = state.notifications.findIndex(n => n.id === notificationId)
      if (index !== -1) {
        // Nếu notification chưa đọc thì trừ đi
        if (!state.notifications[index].read) {
          state.unreadCount = Math.max(0, state.unreadCount - 1)
        }
        state.notifications.splice(index, 1)
      }
    },

    // Reset state (nếu user logout)
    resetNotifications: (state) => {
      state.notifications = []
      state.unreadCount = 0
      state.loading = false
      state.error = null
    },

    // Set loading và error (dùng khi fetch API)
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const {
  addNotification,
  addNotifications,
  setNotifications,
  markAsRead,
  markAllAsRead,
  incrementUnreadCount,
  removeNotification,
  resetNotifications,
  setLoading,
  setError,
} = notificationSlice.actions

export default notificationSlice.reducer

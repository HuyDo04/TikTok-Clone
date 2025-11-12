import { io } from "socket.io-client"
import { store } from "@/store"
import { addNotification, incrementUnreadCount } from "@/store/notificationSlice"
import { toast } from "react-toastify"

const SOCKET_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

class NotificationSocketService {
  constructor() {
    this.socket = null
    this.currentToken = null
    this.isManuallyDisconnected = false
  }

  connect(token, onConnectCallback) {
    if (!token) {
      console.error(" [NotificationSocket] Không có token, không thể kết nối.")
      return
    }

    // Nếu đã kết nối, bỏ qua
    if (this.socket && this.socket.connected) {
      return
    }

    this.currentToken = token
    this.isManuallyDisconnected = false

    // Tạo instance socket với token trong phần auth
    this.socket = io(SOCKET_URL, {
      transports: ["websocket"],
      auth: { token },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    })

    this.registerEvents(onConnectCallback)
  }

  /**
   * Ngắt kết nối socket.
   */
  disconnect() {
    if (this.socket) {
      this.isManuallyDisconnected = true
      this.socket.disconnect()
      this.socket = null
      console.log("[NotificationSocket] Đã ngắt kết nối thủ công.")
    }
  }

  /**
   * Đăng ký các trình nghe sự kiện từ server.
   */
  registerEvents(onConnectCallback) {
    this.socket.on("connect", () => {
      console.log("[NotificationSocket] Đã kết nối thành công:", this.socket.id)
      if (onConnectCallback) onConnectCallback()
    })

    this.socket.on("disconnect", (reason) => {
      console.log("[NotificationSocket] Đã ngắt kết nối:", reason)
    })

    this.socket.on("connect_error", (error) => {
      console.error("[NotificationSocket] Lỗi kết nối:", error.message)
    })

    // Lắng nghe sự kiện có thông báo mới
    this.socket.on("notification:new", (fullNotification) => {
      console.log("[NotificationSocket] Nhận thông báo mới:", fullNotification)
      // Hiển thị toast message
      toast.info(fullNotification.message || "Bạn có thông báo mới!")
      // Thêm thông báo vào Redux store và tăng số lượng chưa đọc
      store.dispatch(addNotification(fullNotification))
      store.dispatch(incrementUnreadCount())
    })
  }
}

const notificationSocketService = new NotificationSocketService()
export default notificationSocketService


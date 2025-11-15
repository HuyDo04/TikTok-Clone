"use client"

import { useRef, useEffect } from "react"
import classNames from "classnames/bind"
import styles from "./MessageDetail.module.scss"
import MessageThread from "../MessageThread/MessageThread"
import MessageInput from "../MessageInput/MessageInput"
import RequestBanner from "./RequestBanner" // Import banner mới

const cx = classNames.bind(styles)
const DEFAULT_AVATAR = import.meta.env.VITE_DEFAULT_AVATAR;
const URL = import.meta.env.VITE_BASE_URL_ME
function MessageDetail({
  conversation,
  onSendMessage,
  onInputFocus,
  currentUser,
  isSocketConnected,
  onAcceptRequest,
  onDeclineRequest,
}) {
  const messagesEndRef = useRef(null)
console.log("[DEBUG] Render MessageDetail", conversation);

  const scrollToBottom = (smooth = true) => {
    messagesEndRef.current?.scrollIntoView({ behavior: smooth ? "smooth" : "auto" })
  }

  // Cuộn xuống cuối khi messages thay đổi
  useEffect(() => {
    scrollToBottom()
  }, [conversation?.messages])

  const handleSendMessage = async (content) => {
    try {
      // Gọi callback từ parent (Messages) → socketService.emit sẽ gửi message
      await onSendMessage(content)
    } catch (error) {
      console.error("Failed to send message:", error)
    }
  }

  // Xác định xem người dùng hiện tại có phải là người nhận tin nhắn chờ không
  const isReceiverOfRequest =
    conversation?.isRequest &&
    conversation.participants?.find((p) => p.id === currentUser.id)
      ?.ChatParticipant?.status === "pending"

  const otherParticipant = conversation?.participants?.find((p) => p.id !== currentUser.id);

  if (!conversation) {
    return (
      <div className={cx("root", "empty")}>
        <div className={cx("empty-state")}>
          <svg
            className={cx("empty-icon")}
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <p>Chọn một cuộc trò chuyện để bắt đầu nhắn tin</p>
        </div>
      </div>
    )
  }
  console.log("conversation", conversation);
  
  return (
    <div className={cx("root")}>
      <header className={cx("header")}>
        <div className={cx("header-content")}>
          <img
            src={conversation.avatar ? `${URL}/${conversation.avatar}` : DEFAULT_AVATAR}
            alt={conversation.name}
            className={cx("header-avatar")}
          />
          <div className={cx("header-info")}>
            <h2 className={cx("header-name")}>{conversation.name}</h2>
            <p className={cx("header-username")}>@{conversation.username}</p>
          </div>
        </div>
      </header>

      <div className={cx("messages-container")}>
      <MessageThread messages={conversation.messages || []} currentUser={currentUser} />
        <div ref={messagesEndRef} />
      </div>

      {/* Hiển thị banner chấp nhận/từ chối nếu là người nhận tin nhắn chờ */}
      {isReceiverOfRequest ? (
        <RequestBanner
          username={otherParticipant?.username || "Người dùng"}
          onAccept={() => onAcceptRequest(conversation.id)}
          onDecline={() => onDeclineRequest(conversation.id)}
        />
      ) : (
        <MessageInput
          onSendMessage={handleSendMessage}
          onInputFocus={onInputFocus}
          chatId={conversation.id}
          isSocketConnected={isSocketConnected}
          disabled={isReceiverOfRequest} // Vô hiệu hóa input nếu là người nhận request
        />
      )}
    </div>
  )
}

export default MessageDetail

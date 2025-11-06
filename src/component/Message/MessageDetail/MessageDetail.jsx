"use client"

import { useState, useRef, useEffect } from "react"
import classNames from "classnames/bind"
import styles from "./MessageDetail.module.scss"
import MessageThread from "../MessageThread/MessageThread"
import MessageInput from "../MessageInput/MessageInput"

const cx = classNames.bind(styles)

function MessageDetail({ conversation, onSendMessage }) {
  const [messages, setMessages] = useState(conversation?.messages || [])
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (message, attachments) => {
    const newMessage = {
      id: Date.now(),
      sender: "current-user",
      content: message,
      timestamp: new Date(),
      attachments: attachments,
      avatar: "/diverse-avatars.png",
    }

    setMessages([...messages, newMessage])
    onSendMessage?.(newMessage)
  }

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

  return (
    <div className={cx("root")}>
      <header className={cx("header")}>
        <div className={cx("header-content")}>
          <img
            src={conversation.avatar || "/placeholder.svg"}
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
        <MessageThread messages={messages} />
        <div ref={messagesEndRef} />
      </div>

      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  )
}

export default MessageDetail

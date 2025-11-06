"use client"

import { useState } from "react"
import classNames from "classnames/bind"
import styles from "./MessagesList.module.scss"

const cx = classNames.bind(styles)

function MessagesList({ conversations, selectedConversationId, onSelectConversation }) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.preview.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className={cx("root")}>
      <header className={cx("header")}>
        <h1 className={cx("title")}>Tin nhắn</h1>
      </header>

      <div className={cx("search-container")}>
        <input
          type="text"
          className={cx("search-input")}
          placeholder="Tìm kiếm cuộc trò chuyện..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Tìm kiếm cuộc trò chuyện"
        />
      </div>

      <div className={cx("conversations-list")}>
        {filteredConversations.length === 0 ? (
          <div className={cx("empty-state")}>
            <p>Không có cuộc trò chuyện nào</p>
          </div>
        ) : (
          filteredConversations.map((conversation) => (
            <button
              key={conversation.id}
              className={cx("conversation-item", {
                active: selectedConversationId === conversation.id,
              })}
              onClick={() => onSelectConversation(conversation.id)}
              aria-pressed={selectedConversationId === conversation.id}
            >
              <img src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} className={cx("avatar")} />
              <div className={cx("content")}>
                <div className={cx("header-row")}>
                  <h3 className={cx("name")}>{conversation.name}</h3>
                  <span className={cx("time")}>{conversation.date}</span>
                </div>
                <p className={cx("preview")}>{conversation.preview}</p>
              </div>
              {conversation.unread > 0 && <span className={cx("badge")}>{conversation.unread}</span>}
            </button>
          ))
        )}
      </div>
    </div>
  )
}

export default MessagesList

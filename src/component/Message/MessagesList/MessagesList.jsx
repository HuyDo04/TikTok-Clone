"use client"

import { useState, useMemo } from "react"
import { ChevronLeft, Mail } from "lucide-react"
import classNames from "classnames/bind"
import styles from "./MessagesList.module.scss"

const cx = classNames.bind(styles)
const DEFAULT_AVATAR = import.meta.env.VITE_DEFAULT_AVATAR;
const URL = import.meta.env.VITE_BASE_URL_ME;

function MessagesList({ conversations, messageRequests, selectedConversationId, onSelectConversation }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [view, setView] = useState("main") // 'main' or 'requests'

  const handleShowRequests = () => {
    setView("requests")
    setSearchQuery("")
  }

  const handleShowMain = () => {
    setView("main")
    setSearchQuery("")
  }

  // Filtered conversations based on view and search
  const filteredConversations = useMemo(() => {
    const listToFilter = view === "main" ? conversations : messageRequests
    return listToFilter.filter(
      (conv) =>
        conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.preview.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [view, searchQuery, conversations, messageRequests])

  return (
    <div className={cx("root")}>
      <header className={cx("header")}>
        {view === "requests" && (
          <button onClick={handleShowMain} className={cx("back-button")} aria-label="Quay lại danh sách chính">
            <ChevronLeft size={24} />
          </button>
        )}
        <h1 className={cx("title")}>{view === "main" ? "Tin nhắn" : "Tin nhắn chờ"}</h1>
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

      {view === "main" && messageRequests.length > 0 && (
        <div className={cx("message-requests-link-container")}>
          <button onClick={handleShowRequests} className={cx("message-requests-link")}>
            <Mail size={20} className={cx("requests-icon")} />
            <span>Tin nhắn chờ ({messageRequests.length})</span>
          </button>
        </div>
      )}

      <div className={cx("conversations-list")}>
        {filteredConversations.length === 0 ? (
          <div className={cx("empty-state")}>
            <p>Không có cuộc trò chuyện nào</p>
          </div>
        ) : (
          filteredConversations.map((conversation) => (
            <button
              key={conversation.id}
              className={cx("conversation-item", { active: selectedConversationId === conversation.id })}
              onClick={() => onSelectConversation(conversation.id)}
              aria-pressed={selectedConversationId === conversation.id}
            >
              <img
                src={conversation.avatar ? `${URL}/${conversation.avatar}` : DEFAULT_AVATAR}
                alt={conversation.name}
                className={cx("avatar")}
              />
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

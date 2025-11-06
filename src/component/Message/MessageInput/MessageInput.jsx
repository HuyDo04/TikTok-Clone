"use client"

import { useState, useRef } from "react"
import classNames from "classnames/bind"
import styles from "./MessageInput.module.scss"

const cx = classNames.bind(styles)

function MessageInput({ onSendMessage }) {
  const [messageText, setMessageText] = useState("")
  const [attachments, setAttachments] = useState([])
  const fileInputRef = useRef(null)

  const handleSend = () => {
    if (messageText.trim() || attachments.length > 0) {
      onSendMessage(messageText, attachments)
      setMessageText("")
      setAttachments([])
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    const newAttachments = files.map((file) => URL.createObjectURL(file))
    setAttachments([...attachments, ...newAttachments])
  }

  const removeAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index))
  }

  return (
    <div className={cx("root")}>
      {attachments.length > 0 && (
        <div className={cx("attachments-preview")}>
          {attachments.map((attachment, index) => (
            <div key={index} className={cx("attachment-item")}>
              <img src={attachment || "/placeholder.svg"} alt={`Attachment ${index}`} />
              <button
                className={cx("remove-btn")}
                onClick={() => removeAttachment(index)}
                aria-label="Xóa tệp đính kèm"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <div className={cx("input-container")}>
        <input
          type="text"
          className={cx("input")}
          placeholder="Gửi tin nhắn..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyPress={handleKeyPress}
          aria-label="Nhập tin nhắn"
        />

        <div className={cx("actions")}>
          <button
            className={cx("action-btn")}
            onClick={() => fileInputRef.current?.click()}
            aria-label="Đính kèm tệp"
            title="Đính kèm tệp"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 0 19.8 4.3M22 12.5a10 10 0 0 0-19.8-4.2" />
            </svg>
          </button>

          <button className={cx("action-btn")} aria-label="Biểu tượng cảm xúc" title="Biểu tượng cảm xúc">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
            </svg>
          </button>
        </div>

        <button
          className={cx("send-btn")}
          onClick={handleSend}
          disabled={!messageText.trim() && attachments.length === 0}
          aria-label="Gửi tin nhắn"
          title="Gửi tin nhắn"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.16151496 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.837654326,3.0486314 1.15159189,3.99491379 L3.03521743,10.4358937 C3.03521743,10.5929912 3.34915502,10.75 3.50612381,10.75 L16.6915026,11.5354869 C16.6915026,11.5354869 17.1624089,11.5354869 17.1624089,12.0067491 C17.1624089,12.4780112 16.6915026,12.4744748 16.6915026,12.4744748 Z" />
          </svg>
        </button>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          style={{ display: "none" }}
          aria-hidden="true"
        />
      </div>
    </div>
  )
}

export default MessageInput

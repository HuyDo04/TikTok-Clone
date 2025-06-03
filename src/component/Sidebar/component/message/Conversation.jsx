// Conversation.js
import React, { useState, useRef, useEffect } from "react";
import { IoSend, IoEllipsisVertical } from "react-icons/io5";
import classNames from "classnames/bind";
import styles from "./Conversation.module.scss";

const cx = classNames.bind(styles);

function Conversation({ chat, onBack, onMore }) {
  const [messages, setMessages] = useState([
    { id: 1, text: "Xin chào!", sent: false, time: "10:00" },
    { id: 2, text: "Chào bạn! Bạn khỏe không?", sent: true, time: "10:02" },
    { id: 3, text: "Cho làm quen", sent: true, time: "10:02" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      sent: true,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={cx("conversation")}>
      <div className={cx("conversation-header")}>
        <button onClick={onBack} className={cx("back-button")}>
          ←
        </button>
        <div className={cx("user-info")}>
          <img
            src={chat.user.avatar}
            alt={chat.user.name}
            className={cx("avatar")}
          />
          <span>{chat.user.name}</span>
        </div>
        <button onClick={onMore} className={cx("more-button")}>
          <IoEllipsisVertical />
        </button>
      </div>

      <div className={cx("messages-container")}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sent ? "sent" : "received"}`}
          >
            <p>{message.text}</p>
            <span className="message-time">{message.time}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Nhập tin nhắn..."
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>
          <IoSend size={20} />
        </button>
      </div>
    </div>
  );
}

export default Conversation;

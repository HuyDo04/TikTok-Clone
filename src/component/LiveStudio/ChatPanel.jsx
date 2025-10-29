import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ChatPanel.module.scss";

const cx = classNames.bind(styles);

function ChatPanel({ chat, onSendMessage, isLive }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() && onSendMessage && isLive) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={cx("chat-panel")}>
      <h3>LIVE chat</h3>

      <div className={cx("chat-messages")}>
        {chat.length === 0 ? (
          <div className={cx("empty")}>
            <p>💬</p>
            <p>Messages will appear here after you go LIVE</p>
          </div>
        ) : (
          chat.map((msg) => (
            <div key={msg.id} className={cx("message")}>
              <span className={cx("username")}>{msg.username}</span>
              <span className={cx("text")}>{msg.message}</span>
            </div>
          ))
        )}
      </div>

      {isLive && (
        <div className={cx("input-area")}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add comments during LIVE"
            className={cx("input")}
          />
          <button onClick={handleSend} className={cx("send-btn")}>
            Send
          </button>
        </div>
      )}
    </div>
  )
}

export default ChatPanel;
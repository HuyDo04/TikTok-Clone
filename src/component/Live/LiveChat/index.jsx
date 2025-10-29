
import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./LiveChat.module.scss";

const cx = classNames.bind(styles);

function LiveChat({ comments, onSendComment }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendComment(message);
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
    <div className={cx("chat-section")}>
      <div className={cx("chat-header")}>
        <h3>Live chat</h3>
      </div>

      <div className={cx("comments-list")}>
        {comments.map((comment) => (
          <div key={comment.id} className={cx("comment")}>
            <img src={comment.avatar || "/placeholder.svg"} alt={comment.username} className={cx("avatar")} />
            <div className={cx("content")}>
                <span className={cx("username")}>{comment.username}</span>
                <span className={cx("message")}>{comment.message}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={cx("input-area")}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add comment..."
          className={cx("input")}
        />
        <button onClick={handleSend} className={cx("send-btn")}>
          Send
        </button>
      </div>
    </div>
  );
}

export default LiveChat;

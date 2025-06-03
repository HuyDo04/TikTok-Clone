import React from "react";
import classNames from "classnames/bind";
import styles from "./MessageList.module.scss";

const cx = classNames.bind(styles);

function MessageList({ conversations, onSelectChat, activeChatId }) {
  return (
    <div className={cx("message-list")}>
      {conversations.map((conversation) => (
        <div
          key={conversation.id}
          className={cx("conversation-item", {
            active: conversation.id === activeChatId,
          })}
          onClick={() => onSelectChat(conversation)}
        >
          <img
            src={conversation.user.avatar}
            alt={conversation.user.name}
            className={cx("avatar")}
          />
          <div className={cx("conversation-info")}>
            <div className={cx("conversation-header")}>
              <span className={cx("user-name")}>{conversation.user.name}</span>
              <span className={cx("time")}>{conversation.time}</span>
            </div>
            <p className={cx("last-message")}>{conversation.lastMessage}</p>
          </div>
          {conversation.unread > 0 && (
            <span className={cx("unread-count")}>{conversation.unread}</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default MessageList;

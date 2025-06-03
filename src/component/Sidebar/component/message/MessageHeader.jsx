// MessageHeader.js
import React from "react";
import { IoIosArrowBack, IoIosSearch } from "react-icons/io";
import styles from "./MessageHeader.module.scss";
import classNames from "classnames/bind";
function MessageHeader({ onSearch, activeChat, onBack }) {
  const cx = classNames.bind(styles);
  return (
    <div className={cx("message-header")}>
      {activeChat ? (
        <div className={cx("chat-header")}>
          <button onClick={onBack} className={cx("back-button")}>
            <IoIosArrowBack size={24} />
          </button>
          <div className={cx("chat-user")}>
            <img
              src={activeChat.user.avatar}
              alt={activeChat.user.name}
              className={cx("avatar")}
            />
            <span>{activeChat.user.name}</span>
            {activeChat.user.online && (
              <span className={cx("online-dot")}></span>
            )}
          </div>
        </div>
      ) : (
        <>
          <h2>Tin nhắn</h2>
          <div className={cx("search-bar")}>
            <IoIosSearch className={cx("search-icon")} />
            <input
              type="text"
              placeholder="Tìm kiếm"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default MessageHeader;

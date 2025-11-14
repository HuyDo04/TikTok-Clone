import React from "react";
import classNames from "classnames/bind";
import styles from "./RequestBanner.module.scss";

const cx = classNames.bind(styles);

function RequestBanner({ username, onAccept, onDecline }) {
  return (
    <div className={cx("banner-root")}>
      <div className={cx("banner-content")}>
        <p className={cx("banner-text")}>
          <strong>{username}</strong> muốn gửi tin nhắn cho bạn.
        </p>
        <div className={cx("banner-actions")}>
          <button className={cx("action-button", "decline")} onClick={onDecline}>Xóa</button>
          <button className={cx("action-button", "accept")} onClick={onAccept}>Chấp nhận</button>
        </div>
      </div>
    </div>
  );
}

export default RequestBanner;
import { useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { createSelector } from 'reselect';
import classNames from "classnames/bind";
import styles from "./Notifications.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  setNotifications,
  markAsRead,
  markAllAsRead,
} from "@/store/notificationSlice";

import {
  getNotifications as fetchNotificationsAPI,
  markAsRead as markAsReadAPI,
  markAllAsRead as markAllAsReadAPI,
} from "@/services/notification.service";

const cx = classNames.bind(styles);

const NotificationPage = () => {
  const dispatch = useDispatch();

  // Sử dụng useCallback để ổn định hàm selector, tránh re-render không cần thiết
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const selectNotifications = useCallback(createSelector(
    (state) => state.notification,
    (notification) => notification?.notifications || []
  ), []);
  
  const notifications = useSelector(selectNotifications);
  const unreadCount = useSelector((state) => state.notification?.unreadCount || 0);

  // Load notifications từ API khi component mount
  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await fetchNotificationsAPI();
        // data giả sử là mảng [{id, message, createdAt, read, sender: {id, username, avatar}}]
        dispatch(setNotifications(data));
      } catch (error) {
        console.error("Không thể tải thông báo:", error);
      }
    };

    loadNotifications();
  }, [dispatch]);

  // Xóa tất cả thông báo (đánh dấu tất cả là read trên server)
  const handleClearAll = async () => {
    try {
      await markAllAsReadAPI();
      dispatch(markAllAsRead());
    } catch (error) {
      console.error("Không thể xóa tất cả thông báo:", error);
    }
  };

  // Đánh dấu 1 notification là đã đọc
  const handleMarkAsRead = async (id) => {
    try {
      await markAsReadAPI(id);
      dispatch(markAsRead(id));
    } catch (error) {
      console.error("Không thể đánh dấu đã đọc:", error);
    }
  };

  return (
    <div className={cx("notifications-container")}>
      {/* Header */}
      <div className={cx("notifications-header")}>
        <h3>Thông báo</h3>
      </div>

      {/* Body */}
      <div className={cx("notifications-body")}>
        {notifications.length > 0 ? (
          <>
            <div className={cx("notifications-actions")}>
              {unreadCount > 0 && (
                <button onClick={handleClearAll} className={cx("mark-all-btn")}>
                  Đánh dấu tất cả đã đọc
                </button>
              )}
            </div>

            <ul className={cx("notifications-list")}>
              {notifications.map((item) => (
                <li
                  key={item.id}
                  className={cx(
                    "notification-item",
                    !item.read && "unread" // class cho notification chưa đọc
                  )}
                  onClick={() => !item.read && handleMarkAsRead(item.id)} // Chỉ trigger khi chưa đọc
                >
                  <img
                    src={item.sender?.avatar || "/default-avatar.png"}
                    alt={item.sender?.username || "User"}
                    className={cx("avatar")}
                  />
                  <div className={cx("content")}>
                    <p dangerouslySetInnerHTML={{ __html: item.message }} />
                    <span className={cx("time")}>{new Date(item.createdAt).toLocaleString()}</span>
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className={cx("no-notifications")}>
            <p>Không có thông báo mới</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;

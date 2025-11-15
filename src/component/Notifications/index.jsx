import { useEffect, useCallback, useState, useRef } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Notifications.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  setNotifications,
  markAsRead,
  addNotifications,
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
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const URL = import.meta.env.VITE_BASE_URL_ME;
  const DEFAULT_AVATAR = import.meta.env.VITE_DEFAULT_AVATAR
  const pageRef = useRef(1);

  // Lấy notifications và unreadCount từ Redux
  const notifications = useSelector((state) => state.notification.notifications);
  const unreadCount = useSelector((state) => state.notification.unreadCount);

  // Hàm map type -> message
  const mapNotificationMessage = (item) => {
    const username = item.Sender?.username || "Ai đó";
    switch (item.type) {
      case "new_comment":
        return `${username} đã bình luận về bài viết của bạn.`;
      case "reply_comment":
        return `${username} đã trả lời bình luận của bạn.`;
      case "new_like_post":
        return `${username} đã thích bài viết của bạn.`;
      case "new_friend":
      case "new_follow":
        return `${username} đã theo dõi bạn.`;
      case "new_message":
        return `${username} đã gửi cho bạn một tin nhắn.`;
      default:
        return "Bạn có thông báo mới.";
    }
  };

  // Load notifications
  const loadNotifications = useCallback(
    async (currentPage) => {
      setLoading(true);

      try {
        const response = await fetchNotificationsAPI(currentPage, 10);
        // Nếu sử dụng axios thì response.data chứa mảng
        const newNotifications = Array.isArray(response) ? response : response.data || [];
        
        if (currentPage === 1) {
          dispatch(setNotifications(newNotifications));
        } else {
          dispatch(addNotifications(newNotifications));
        }

        if (newNotifications.length < 10) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Không thể tải thông báo:", error);
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  // Load lần đầu
  useEffect(() => {
    loadNotifications(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load thêm
  const handleLoadMore = () => {
    if (loading) return; // Ngăn click liên tục khi đang tải
    pageRef.current += 1;
    loadNotifications(pageRef.current);
  };

  // Đánh dấu tất cả đã đọc
  const handleClearAll = async () => {
    try {
      await markAllAsReadAPI();
      dispatch(markAllAsRead());
    } catch (error) {
      console.error("Không thể đánh dấu tất cả đã đọc:", error);
    }
  };

  // Đánh dấu 1 notification đã đọc
  const handleMarkAsRead = async (notification) => {
    try {
      await markAsReadAPI(notification.id);
      dispatch(markAsRead(notification.id));
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
                  className={cx("notification-item", !item.read && "unread")}
                  onClick={() => !item.read && handleMarkAsRead(item)}
                >
                  <Link to={item.link || "#"} className={cx("notification-link")}>
                    <img
                      src={item.Sender?.avatar ? `${URL}/${item.Sender.avatar}` : DEFAULT_AVATAR}
                      alt={item.Sender?.username || "User"}
                      className={cx("avatar")}
                    />
                    <div className={cx("content")}>
                      <p>{mapNotificationMessage(item)}</p>
                      <span className={cx("time")}>
                        {new Date(item.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            {hasMore && (
              <div className={cx("load-more-container")}>
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className={cx("load-more-btn")}
                >
                  {loading ? "Đang tải..." : "Xem thêm"}
                </button>
              </div>
            )}
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

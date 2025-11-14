"use client"

import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import classNames from "classnames/bind"
import * as postService from "@/services/post.service"
import styles from "./EngagementStats.module.scss";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Send,
  Facebook,
  MoreHorizontal,
  Link,
  Twitter,
} from "lucide-react";

const cx = classNames.bind(styles)

export default function EngagementStats({
  postId,
  likes,
  comments,
  bookmarks,
  isLiked,
  isBookmarked,
}) {
  const [likedByMe, setLikedByMe] = useState(isLiked)
  const [likeCount, setLikeCount] = useState(likes)
  const [bookmarkedByMe, setBookmarkedByMe] = useState(isBookmarked)
  const [bookmarkCount, setBookmarkCount] = useState(bookmarks)
  const currentUser = useSelector((state) => state.auth.currentUser)

  useEffect(() => {
    setLikedByMe(isLiked)
    setLikeCount(likes)
    setBookmarkedByMe(isBookmarked)
    setBookmarkCount(bookmarks)
  }, [postId, isLiked, likes, isBookmarked, bookmarks])

  const toggleLike = async () => {
    if (!currentUser) {
      // Cần xử lý yêu cầu đăng nhập ở đây, ví dụ: mở modal đăng nhập
      console.log("Vui lòng đăng nhập để thích bài viết.")
      return
    }

    // Cập nhật giao diện trước (Optimistic Update)
    const previousLikedState = likedByMe
    setLikedByMe(!previousLikedState)
    setLikeCount((prev) => (previousLikedState ? prev - 1 : prev + 1))

    try {
      if (!previousLikedState) {
        await postService.likePost(postId)
      } else {
        await postService.unlikePost(postId)
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái thích:", error)
      // Hoàn tác lại nếu có lỗi
      setLikedByMe(previousLikedState)
      setLikeCount((prev) => (previousLikedState ? prev + 1 : prev - 1))
    }
  }

  const toggleBookmark = () => {
    // Logic cho bookmark sẽ được thêm ở đây khi có API
    setBookmarkedByMe(!bookmarkedByMe)
    setBookmarkCount((prev) => (bookmarkedByMe ? prev - 1 : prev + 1))
  }

  return (
    <div className={cx("engagementStats")}>
      <div className={cx("statsRow")}>
        <div className={cx("actionItem")}>
          <div className={cx("actionButtons")}>
            <button className={cx("actionButton", { active: likedByMe })} onClick={toggleLike}>
              <Heart size={24} />
            </button>
          </div>
          <span className={cx("actionLabel")}>{likeCount?.toLocaleString()}</span>
        </div>

        <div className={cx("actionItem")}>
          <div className={cx("actionButtons")}>
            <button className={cx("actionButton")}>
              <MessageCircle size={24} />
            </button>
          </div>
          <span className={cx("actionLabel")}>{comments?.toLocaleString()}</span>
        </div>

        <div className={cx("actionItem")}>
          <div className={cx("actionButtons")}>
            <button className={cx("actionButton", { active: bookmarkedByMe })} onClick={toggleBookmark}>
              <Bookmark size={24} />
            </button>
          </div>
          <span className={cx("actionLabel")}>{bookmarkCount?.toLocaleString()}</span>
        </div>

        {/* <div className={cx("actionItem")}>
          <div className={cx("actionButtons")}>
            <button className={cx("actionButton")}>
              <Share2 size={24} />
            </button>
          </div>
          <span className={cx("actionLabel")}>{shares?.toLocaleString()}</span>
        </div>
      </div> */}
      </div>

      {/* <div className={cx("shareButtons")}>
        <button className={cx("shareBtn")} title="Reward">
          <Send size={20} />
        </button>
        <button className={cx("shareBtn")} title="Facebook">
          <Facebook size={20} />
        </button>
        <button className={cx("shareBtn")} title="WhatsApp">
          <Twitter size={20} />
        </button>
        <button className={cx("shareBtn")} title="More">
          <MoreHorizontal size={20} />
        </button>
      </div> */}

      {/* <div className={cx("linkSection")}>
        <Link size={16} className={cx("linkIcon")} />
        <input type="text" value="https://tiktok.com/@user/video/123" readOnly className={cx("linkInput")} />
        <button className={cx("copyBtn")} onClick={onCopyLink}>
          Sao chép liên kết
        </button>
      </div> */}
    </div>
  )
}

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
  likesCount: initialLikesCount,
  comments,
  bookmarks: initialBookmarksCount, // bookmarks từ API là repostCount
  isLiked,
  isBookmarked, // isBookmarked từ API là isReposted
}) {
  const [likedByMe, setLikedByMe] = useState(!!isLiked)
  const [likeCount, setLikeCount] = useState(Number(initialLikesCount) || 0)
  const [bookmarkedByMe, setBookmarkedByMe] = useState(!!isBookmarked)
  const [bookmarkCount, setBookmarkCount] = useState(Number(initialBookmarksCount) || 0)
  const currentUser = useSelector((state) => state.auth.currentUser)
  useEffect(() => {
    // Đảm bảo state được cập nhật khi video thay đổi trong modal
    setLikedByMe(!!isLiked)
    setLikeCount(Number(initialLikesCount) || 0)
    setBookmarkedByMe(!!isBookmarked)
    setBookmarkCount(Number(initialBookmarksCount) || 0)
  }, [postId, isLiked, initialLikesCount, isBookmarked, initialBookmarksCount])

  const toggleLike = async () => {
    if (!currentUser) {
      // Cần xử lý yêu cầu đăng nhập ở đây, ví dụ: mở modal đăng nhập
      console.log("Vui lòng đăng nhập để thích bài viết.")
      return
    }

    // Cập nhật giao diện trước (Optimistic Update)
    const previousLikedState = likedByMe
    setLikedByMe(!previousLikedState)
    setLikeCount((prev) => (previousLikedState ? Math.max(0, prev - 1) : prev + 1))

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
      setLikeCount((prev) => (previousLikedState ? Math.max(0, prev - 1) : prev + 1))
    }
  }

  const toggleBookmark = async () => {
    if (!currentUser) {
      console.log("Vui lòng đăng nhập để lưu bài viết.");
      return;
    }

    // Cập nhật giao diện trước (Optimistic Update)
    const previousBookmarkedState = bookmarkedByMe;
    setBookmarkedByMe(!previousBookmarkedState);
    setBookmarkCount((prev) => (previousBookmarkedState ? Math.max(0, prev - 1) : prev + 1));

    try {
      if (!previousBookmarkedState) {
        // API cho bookmark được ánh xạ tới repost
        await postService.repost(postId);
      } else {
        // API cho unbookmark được ánh xạ tới unRepost
        await postService.unRepost(postId);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái bookmark:", error);
      // Hoàn tác lại nếu có lỗi
      setBookmarkedByMe(previousBookmarkedState);
      setBookmarkCount((prev) => (previousBookmarkedState ? Math.max(0, prev - 1) : prev + 1));
    }
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

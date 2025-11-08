"use client"

import { useState } from "react"
import classNames from "classnames/bind"
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

export default function EngagementStats({ likes, comments, bookmarks, shares, onCopyLink }) {
  const [likedByMe, setLikedByMe] = useState(false)
  const [bookmarkedByMe, setBookmarkedByMe] = useState(false)

  const toggleLike = () => {
    setLikedByMe(!likedByMe)
  }

  const toggleBookmark = () => {
    setBookmarkedByMe(!bookmarkedByMe)
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
          <span className={cx("actionLabel")}>{likes?.toLocaleString()}</span>
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
          <span className={cx("actionLabel")}>{bookmarks?.toLocaleString()}</span>
        </div>

        <div className={cx("actionItem")}>
          <div className={cx("actionButtons")}>
            <button className={cx("actionButton")}>
              <Share2 size={24} />
            </button>
          </div>
          <span className={cx("actionLabel")}>{shares?.toLocaleString()}</span>
        </div>
      </div>

      <div className={cx("shareButtons")}>
        <button className={cx("shareBtn")} title="Reward">
          <Send size={20} /> {/* Giữ kích thước nhỏ hơn cho các nút chia sẻ */}
        </button>
        <button className={cx("shareBtn")} title="Facebook">
          <Facebook size={20} /> {/* Giữ kích thước nhỏ hơn cho các nút chia sẻ */}
        </button>
        <button className={cx("shareBtn")} title="WhatsApp">
          <Twitter size={20} /> {/* Giữ kích thước nhỏ hơn cho các nút chia sẻ */}
        </button>
        <button className={cx("shareBtn")} title="More">
          <MoreHorizontal size={20} /> {/* Giữ kích thước nhỏ hơn cho các nút chia sẻ */}
        </button>
      </div>

      <div className={cx("linkSection")}>
        <Link size={16} className={cx("linkIcon")} />
        <input type="text" value="https://tiktok.com/@user/video/123" readOnly className={cx("linkInput")} />
        <button className={cx("copyBtn")} onClick={onCopyLink}>
          Sao chép liên kết
        </button>
      </div>
    </div>
  )
}

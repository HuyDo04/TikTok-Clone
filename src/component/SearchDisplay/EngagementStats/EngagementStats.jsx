"use client"

import { useState } from "react"
import classNames from "classnames/bind"
import styles from "./EngagementStats.module.scss"
import { Heart, MessageCircle, Bookmark, Share2, Coins, ThumbsUp, MessageSquare } from "lucide-react"

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

  const shareButtons = [
    { icon: Coins, label: "Reward" },
    { icon: ThumbsUp, label: "Like" },
    { icon: MessageSquare, label: "Vote" },
    { icon: "fb", label: "Facebook" },
    { icon: "wa", label: "WhatsApp" },
    { icon: Share2, label: "Share" },
  ]

  return (
    <div className={cx("engagementStats")}>
      <div className={cx("statsRow")}>
        <button className={cx("statBtn", { active: likedByMe })} onClick={toggleLike}>
          <Heart className={cx("icon")} />
          <span>{likes?.toLocaleString()}</span>
        </button>

        <button className={cx("statBtn")}>
          <MessageCircle className={cx("icon")} />
          <span>{comments?.toLocaleString()}</span>
        </button>

        <button className={cx("statBtn", { active: bookmarkedByMe })} onClick={toggleBookmark}>
          <Bookmark className={cx("icon")} />
          <span>{bookmarks?.toLocaleString()}</span>
        </button>

        <button className={cx("statBtn")}>
          <Share2 className={cx("icon")} />
          <span>{shares?.toLocaleString()}</span>
        </button>
      </div>

      <div className={cx("shareButtons")}>
        <button className={cx("shareBtn")} title="Reward">
          <span className={cx("shareIcon")}>💰</span>
        </button>
        <button className={cx("shareBtn")} title="Like">
          <span className={cx("shareIcon")}>👍</span>
        </button>
        <button className={cx("shareBtn")} title="Vote">
          <span className={cx("shareIcon")}>🗳️</span>
        </button>
        <button className={cx("shareBtn")} title="Facebook">
          <span className={cx("shareIcon")}>f</span>
        </button>
        <button className={cx("shareBtn")} title="WhatsApp">
          <span className={cx("shareIcon")}>💬</span>
        </button>
        <button className={cx("shareBtn")} title="More">
          <span className={cx("shareIcon")}>→</span>
        </button>
      </div>

      <div className={cx("linkSection")}>
        <input type="text" value="https://www.tiktok.com/@ttmusic1209/video/..." readOnly className={cx("linkInput")} />
        <button className={cx("copyBtn")} onClick={onCopyLink}>
          Sao chép liên kết
        </button>
      </div>
    </div>
  )
}

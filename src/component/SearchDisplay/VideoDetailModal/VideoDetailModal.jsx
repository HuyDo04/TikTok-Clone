"use client"

import { useState } from "react"
import classNames from "classnames/bind"
import styles from "./VideoDetailModal.module.scss"
import VideoPlayer from "../VideoPlayer/VideoPlayer"
import CreatorCard from "../CreatorCard/CreatorCard"
import EngagementStats from "../EngagementStats/EngagementStats"
import CommentsSection from "../CommentsSection/CommentsSection"
import { X, Search } from "lucide-react"

const cx = classNames.bind(styles)

export default function VideoDetailModal({ video, isOpen, onClose, onNextVideo, onPrevVideo }) {
  const [isSaveClicked, setIsSaveClicked] = useState(false)

  if (!isOpen || !video) return null

  const handleCopyLink = () => {
    const url = `https://www.tiktok.com/@${video.creator}/video/`
    navigator.clipboard.writeText(url)
    alert("Copied to clipboard!")
  }

  return (
    <div className={cx("modal")}>
      <div className={cx("header")}>
        <button className={cx("closeBtn")} onClick={onClose} aria-label="Close video">
          <X size={24} />
        </button>

        <div className={cx("searchBar")}>
          <Search size={16} />
          <input type="text" placeholder={video.title} readOnly className={cx("searchInput")} />
        </div>

        <button className={cx("moreBtn")} aria-label="More options">
          ⋯
        </button>
      </div>

      <div className={cx("content")}>
        <div className={cx("playerSide")}>
          <VideoPlayer
            videoUrl={video.videoUrl || "/placeholder-video.mp4"}
            onNextVideo={onNextVideo}
            onPrevVideo={onPrevVideo}
          />
          <div className={cx("watermark")}>MỦA ĐÔNG NĂM NĂY</div>
        </div>

        <div className={cx("infoSide")}>
          {/* Creator Card */}
          <CreatorCard creator={video.creator} />

          {/* Video Title and Tags */}
          <div className={cx("videoInfo")}>
            <h3 className={cx("videoTitle")}>{video.title}</h3>
            <p className={cx("tags")}>
              {video.tags?.map((tag) => (
                <a key={tag} href={`#tag-${tag}`} className={cx("tag")}>
                  #{tag}
                </a>
              ))}
            </p>
          </div>

          {/* Music Info */}
          <div className={cx("musicInfo")}>
            <span className={cx("musicIcon")}>♫</span>
            <span className={cx("musicText")}>{video.music || "Nhạc nền - Original Sound"}</span>
          </div>

          {/* Engagement Stats */}
          <EngagementStats
            likes={video.likes}
            comments={video.comments}
            bookmarks={video.bookmarks}
            shares={video.shares}
            onCopyLink={handleCopyLink}
          />

          {/* Comments Section */}
          <CommentsSection comments={video.videoComments} videoId={video.id} />
        </div>
      </div>
    </div>
  )
}

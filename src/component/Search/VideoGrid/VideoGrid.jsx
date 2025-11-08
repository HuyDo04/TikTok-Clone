"use client"
import classNames from "classnames/bind"
import styles from "./VideoGrid.module.scss"
import { Heart, Play } from "lucide-react"

const cx = classNames.bind(styles)

export default function VideoGrid({ videos, isUserVideos = false, onVideoClick }) {
  const handleVideoClick = (e) => {
    if (onVideoClick) {
      const videoId = e.currentTarget.dataset.videoId
      const video = videos.find((v) => v.id.toString() === videoId)
      if (video) {
        onVideoClick(video)
      }
    }
  }

  return (
    <div className={cx("video-grid-container")}>
      <div className={cx("video-grid", { "user-videos": isUserVideos })}>
        {videos?.map((video) => (
          <div key={video.id} className={cx("video-item")} onClick={handleVideoClick} data-video-id={video.id}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter" || e.key === " ") handleVideoClick(e)
            }}
          >
            <div className={cx("video-thumbnail-wrapper")}>
              <img src={video.thumbnail || "/placeholder.svg"} alt={video.title} className={cx("video-thumbnail")} />
              {!isUserVideos && (
                <>
                  <div className={cx("video-likes")}>
                    <Heart size={16} className={cx("heart-icon")} />
                    {video.likes}
                  </div>
                  <div className={cx("video-overlay")} />
                </>
              )}
              <div className={cx("play-button-overlay")}>
                <div className={cx("play-button")}>
                  <Play size={24} fill="white" />
                </div>
              </div>
            </div>

            {!isUserVideos && (
              <div className={cx("video-info")}>
                <h4 className={cx("video-title")}>{video.title}</h4>

                <div className={cx("video-creator")}>
                  <img
                    src={video.creator.avatar || "/placeholder.svg"}
                    alt={video.creator.name}
                    className={cx("creator-avatar")}
                  />
                  <div className={cx("creator-info")}>
                    <p className={cx("creator-name")}>
                      {video.creator.name}
                      {video.isVerified && <span className={cx("verified")}>✓</span>}
                    </p>
                    <p className={cx("time-ago")}>{video.timeAgo}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

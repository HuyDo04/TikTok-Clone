"use client"
import classNames from "classnames/bind"
import styles from "./VideoGrid.module.scss"
import HeartIcon from "@/component/Icons/HeartIcon";
import { PlayIcon } from "lucide-react";

const cx = classNames.bind(styles)
const DEFAULT_AVATAR = import.meta.env.VITE_DEFAULT_AVATAR;

export default function VideoGrid({ videos, isUserVideos = false, onVideoClick }) {
  const handleVideoClick = (video) => {
    if (onVideoClick) {
      onVideoClick(video)
    }
  }

  return (
    <div className={cx("video-grid-container")}>
      <div className={cx("video-grid", { "user-videos": isUserVideos })}>
        {videos.map((video) => (
          <div
            key={video.id}
            className={cx("video-item")}
            onClick={() => handleVideoClick(video)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleVideoClick(video)
              }
            }}
          >
            <div className={cx("video-thumbnail-wrapper")}>
              <img src={video.thumbnail || DEFAULT_AVATAR} alt={video.title} className={cx("video-thumbnail")} />
              {!isUserVideos && (
                <>
                  <div className={cx("video-likes")}>
                    <HeartIcon />
                    {video.likes}
                  </div>
                  <div className={cx("video-overlay")} />
                </>
              )}
              <div className={cx("play-button-overlay")}>
                <PlayIcon />            
              </div>
            </div>

            {!isUserVideos && (
              <div className={cx("video-info")}>
                <h4 className={cx("video-title")}>{video.title}</h4>

                <div className={cx("video-creator")}>
                  <img
                    src={video.creatorAvatar || DEFAULT_AVATAR}
                    alt={video.creator}
                    className={cx("creator-avatar")}
                  />
                  <div className={cx("creator-info")}>
                    <p className={cx("creator-name")}>
                      {video.creator}
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

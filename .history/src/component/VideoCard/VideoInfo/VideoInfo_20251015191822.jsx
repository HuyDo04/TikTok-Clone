"use client"

import styles from "./VideoInfo.module.css"

export default function VideoInfo({ video }) {
  return (
    <div className={styles.videoInfo}>
      <div className={styles.author}>
        <span className={styles.username}>@{video.author.username}</span>
        {video.author.verified && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#20D5EC">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
        )}
        <span className={styles.date}>9-17</span>
      </div>
      <p className={styles.description}>{video.description}</p>
      <div className={styles.music}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
        </svg>
        <span>{video.music}</span>
      </div>
    </div>
  )
}

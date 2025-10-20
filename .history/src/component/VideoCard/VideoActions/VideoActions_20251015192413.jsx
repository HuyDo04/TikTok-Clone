"use client"

import { useState } from "react"
import CommentModal from "../CommentModal/CommentModal"
import ShareModal from "../ShareModal/ShareModal"
import styles from "./VideoActions.module.css"

export default function VideoActions({ video }) {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(video.stats.likes)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [bookmarkCount, setBookmarkCount] = useState(video.stats.bookmarks)
  const [showComments, setShowComments] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [commentCount, setCommentCount] = useState(video.stats.comments)

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setIsLiked(!isLiked)
  }

  const handleBookmark = () => {
    if (isBookmarked) {
      setBookmarkCount(bookmarkCount - 1)
    } else {
      setBookmarkCount(bookmarkCount + 1)
    }
    setIsBookmarked(!isBookmarked)
  }

  const handleCommentAdded = () => {
    setCommentCount(commentCount + 1)
  }

  return (
    <>
      <div className={styles.videoActions}>
        <div className={styles.authorAvatar}>
          <img src={video.author.avatar || "/placeholder.svg"} alt={video.author.username} />
          <button className={styles.followButton}>+</button>
        </div>

        <button className={`${styles.actionButton} ${isLiked ? styles.liked : ""}`} onClick={handleLike}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill={isLiked ? "#fe2c55" : "white"}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span>{likeCount}</span>
        </button>

        <button className={styles.actionButton} onClick={() => setShowComments(true)}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
          </svg>
          <span>{commentCount}</span>
        </button>

        <button className={`${styles.actionButton} ${isBookmarked ? styles.bookmarked : ""}`} onClick={handleBookmark}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill={isBookmarked ? "#ffc107" : "white"}>
            <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
          </svg>
          <span>{bookmarkCount}</span>
        </button>

        <button className={styles.actionButton} onClick={() => setShowShare(true)}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
          </svg>
          <span>{video.stats.shares}</span>
        </button>
      </div>

      {showComments && (
        <CommentModal video={video} onClose={() => setShowComments(false)} onCommentAdded={handleCommentAdded} />
      )}

      {showShare && <ShareModal video={video} onClose={() => setShowShare(false)} />}
    </>
  )
}

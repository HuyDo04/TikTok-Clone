"use client"

import { useState } from "react"
import classNames from "classnames/bind"
import styles from "./Comment.module.scss"

const cx = classNames.bind(styles)

export default function Comment({ comment, onReply }) {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(comment.likes)
  const [showReplies, setShowReplies] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  return (
    <div className={cx("commentWrapper")}>
      {/* Comment Item */}
      <div className={cx("commentItem")}>
        {/* Avatar */}
        <div className={cx("avatarWrapper")}>
          <a href={`/@${comment.user.username}`} className={cx("avatarLink")}>
            <span className={cx("avatarContainer")}>
              <img
                src={comment.user.avatar || "/placeholder.svg"}
                alt={comment.user.username}
                className={cx("avatarImg")}
              />
            </span>
          </a>
        </div>

        {/* Comment Content */}
        <div className={cx("contentWrapper")}>
          {/* Header */}
          <div className={cx("headerWrapper")}>
            <a href={`/@${comment.user.username}`} className={cx("usernameLink")}>
              <p className={cx("usernameText")}>{comment.user.username}</p>
            </a>
            <div className={cx("moreBtn")}>
              <svg viewBox="0 0 48 48" width="1em" height="1em">
                <path d="M5 24a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm15 0a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm15 0a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z"></path>
              </svg>
            </div>
          </div>

          {/* Comment Text */}
          <span className={cx("commentText")}>{comment.text}</span>

          {/* Subcontent (date, reply, like) */}
          <div className={cx("subContentWrapper")}>
            <div className={cx("subLeft")}>
              <span className={cx("dateText")}>{comment.date}</span>
              <button
                className={cx("replyBtn")}
                onClick={() => onReply(comment.id, comment.user.username)}
              >
                Trả lời
              </button>
            </div>

            <div className={cx("likeWrapper")} onClick={handleLike}>
              <svg
                fill={isLiked ? "#fe2c55" : "currentColor"}
                viewBox="0 0 48 48"
                width="20"
                height="20"
              >
                <path d="M24 12.62c3.91-4.08 9.84-4.1 13.6-.42a9.48 9.48 0 0 1 0 13.63L25.06 38.07a1.5 1.5 0 0 1-2.1 0L10.4 25.83a9.48 9.48 0 0 1 0-13.63c3.77-3.68 9.7-3.66 13.61.42Z" />
              </svg>
              {likeCount > 0 && <span>{likeCount}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className={cx("replyContainer")}>
          {!showReplies ? (
            <button
              className={cx("viewRepliesBtn")}
              onClick={() => setShowReplies(true)}
            >
              Xem {comment.replies.length} câu trả lời
              <svg viewBox="0 0 48 48" width="1em" height="1em">
                <path d="m24 27.76 13.17-13.17a1 1 0 0 1 1.42 0l2.82 2.82a1 1 0 0 1 0 1.42L25.06 35.18a1.5 1.5 0 0 1-2.12 0L6.59 18.83a1 1 0 0 1 0-1.42L9.4 14.6a1 1 0 0 1 1.42 0L24 27.76Z"></path>
              </svg>
            </button>
          ) : (
            <div className={cx("repliesList")}>
              {comment.replies.map((reply) => (
                <Comment key={reply.id} comment={reply} onReply={onReply} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

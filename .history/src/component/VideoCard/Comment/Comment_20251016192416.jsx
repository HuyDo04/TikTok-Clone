"use client"

import { useState } from "react"
import classNames from "classnames/bind"
import styles from "./Comment.module.scss"

const cx = classNames.bind(styles)

export default function Comment({ comment, onReply, onMention }) {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(comment.likes)
  const [showReplies, setShowReplies] = useState(false)

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setIsLiked(!isLiked)
  }

  return (
    <div className={cx("comment")}>
      <img src={comment.user.avatar || "/placeholder.svg"} alt={comment.user.username} className={cx("avatar")} />

      <div className={cx("content")}>
        <div className={cx("header")}>
          <span className={cx("username")}>{comment.user.username}</span>
          <span className={cx("date")}>{comment.date}</span>
        </div>

        <p className={cx("text")}>{comment.text}</p>

        <div className={cx("actions")}>
          <button className={cx("replyButton")} onClick={() => onReply(comment.id, comment.user.username)}>
            Trả lời
          </button>

          {comment.replies && comment.replies.length > 0 && !showReplies && (
            <button className={cx("viewRepliesButton")} onClick={() => setShowReplies(true)}>
              Xem {comment.replies.length} câu trả lời
            </button>
          )}
        </div>

        {showReplies && comment.replies && comment.replies.length > 0 && (
          <div className={cx("replies")}>
            {comment.replies.map((reply) => (
              <div key={reply.id} className={cx("reply")}>
                <img
                  src={reply.user.avatar || "/placeholder.svg"}
                  alt={reply.user.username}
                  className={cx("replyAvatar")}
                />

                <div className={cx("replyContent")}>
                  <div className={cx("header")}>
                    <span className={cx("username")}>{reply.user.username}</span>
                    <span className={cx("date")}>{reply.date}</span>
                  </div>

                  <p className={cx("text")}>{reply.text}</p>

                  <button className={cx("replyButton")} onClick={() => onReply(comment.id, reply.user.username)}>
                    Trả lời
                  </button>
                </div>

                <button
                  className={cx("likeButton", { liked: reply.isLiked })}
                  onClick={() => {
                    if (reply.isLiked) {
                      reply.setLikeCount(reply.likeCount - 1)
                    } else {
                      reply.setLikeCount(reply.likeCount + 1)
                    }
                    reply.setIsLiked(!reply.isLiked)
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill={reply.isLiked ? "#fe2c55" : "currentColor"}>
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  {reply.likes > 0 && <span>{reply.likes}</span>}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button className={cx("likeButton", { liked: isLiked })} onClick={handleLike}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill={isLiked ? "#fe2c55" : "currentColor"}>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        {likeCount > 0 && <span>{likeCount}</span>}
      </button>
    </div>
  )
}

"use client"

import { useState } from "react"
import classNames from "classnames/bind"
import styles from "./CommentsSection.module.scss"
import { Heart, SmilePlus } from "lucide-react"

const cx = classNames.bind(styles)
const DEFAULT_AVATAR = import.meta.env.VITE_DEFAULT_AVATAR;

// eslint-disable-next-line no-unused-vars
export default function CommentsSection({ comments, videoId }) {
  const [commentText, setCommentText] = useState("")
  const [allComments, setAllComments] = useState(comments || [])

  const handlePostComment = () => {
    if (commentText.trim()) {
      const newComment = {
        id: allComments.length + 1,
        author: "You",
        avatar: `${DEFAULT_AVATAR}?height=32&width=32`,
        text: commentText,
        likes: 0,
        timestamp: "now",
      }
      setAllComments([newComment, ...allComments])
      setCommentText("")
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handlePostComment()
    }
  }

  return (
    <div className={cx("commentsSection")}>
      <div className={cx("tabs")}>
        <div className={cx("tab", "active")}>Bình luận ({allComments.length})</div>
        <div className={cx("tab")}>Video của nhà sáng tạo</div>
      </div>

      <div className={cx("commentsList")}>
        {allComments.map((comment) => (
          <div key={comment.id} className={cx("commentItem")}>
            <img src={comment.avatar || DEFAULT_AVATAR} alt={comment.author} className={cx("commentAvatar")} />

            <div className={cx("commentContent")}>
              <div className={cx("commentHeader")}>
                <h5 className={cx("commentAuthor")}>{comment.author}</h5>
                <span className={cx("commentTime")}>{comment.timestamp}</span>
              </div>

              <p className={cx("commentText")}>{comment.text}</p>

              <button className={cx("likeBtn")}>
                <Heart size={14} />
                <span>{comment.likes}</span>
              </button>
            </div>

            {comment.reply && (
              <div className={cx("reply")}>
                <img
                  src={comment.reply.avatar || DEFAULT_AVATAR}
                  alt={comment.reply.author}
                  className={cx("replyAvatar")}
                />
                <div className={cx("replyContent")}>
                  <div className={cx("replyHeader")}>
                    <h6 className={cx("replyAuthor")}>{comment.reply.author}</h6>
                    <span className={cx("replyTime")}>{comment.reply.timestamp}</span>
                  </div>
                  <p className={cx("replyText")}>{comment.reply.text}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={cx("commentInput")}>
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Thêm bình luận..."
          className={cx("inputField")}
        />

        <div className={cx("inputActions")}>
          <button className={cx("actionBtn")} title="Emoji">
            <SmilePlus size={18} />
          </button>
          <button className={cx("actionBtn")} onClick={handlePostComment} disabled={!commentText.trim()}>
            Đăng
          </button>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import Comment from "../Comment/Comment"
import styles from "./CommentModal.module.scss"
import classNames from "classnames/bind"

const cx = classNames.bind(styles)

// Dữ liệu bình luận giả, được cấu trúc theo videoId
const allMockComments = {
  1: [
    {
      id: 101,
      user: {
        username: "hoang_dung_fan",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      text: "Video đầu tiên hay quá! Xem chục lần rồi chưa chán 🥰",
      likes: 42,
      date: "10-01",
      replies: [
        {
          id: 1011,
          user: {
            username: "fan_reply",
            avatar: "https://i.pravatar.cc/150?img=2",
          },
          text: "Mình cũng vậy nè!",
          likes: 5,
          date: "10-01",
        },
        {
          id: 1011,
          user: {
            username: "fan_reply",
            avatar: "https://i.pravatar.cc/150?img=2",
          },
          text: "Mình cũng vậy nè!",
          likes: 5,
          date: "10-01",
        }
      ],
    },
  ],
  2: [
    {
      id: 201,
      user: {
        username: "trend_follower",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
      text: "Bình luận cho video thứ 2 đây. Bắt trend ghê.",
      likes: 50,
      date: "10-02",
      replies: [],
    },
    {
      id: 202,
      user: {
        username: "another_user",
        avatar: "https://i.pravatar.cc/150?img=4",
      },
      text: "Video này cuốn thật sự.",
      likes: 25,
      date: "10-02",
      replies: [
        {
          id: 1011,
          user: {
            username: "fan_reply",
            avatar: "https://i.pravatar.cc/150?img=2",
          },
          text: "Mình cũng vậy nè!",
          likes: 5,
          date: "10-01",
        }
      ],
    },
  ],
  3: [
    {
      id: 301,
      user: {
        username: "demo_viewer",
        avatar: "https://i.pravatar.cc/150?img=5",
      },
      text: "Nội dung bình luận cho video demo số 3 🔥",
      likes: 15,
      date: "10-03",
      replies: [
        {
          id: 1011,
          user: {
            username: "fan_reply",
            avatar: "https://i.pravatar.cc/150?img=2",
          },
          text: "Mình cũng vậy nè!",
          likes: 5,
          date: "10-01",
        },
        {
          id: 1011,
          user: {
            username: "fan_reply",
            avatar: "https://i.pravatar.cc/150?img=2",
          },
          text: "Mình cũng vậy nè!",
          likes: 5,
          date: "10-01",
        }
      ],
    },
  ],
}

export default function CommentModal({ video, onClose, onCommentAdded }) {
  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState("")
  const [replyingTo, setReplyingTo] = useState(null)

  useEffect(() => {
    // Đặt bình luận dựa trên ID video khi modal được mở hoặc video thay đổi
    if (video && video.id) {
      setComments(allMockComments[video.id] || [])
    }
  }, [video])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!commentText.trim()) return

    if (replyingTo) {
      // Thêm trả lời
      const newReply = {
        id: Date.now(),
        user: {
          username: "current_user",
          avatar: "/current-user.jpg",
        },
        text: commentText,
        likes: 0,
        date: "Vừa xong",
      }

      setComments(
        comments.map((comment) => {
          if (comment.id === replyingTo) {
            return {
              ...comment,
              replies: [...comment.replies, newReply],
            }
          }
          return comment
        }),
      )

      setReplyingTo(null)
    } else {
      // Thêm bình luận mới
      const newComment = {
        id: Date.now(),
        user: {
          username: "current_user",
          avatar: "/current-user.jpg",
        },
        text: commentText,
        likes: 0,
        date: "Vừa xong",
        replies: [],
      }

      setComments([newComment, ...comments])
      if (onCommentAdded) onCommentAdded()
    }

    setCommentText("")
  }

  const handleReply = (commentId, username) => {
    setReplyingTo(commentId)
    setCommentText(`@${username} `)
  }

  const handleMention = (username) => {
    setCommentText(commentText + `@${username} `)
  }

  return (
    <>
      <div className={cx("overlay")} onClick={onClose} />
      <div className={cx("commentModal")}>
        <div className={cx("modalContent")}>
          <div className={cx("header")}>
            <h3>Bình luận ({comments.length})</h3>
            <button className={cx("closeButton")} onClick={onClose}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
              </svg>
            </button>
          </div>

          <div className={cx("commentList")}>
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                onReply={handleReply}
                onMention={handleMention}
              />
            ))}
          </div>

          <form className={cx("commentForm")} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder={
                replyingTo ? "Thêm câu trả lời..." : "Thêm bình luận..."
              }
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className={cx("commentInput")}
            />
            <button
              type="button"
              className={cx("mentionButton")}
              onClick={() => handleMention("user")}
            >
              @
            </button>
            <button type="button" className={cx("emojiButton")}>
              😊
            </button>
            <button
              type="submit"
              className={cx("submitButton")}
              disabled={!commentText.trim()}
            >
              Đăng
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
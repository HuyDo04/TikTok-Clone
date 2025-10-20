/* eslint-disable no-unused-vars */
"use client"

import { useState } from "react"
import Comment from "../Comment/Comment"
import styles from "./CommentModal.module.scss"
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

// Mock comments data
const mockComments = [
  {
    id: 1,
    user: {
      username: "quan_21",
      avatar: "https://picsum.photos/200",
    },
    text: "Xem chục lần r chưa chán 🥰",
    likes: 42,
    date: "9-17",
    replies: [
      {
        id: 11,
        user: {
          username: "user_reply1",
          avatar: "https://picsum.photos/200",
        },
        text: "Mình cũng vậy",
        likes: 5,
        date: "9-17",
      },
      {
        id: 12,
        user: {
          username: "user_reply2",
          avatar: "https://picsum.photos/200",
        },
        text: "Hay quá đi",
        likes: 3,
        date: "9-17",
      },
      {
        id: 13,
        user: {
          username: "user_reply3",
          avatar: "https://picsum.photos/200",
        },
        text: "Nghe mãi không chán",
        likes: 8,
        date: "9-17",
      },
      {
        id: 13,
        user: {
          username: "user_reply3",
          avatar: "https://picsum.photos/200",
        },
        text: "Nghe mãi không chán",
        likes: 8,
        date: "9-17",
      },
      {
        id: 13,
        user: {
          username: "user_reply3",
          avatar: "https://picsum.photos/200",
        },
        text: "Nghe mãi không chán",
        likes: 8,
        date: "9-17",
      },
      {
        id: 13,
        user: {
          username: "user_reply3",
          avatar: "https://picsum.photos/200",
        },
        text: "Nghe mãi không chán",
        likes: 8,
        date: "9-17",
      },
      {
        id: 13,
        user: {
          username: "user_reply3",
          avatar: "https://picsum.photos/200",
        },
        text: "Nghe mãi không chán",
        likes: 8,
        date: "9-17",
      },
      {
        id: 13,
        user: {
          username: "user_reply3",
          avatar: "https://picsum.photos/200",
        },
        text: "Nghe mãi không chán",
        likes: 8,
        date: "9-17",
      },
      {
        id: 13,
        user: {
          username: "user_reply3",
          avatar: "https://picsum.photos/200",
        },
        text: "Nghe mãi không chán",
        likes: 8,
        date: "9-17",
      },
      {
        id: 13,
        user: {
          username: "user_reply3",
          avatar: "https://picsum.photos/200",
        },
        text: "Nghe mãi không chán",
        likes: 8,
        date: "9-17",
      },
      {
        id: 13,
        user: {
          username: "user_reply3",
          avatar: "https://picsum.photos/200",
        },
        text: "Nghe mãi không chán",
        likes: 8,
        date: "9-17",
      },
      {
        id: 13,
        user: {
          username: "user_reply3",
          avatar: "https://picsum.photos/200",
        },
        text: "Nghe mãi không chán",
        likes: 8,
        date: "9-17",
      },
    ],
  },
  {
    id: 2,
    user: {
      username: "Nguyễn Thúy Vy",
      avatar: "https://picsum.photos/200",
    },
    text: "ủ ơi ông này ghê nhể",
    likes: 50,
    date: "9-17",
    replies: [
      {
        id: 21,
        user: {
          username: "fan_music",
          avatar: "https://picsum.photos/200",
        },
        text: "Đúng rồi",
        likes: 2,
        date: "9-17",
      },
    ],
  },
  {
    id: 3,
    user: {
      username: "music_lover",
      avatar: "https://picsum.photos/200",
    },
    text: "Nghe 3 lần r mà vẫn chưa chán 🥰🥰🥰",
    likes: 15,
    date: "9-17",
    replies: [],
  },
]

export default function CommentModal({ video, onClose, onCommentAdded }) {
  const [comments, setComments] = useState(mockComments)
  const [commentText, setCommentText] = useState("")
  const [replyingTo, setReplyingTo] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!commentText.trim()) return

    if (replyingTo) {
      // Add reply
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
      // Add new comment
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
      onCommentAdded()
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
      <div className={cx('overlay')} onClick={onClose} />
      <div className={cx('commentModal')}>
        <div className={cx('modalContent')}>
        <div className={cx('header')}>
          <h3>Bình luận ({comments.length})</h3>
          <button className={cx('closeButton')} onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
            </svg>
          </button>
        </div>

        <div className={cx('commentList')}>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} onReply={handleReply} onMention={handleMention} />
          ))}
        </div>

        <form className={cx('commentForm')} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={replyingTo ? "Thêm câu trả lời..." : "Thêm bình luận..."}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className={cx('commentInput')}
          />
          <button type="button" className={cx('mentionButton')} onClick={() => handleMention("user")}>
            @
          </button>
          <button type="button" className={cx('emojiButton')}>
            😊
          </button>
          <button type="submit" className={cx('submitButton')} disabled={!commentText.trim()}>
            Đăng
          </button>
        </form>
        </div>
      </div>
    </>
  )
}
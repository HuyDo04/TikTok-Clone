"use client"

import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import classNames from "classnames/bind"
import styles from "./CommentsSection.module.scss"
import { SmilePlus } from "lucide-react"
import Comment from "@/component/VideoCard/Comment/Comment" // Sử dụng lại component Comment đã hoàn thiện
import {
  getCommentsByPost,
  createComment,
  replyComment,
  deleteComment,
} from "@/services/comment.service"

const cx = classNames.bind(styles)

export default function CommentsSection({ videoId }) {
  const [commentText, setCommentText] = useState("")
  const [allComments, setAllComments] = useState([])
  const [replyingTo, setReplyingTo] = useState(null) // State để quản lý việc trả lời
  const currentUser = useSelector((state) => state.auth.currentUser)

  // Lấy danh sách bình luận từ API
  useEffect(() => {
    if (videoId) {
      const fetchComments = async () => {
        try {
          const response = await getCommentsByPost(videoId)
          setAllComments(response || [])
        } catch (error) {
          console.error("Failed to fetch comments:", error)
          setAllComments([])
        }
      }
      fetchComments()
    }
  }, [videoId])

  // Xử lý đăng bình luận hoặc trả lời
  const handlePostComment = async (e) => {
    e.preventDefault()
    if (!commentText.trim() || !currentUser) return

    try {
      let response
      if (replyingTo) {
        const replyData = { content: commentText }
        response = await replyComment(replyingTo, replyData)
      } else {
        const commentData = { postId: videoId, content: commentText }
        response = await createComment(commentData)
      }

      const newComment = response

      if (newComment && newComment.id) {
        if (replyingTo) {
          // Thêm trả lời vào bình luận cha
          setAllComments(
            allComments.map((c) =>
              c.id === replyingTo ? { ...c, replies: [...(c.replies || []), newComment] } : c
            )
          )
          setReplyingTo(null)
        } else {
          // Thêm bình luận mới vào đầu danh sách
          setAllComments([newComment, ...allComments])
        }
      }
      setCommentText("")
    } catch (error) {
      console.error("Failed to post comment:", error)
    }
  };

  const handleKeyPress = (e) => { // Giữ lại để submit bằng Enter
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handlePostComment()
    }
  }

  // Các hàm xử lý cho component Comment
  const handleReply = (commentId, username) => {
    setReplyingTo(commentId)
    setCommentText(`@${username} `)
  }

  const handleDeleteComment = async (commentId, parentId) => {
    try {
      await deleteComment(commentId)
      if (parentId) {
        setAllComments(allComments.map(c => 
          c.id === parentId ? { ...c, replies: c.replies.filter(r => r.id !== commentId) } : c
        ))
      } else {
        setAllComments(allComments.filter(c => c.id !== commentId))
      }
    } catch (error) {
      console.error("Failed to delete comment:", error)
    }
  }

  const handleUpdateComment = (updatedComment) => {
    setAllComments(prevComments => 
      prevComments.map(comment => {
        if (comment.id === updatedComment.id) return { ...comment, ...updatedComment }
        if (comment.replies) {
          const updatedReplies = comment.replies.map(reply => 
            reply.id === updatedComment.id ? { ...reply, ...updatedComment } : reply
          )
          return { ...comment, replies: updatedReplies }
        }
        return comment
      })
    )
  }

  return (
    <div className={cx("commentsSection")}>
      <div className={cx("tabs")}>
        <div className={cx("tab", "active")}>Bình luận ({allComments.length})</div>
        <div className={cx("tab")}>Video của nhà sáng tạo</div>
      </div>

      <div className={cx("commentsList")}>
        {allComments.map((comment) => ( // Sử dụng component Comment
          <Comment
            key={comment.id}
            comment={comment}
            onReply={handleReply}
            onDelete={handleDeleteComment}
            onUpdate={handleUpdateComment}
          />
        ))}
      </div>

      <form className={cx("commentInput")} onSubmit={handlePostComment}>
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={replyingTo ? "Thêm câu trả lời..." : "Thêm bình luận..."}
          className={cx("inputField")}
        />

        <div className={cx("inputActions")}>
          <button className={cx("actionBtn")} title="Emoji">
            <SmilePlus size={18} />
          </button>
          <button type="submit" className={cx("actionBtn")} disabled={!commentText.trim()}>
            Đăng
          </button>
        </div>
      </form>
    </div>
  )
}

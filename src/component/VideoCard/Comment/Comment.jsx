"use client"

import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import classNames from "classnames/bind"
import styles from "./Comment.module.scss"
import { likeComment, unlikeComment, updateComment } from "@/services/comment.service"
import { formatDistanceToNow } from "date-fns"
import { vi } from "date-fns/locale"

const cx = classNames.bind(styles)
const URL = import.meta.env.VITE_BASE_URL_ME
const DEFAULT_AVATAR = import.meta.env.VITE_DEFAULT_AVATAR;

export default function Comment({ comment, onReply, onDelete, onUpdate }) {
  // API trả về isLiked là 0 hoặc 1, chuyển đổi sang boolean
  const [isLiked, setIsLiked] = useState(!!comment.isLiked)
  const [likeCount, setLikeCount] = useState(comment.likes_count || comment.likes || 0)
  const [showReplies, setShowReplies] = useState(false)
  const [visibleCount, setVisibleCount] = useState(0)
  const [showOptions, setShowOptions] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(comment.content)
  const commentRef = useRef(null)
  const optionsRef = useRef(null)
  const currentUser = useSelector((state) => state.auth.currentUser)

  const handleLike = async () => {
    if (!currentUser) return

    const newIsLiked = !isLiked
    setIsLiked(newIsLiked)
    setLikeCount((prev) => (newIsLiked ? prev + 1 : prev - 1))

    try {
      newIsLiked ? await likeComment(comment.id) : await unlikeComment(comment.id)
    } catch (error) {
      console.error("Failed to update like status:", error)
      setIsLiked(!newIsLiked)
      setLikeCount((prev) => (newIsLiked ? prev - 1 : prev + 1))
    }
  }

  const handleDelete = () => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa bình luận này không?")) return
    setShowOptions(false)
    onDelete(comment.id, comment.parent_id)
  }

  const handleEditStart = () => {
    setIsEditing(true)
    setEditedContent(comment.content)
    setShowOptions(false)
  }

  const handleEditCancel = () => {
    setIsEditing(false)
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    if (!editedContent.trim()) return

    try {
      const updatedComment = await updateComment(comment.id, { content: editedContent })
      onUpdate(updatedComment)
      setIsEditing(false)
    } catch (error) {
      console.error("Failed to update comment:", error)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleToggleReplies = () => {
    if (!showReplies) {
      setShowReplies(true)
      if (comment.replies?.length > 0) {
        setVisibleCount(comment.replies.length > 10 ? 10 : 5)
      }
    } else {
      if (commentRef.current) {
        commentRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        })
      }
      setShowReplies(false)
      setVisibleCount(0)
    }
  }

  const handleShowMoreReplies = () => {
    if (!comment.replies) return
    const remaining = comment.replies.length - visibleCount
    const increment = comment.replies.length > 10 ? 10 : 5
    setVisibleCount((prev) => prev + Math.min(remaining, increment))
  }

  const formatDate = (dateString) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true, locale: vi })
    } catch (error) {
      console.log(error)
      return dateString
    }
  }

  return (
    <div ref={commentRef} className={cx("commentWrapper", { open: showReplies })}>
      {isEditing ? (
        <div className={cx("editFormWrapper")}>
          <form onSubmit={handleEditSubmit} className={cx("editForm")}>
            <input
              type="text"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className={cx("editInput")}
              autoFocus
            />
            <div className={cx("editActions")}>
              <button type="button" onClick={handleEditCancel} className={cx("cancelBtn")}>
                Hủy
              </button>
              <button type="submit" disabled={!editedContent.trim()} className={cx("saveBtn")}>
                Lưu
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className={cx("commentItem")}>
          <div className={cx("avatarWrapper")}>
            <a href={`/profile/${comment.author.username}`} className={cx("avatarLink")}>
              <span className={cx("avatarContainer")}>
                <img
                  src={comment.author.avatar ? `${URL}/${comment.author.avatar}` : DEFAULT_AVATAR}
                  alt={comment.author.username}
                  className={cx("avatarImg")}
                />
              </span>
            </a>
          </div>

          <div className={cx("contentWrapper")}>
            <div className={cx("headerWrapper")}>
              <a href={`/@${comment.author.username}`} className={cx("usernameLink")}>
                <p className={cx("usernameText")}>{comment.author.username}</p>
              </a>
              {currentUser && currentUser.id === comment.author.id && !isEditing && (
                <div className={cx("moreBtnWrapper")} ref={optionsRef}>
                  <div className={cx("moreBtn")} onClick={() => setShowOptions((prev) => !prev)}>
                    <svg viewBox="0 0 48 48" width="1em" height="1em">
                      <path d="M5 24a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm15 0a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm15 0a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z"></path>
                    </svg>
                  </div>
                  {showOptions && (
                    <div className={cx("optionsMenu")}>
                      <button onClick={handleEditStart}>Chỉnh sửa</button>
                      <button onClick={handleDelete}>Xóa</button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <span className={cx("commentText")}>{comment.content}</span>

            <div className={cx("subContentWrapper")}>
              <div className={cx("subLeft")}>
                <span className={cx("dateText")}>
                  {formatDate(comment.createdAt || comment.date)}
                </span>
                <button
                  className={cx("replyBtn")}
                  onClick={() => onReply(comment.id, comment.author.username)}
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
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className={cx("replyContainer", { open: showReplies })}>
          <div className={cx("replyHeader")}>
            <div className={cx("line")}></div>

            {!showReplies ? (
              <button className={cx("viewRepliesBtn")} onClick={handleToggleReplies}>
                Xem {comment.replies.length} câu trả lời
                <svg viewBox="0 0 48 48" width="1em" height="1em" className={cx("arrowIcon")}>
                  <path d="m24 27.76 13.17-13.17a1 1 0 0 1 1.42 0l2.82 2.82a1 1 0 0 1 0 1.42L25.06 35.18a1.5 1.5 0 0 1-2.12 0L6.59 18.83a1 1 0 0 1 0-1.42L9.4 14.6a1 1 0 0 1 1.42 0L24 27.76Z"></path>
                </svg>
              </button>
            ) : (
              <div className={cx("repliesList", { open: showReplies })}>
                {comment.replies.slice(0, visibleCount).map((reply) => (
                  <Comment
                    key={reply.id}
                    comment={reply}
                    onReply={onReply}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                  />
                ))}

                {visibleCount < comment.replies.length && (
                  <button className={cx("showMoreBtn")} onClick={handleShowMoreReplies}>
                    Xem thêm bình luận
                  </button>
                )}

                <button className={cx("hideRepliesBtn")} onClick={handleToggleReplies}>
                  Ẩn bớt bình luận
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

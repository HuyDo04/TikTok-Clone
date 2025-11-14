"use client";

import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import EmojiPicker from "emoji-picker-react";
import Comment from "../Comment/Comment";
import styles from "./CommentModal.module.scss";
import classNames from "classnames/bind";
import { getCommentsByPost, createComment, replyComment, deleteComment } from "@/services/comment.service";

const cx = classNames.bind(styles);

export default function CommentModal({ video, onClose, onCommentAdded }) {
  
  
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const emojiPickerRef = useRef(null);
  
  const currentUser = useSelector((state) => state.auth.currentUser);
  // ✅ Sửa logic emoji
  const handleEmojiClick = (emojiData) => {
    setCommentText((prev) => prev + emojiData.emoji);
    // setShowPicker(false);
  };

  useEffect(() => {
    if (video && video.id) {
      const fetchComments = async () => {
        try {
          const response = await getCommentsByPost(video.id);
          // API trả về trực tiếp mảng comments
          setComments(response || []);
        } catch (error) {
          console.error("Failed to fetch comments:", error);
        }
      };
      fetchComments();
    } 
  }, [video]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    }

    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPicker]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || !currentUser) return;

    try {
      let response;

      if (replyingTo) {
        // Logic để trả lời bình luận
        const replyData = { content: commentText };
        response = await replyComment(replyingTo, replyData);
      } else {
        // Logic để tạo bình luận gốc
        const commentData = {
          postId: video.id, // Sửa từ post_id thành postId
          content: commentText,
        };
        response = await createComment(commentData);
      }
      // API trả về trực tiếp object comment mới
      const newComment = response;

      if (replyingTo) {
        if (newComment && newComment.id) {
          // Thêm trả lời vào bình luận cha
          setComments(
            comments.map((comment) =>
              comment.id === replyingTo
                ? { ...comment, replies: [...(comment.replies || []), newComment] }
                : comment
            )
          );
          setReplyingTo(null);
        }
      } else {
        if (newComment && newComment.id) {
          // Thêm bình luận mới vào đầu danh sách
          setComments([newComment, ...comments]);
          if (onCommentAdded) onCommentAdded();
        }
      }

      setCommentText("");
      setShowPicker(false);
    } catch (error) {
      console.error("Failed to post comment or reply:", error);
      // Có thể hiển thị thông báo lỗi cho người dùng ở đây
    }
  };

  const handleDeleteComment = async (commentId, parentId) => {
    try {
      await deleteComment(commentId); // Gọi API để xóa comment
      if (parentId) {
        // Xóa một reply
        setComments(comments.map(comment => {
          if (comment.id === parentId) {
            // Lọc ra reply đã bị xóa
            const updatedReplies = comment.replies.filter(reply => reply.id !== commentId);
            return { ...comment, replies: updatedReplies };
          }
          return comment;
        }));
      } else {
        // Xóa một comment gốc
        setComments(comments.filter(comment => comment.id !== commentId));
      }
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  const handleReply = (commentId, username) => {
    setReplyingTo(commentId);
    setCommentText(`@${username} `);
  };

  const handleMention = (username) => {
    setCommentText(commentText + `@${username} `);
  };

  const handleUpdateComment = (updatedComment) => {
    setComments(prevComments => 
      prevComments.map(comment => {
        if (comment.id === updatedComment.id) {
          return { ...comment, ...updatedComment }; // Hợp nhất comment cũ và mới
        }
        if (comment.replies) {
          // Cập nhật reply trong comment cha
          const updatedReplies = comment.replies.map(reply => 
            reply.id === updatedComment.id ? { ...reply, ...updatedComment } : reply
          );
          return { ...comment, replies: updatedReplies };
        }
        return comment;
      })
    );
  };

  return (
    <>
      <div className={cx("overlay")} onClick={onClose} />
      <div className={cx("commentModal")}>
        <div className={cx("modalContent")}>
          <div className={cx("header")}>
            <h3>Bình luận ({comments.length})</h3>
            <button className={cx("closeButton")} onClick={onClose}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 
                10.59 12 5 17.59 6.41 19 12 13.41 
                17.59 19 19 17.59 13.41 12 19 6.41z" />
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
                onDelete={handleDeleteComment}
                onUpdate={handleUpdateComment}
              />
            ))}
          </div>

          <form className={cx("commentForm")} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder={replyingTo ? "Thêm câu trả lời..." : "Thêm bình luận..."}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className={cx("commentInput")}
            />

            {/* Mention button */}
            <button
              type="button"
              className={cx("mentionButton")}
              onClick={() => handleMention("user")}
            >
              @
            </button>

            {/* Emoji button */}
            <div className={cx("emojiWrapper")} ref={emojiPickerRef}>
              <button
                type="button"
                className={cx("emojiButton")}
                onClick={() => setShowPicker((prev) => !prev)}
              >
                😊
              </button>
              {showPicker && (
                <div className={cx("emojiPicker")}>
                  <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                    theme="light"
                    searchDisabled
                    previewConfig={{ showPreview: false }}
                  />
                </div>
              )}
            </div>

            {/* Submit */}
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
  );
}

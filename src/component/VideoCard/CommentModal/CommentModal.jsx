"use client";

import { useState, useEffect, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import Comment from "../Comment/Comment";
import styles from "./CommentModal.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

// Mock comment data
const allMockComments = {
  1: [
    {
      id: 101,
      user: { username: "hoang_dung_fan", avatar: "https://i.pravatar.cc/150?img=1" },
      text: "Video đầu tiên hay quá! Xem chục lần rồi chưa chán 🥰",
      likes: 42,
      date: "10-01",
      replies: [
        {
          id: 1011,
          user: { username: "fan_reply", avatar: "https://i.pravatar.cc/150?img=2" },
          text: "Mình cũng vậy nè!",
          likes: 5,
          date: "10-01",
        },
      ],
    },
  ],
  2: [
    {
      id: 102,
      user: { username: "hoang_dung_fan", avatar: "https://i.pravatar.cc/150?img=1" },
      text: "Video đầu tiên hay quá! Xem chục lần rồi chưa chán 🥰",
      likes: 42,
      date: "10-01",
      replies: [
        {
          id: 1011,
          user: { username: "fan_reply", avatar: "https://i.pravatar.cc/150?img=2" },
          text: "Mình cũng vậy nè!",
          likes: 5,
          date: "10-01",
        },
      ],
    },
  ],
};

export default function CommentModal({ video, onClose, onCommentAdded }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const emojiPickerRef = useRef(null);

  // ✅ Sửa logic emoji
  const handleEmojiClick = (emojiData) => {
    setCommentText((prev) => prev + emojiData.emoji);
    // setShowPicker(false);
  };

  useEffect(() => {
    if (video && video.id) {
      setComments(allMockComments[video.id] || []);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    if (replyingTo) {
      const newReply = {
        id: Date.now(),
        user: { username: "current_user", avatar: "/current-user.jpg" },
        text: commentText,
        likes: 0,
        date: "Vừa xong",
      };

      setComments(
        comments.map((comment) =>
          comment.id === replyingTo
            ? { ...comment, replies: [...comment.replies, newReply] }
            : comment
        )
      );
      setReplyingTo(null);
    } else {
      const newComment = {
        id: Date.now(),
        user: { username: "current_user", avatar: "/current-user.jpg" },
        text: commentText,
        likes: 0,
        date: "Vừa xong",
        replies: [],
      };
      setComments([newComment, ...comments]);
      if (onCommentAdded) onCommentAdded();
    }

    setCommentText("");
    setShowPicker(false);
};

  const handleReply = (commentId, username) => {
    setReplyingTo(commentId);
    setCommentText(`@${username} `);
  };

  const handleMention = (username) => {
    setCommentText(commentText + `@${username} `);
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

"use client"

import * as postService from "../../../../services/post.service"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import classNames from "classnames/bind"
import CaptionInput from "../upload/CaptionInput"
import PrivacySelector from "../upload/PrivacySelector"
import PreviewTabs from "../upload/PreviewTabs"
import styles from "./EditPostForm.module.scss"

const cx = classNames.bind(styles)

export default function EditPostForm({ post }) {
  const navigate = useNavigate()
  const [content, setContent] = useState(post.content)
  const [visibility, setVisibility] = useState(post.visibility)
  const [isSaving, setIsSaving] = useState(false)

  // Calculate days since post was created
  const postDate = new Date(post.createdAt)
  const today = new Date()
  const daysSincePost = Math.floor((today - postDate) / (1000 * 60 * 60 * 24))
  const canEditContent = daysSincePost <= 7

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const updatedData = {
        content: canEditContent ? content : undefined, // Chỉ gửi content nếu được phép sửa
        visibility,
      }
      await postService.updatePost(post.id, updatedData)
      navigate("/studio/posts") // Điều hướng về trang danh sách sau khi lưu thành công
    } catch (error) {
      console.error("Failed to save post:", error)
      // Có thể hiển thị thông báo lỗi cho người dùng ở đây
    } finally {
      setIsSaving(false)
    }
  }

  const files = [
    {
      type: post.type,
      url: post.featuredImage,
      duration: post.duration,
    },
  ]

  return (
    <div className={cx("formGrid")}>
      <div className={cx("mainContent")}>
        <div className={cx("card")}>
          <div className={cx("header")}>
            <h2 className={cx("title")}>Chỉnh sửa bài đăng</h2>
            <button onClick={() => navigate(-1)} className={cx("closeButton")}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className={cx("captionSection")}>
            {!canEditContent && (
              <div className={cx("warningBox")}>
                <p>⚠️ Bài đăng này đã quá 7 ngày, bạn không thể chỉnh sửa phụ đề nữa.</p>
              </div>
            )}
            <CaptionInput value={content} onChange={setContent} disabled={!canEditContent} />
          </div>

          <div className={cx("dateSection")}>
            <label className={cx("label")}>Ngày đăng</label>
            <p className={cx("dateText")}>{new Date(post.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div className={cx("card")}>
          <h3 className={cx("sectionTitle")}>Cài đặt quyền riêng tư</h3>
          <PrivacySelector value={visibility} onChange={setVisibility} />
          <div className={cx("mt-6")}>
            <h4 className={cx("subheading")}>Cho phép người dùng:</h4>
            <div className={cx("checkboxGroup")}>
              <label className={cx("checkboxLabel")}>
                <input type="checkbox" defaultChecked className={cx("checkbox")} />
                <span className={cx("checkboxText")}>Bình luận</span>
              </label>
              <label className={cx("checkboxLabel")}>
                <input type="checkbox" defaultChecked className={cx("checkbox")} />
                <span className={cx("checkboxText")}>Sử dụng lại nội dụng</span>
              </label>
            </div>
          </div>
        </div>

        <div className={cx("card")}>
          <h3 className={cx("sectionTitle")}>Thống kê</h3>
          <div className={cx("statsGrid")}>
            <div className={cx("statItem")}>
              <p className={cx("statLabel")}>Lượt xem</p>
              <p className={cx("statValue")}>{post.viewCount?.toLocaleString() || 0}</p>
            </div>
            <div className={cx("statItem")}>
              <p className={cx("statLabel")}>Lượt thích</p>
              <p className={cx("statValue")}>{post.likesCount?.toLocaleString() || 0}</p>
            </div>
            <div className={cx("statItem")}>
              <p className={cx("statLabel")}>Bình luận</p>
              <p className={cx("statValue")}>{post.commentsCount?.toLocaleString() || 0}</p>
            </div>
            <div className={cx("statItem")}>
              <p className={cx("statLabel")}>Chia sẻ</p>
              <p className={cx("statValue")}>{post.sharesCount?.toLocaleString() || 0}</p>
            </div>
          </div>
        </div>

        <div className={cx("actions")}>
          <button onClick={() => navigate(-1)} className={cx("button", "cancel")}>
            Hủy
          </button>
          <button onClick={handleSave} disabled={isSaving} className={cx("button", "save")}>
            {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </div>

      <div className={cx("preview")}>
        <PreviewTabs files={files} caption={content} />
      </div>
    </div>
  )
}

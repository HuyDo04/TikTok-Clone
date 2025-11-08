/* eslint-disable no-unused-vars */
"use client"

import { useState, useRef, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import classNames from "classnames/bind"
import CaptionInput from "./CaptionInput"
import CoverImageSelector from "./CoverImageSelector"
import { createPost } from "@/services/post.service"
import PrivacySelector from "./PrivacySelector"
import PreviewTabs from "./PreviewTabs"
import { validateVideoFile, validateImageFiles } from "../../utils/fileValidation"
import styles from "./UploadForm.module.scss"

const cx = classNames.bind(styles)

export default function UploadForm() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [caption, setCaption] = useState("")
  const [selectedCover, setSelectedCover] = useState(0)
  const [privacy, setPrivacy] = useState("public")
  const [location, setLocation] = useState("")
  const [errors, setErrors] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [allowComment, setAllowComment] = useState(true)
  const [allowReuse, setAllowReuse] = useState(true)
  const [isBranded, setIsBranded] = useState(false)
  const [isBrandDirected, setIsBrandDirected] = useState(false)

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files)
    const newErrors = []
    const validFiles = []

    for (const file of files) {
      if (file.type.startsWith("video/")) {
        const videoError = await validateVideoFile(file)
        if (videoError) {
          newErrors.push(videoError)
        } else {
          validFiles.push({
            file,
            type: "video",
            url: URL.createObjectURL(file),
            duration: await getVideoDuration(file),
          })
        }
      } else if (file.type.startsWith("image/")) {
        const imageError = validateImageFiles([file])
        if (imageError) {
          newErrors.push(imageError)
        } else {
          validFiles.push({
            file,
            type: "image",
            url: URL.createObjectURL(file),
          })
        }
      }
    }

    setErrors(newErrors)
    setUploadedFiles((prev) => [...prev, ...validFiles])
  }

  const getVideoDuration = (file) => {
    return new Promise((resolve) => {
      const video = document.createElement("video")
      video.preload = "metadata"
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src)
        resolve(Math.floor(video.duration))
      }
      video.src = URL.createObjectURL(file)
    })
  }

  const handleSubmit = async () => {
    if (uploadedFiles.length === 0) {
      setErrors(["Vui lòng chọn ít nhất một file để tải lên"])
      return
    }

    setErrors([])
    setIsUploading(true)

    const formData = new FormData()
    formData.append("title", caption)
    formData.append("content", caption)
    formData.append("visibility", privacy)
    formData.append("location", location)
    formData.append("allowComment", allowComment)
    formData.append("allowReuse", allowReuse)
    formData.append("isBranded", isBranded)
    formData.append("isBrandDirected", isBrandDirected)

    // Append media files
    uploadedFiles.forEach((fileObj) => {
      formData.append("media", fileObj.file)
    })

    // Append featured image if it's an image file
    const coverFile = uploadedFiles[selectedCover]
    if (coverFile && coverFile.type === "image") {
      formData.append("featuredImage", coverFile.file)
    }

    try {
      await createPost(formData)
      navigate("/studio/posts")
    } catch (error) {
      console.error("Error creating post:", error)
      setErrors([error.response?.data?.message || "Đã có lỗi xảy ra khi đăng bài. Vui lòng thử lại."])
    } finally {
      setIsUploading(false)
    }
  }

  const removeFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }


  if (uploadedFiles.length === 0) {
    return (
      <div className={cx("uploadContainer")}>
        <div className={cx("uploadContent")}>
          <div className={cx("uploadIconWrapper")}>
            <svg className={cx("uploadIcon")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>

          <h2 className={cx("uploadTitle")}>Chọn video để tải lên</h2>
          <p className={cx("uploadSubtitle")}>Hoặc kéo và thả vào đây</p>

          <button
            onClick={() => fileInputRef.current?.click()}
            className={cx("uploadButton")}
          >
            Chọn video
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="video/*,image/*"
            multiple
            onChange={handleFileSelect}
            className={cx("hiddenInput")}
          />

          <div className={cx("infoGrid")}>
            <div className={cx("infoItem")}>
              <div className={cx("infoIconWrapper")}>
                <svg className={cx("infoIcon")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className={cx("infoTitle")}>Dung lượng và thời lượng</h3>
                <p className={cx("infoText")}>Dung lượng tối đa: 30 GB, thời lượng video: 5 giây - 5 phút</p>
              </div>
            </div>

            <div className={cx("infoItem")}>
              <div className={cx("infoIconWrapper")}>
                <svg className={cx("infoIcon")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className={cx("infoTitle")}>Định dạng tập tin</h3>
                <p className={cx("infoText")}>Đề xuất: ".mp4". Có hỗ trợ các định dạng chính khác.</p>
              </div>
            </div>

            <div className={cx("infoItem")}>
              <div className={cx("infoIconWrapper")}>
                <svg className={cx("infoIcon")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className={cx("infoTitle")}>Độ phân giải video</h3>
                <p className={cx("infoText")}>Độ phân giải cao khuyến nghị: 1080p, 1440p, 4K.</p>
              </div>
            </div>
          </div>

          {errors.length > 0 && (
            <div className={cx("errorContainer")}>
              {errors.map((error, index) => (
                <p key={index} className={cx("errorMessage")}>
                  {error}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={cx("mainGrid")}>
      <div className={cx("mainContent")}>
        <div className={cx("detailSection")}>
          <h2 className={cx("sectionTitle")}>Chi tiết</h2>

          <CaptionInput value={caption} onChange={setCaption} />

          <div className={cx("formGroup")}>
            <label className={cx("formLabel")}>Ảnh bìa</label>
            <CoverImageSelector files={uploadedFiles} selected={selectedCover} onSelect={setSelectedCover} />
          </div>

          {/* <div className={cx("formGroup")}>
            <label className={cx("formLabel")}>Vị trí</label>
            <div className={cx("inputWrapper")}>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Tìm kiếm vị trí"
                className={cx("textInput")}
              />
              <svg
                className={cx("inputIcon")}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div> */}
        </div>

        <div className={cx("settingsSection")}>
          <h3 className={cx("settingsTitle")}>Cài đặt</h3>

          <PrivacySelector value={privacy} onChange={setPrivacy} />

          {/* <div className={cx("formGroup")}>
            <h4 className={cx("allowUsersTitle")}>Cho phép người dùng:</h4>
            <div className={cx("checkboxGroup")}>
              <label className={cx("checkboxLabel")}>
                <input
                  type="checkbox"
                  checked={allowComment}
                  onChange={(e) => setAllowComment(e.target.checked)}
                  className={cx("checkboxInput")}
                />
                <span className={cx("checkboxText")}>Bình luận</span>
              </label>
              <label className={cx("checkboxLabel")}>
                <input
                  type="checkbox"
                  checked={allowReuse}
                  onChange={(e) => setAllowReuse(e.target.checked)}
                  className={cx("checkboxInput")}
                />
                <span className={cx("checkboxText")}>Sử dụng lại nội dụng</span>
              </label>
            </div>
          </div> */}

          {/* <div className={cx("formGroup")}>
            <h4 className={cx("allowUsersTitle")}>Khái báo nội dụng bài đăng</h4>
            <div className={cx("checkboxGroup")}>
              <label className={cx("checkboxLabel")}>
                <input
                  type="checkbox"
                  checked={isBranded}
                  onChange={(e) => setIsBranded(e.target.checked)}
                  className={cx("checkboxInput")}
                />
                <span className={cx("checkboxText")}>Thương hiệu của bạn</span>
              </label>
              <label className={cx("checkboxLabel")}>
                <input
                  type="checkbox"
                  checked={isBrandDirected}
                  onChange={(e) => setIsBrandDirected(e.target.checked)}
                  className={cx("checkboxInput")}
                />
                <span className={cx("checkboxText")}>Nội dụng định hướng thương hiệu</span>
              </label>
            </div>
          </div> */}
        </div>

        <div className={cx("buttonGroup")}>
          <button
            onClick={() => navigate("/studio/posts")}
            className={cx("cancelButton")}
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            disabled={isUploading}
            className={cx("submitButton")}
          >
            {isUploading ? "Đang đăng..." : "Đăng"}
          </button>
        </div>
        {errors.length > 0 && (
          <div className={cx("errorContainer", "submitError")}>
            {errors.map((error, index) => (
              <p key={index} className={cx("errorMessage")}>
                {error}
              </p>
            ))}
          </div>
        )}
      </div>

      <div className={cx("previewSection")}>
        <PreviewTabs files={uploadedFiles} caption={caption} />
      </div>
    </div>
  )
}
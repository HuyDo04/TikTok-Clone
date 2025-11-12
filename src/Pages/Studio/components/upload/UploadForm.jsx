/* eslint-disable no-unused-vars */
"use client"

import { useState, useRef } from "react"
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
  const [errors, setErrors] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [mediaType, setMediaType] = useState(null) // null, 'video', or 'image'

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    const newErrors = []
    const validFiles = []
    const currentMediaType = mediaType || (files[0].type.startsWith("video/") ? "video" : "image")

    if (currentMediaType === "video") {
      // Only allow one video
      const file = files[0]
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
        if (!mediaType) setMediaType("video")
      }
    } else {
      // Allow multiple images
      const imageError = validateImageFiles(files)
      if (imageError) {
        newErrors.push(imageError)
      } else {
        for (const file of files) {
          if (file.type.startsWith("image/")) {
            validFiles.push({
              file,
              type: "image",
              url: URL.createObjectURL(file),
            })
          }
        }
        if (!mediaType) setMediaType("image")
      }
    }

    setErrors(newErrors)
    // Replace files instead of appending
    setUploadedFiles(validFiles)
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
    formData.append("content", caption)
    formData.append("visibility", privacy)

    if (mediaType === "video") {
      if (uploadedFiles.length > 0) {
        formData.append("video", uploadedFiles[0].file)
      }
    } else if (mediaType === "image") {
      uploadedFiles.forEach((fileObj) => {
        formData.append("images", fileObj.file)
      })
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
    if (uploadedFiles.length === 1) {
      setMediaType(null) // Reset media type if all files are removed
      setSelectedCover(0)
      setErrors([])
    }
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
            accept={mediaType === "video" ? "video/*" : mediaType === "image" ? "image/*" : "video/*,image/*"}
            multiple={mediaType !== "video"}
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

        </div>

        <div className={cx("settingsSection")}>
          <h3 className={cx("settingsTitle")}>Cài đặt</h3>

          <PrivacySelector value={privacy} onChange={setPrivacy} />

        </div>

        <div className={cx("buttonGroup")}>
          <button
            onClick={() => setUploadedFiles([])}
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
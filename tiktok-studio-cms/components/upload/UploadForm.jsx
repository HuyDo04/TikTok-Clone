"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import CaptionInput from "./CaptionInput"
import CoverImageSelector from "./CoverImageSelector"
import PrivacySelector from "./PrivacySelector"
import PreviewTabs from "./PreviewTabs"
import { validateVideoFile, validateImageFiles } from "../../utils/fileValidation"

export default function UploadForm() {
  const router = useRouter()
  const fileInputRef = useRef(null)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [caption, setCaption] = useState("")
  const [selectedCover, setSelectedCover] = useState(0)
  const [privacy, setPrivacy] = useState("public")
  const [location, setLocation] = useState("")
  const [errors, setErrors] = useState([])
  const [isUploading, setIsUploading] = useState(false)

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

    setIsUploading(true)

    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Save to mock data and redirect
    router.push("/posts")
  }

  const removeFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  if (uploadedFiles.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">Chọn video để tải lên</h2>
          <p className="text-gray-600 mb-8">Hoặc kéo và thả vào đây</p>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Chọn video
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="video/*,image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Dung lượng và thời lượng</h3>
                <p className="text-sm text-gray-600">Dung lượng tối đa: 30 GB, thời lượng video: 5 giây - 5 phút</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Định dạng tập tin</h3>
                <p className="text-sm text-gray-600">Đề xuất: ".mp4". Có hỗ trợ các định dạng chính khác.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Độ phân giải video</h3>
                <p className="text-sm text-gray-600">Độ phân giải cao khuyến nghị: 1080p, 1440p, 4K.</p>
              </div>
            </div>
          </div>

          {errors.length > 0 && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              {errors.map((error, index) => (
                <p key={index} className="text-sm text-red-600">
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Chi tiết</h2>

          <CaptionInput value={caption} onChange={setCaption} />

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Ảnh bìa</label>
            <CoverImageSelector files={uploadedFiles} selected={selectedCover} onSelect={setSelectedCover} />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Vị trí</label>
            <div className="relative">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Tìm kiếm vị trí"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
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
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Cài đặt</h3>

          <PrivacySelector value={privacy} onChange={setPrivacy} />

          <div className="mt-6">
            <h4 className="font-medium text-gray-900 mb-3">Cho phép người dùng:</h4>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-pink-500 rounded focus:ring-pink-500" />
                <span className="text-sm text-gray-700">Bình luận</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-pink-500 rounded focus:ring-pink-500" />
                <span className="text-sm text-gray-700">Sử dụng lại nội dụng</span>
              </label>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-medium text-gray-900 mb-3">Khái báo nội dụng bài đăng</h4>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4 text-pink-500 rounded focus:ring-pink-500" />
                <span className="text-sm text-gray-700">Thương hiệu của bạn</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4 text-pink-500 rounded focus:ring-pink-500" />
                <span className="text-sm text-gray-700">Nội dụng định hướng thương hiệu</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setUploadedFiles([])}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            disabled={isUploading}
            className="flex-1 px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? "Đang đăng..." : "Đăng"}
          </button>
        </div>
      </div>

      <div className="lg:col-span-1">
        <PreviewTabs files={uploadedFiles} caption={caption} />
      </div>
    </div>
  )
}

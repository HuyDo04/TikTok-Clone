"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import CaptionInput from "../upload/CaptionInput"
import PrivacySelector from "../upload/PrivacySelector"
import PreviewTabs from "../upload/PreviewTabs"

export default function EditPostForm({ post }) {
  const router = useRouter()
  const [caption, setCaption] = useState(post.caption)
  const [privacy, setPrivacy] = useState(post.privacy)
  const [isSaving, setIsSaving] = useState(false)

  // Calculate days since post was created
  const postDate = new Date(post.createdAt)
  const today = new Date()
  const daysSincePost = Math.floor((today - postDate) / (1000 * 60 * 60 * 24))
  const canEditCaption = daysSincePost <= 7

  const handleSave = async () => {
    setIsSaving(true)

    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000))

    router.push("/posts")
  }

  const files = [
    {
      type: post.type,
      url: post.thumbnail,
      duration: post.duration,
    },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Chỉnh sửa bài đăng</h2>
            <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-4">
            {!canEditCaption && (
              <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  ⚠️ Bài đăng này đã quá 7 ngày, bạn không thể chỉnh sửa phụ đề nữa.
                </p>
              </div>
            )}

            <CaptionInput value={caption} onChange={setCaption} disabled={!canEditCaption} />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Ngày đăng</label>
            <p className="text-sm text-gray-600">{post.date}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Cài đặt quyền riêng tư</h3>

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
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Thống kê</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Lượt xem</p>
              <p className="text-2xl font-bold text-gray-900">{post.views.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Lượt thích</p>
              <p className="text-2xl font-bold text-gray-900">{post.likes.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Bình luận</p>
              <p className="text-2xl font-bold text-gray-900">{post.comments.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Chia sẻ</p>
              <p className="text-2xl font-bold text-gray-900">{post.shares.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => router.back()}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </div>

      <div className="lg:col-span-1">
        <PreviewTabs files={files} caption={caption} />
      </div>
    </div>
  )
}

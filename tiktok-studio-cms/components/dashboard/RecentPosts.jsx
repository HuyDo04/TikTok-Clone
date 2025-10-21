"use client"

import Link from "next/link"
import { getRecentPosts } from "../../utils/mockData"

export default function RecentPosts() {
  const posts = getRecentPosts(3)

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Bài đăng gần đây</h3>
        <Link href="/posts" className="text-pink-500 hover:text-pink-600 text-sm font-medium">
          Xem tất cả →
        </Link>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="relative w-24 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={post.thumbnail || "/placeholder.svg"}
                alt={post.caption}
                className="w-full h-full object-cover"
              />
              {post.type === "video" && (
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                  {post.duration}
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 line-clamp-2 mb-2">{post.caption}</p>
              <p className="text-xs text-gray-500 mb-3">{post.date}</p>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <span>👁</span> {post.views.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <span>❤️</span> {post.likes.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <span>💬</span> {post.comments.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  post.privacy === "public"
                    ? "bg-green-100 text-green-700"
                    : post.privacy === "friends"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                }`}
              >
                {post.privacy === "public" ? "Công khai" : post.privacy === "friends" ? "Bạn bè" : "Chỉ mình tôi"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

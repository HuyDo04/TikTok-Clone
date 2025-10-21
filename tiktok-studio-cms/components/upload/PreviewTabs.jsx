"use client"

import { useState } from "react"

export default function PreviewTabs({ files, caption }) {
  const [activeTab, setActiveTab] = useState("feed")

  const tabs = [
    { id: "feed", label: "Bảng tin" },
    { id: "profile", label: "Hồ sơ" },
    { id: "web", label: "Web/TV" },
  ]

  const currentFile = files[0]

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
      <div className="flex border-b border-gray-200 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id ? "text-pink-500 border-b-2 border-pink-500" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-black rounded-lg overflow-hidden" style={{ aspectRatio: "9/16" }}>
        {currentFile ? (
          <div className="relative w-full h-full">
            {currentFile.type === "video" ? (
              <video src={currentFile.url} className="w-full h-full object-cover" controls />
            ) : (
              <img src={currentFile.url || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
            )}

            {caption && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <p className="text-white text-sm line-clamp-3">{caption}</p>
              </div>
            )}

            <div className="absolute right-4 bottom-20 flex flex-col gap-4">
              <button className="w-12 h-12 bg-gray-800 bg-opacity-50 rounded-full flex items-center justify-center text-white">
                ❤️
              </button>
              <button className="w-12 h-12 bg-gray-800 bg-opacity-50 rounded-full flex items-center justify-center text-white">
                💬
              </button>
              <button className="w-12 h-12 bg-gray-800 bg-opacity-50 rounded-full flex items-center justify-center text-white">
                🔖
              </button>
              <button className="w-12 h-12 bg-gray-800 bg-opacity-50 rounded-full flex items-center justify-center text-white">
                ↗️
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <p className="text-sm">Chưa có nội dung</p>
          </div>
        )}
      </div>
    </div>
  )
}

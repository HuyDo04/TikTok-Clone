"use client"

import { useState } from "react"
import classNames from "classnames/bind"
import styles from "./SearchPage.module.scss"
import SearchTabs from "../SearchTabs/SearchTabs"
import UserCard from "../UserCard/UserCard"
import VideoGrid from "../VideoGrid/VideoGrid"
import SearchSuggestions from "../SearchSuggestions/SearchSuggestions"

const cx = classNames.bind(styles)

function SearchPage() {
  const [activeTab, setActiveTab] = useState("users")

  // Mock data - tìm kiếm chính xác (người dùng)
  const exactMatchUser = {
    id: 1,
    username: "cadoanvinhson",
    displayName: "Ca Đoàn Vĩnh Sơn",
    followers: "1586",
    bio: 'CA ĐOÀN VĨNH SƠN - GX.ĐỈNH QUÂN "Hát là cầu nguyện hai lần"',
    avatar: "/user-avatar-portrait.jpg",
    isVerified: false,
    videos: [
      { id: 1, thumbnail: "/music-video-1.jpg", title: "Video 1" },
      { id: 2, thumbnail: "/music-video-2.jpg", title: "Video 2" },
      { id: 3, thumbnail: "/music-video-3.jpg", title: "Video 3" },
      { id: 4, thumbnail: "/music-video-4.jpg", title: "Video 4" },
      { id: 5, thumbnail: "/music-video-5.jpg", title: "Video 5" },
    ],
  }

  // Mock data - tìm kiếm không chính xác (videos)
  const relatedVideos = [
    {
      id: 1,
      thumbnail: "/trending-video-1.jpg",
      title: "Tôi đã tìm được hương dẫn là...",
      creator: "user99422...",
      creatorAvatar: "/creator-avatar-1.jpg",
      likes: "4890",
      timeAgo: "1 ngày trước",
    },
    {
      id: 2,
      thumbnail: "/trending-video-2.jpg",
      title: "Trend AI tuyệt rời mùa đông...",
      creator: "ttmusic1209",
      creatorAvatar: "/creator-avatar-2.jpg",
      likes: "49.2K",
      timeAgo: "1 ngày trước",
    },
    {
      id: 3,
      thumbnail: "/trending-video-3.jpg",
      title: "Gửi hình du trend AI tuyệt rời...",
      creator: "hoangvinhhh",
      creatorAvatar: "/creator-avatar-3.jpg",
      likes: "20.7K",
      timeAgo: "6 giờ trước",
      isVerified: true,
    },
    {
      id: 4,
      thumbnail: "/trending-video-4.jpg",
      title: "Trend AI tuyệt rời mùa đông...",
      creator: "musicpro",
      creatorAvatar: "/creator-avatar-4.jpg",
      likes: "32.1K",
      timeAgo: "2 ngày trước",
    },
    {
      id: 5,
      thumbnail: "/trending-video-5.jpg",
      title: "Tôi đã tìm được hương dẫn...",
      creator: "videostar",
      creatorAvatar: "/placeholder.svg?height=30&width=30",
      likes: "15.8K",
      timeAgo: "3 ngày trước",
    },
    {
      id: 6,
      thumbnail: "/placeholder.svg?height=240&width=135",
      title: "Gữi hình du trend AI tuyệt rời...",
      creator: "creator123",
      creatorAvatar: "/placeholder.svg?height=30&width=30",
      likes: "28.5K",
      timeAgo: "1 tuần trước",
    },
  ]

  const searchSuggestions = [
    "ca sĩ CCMK",
    "MC Sơn Lâm",
    "Video Về Buối Casting Của Vi...",
    "Con Trai Tập Đoàn Sơn Hà Là Ai",
    "đoàn thế vĩnh",
    "Đặng Văn Sơn",
    "Ca Sĩ Mà Thái Sơn",
    "nguyễn nam sơn",
    "Thái Sơn Hát",
    "kinh dịch hội cần vi sơn",
  ]

  return (
    <div className={cx("search-page")}>
      <div className={cx("search-container")}>
        {/* Main Content */}
        <div className={cx("main-content")}>
          {/* Tabs Navigation */}
          <SearchTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Content based on active tab */}
          {activeTab === "users" && (
            <div className={cx("users-section")}>
              {/* Exact Match User Card */}
              <UserCard user={exactMatchUser} />

              {/* Section Divider */}
              <div className={cx("section-divider")}>
                <h3 className={cx("section-title")}>Video</h3>
              </div>

              {/* User's Videos Grid */}
              <VideoGrid videos={exactMatchUser.videos} isUserVideos={true} />
            </div>
          )}

          {activeTab === "videos" && <VideoGrid videos={relatedVideos} />}

          {activeTab === "live" && (
            <div className={cx("empty-state")}>
              <p>Không có nội dung LIVE tại thời điểm này</p>
            </div>
          )}
        </div>

        {/* Right Sidebar - Search Suggestions */}
        <SearchSuggestions suggestions={searchSuggestions} />
      </div>
    </div>
  )
}

export default SearchPage

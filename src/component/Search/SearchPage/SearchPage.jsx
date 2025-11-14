"use client"
import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import classNames from "classnames/bind"
import styles from "./SearchPage.module.scss"
import SearchTabs from "../SearchTabs/SearchTabs"
import UserCard from "../UserCard/UserCard"
import VideoGrid from "../VideoGrid/VideoGrid"
import SearchSuggestions from "../SearchSuggestions/SearchSuggestions"
import VideoDetailModal from "../VideoDetailModal/VideoDetailModal"
import { search } from "@/services/search.service"

const cx = classNames.bind(styles)
const URL = import.meta.env.VITE_BASE_URL_ME

function SearchPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("q")
  const [activeTab, setActiveTab] = useState("users")
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentVideoList, setCurrentVideoList] = useState([])
  const [foundUser, setFoundUser] = useState(null)
  const [userVideos, setUserVideos] = useState([])

  useEffect(() => {
    // Reset state khi query thay đổi
    setActiveTab("users")
    setFoundUser(null)
    setUserVideos([])

    const fetchSearchResults = async () => {
      if (!query) return
      try {
        const response = await search(query)
        if (response.users && response.users.length > 0) {
          setFoundUser(response.users[0])
        } else {
          setFoundUser(null)
        }
        if (response.posts && response.posts.length > 0) {
          setUserVideos(response.posts.map(post => ({
            id: post.id,
            // Xóa '/public' khỏi đường dẫn để hiển thị đúng
            thumbnail: post.featuredImage ? `${URL}/${post.featuredImage.replace('public/', '')}` : '/placeholder.jpg',
            title: post.content,
            likes: post.likesCount,
            timeAgo: new Date(post.createdAt).toLocaleDateString(), // Adjust as needed
            videoUrl: post.media ? `${URL}/${JSON.parse(post.media)[0]?.url.replace('public/', '')}` : '/placeholder-video.mp4',
            creator: {
              name: post.author.username,
              avatar: post.author.avatar? `${URL}/${post.author.avatar.replace('public/', '')}`: '/placeholder-user.jpg',
            },
            isVerified: false, // Assuming no verification status in post API
          })))
        } else {
          setUserVideos([])
        }
      } catch (error) {
        console.error("Error fetching search results:", error)
        setFoundUser(null)
        setUserVideos([])
      }
    }

    fetchSearchResults()
  }, [query])

  const handleVideoClick = (video, videoList) => {
    const fullVideoData = videoList.find(v => v.id === video.id);
    if (fullVideoData) {
      setSelectedVideo(fullVideoData);
      setCurrentVideoList(videoList);
      setIsModalOpen(true);
    } else {
      setSelectedVideo(video);
      setCurrentVideoList(videoList);
      setIsModalOpen(true);
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedVideo(null)
    setCurrentVideoList([])
  }

  const handleNextVideo = () => {
    if (!selectedVideo || currentVideoList.length === 0) return;
    const currentIndex = currentVideoList.findIndex(v => v.id === selectedVideo.id);
    if (currentIndex < currentVideoList.length - 1) {
      const nextVideo = currentVideoList[currentIndex + 1];
      setSelectedVideo(nextVideo);
    } else {
      console.log("Đã đến video cuối cùng.");
    }
  };

  const handlePrevVideo = () => {
    if (!selectedVideo || currentVideoList.length === 0) return;
    const currentIndex = currentVideoList.findIndex(v => v.id === selectedVideo.id);
    if (currentIndex > 0) {
      const prevVideo = currentVideoList[currentIndex - 1];
      setSelectedVideo(prevVideo);
    } else {
      console.log("Đang ở video đầu tiên.");
    }
  };

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
        <div className={cx("main-content", "scrollable-area")}>
          {/* Tabs Navigation */}
          <SearchTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Content based on active tab */}
          {activeTab === "users" && (
            <div className={cx("users-section")}>
              {foundUser && <UserCard user={foundUser} />}

              {foundUser && userVideos.length > 0 && (
                <>
                  <div className={cx("section-divider")}>
                    <h3 className={cx("section-title")}>Video</h3>
                  </div>
                  <VideoGrid videos={userVideos} isUserVideos={true} onVideoClick={(video) => handleVideoClick(video, userVideos)} />
                </>
              )}

              {foundUser && userVideos.length === 0 && (
                <div className={cx("empty-state")}>
                  <p>Người dùng chưa có bài đăng nào</p>
                </div>
              )}

              {!foundUser && (
                <div className={cx("empty-state")}>
                  <p>Không tìm thấy người dùng nào với từ khóa "{query}"</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "videos" && (
            <div className={cx("empty-state")}>
              <p>Chức năng tìm kiếm video đang được phát triển.</p>
            </div>
          )}

          {activeTab === "live" && (
            <div className={cx("empty-state")}>
              <p>Không có nội dung LIVE tại thời điểm này</p>
            </div>
          )}
        </div>

        {/* Right Sidebar - Có thể bạn cũng quan tâm */}
        <SearchSuggestions suggestions={searchSuggestions} />
      </div>

      {/* Video Detail Modal */}
      <VideoDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        video={selectedVideo}
        onNextVideo={handleNextVideo}
        onPrevVideo={handlePrevVideo}
      />
    </div>
  )
}

export default SearchPage

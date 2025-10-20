"use client"

import { useState, useRef, useEffect } from "react"
import VideoPlayer from "../VideoPlayer/VideoPlayer"
import styles from "./VideoFeed.module.scss"

const mockVideos = [
  {
    id: 1,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    author: {
      username: "hoangdung.music",
      avatar: "https://blob.v0.app/pjtmy8OGJ.png",
      verified: true,
    },
    description: "Hát hết verse là cũng hết hơi #HoangDung",
    music: "MỘT NGÀY NÀO ĐÓ ver của anh Den",
    stats: {
      likes: 4868,
      comments: 37,
      bookmarks: 130,
      shares: 300,
    },
  },
  {
    id: 2,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    author: {
      username: "user_example",
      avatar: "https://blob.v0.app/pjtmy8OGJ.png",
      verified: false,
    },
    description: "Video thứ 2 #trending",
    music: "Nhạc nền trending",
    stats: {
      likes: 2500,
      comments: 45,
      bookmarks: 89,
      shares: 150,
    },
  },
  {
    id: 3,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    author: {
      username: "creator_demo",
      avatar: "https://blob.v0.app/pjtmy8OGJ.png",
      verified: true,
    },
    description: "Demo video #3 🔥",
    music: "Original sound",
    stats: {
      likes: 3200,
      comments: 52,
      bookmarks: 95,
      shares: 220,
    },
  },
]

export default function VideoFeed() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [videos] = useState(mockVideos)
  const containerRef = useRef(null)

  const handleNext = () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        handleNext()
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        handlePrev()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentIndex])

  return (
    <div className={styles.videoFeed} ref={containerRef}>
      <div className={styles.videoContainer} style={{ transform: `translateY(-${currentIndex * 100}vh)` }}>
        {videos.map((video, index) => (
          <div key={video.id} className={styles.videoWrapper}>
            <VideoPlayer video={video} isActive={index === currentIndex} />
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className={styles.navigation}>
        {currentIndex > 0 && (
          <button className={`${styles.navButton} ${styles.prevButton}`} onClick={handlePrev} aria-label="Video trước">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 15L12 9L6 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        {currentIndex < videos.length - 1 && (
          <button
            className={`${styles.navButton} ${styles.nextButton}`}
            onClick={handleNext}
            aria-label="Video tiếp theo"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

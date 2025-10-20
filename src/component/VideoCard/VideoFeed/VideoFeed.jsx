/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useState, useRef, useEffect } from "react"
import VideoPlayer from "../VideoPlayer/VideoPlayer"
import VideoActions from "../VideoActions/VideoActions"
import styles from "./VideoFeed.module.scss"
import classNames from "classnames/bind"

const cx = classNames.bind(styles)

const mockVideos = [
  {
    id: 1,
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    author: {
      username: "hoangdung.music",
      avatar: "https://picsum.photos/200",
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
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    author: {
      username: "user_example",
      avatar: "https://picsum.photos/200",
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
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    author: {
      username: "creator_demo",
      avatar: "https://picsum.photos/200",
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
  const [commentVideoId, setCommentVideoId] = useState(null)
  const [videos] = useState(mockVideos)
  const feedRef = useRef(null)

  const toggleComments = (videoId) => {
    if (commentVideoId === videoId) {
      setCommentVideoId(null)
    } else {
      setCommentVideoId(videoId)
    }
  }

  const scrollTimeout = useRef(null)
  const handleScroll = () => {
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
    scrollTimeout.current = setTimeout(() => {
      if (feedRef.current) {
        const { scrollTop, clientHeight } = feedRef.current
        const newIndex = Math.round(scrollTop / clientHeight)
        if (newIndex !== currentIndex) {
          setCurrentIndex(newIndex)
          if (commentVideoId) {
            setCommentVideoId(videos[newIndex].id)
          }
        }
      }
    }, 150)
  }

  const scrollToVideo = (index) => {
    if (feedRef.current) {
      feedRef.current.scrollTo({
        top: index * feedRef.current.clientHeight,
        behavior: "smooth",
      })
    }
  }

  const handleNext = () => {
    if (currentIndex < videos.length - 1) scrollToVideo(currentIndex + 1)
  }

  const handlePrev = () => {
    if (currentIndex > 0) scrollToVideo(currentIndex - 1)
  }

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

  const isCommentOpen = !!commentVideoId

  return (
    <div
      className={cx("videoFeed", { "comments-open": isCommentOpen })}
      ref={feedRef}
      onScroll={handleScroll}
    >
      <div className={cx("videoFeedInner")}>
        {videos.map((video, index) => (
          <div key={video.id} className={cx("videoWrapper")}>
            <VideoPlayer
              video={video}
              isActive={index === currentIndex}
              isCommentOpen={commentVideoId === video.id}
              setCommentVideoId={setCommentVideoId}
            />
            <VideoActions
              video={video}
              onToggleComments={() => toggleComments(video.id)}
            />
          </div>
        ))}

        <div className={cx("navigation", { "comments-open": isCommentOpen })}>
          {currentIndex > 0 && (
            <button
              className={cx("navButton", "prevButton")}
              onClick={handlePrev}
              aria-label="Video trước"
            >
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
              className={cx("navButton", "nextButton")}
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
    </div>
  )
}

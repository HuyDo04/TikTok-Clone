/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import VideoPlayer from "../VideoPlayer/VideoPlayer"
import VideoActions from "../VideoActions/VideoActions"
import styles from "./VideoFeed.module.scss"
import classNames from "classnames/bind"
import { useVideo } from "@/context/VideoContext" // Import useVideo
import { getFeedPosts } from "@/services/post.service"
import { useSelector } from "react-redux"
import { useInView } from "react-intersection-observer"

const cx = classNames.bind(styles)

const PAGE_LIMIT = 10; // Tải 3 video mỗi lần

export default function VideoFeed() {
  const { autoScroll } = useVideo() // Get autoScroll from context
  const currentUser = useSelector((state) => state.auth.currentUser)
  const { ref: lastVideoRef, inView: isLastVideoInView } = useInView({ threshold: 0.5 });

  // State quản lý video feed
  const [videos, setVideos] = useState([])
  const [page, setPage] = useState(1)
  const [seenPostIds, setSeenPostIds] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  // State quản lý UI
  const [currentIndex, setCurrentIndex] = useState(0)
  const [commentVideoId, setCommentVideoId] = useState(null)
  const feedRef = useRef(null)

  // Hàm gọi API để lấy video
  const fetchVideos = useCallback(async (currentPage) => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const newVideos = await getFeedPosts({
        page: currentPage,
        limit: PAGE_LIMIT,
        body: { excludedPostIds: seenPostIds },
      });
      
      if (newVideos && newVideos.length > 0) {
        // Xử lý dữ liệu media trước khi set state
        const processedVideos = newVideos.map(video => {
          try {
            // Nếu media là một chuỗi JSON, parse nó thành mảng
            const mediaData = typeof video.media === 'string' ? JSON.parse(video.media) : video.media;
            return { ...video, media: mediaData };
          } catch (e) {
            console.error("Failed to parse media for video ID:", video.id, e);
            return { ...video, media: [] }; // Trả về mảng rỗng nếu parse lỗi
          }
        });
        setVideos(prev => [...prev, ...processedVideos]);
        const newSeenIds = newVideos.map(v => v.id);
        setSeenPostIds(prev => [...prev, ...newSeenIds]);
        setPage(currentPage + 1);
      } else {
        setHasMore(false); // Không còn video để tải
      }
    } catch (error) {
      console.error("Failed to fetch videos:", error);
      // Có thể hiển thị thông báo lỗi cho người dùng
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, seenPostIds]);

  // Tải video lần đầu hoặc khi người dùng đăng nhập/đăng xuất
  useEffect(() => {
    // Reset lại toàn bộ state khi trạng thái đăng nhập thay đổi
    setVideos([]);
    setSeenPostIds([]);
    setPage(1);
    setHasMore(true);
    setCurrentIndex(0);
    fetchVideos(1);
  }, [currentUser]); // Phụ thuộc vào currentUser

  // Infinite scroll: Tải thêm khi video gần cuối xuất hiện
  useEffect(() => {
    // Chỉ tải thêm khi video gần cuối trong tầm nhìn và không phải lần tải đầu tiên
    if (isLastVideoInView && videos.length > 0 && hasMore && !loading) {
      fetchVideos(page);
    }
  }, [isLastVideoInView, fetchVideos, page, videos.length, hasMore, loading]);

  const toggleComments = (videoId) => {
    setCommentVideoId(prevId => (prevId === videoId ? null : videoId));
  }

  const scrollTimeout = useRef(null)
  const handleScroll = () => {
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      if (feedRef.current) {
        const { scrollTop, clientHeight } = feedRef.current;
        const newIndex = Math.round(scrollTop / clientHeight);
        if (newIndex !== currentIndex) {
          setCurrentIndex(newIndex);
          if (commentVideoId) {
            setCommentVideoId(videos[newIndex]?.id);
          }
        }
      }
    }, 150);
  }

  const scrollToVideo = useCallback((index) => {
    if (feedRef.current) {
      feedRef.current.scrollTo({
        top: index * feedRef.current.clientHeight,
        behavior: "smooth",
      });
    }
  }, []);

  const handleNext = useCallback(() => {
    if (currentIndex < videos.length - 1) {
      scrollToVideo(currentIndex + 1);
    }
  }, [currentIndex, videos.length, scrollToVideo]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      scrollToVideo(currentIndex - 1);
    }
  }, [currentIndex, scrollToVideo]);

  // New handler for video ending
  const handleVideoEnded = () => {
    if (autoScroll && currentIndex < videos.length - 1) {
      handleNext();
    }
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        handlePrev();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  const isCommentOpen = !!commentVideoId

  return (
    <div
      className={cx("videoFeed", { "comments-open": isCommentOpen })}
      ref={feedRef}
      onScroll={handleScroll}
    >
      <div className={cx("videoFeedInner")}>
        {videos.map((video, index) => {
          // Gán ref cho video gần cuối để kích hoạt infinite scroll
          const isSecondToLast = index === videos.length - 2;
          return (
            <div 
              key={`${video.id}-${index}`} 
              className={cx("videoWrapper")}
              ref={isSecondToLast ? lastVideoRef : null}
            >
              <VideoPlayer
                video={video}
                isActive={index === currentIndex}
                isCommentOpen={commentVideoId === video.id}
                setCommentVideoId={setCommentVideoId}
                onEnded={handleVideoEnded} // Pass the new handler
              />
              <VideoActions
                video={video}
                onToggleComments={() => toggleComments(video.id)}
              />
            </div>
          );
        })}

        {loading && <div className={cx('loader')}>Đang tải thêm video...</div>}
        {!hasMore && videos.length > 0 && <div className={cx('end-message')}>Bạn đã xem hết video!</div>}

        <div className={cx("navigation", { "comments-open": isCommentOpen })}>
          <button
            className={cx("navButton", "prevButton")}
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Video trước"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" className={cx("icon-fill")}>
              <path
                d="M18 15L12 9L6 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            className={cx("navButton", "nextButton")}
            onClick={handleNext}
            disabled={currentIndex >= videos.length - 1}
            aria-label="Video tiếp theo"
  
          >
            <svg  width="24" height="24" viewBox="0 0 24 24" className={cx("icon-fill")}>
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
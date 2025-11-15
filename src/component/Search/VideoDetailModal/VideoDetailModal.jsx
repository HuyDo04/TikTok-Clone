"use client"

import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames/bind";
import styles from "./VideoDetailModal.module.scss";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import CreatorCard from "../CreatorCard/CreatorCard";
import EngagementStats from "../EngagementStats/EngagementStats";
import CommentsSection from "../CommentsSection/CommentsSection";
import { X, Search, ChevronUp, ChevronDown } from "lucide-react";

const cx = classNames.bind(styles);

export default function VideoDetailModal({ video, isOpen, onClose, onNextVideo, onPrevVideo }) {
  // Effect để quản lý việc khóa cuộn của body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // Hàm dọn dẹp để đảm bảo cuộn được khôi phục khi component bị unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]); // Chỉ phụ thuộc vào `isOpen`

  useEffect(() => {
    // Chỉ thêm/xóa listener khi modal được mở
    if (!isOpen) {
      return;
    }

    const handleWheel = (e) => {
      // Ngăn chặn scroll mặc định của trang
      e.preventDefault();
      if (e.deltaY > 0) {
        // Cuộn xuống -> video tiếp theo
        onNextVideo();
      } else if (e.deltaY < 0) {
        // Cuộn lên -> video trước đó
        onPrevVideo();
      }
    };

    // DOM element chỉ tồn tại khi modal mở, nên querySelector phải nằm trong effect này
    const playerSideElement = document.querySelector(`.${cx("playerSide")}`);
    if (playerSideElement) {
      // Chỉ thêm event listener vào khu vực video player
      playerSideElement.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      // Dọn dẹp listener khi effect chạy lại hoặc component unmount
      if (playerSideElement) { 
        playerSideElement.removeEventListener("wheel", handleWheel);
      }
    };
  }, [isOpen, onNextVideo, onPrevVideo]); // Thêm lại isOpen để effect chạy đúng lúc

  const handleCopyLink = () => {
    const url = `https://www.tiktok.com/@${video.creator}/video/`;
    navigator.clipboard.writeText(url);
    alert("Copied to clipboard!");
  };
  // Bây giờ mới kiểm tra điều kiện để return sớm
  if (!isOpen || !video) {
    return null;
  }

  // Xác định trạng thái đang tải dữ liệu. Nếu video có rồi nhưng chưa có videoUrl, coi như đang tải.
  const isLoading = !video.videoUrl;

  // JSX modal
  const modalContent = (
    <div className={cx("modal")}>
      

      <div className={cx("content")}>
      
        <div className={cx("playerSide")}>
        <div className={cx("header")}>
        <button className={cx("closeBtn")} onClick={onClose} aria-label="Close video">
          <X size={24} />
        </button>

        <div className={cx("searchBar")}>
          <Search size={16} />
          <input type="text" placeholder={isLoading ? "Đang tải..." : video.title} readOnly className={cx("searchInput")} />
        </div>

        <button className={cx("moreBtn")} aria-label="More options">
          ⋯
        </button>
      </div>
          <VideoPlayer
            key={video.id} 
            videoUrl={video.videoUrl || "/placeholder-video.mp4"}
            onNextVideo={onNextVideo}
            onPrevVideo={onPrevVideo}
            autoPlay={!isLoading} // Chỉ tự động phát khi đã có videoUrl
          />
          <div className={cx("watermark")}>MỦA ĐÔNG NĂM NĂY</div>
          {/* Nút điều hướng */}
          <div className={cx("navButtons")}>
            <button className={cx("navBtn", "prevBtn")} onClick={onPrevVideo} aria-label="Previous video">
              <ChevronUp size={32} />
            </button>
            <button className={cx("navBtn", "nextBtn")} onClick={onNextVideo} aria-label="Next video">
              <ChevronDown size={32} />
            </button>
          </div>
        </div>

        <div className={cx("infoSide")}>
          {isLoading ? (
            // Giao diện chờ (Skeleton)
            <div>Đang tải thông tin video...</div>
          ) : (
            // Giao diện khi đã có dữ liệu
            <>
              {/* Creator Card */}
              <CreatorCard creator={video.creator} />

              {/* Video Title and Tags */}
              <div className={cx("videoInfo")}>
                <h3 className={cx("videoTitle")}>{video.title}</h3>
                <p className={cx("tags")}>
                  {video.tags?.map((tag) => (
                    <a key={tag} href={`#tag-${tag}`} className={cx("tag")}>
                      #{tag}
                    </a>
                  ))}
                </p>
              </div>

              {/* Music Info */}
              <div className={cx("musicInfo")}>
                <span className={cx("musicIcon")}>♫</span>
                <span className={cx("musicText")}>{video.music || "Nhạc nền - Original Sound"}</span>
              </div>
                  
              {/* Engagement Stats */}
              <EngagementStats
                postId={video.id}
                likesCount={video.likesCount}
                comments={video.commentCount}
                bookmarks={video.repostCount}
                isLiked={video.isLiked}
                isBookmarked={video.isReposted} // API dùng isReposted cho bookmark
                onCopyLink={handleCopyLink}
              />

              {/* Comments Section */}
              {/* Component này tự fetch comment dựa trên videoId */}
              <CommentsSection videoId={video.id} />
            </>
          )}
        </div>
      </div>
    </div>
  );

  // Render modal ra ngoài document.body để nổi trên sidebar
  return ReactDOM.createPortal(modalContent, document.body);
}

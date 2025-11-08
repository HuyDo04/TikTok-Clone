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
          <input type="text" placeholder={video.title} readOnly className={cx("searchInput")} />
        </div>

        <button className={cx("moreBtn")} aria-label="More options">
          ⋯
        </button>
      </div>
          <VideoPlayer
            key={video.id} // Thêm key để re-mount component khi video thay đổi
            videoUrl={video.videoUrl || "/placeholder-video.mp4"}
            onNextVideo={onNextVideo}
            onPrevVideo={onPrevVideo}
            autoPlay={true} // Bật tự động phát
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
            likes={video.likes}
            comments={video.comments}
            bookmarks={video.bookmarks}
            shares={video.shares}
            onCopyLink={handleCopyLink}
          />

          {/* Comments Section */}
          <CommentsSection comments={video.videoComments} videoId={video.id} />
        </div>
      </div>
    </div>
  );

  // Render modal ra ngoài document.body để nổi trên sidebar
  return ReactDOM.createPortal(modalContent, document.body);
}

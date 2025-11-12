"use client";

import { useState, useRef, useEffect } from "react";
import classNames from "classnames/bind";
import VideoActions from "../VideoActions/VideoActions";
import VideoInfo from "../VideoInfo/VideoInfo";
import VolumeControl from "../VolumeControl/VolumeControl";
import VideoProgress from "../VideoProgress/VideoProgress";
import OptionsMenu from "../OptionsMenu/OptionsMenu";
import CommentModal from "../CommentModal/CommentModal";
import { incrementPostView } from "@/services/post.service";
import { getGlobalAudioMuteState, updateGlobalAudioMuteState, addGlobalAudioMuteListener } from "@/utils/audioState";
import styles from "./VideoPlayer.module.scss";

const cx = classNames.bind(styles);

export default function VideoPlayer({
  video,
  isActive,
  isCommentOpen,
  setCommentVideoId,
  onEnded
}) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(true);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [viewCounted, setViewCounted] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Sync global mute state
  useEffect(() => {
    setIsMuted(getGlobalAudioMuteState());
    const cleanup = addGlobalAudioMuteListener(setIsMuted);
    return cleanup;
  }, []);

  // Play/pause when active changes
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    videoEl.muted = isMuted;

    if (isActive) {
      videoEl.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      videoEl.pause();
      setIsPlaying(false);
    }
  }, [isActive, isMuted]);

  // Increment view after 3s
  useEffect(() => {
    if (isActive && isPlaying && !viewCounted) {
      const timer = setTimeout(() => {
        incrementPostView(video.id)
          .then(() => setViewCounted(true))
          .catch(console.error);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isActive, isPlaying, viewCounted, video.id]);

  const togglePlay = () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (isPlaying) videoEl.pause();
    else videoEl.play().catch(console.warn);

    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (videoRef.current) videoRef.current.volume = newVolume;
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (videoRef.current) videoRef.current.muted = newMuted;
    updateGlobalAudioMuteState(newMuted);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  const handleSeek = (time) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVideoEndedInternal = () => {
    if (onEnded) onEnded();
  };

  const getCorrectedUrl = (pathFromApi) => {
    if (!pathFromApi) return "";
    // Xóa "public/" nếu có
    const cleanedPath = pathFromApi.replace(/^public\//, "");
    // Loại bỏ dấu "/" thừa ở đầu
    const normalizedPath = cleanedPath.replace(/^\/+/, "");
    // Trả về URL đầy đủ
    return `${import.meta.env.VITE_BASE_URL_ME}/${normalizedPath}`;
  };
  

  const thumbnailUrl =
    video.media && video.media.length > 0 && video.media[0].thumbnail
      ? getCorrectedUrl(video.media[0].thumbnail)
      : "";

  return (
    <div className={cx("videoPlayer")}>
  {video.media?.some(item => item.type === "video") ? (
    <video
      ref={videoRef}
      className={cx("video")}
      loop
      playsInline
      muted={isMuted}
      onTimeUpdate={handleTimeUpdate}
      onLoadedMetadata={handleLoadedMetadata}
      onClick={togglePlay}
      onEnded={handleVideoEndedInternal}
      crossOrigin="anonymous"
      poster={thumbnailUrl}
    >
      {video.media
        .filter(item => item.type === "video")
        .map((item, idx) => (
          <source
            key={idx}
            src={getCorrectedUrl(item.url)}
            type={`video/${item.url.split(".").pop()}`}
          />
        ))}
      Trình duyệt của bạn không hỗ trợ thẻ video.
    </video>
  ) : video.featuredImage ? (
    <img
      src={getCorrectedUrl(video.featuredImage)}
      alt={video.slug}
      className={cx("videoImage")}
    />
  ) : null}

  {/* Top controls */}
  <div className={cx("topControls")}>
    <div
      className={cx("volumeContainer")}
      onMouseEnter={() => setShowVolumeControl(true)}
      onMouseLeave={() => setShowVolumeControl(false)}
    >
      <button className={cx("volumeButton")} onClick={toggleMute}>
        {isMuted || volume === 0 ? (
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M16.5 12C16.5 10.23 15.48 8.71 14 7.97V10.18L16.45 12.63C16.48 12.43 16.5 12.22 16.5 12ZM19 12C19 12.94 18.8 13.82 18.46 14.64L19.97 16.15C20.63 14.91 21 13.5 21 12C21 7.72 18 4.14 14 3.23V5.29C16.89 6.15 19 8.83 19 12ZM4.27 3L3 4.27L7.73 9H3V15H7L12 20V13.27L16.25 17.52C15.58 18.04 14.83 18.45 14 18.7V20.76C15.38 19.86 16.63 19.81 17.69 18.95L19.73 21L21 19.73L12 10.73L4.27 3ZM12 4L9.91 6.09L12 8.18V4Z" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M3 9V15H7L12 20V4L7 9H3ZM16.5 12C16.5 10.23 15.48 8.71 14 7.97V16.02C15.48 15.29 16.5 13.77 16.5 12ZM14 3.23V5.29C16.89 6.15 19 8.83 19 12C19 15.17 16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12C21 7.72 18.01 4.14 14 3.23Z" />
          </svg>
        )}
      </button>
      {showVolumeControl && (
        <div className={cx("volumeSliderContainer")}>
          <VolumeControl volume={volume} onChange={handleVolumeChange} />
        </div>
      )}
    </div>

    <button className={cx("optionsButton")} onClick={() => setShowOptions(!showOptions)}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
        <circle cx="12" cy="5" r="2" />
        <circle cx="12" cy="12" r="2" />
        <circle cx="12" cy="19" r="2" />
      </svg>
    </button>
  </div>

  {showOptions && <OptionsMenu onClose={() => setShowOptions(false)} />}

  <VideoInfo video={video} />

  {video.media?.some(item => item.type === "video") && (
    <VideoProgress currentTime={currentTime} duration={duration} onSeek={handleSeek} />
  )}

  {isCommentOpen && <CommentModal video={video} onClose={() => setCommentVideoId(null)} />}
</div>
  );
}

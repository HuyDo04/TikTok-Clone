"use client"

import { useState, useRef, useEffect } from "react"
import classNames from "classnames/bind"
import VideoActions from "../VideoActions/VideoActions"
import VideoInfo from "../VideoInfo/VideoInfo"
import VolumeControl from "../VolumeControl/VolumeControl"
import VideoProgress from "../VideoProgress/VideoProgress"
import OptionsMenu from "../OptionsMenu/OptionsMenu"
import styles from "./VideoPlayer.module.scss"

const cx = classNames.bind(styles)

export default function VideoPlayer({ video, isActive }) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [showVolumeControl, setShowVolumeControl] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  // Auto play/pause based on isActive
  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch((err) => {
          console.log("[v0] Autoplay prevented:", err)
          setIsPlaying(false)
        })
        setIsPlaying(true)
      } else {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }
  }, [isActive])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play().catch((err) => {
          console.log("[v0] Play error:", err)
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
    }
    if (newVolume === 0) {
      setIsMuted(true)
    } else {
      setIsMuted(false)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted
      setIsMuted(newMutedState)
      videoRef.current.muted = newMutedState
      if (newMutedState) {
        setVolume(0)
      } else {
        setVolume(videoRef.current.volume || 1)
      }
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
      console.log("[v0] Video loaded:", video.videoUrl)
    }
  }

  const handleVideoError = (e) => {
    console.log("[v0] Video error:", e.target.error)
  }

  const handleSeek = (time) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  return (
    <div className={cx("videoPlayer")}>
      {/* Video element */}
      <video
        ref={videoRef}
        className={cx("video")}
        src={video.videoUrl}
        loop
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onError={handleVideoError}
        onClick={togglePlay}
        crossOrigin="anonymous"
      />

      {/* Top controls */}
      <div className={cx("topControls")}>
        <button
          className={cx("volumeButton")}
          onClick={toggleMute}
          onMouseEnter={() => setShowVolumeControl(true)}
          onMouseLeave={() => setShowVolumeControl(false)}
        >
          {isMuted || volume === 0 ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M16.5 12C16.5 10.23 15.48 8.71 14 7.97V10.18L16.45 12.63C16.48 12.43 16.5 12.22 16.5 12ZM19 12C19 12.94 18.8 13.82 18.46 14.64L19.97 16.15C20.63 14.91 21 13.5 21 12C21 7.72 18 4.14 14 3.23V5.29C16.89 6.15 19 8.83 19 12ZM4.27 3L3 4.27L7.73 9H3V15H7L12 20V13.27L16.25 17.52C15.58 18.04 14.83 18.45 14 18.7V20.76C15.38 19.86 16.63 19.81 17.69 18.95L19.73 21L21 19.73L12 10.73L4.27 3ZM12 4L9.91 6.09L12 8.18V4Z" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M3 9V15H7L12 20V4L7 9H3ZM16.5 12C16.5 10.23 15.48 8.71 14 7.97V16.02C15.48 15.29 16.5 13.77 16.5 12ZM14 3.23V5.29C16.89 6.15 19 8.83 19 12C19 15.17 16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12C21 7.72 18.01 4.14 14 3.23Z" />
            </svg>
          )}
        </button>

        <button className={cx("optionsButton")} onClick={() => setShowOptions(!showOptions)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <circle cx="12" cy="5" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="19" r="2" />
          </svg>
        </button>
      </div>

      {/* Volume control overlay */}
      {showVolumeControl && (
        <div
          className={cx("volumeControlWrapper")}
          onMouseEnter={() => setShowVolumeControl(true)}
          onMouseLeave={() => setShowVolumeControl(false)}
        >
          <VolumeControl volume={volume} onChange={handleVolumeChange} />
        </div>
      )}

      {/* Options menu */}
      {showOptions && <OptionsMenu onClose={() => setShowOptions(false)} />}

      {/* Video info */}
      <VideoInfo video={video} />

      {/* Progress bar */}
      <VideoProgress currentTime={currentTime} duration={duration} onSeek={handleSeek} />

      {/* Action buttons */}
      <VideoActions video={video} />
    </div>
  )
}

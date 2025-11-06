"use client"

import { useRef, useState } from "react"
import classNames from "classnames/bind"
import styles from "./VideoPlayer.module.scss"
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, ChevronUp, ChevronDown } from "lucide-react"

const cx = classNames.bind(styles)

export default function VideoPlayer({ videoUrl, onNextVideo, onPrevVideo }) {
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [showControls, setShowControls] = useState(true)
  const controlsTimeoutRef = useRef(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (e) => {
    const value = Number.parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.volume = value
      setVolume(value)
      if (value > 0) setIsMuted(false)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleDurationChange = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleProgressChange = (e) => {
    const value = Number.parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.currentTime = value
      setCurrentTime(value)
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }
  }

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return (
    <div
      ref={containerRef}
      className={cx("playerContainer")}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        className={cx("video")}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleDurationChange}
      />

      {!isPlaying && (
        <button className={cx("playOverlay")} onClick={togglePlay} aria-label="Play video">
          <Play className={cx("playIcon")} />
        </button>
      )}

      <button className={cx("navArrow", "navArrowUp")} onClick={onPrevVideo} aria-label="Previous video">
        <ChevronUp />
      </button>
      <button className={cx("navArrow", "navArrowDown")} onClick={onNextVideo} aria-label="Next video">
        <ChevronDown />
      </button>

      <div className={cx("controls", { visible: showControls || !isPlaying })}>
        <div className={cx("progressContainer")}>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleProgressChange}
            className={cx("progressBar")}
            aria-label="Video progress"
          />
        </div>

        <div className={cx("controlsBottom")}>
          <div className={cx("leftControls")}>
            <button onClick={togglePlay} className={cx("controlBtn")} aria-label={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>

            <div className={cx("volumeControl")}>
              <button onClick={toggleMute} className={cx("controlBtn")} aria-label={isMuted ? "Unmute" : "Mute"}>
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className={cx("volumeSlider")}
                aria-label="Volume"
              />
            </div>

            <span className={cx("timeDisplay")}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className={cx("rightControls")}>
            <button
              onClick={toggleFullscreen}
              className={cx("controlBtn")}
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

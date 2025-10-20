"use client"

import { useState, useRef } from "react"
import classNames from "classnames/bind"
import styles from "./VideoProgress.module.scss"

const cx = classNames.bind(styles)

export default function VideoProgress({ currentTime, duration, onSeek }) {
  const [isDragging, setIsDragging] = useState(false)
  const [hoverTime, setHoverTime] = useState(null)
  const progressRef = useRef(null)

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handleMouseDown = (e) => {
    setIsDragging(true)
    handleSeek(e)
  }

  const handleMouseMove = (e) => {
    const rect = progressRef.current.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width
    const time = Math.max(0, Math.min(duration, pos * duration))
    setHoverTime(time)
    if (isDragging) handleSeek(e)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setHoverTime(null)
  }

  const handleSeek = (e) => {
    const rect = progressRef.current.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width
    const time = Math.max(0, Math.min(duration, pos * duration))
    onSeek(time)
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0
  const hoverPos = hoverTime ? (hoverTime / duration) * 100 : null

  return (
    <div className={cx("videoProgressWrapper")}>
      <div
        ref={progressRef}
        className={cx("videoProgress", { dragging: isDragging })}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className={cx("progressBar")}>
          <div className={cx("progressFill")} style={{ width: `${progress}%` }} />
          <div className={cx("progressThumb")} style={{ left: `${progress}%` }} />
        </div>

        {hoverTime !== null && (
          <div
            className={cx("progressTooltip")}
            style={{ left: `${hoverPos}%` }}
          >
            {formatTime(hoverTime)}
          </div>
        )}
      </div>

      <div className={cx("timeDisplay")}>
        <span>{formatTime(currentTime)}</span>
        <span>/</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  )
}

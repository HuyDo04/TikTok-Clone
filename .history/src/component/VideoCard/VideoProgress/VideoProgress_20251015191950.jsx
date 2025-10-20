"use client"

import { useState } from "react"
import styles from "./VideoProgress.module.css"

export default function VideoProgress({ currentTime, duration, onSeek }) {
  const [isDragging, setIsDragging] = useState(false)

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
    if (isDragging) {
      handleSeek(e)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width
    const time = pos * duration
    onSeek(time)
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div
      className={styles.videoProgress}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        <div className={styles.progressThumb} style={{ left: `${progress}%` }} />
      </div>
      <div className={styles.timeDisplay}>
        <span>{formatTime(currentTime)}</span>
        <span>/</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  )
}

"use client"

import styles from "./VolumeControl.module.scss"

export default function VolumeControl({ volume, onChange }) {
  const handleChange = (e) => {
    onChange(Number.parseFloat(e.target.value))
  }

  return (
    <div className={styles.volumeControl}>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleChange}
        className={styles.slider}
        orient="vertical"
      />
      <div className={styles.volumeBar}>
        <div className={styles.volumeFill} style={{ height: `${volume * 100}%` }} />
      </div>
    </div>
  )
}

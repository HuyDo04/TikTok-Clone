"use client"

import classNames from "classnames/bind"
import styles from "./VolumeControl.module.scss"

const cx = classNames.bind(styles)

export default function VolumeControl({ volume, onChange }) {
  const handleChange = (e) => {
    onChange(Number.parseFloat(e.target.value))
  }

  return (
    <div className={cx("volumeControl")}>
      <div className={cx("sliderWrapper")}>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleChange}
          className={cx("slider")}
        />
        <div className={cx("volumeFill")} style={{ width: `${volume * 100}%` }} />
      </div>
    </div>
  )
}
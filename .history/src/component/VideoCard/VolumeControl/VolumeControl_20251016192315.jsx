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
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleChange}
        className={cx("slider")}
        orient="vertical"
      />
      <div className={cx("volumeBar")}>
        <div className={cx("volumeFill")} style={{ height: `${volume * 100}%` }} />
      </div>
    </div>
  )
}

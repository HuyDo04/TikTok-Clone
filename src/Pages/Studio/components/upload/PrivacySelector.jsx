"use client"

import classNames from "classnames/bind"
import styles from "./PrivacySelector.module.scss"

const cx = classNames.bind(styles)

export default function PrivacySelector({ value, onChange }) {
  const options = [
    { value: "public", label: "Công khai", description: "Mọi người" },
    { value: "friends", label: "Bạn bè", description: "Chỉ bạn bè của bạn" },
    { value: "private", label: "Riêng tư", description: "Chỉ mình tôi" },
  ]

  return (
    <div>
      <label className={cx("label")}>Ai có thể xem video này</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cx("select")}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label} - {option.description}
          </option>
        ))}
      </select>
    </div>
  )
}

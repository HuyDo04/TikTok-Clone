'use client'

import { useState } from "react"
import classNames from "classnames/bind"
import styles from "./DateFilterModal.module.scss"

const cx = classNames.bind(styles)

export default function DateFilterModal({ onClose, onApply }) {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const handleApply = () => {
    if (startDate && endDate) {
      onApply(startDate, endDate)
    }
  }

  return (
    <div className={cx("overlay")}>
      <div className={cx("modal")}>
        <h3 className={cx("title")}>Chọn khoảng thời gian</h3>

        <div className={cx("inputs")}>
          <div>
            <label className={cx("label")}>Ngày bắt đầu</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={cx("input")}
            />
          </div>

          <div>
            <label className={cx("label")}>Ngày kết thúc</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={cx("input")}
            />
          </div>
        </div>

        <div className={cx("buttons")}>
          <button onClick={onClose} className={cx("button", "cancel")}>
            Hủy
          </button>
          <button
            onClick={handleApply}
            disabled={!startDate || !endDate}
            className={cx("button", "apply")}
          >
            Áp dụng
          </button>
        </div>
      </div>
    </div>
  )
}

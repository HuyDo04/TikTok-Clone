"use client"

import classNames from "classnames/bind"
import styles from "./CaptionInput.module.scss"

const cx = classNames.bind(styles)

export default function CaptionInput({ value, onChange }) {
  const maxLength = 4000

  return (
    <div>
      <label className={cx("label")}>Chú thích</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Chia sẻ thêm về video của bạn tại đây"
        maxLength={maxLength}
        rows={4}
        className={cx("textarea")}
      />
      <div className={cx("footer")}>
        <div className={cx("helperButtons")}>
          <button>
            <span>#</span> Hashtag
          </button>
          <button>
            <span>♪</span> Nhạc nền
          </button>
        </div>
        <span className={cx("charCounter")}>
          {value.length}/{maxLength}
        </span>
      </div>
    </div>
  )
}

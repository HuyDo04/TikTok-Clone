"use client"

import classNames from "classnames/bind"
import styles from "./CoverImageSelector.module.scss"

const cx = classNames.bind(styles)

export default function CoverImageSelector({ files, selected, onSelect }) {
  return (
    <div className={cx("container")}>
      {files.map((file, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={cx("coverButton", { selected: selected === index })}
        >
          {file.type === "video" ? (
            <video src={file.url} className={cx("media")} />
          ) : (
            <img src={file.url || "/placeholder.svg"} alt="" className={cx("media")} />
          )}
          {selected === index && (
            <div className={cx("selectedOverlay")}>
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </button>
      ))}
      <button className={cx("editButton")}>
        <span>Sửa ảnh bìa</span>
      </button>
    </div>
  )
}

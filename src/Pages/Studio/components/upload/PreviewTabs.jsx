"use client"

import { useState } from "react"
import classNames from "classnames/bind"
import styles from "./PreviewTabs.module.scss"

const cx = classNames.bind(styles)

export default function PreviewTabs({ files, caption }) {
  const [activeTab, setActiveTab] = useState("feed")

  const tabs = [
    { id: "feed", label: "Bảng tin" },
    { id: "profile", label: "Hồ sơ" },
    { id: "web", label: "Web/TV" },
  ]

  const currentFile = files[0]

  return (
    <div className={cx("previewTabsContainer")}>
      <div className={cx("tabNavigation")}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cx("tabButton", { active: activeTab === tab.id })}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={cx("previewArea")}>
        {currentFile ? (
          <div className={cx("mediaWrapper")}>
            {currentFile.type === "video" ? (
              <video src={currentFile.url} className={cx("media")} controls />
            ) : (
              <img src={currentFile.url || "/placeholder.svg"} alt="" className={cx("media")} />
            )}

            {caption && (
              <div className={cx("captionOverlay")}>
                <p>{caption}</p>
              </div>
            )}

            <div className={cx("actionButtons")}>
              <button>❤️</button>
              <button>💬</button>
              <button>🔖</button>
              <button>↗️</button>
            </div>
          </div>
        ) : (
          <div className={cx("emptyState")}>
            <p>Chưa có nội dung</p>
          </div>
        )}
      </div>
    </div>
  )
}

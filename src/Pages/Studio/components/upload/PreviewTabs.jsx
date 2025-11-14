"use client"

import { useState } from "react"
import { formatImageUrl } from "@/utils/urlUtils"
import classNames from "classnames/bind"
import styles from "./PreviewTabs.module.scss"
import HeartIcon from "@/component/Icons/HeartIcon"
import CommentIcon from "@/component/Icons/CommentIcon"
import BookmarkIcon from "@/component/Icons/BookmarkIcon"
import ShareIcon from "@/component/Icons/ShareIcon"

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
              <video src={formatImageUrl(currentFile.url)} className={cx("media")} controls />
            ) : (
              <img src={formatImageUrl(currentFile.url) || "/placeholder.svg"} alt="" className={cx("media")} />
            )}

            {caption && (
              <div className={cx("captionOverlay")}>
                <p>{caption}</p>
              </div>
            )}

            <div className={cx("actionButtons")}>
              <HeartIcon />
              <CommentIcon />
              <BookmarkIcon />
              <ShareIcon />
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

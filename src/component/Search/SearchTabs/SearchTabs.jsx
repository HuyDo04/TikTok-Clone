"use client"
import classNames from "classnames/bind"
import styles from "./SearchTabs.module.scss"

const cx = classNames.bind(styles)

function SearchTabs({ activeTab, onTabChange }) {
  const tabs = [
    { id: "top", label: "Top" },
    { id: "users", label: "Người dùng" },
    { id: "videos", label: "Video" },
    { id: "live", label: "LIVE" },
  ]

  return (
    <div className={cx("tabs-container")}>
      <nav className={cx("tabs-nav")} role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={cx("tab", { active: activeTab === tab.id })}
            onClick={() => onTabChange(tab.id)}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
          >
            <span className={cx("tab-label")}>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

export default SearchTabs

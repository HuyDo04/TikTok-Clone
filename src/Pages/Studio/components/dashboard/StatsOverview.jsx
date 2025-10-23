'use client'

import { useState } from "react"
import classNames from "classnames/bind"
import DateFilterModal from "./DateFilterModal"
import { getStatsForPeriod } from "../../utils/mockData"
import styles from "./StatsOverview.module.scss"

const cx = classNames.bind(styles)

export default function StatsOverview({ dateFilter, onDateFilterChange }) {
  const [showDateModal, setShowDateModal] = useState(false)
  const stats = getStatsForPeriod(dateFilter)

  const filterOptions = [
    { value: "7", label: "7 ngày gần nhất" },
    { value: "28", label: "28 ngày gần nhất" },
    { value: "60", label: "60 ngày gần nhất" },
    { value: "custom", label: "Tùy chỉnh" },
  ]

  const handleFilterChange = (value) => {
    if (value === "custom") {
      setShowDateModal(true)
    } else {
      onDateFilterChange(value)
    }
  }

  const statCards = [
    { label: "Lượt xem video", value: stats.views, change: stats.viewsChange },
    { label: "Lượt xem hồ sơ", value: stats.profileViews, change: stats.profileViewsChange },
    { label: "Lượt thích", value: stats.likes, change: stats.likesChange },
    { label: "Bình luận", value: stats.comments, change: stats.commentsChange },
    { label: "Lượt chia sẻ", value: stats.shares, change: stats.sharesChange },
  ]

  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("header")}>
          <h2 className={cx("title")}>Số liệu chính</h2>
          <select
            value={dateFilter}
            onChange={(e) => handleFilterChange(e.target.value)}
            className={cx("dateSelect")}
          >
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className={cx("statsGrid")}>
          {statCards.map((stat, index) => (
            <div key={index} className={cx("statCard")}>
              <p className={cx("statLabel")}>{stat.label}</p>
              <p className={cx("statValue")}>{stat.value.toLocaleString()}</p>
              <p className={cx("statChange", { positive: stat.change >= 0, negative: stat.change < 0 })}>
                {stat.change >= 0 ? "+" : ""}
                {stat.change}%
              </p>
            </div>
          ))}
        </div>
      </div>

      {showDateModal && (
        <DateFilterModal
          onClose={() => setShowDateModal(false)}
          onApply={(startDate, endDate) => {
            onDateFilterChange(`custom-${startDate}-${endDate}`)
            setShowDateModal(false)
          }}
        />
      )}
    </>
  )
}

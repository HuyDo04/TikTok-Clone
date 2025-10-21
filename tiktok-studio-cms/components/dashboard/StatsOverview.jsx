"use client"

import { useState } from "react"
import DateFilterModal from "./DateFilterModal"
import { getStatsForPeriod } from "../../utils/mockData"

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
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Số liệu chính</h2>
          <select
            value={dateFilter}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {statCards.map((stat, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value.toLocaleString()}</p>
              <p className={`text-sm mt-1 ${stat.change >= 0 ? "text-green-600" : "text-red-600"}`}>
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

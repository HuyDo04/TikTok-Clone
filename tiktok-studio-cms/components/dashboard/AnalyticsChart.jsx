"use client"

import { getChartDataForPeriod } from "../../utils/mockData"

export default function AnalyticsChart({ dateFilter }) {
  const chartData = getChartDataForPeriod(dateFilter)
  const maxValue = Math.max(...chartData.map((d) => d.value))

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Lượt xem video theo thời gian</h3>

      <div className="relative h-64">
        <div className="absolute inset-0 flex items-end justify-between gap-2">
          {chartData.map((data, index) => {
            const height = (data.value / maxValue) * 100
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full relative group">
                  <div
                    className="w-full bg-pink-500 rounded-t transition-all hover:bg-pink-600"
                    style={{ height: `${height}%`, minHeight: "4px" }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {data.value.toLocaleString()}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-2">{data.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

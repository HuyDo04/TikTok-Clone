'use client'

import classNames from "classnames/bind"
import { getChartDataForPeriod } from "../../utils/mockData"
import styles from "./AnalyticsChart.module.scss"

const cx = classNames.bind(styles)

export default function AnalyticsChart({ dateFilter }) {
  const originalChartData = getChartDataForPeriod(dateFilter)
  const MAX_BARS = 15 // Max bars to display to avoid clutter

  let processedData = originalChartData

  // Group data if it exceeds the max number of bars
  if (originalChartData.length > MAX_BARS) {
    const groupSize = Math.ceil(originalChartData.length / MAX_BARS)
    const groupedData = []
    for (let i = 0; i < originalChartData.length; i += groupSize) {
      const group = originalChartData.slice(i, i + groupSize)
      const totalValue = group.reduce((sum, item) => sum + item.value, 0)

      // Create a combined label for the group
      const newLabel =
        group.length > 1
          ? `${group[0].label} - ${group[group.length - 1].label}`
          : group[0].label

      groupedData.push({
        label: newLabel,
        value: totalValue,
      })
    }
    processedData = groupedData
  }

  const chartData = processedData
  const maxValue = Math.max(...chartData.map((d) => d.value))

  return (
    <div className={cx("wrapper")}>
      <h3 className={cx("title")}>Lượt xem video theo thời gian</h3>

      <div className={cx("chartContainer")}>
        <div className={cx("chartGrid")}>
          {chartData.map((data, index) => {
            const height = maxValue > 0 ? (data.value / maxValue) * 100 : 0
            return (
              <div key={index} className={cx("barGroup")}>
                <div className={cx("barWrapper")}>
                  <div className={cx("bar")} style={{ height: `${height}%` }}>
                    <div className={cx("tooltip")}>{data.value.toLocaleString()}</div>
                  </div>
                </div>
                <p className={cx("label")}>{data.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

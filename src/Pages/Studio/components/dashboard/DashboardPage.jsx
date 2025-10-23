"use client"

import { useState } from "react"
import classNames from "classnames/bind"
import StatsOverview from "../dashboard/StatsOverview"
import AnalyticsChart from "../dashboard/AnalyticsChart"
import RecentPosts from "../dashboard/RecentPosts"
import TipsSection from "../dashboard/TipsSection"
import styles from "./DashboardPage.module.scss"

const cx = classNames.bind(styles)

export default function DashboardPage() {
  const [dateFilter, setDateFilter] = useState("7")

  return (
    <main className={cx("main")}>
      <div className={cx("container")}>
        <StatsOverview dateFilter={dateFilter} onDateFilterChange={setDateFilter} />
        <div className={cx("grid")}>
          <div className={cx("mainContent")}>
            <AnalyticsChart dateFilter={dateFilter} />
            <RecentPosts />
          </div>
          <div className={cx("sideContent")}>
            <TipsSection />
          </div>
        </div>
      </div>
    </main>
  )
}

"use client"

import { useState } from "react"
import Sidebar from "../components/layout/Sidebar"
import Header from "../components/layout/Header"
import StatsOverview from "../components/dashboard/StatsOverview"
import AnalyticsChart from "../components/dashboard/AnalyticsChart"
import RecentPosts from "../components/dashboard/RecentPosts"
import TipsSection from "../components/dashboard/TipsSection"

export default function DashboardPage() {
  const [dateFilter, setDateFilter] = useState("7")

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <StatsOverview dateFilter={dateFilter} onDateFilterChange={setDateFilter} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              <div className="lg:col-span-2">
                <AnalyticsChart dateFilter={dateFilter} />
                <RecentPosts />
              </div>
              <div>
                <TipsSection />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

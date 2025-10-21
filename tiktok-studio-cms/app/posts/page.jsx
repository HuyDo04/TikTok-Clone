"use client"

import { useState } from "react"
import Sidebar from "../../components/layout/Sidebar"
import Header from "../../components/layout/Header"
import PostsList from "../../components/posts/PostsList"
import PostsFilter from "../../components/posts/PostsFilter"

export default function PostsPage() {
  const [filters, setFilters] = useState({
    sortBy: "date",
    privacy: "all",
    status: "all",
  })

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Bài đăng</h1>
              <p className="text-gray-600 mt-1">Quản lý tất cả bài đăng của bạn</p>
            </div>
            <PostsFilter filters={filters} onFiltersChange={setFilters} />
            <PostsList filters={filters} />
          </div>
        </main>
      </div>
    </div>
  )
}

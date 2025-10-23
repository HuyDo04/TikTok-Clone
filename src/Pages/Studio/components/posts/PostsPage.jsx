"use client"

import { useState } from "react"
import classNames from "classnames/bind"
import PostsList from "./PostsList"
import PostsFilter from "./PostsFilter"
import styles from "./PostsPage.module.scss"

const cx = classNames.bind(styles)

export default function PostsPage() {
  const [filters, setFilters] = useState({
    sortBy: "date",
    privacy: "all",
    status: "all",
  })

  return (
    <main className={cx("mainContent")}>
      <div className={cx("container")}>
        <div className={cx("header")}>
          <h1 className={cx("title")}>Bài đăng</h1>
          <p className={cx("subtitle")}>Quản lý tất cả bài đăng của bạn</p>
        </div>
        <PostsFilter filters={filters} onFiltersChange={setFilters} />
        <PostsList filters={filters} />
      </div>
    </main>
  )
}

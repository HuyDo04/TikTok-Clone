"use client"

import { Outlet } from "react-router-dom"
import classNames from "classnames/bind"
import Sidebar from "./components/layout/Sidebar"
import Header from "./components/layout/Header"
import styles from "./index.module.scss"

const cx = classNames.bind(styles)

export default function StudioPage() {
  return (
    <div className={cx("studioPage")}>
      <Sidebar />
      <div className={cx("main")}>
        <Header />
        <div className={cx("content")}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

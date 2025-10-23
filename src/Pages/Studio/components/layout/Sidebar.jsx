'use client'

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import classNames from "classnames/bind"
import {
  HomeIcon,
  DocumentTextIcon,
  ChartBarIcon,
  ChatBubbleLeftIcon,
  MapPinIcon,
  AcademicCapIcon,
  MusicalNoteIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline"
import { FaSun, FaMoon, FaBars, FaPlus } from "react-icons/fa"
import { PanelLeftOpen, PanelRightOpen } from "lucide-react"
import { useTheme } from "@/context/ThemeContext"
import styles from "./Sidebar.module.scss"
import TiktokLogoDark from "@/component/Icons/TikTokIconDark"

const cx = classNames.bind(styles)

export default function Sidebar() {
  const { pathname } = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const menuItems = [
    { name: "Trang chủ", href: "/studio", icon: HomeIcon, section: "QUẢN LÝ" },
    { name: "Bài đăng", href: "/studio/posts", icon: DocumentTextIcon },
    { name: "Phân tích", href: "/studio/analytics", icon: ChartBarIcon },
    { name: "Bình luận", href: "/studio/comments", icon: ChatBubbleLeftIcon },
    { name: "Cẩm hồng", href: "/studio/inspiration", icon: MapPinIcon, section: "CÔNG CỤ" },
    { name: "Học viện nhà sáng tạo", href: "/studio/academy", icon: AcademicCapIcon },
    { name: "Âm thanh không giới hạn", href: "/studio/audio", icon: MusicalNoteIcon },
    { name: "Phản hồi", href: "/studio/feedback", icon: EnvelopeIcon, section: "KHÁC" },
  ]

  return (
    <aside className={cx("sidebar", { collapsed: isCollapsed }, "sidebar-hide-scrollbar")}>
     <div
        className={cx("sidebarHeader", {
          expanded: !isCollapsed,
          collapsed: isCollapsed,
        })}
      >
        <Link to="/studio" className={cx("logoLink")}>
          <div className={cx("logoIcon")}>
            {isCollapsed ? (
              <TiktokLogoDark />
            ) : (
              <img src="/logotiktokupload.png" alt="TikTok Studio Logo" />
            )}
          </div>
        </Link>

        <button
          onClick={toggleSidebar}
          className={cx("toggleButton", { collapsed: isCollapsed })}
          title={isCollapsed ? "Mở rộng Sidebar" : "Thu gọn Sidebar"}
        >
          {isCollapsed ? <FaBars /> : <FaBars />}
        </button>
      </div>



      <div className={cx("uploadSection", { collapsed: isCollapsed })}>
        <Link to="/studio/upload">
          <button className={cx("uploadButton")}>
            <FaPlus size={13}/>
            <span className={cx("uploadText")}>Tải lên</span>
          </button>
        </Link>
      </div>

      <nav className={cx("nav", "sidebar-hide-scrollbar")}>
        {menuItems.map((item, index) => {
          const showSection = item.section && (index === 0 || menuItems[index - 1].section !== item.section)
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <div key={item.href}>
              {showSection && !isCollapsed && (
                <div className={cx("sectionTitle")}>
                  <p>{item.section}</p>
                </div>
              )}
              <Link to={item.href}>
                <div
                  className={cx("navItem", { active: isActive, collapsed: isCollapsed })}
                  title={isCollapsed ? item.name : ""}
                >
                  <Icon />
                  {!isCollapsed && <span className={cx("navText")}>{item.name}</span>}
                </div>
              </Link>
            </div>
          )
        })}
      </nav>

      <div className={cx("footer")}>
        <button
          onClick={toggleTheme}
          className={cx("themeToggle", { collapsed: isCollapsed })}
          title={isCollapsed ? (theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode") : ""}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
          {!isCollapsed && (
            <span className={cx("themeText")}>
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </span>
          )}
        </button>
      </div>

      <div className={cx("backLinkContainer", { collapsed: isCollapsed })}>
        <Link to="/" className={cx("backLink")}>
          <span>←</span>
          Quay lại TikTok
        </Link>
      </div>
    </aside>
  )
}

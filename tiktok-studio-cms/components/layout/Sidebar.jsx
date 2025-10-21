"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
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

export default function Sidebar() {
  const pathname = usePathname()

  const menuItems = [
    { name: "Trang chủ", href: "/", icon: HomeIcon, section: "QUẢN LÝ" },
    { name: "Bài đăng", href: "/posts", icon: DocumentTextIcon },
    { name: "Phân tích", href: "/analytics", icon: ChartBarIcon },
    { name: "Bình luận", href: "/comments", icon: ChatBubbleLeftIcon },
    { name: "Cẩm hồng", href: "/inspiration", icon: MapPinIcon, section: "CÔNG CỤ" },
    { name: "Học viện nhà sáng tạo", href: "/academy", icon: AcademicCapIcon },
    { name: "Âm thanh không giới hạn", href: "/audio", icon: MusicalNoteIcon },
    { name: "Phản hồi", href: "/feedback", icon: EnvelopeIcon, section: "KHÁC" },
  ]

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">T</span>
          </div>
          <span className="font-bold text-xl">
            TikTok <span className="font-normal">Studio</span>
          </span>
        </Link>
      </div>

      <div className="p-4">
        <Link href="/upload">
          <button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
            <span className="text-xl">+</span>
            Tải lên
          </button>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto">
        {menuItems.map((item, index) => {
          const showSection = item.section && (index === 0 || menuItems[index - 1].section !== item.section)
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <div key={item.href}>
              {showSection && (
                <div className="px-4 pt-4 pb-2">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{item.section}</p>
                </div>
              )}
              <Link href={item.href}>
                <div
                  className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-colors ${
                    isActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </div>
              </Link>
            </div>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2">
          <span>←</span>
          Quay lại TikTok
        </Link>
      </div>
    </aside>
  )
}

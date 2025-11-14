"use client"

import { useState } from "react"
import classNames from "classnames/bind"
import styles from "./CreatorCard.module.scss"

const cx = classNames.bind(styles)
const DEFAULT_AVATAR = import.meta.env.VITE_DEFAULT_AVATAR;

export default function CreatorCard({ creator }) {
  const [isFollowing, setIsFollowing] = useState(false)

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
  }

  if (!creator) {
    return null; // Hoặc hiển thị một placeholder
  }

  return (
    <div className={cx("creatorCard")}>
      <div className={cx("creatorHeader")}>
        <img
          src={creator.avatar || `${DEFAULT_AVATAR}?height=48&width=48`}
          alt={creator.name}
          className={cx("avatar")}
        />

        <div className={cx("creatorInfo")}>
          <h4 className={cx("name")}>{creator.name}</h4>
          <p className={cx("category")}>{creator.category || "Nhà sáng tạo"}</p>
          <p className={cx("timestamp")}>{creator.timestamp}</p>
        </div>
      </div>

      <button className={cx("followBtn", { following: isFollowing })} onClick={handleFollow}>
        {isFollowing ? "Following" : "Follow"}
      </button>
    </div>
  )
}

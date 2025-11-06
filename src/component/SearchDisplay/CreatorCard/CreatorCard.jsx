"use client"

import { useState } from "react"
import classNames from "classnames/bind"
import styles from "./CreatorCard.module.scss"

const cx = classNames.bind(styles)

export default function CreatorCard({ creator }) {
  const [isFollowing, setIsFollowing] = useState(false)

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
  }

  return (
    <div className={cx("creatorCard")}>
      <div className={cx("creatorHeader")}>
        <img
          src={creator.avatar || "/placeholder.svg?height=48&width=48"}
          alt={creator.name}
          className={cx("avatar")}
        />

        <div className={cx("creatorInfo")}>
          <h4 className={cx("name")}>{creator.name}</h4>
          <p className={cx("category")}>{creator.category || "Creator"}</p>
          <p className={cx("timestamp")}>{creator.timestamp}</p>
        </div>
      </div>

      <button className={cx("followBtn", { following: isFollowing })} onClick={handleFollow}>
        {isFollowing ? "Following" : "Follow"}
      </button>
    </div>
  )
}

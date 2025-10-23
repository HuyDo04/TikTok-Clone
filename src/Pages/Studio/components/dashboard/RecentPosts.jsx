'use client'

import { Link } from "react-router-dom"
import classNames from "classnames/bind"
import { getRecentPosts } from "../../utils/mockData"
import styles from "./RecentPosts.module.scss"

const cx = classNames.bind(styles)

export default function RecentPosts() {
  const posts = getRecentPosts(3)

  const getPrivacyClass = (privacy) => {
    switch (privacy) {
      case "public":
        return "public"
      case "friends":
        return "friends"
      default:
        return "private"
    }
  }

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <h3 className={cx("title")}>Bài đăng gần đây</h3>
        <Link to="/studio/posts" className={cx("viewAllLink")}>
          Xem tất cả →
        </Link>
      </div>

      <div className={cx("postsList")}>
        {posts.map((post) => (
          <div key={post.id} className={cx("postCard")}>
            <div className={cx("thumbnail")}>
              <img src={post.thumbnail || "/placeholder.svg"} alt={post.caption} />
              {post.type === "video" && <div className={cx("duration")}>{post.duration}</div>}
            </div>

            <div className={cx("postInfo")}>
              <p className={cx("caption")}>{post.caption}</p>
              <p className={cx("date")}>{post.date}</p>

              <div className={cx("stats")}>
                <span className={cx("statItem")}>
                  <span>👁</span> {post.views.toLocaleString()}
                </span>
                <span className={cx("statItem")}>
                  <span>❤️</span> {post.likes.toLocaleString()}
                </span>
                <span className={cx("statItem")}>
                  <span>💬</span> {post.comments.toLocaleString()}
                </span>
              </div>
            </div>

            <div className={cx("privacyContainer")}>
              <span className={cx("privacyBadge", getPrivacyClass(post.privacy))}>
                {post.privacy === "public" ? "Công khai" : post.privacy === "friends" ? "Bạn bè" : "Chỉ mình tôi"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

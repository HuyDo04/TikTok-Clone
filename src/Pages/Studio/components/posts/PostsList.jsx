"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import classNames from "classnames/bind"
import { getAllPosts } from "../../utils/mockData"
import styles from "./PostsList.module.scss"

const cx = classNames.bind(styles)

export default function PostsList({ filters }) {
  const navigate = useNavigate()
  const [posts, setPosts] = useState(getAllPosts())

  const handleEdit = (postId) => {
    navigate(`/studio/posts/${postId}/edit`)
  }

  const handleDelete = (postId) => {
    if (confirm("Bạn có chắc chắn muốn xóa bài đăng này?")) {
      setPosts((prev) => prev.filter((p) => p.id !== postId))
    }
  }

  const filteredPosts = posts.filter((post) => {
    if (filters.privacy !== "all" && post.privacy !== filters.privacy) return false
    return true
  })

  return (
    <div className={cx("postsListContainer")}>
      <div className={cx("tableWrapper")}>
        <table className={cx("table")}>
          <thead className={cx("tableHead")}>
            <tr>
              <th>Nội dung</th>
              <th>Quyền riêng tư</th>
              <th>Lượt xem</th>
              <th>Lượt thích</th>
              <th>Bình luận</th>
              <th>Chia sẻ</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody className={cx("tableBody")}>
            {filteredPosts.map((post) => (
              <tr key={post.id}>
                <td className={cx("contentCell")}>
                  <div className={cx("contentWrapper")}>
                    <div className={cx("thumbnailWrapper")}>
                      <img src={post.thumbnail || "/placeholder.svg"} alt="" />
                      {post.type === "video" && (
                        <div className={cx("durationOverlay")}>{post.duration}</div>
                      )}
                    </div>
                    <div className={cx("textWrapper")}>
                      <p>{post.caption}</p>
                      <p>{post.date}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <span
                    className={cx("privacyBadge", {
                      public: post.privacy === "public",
                      friends: post.privacy === "friends",
                      private: post.privacy === "private",
                    })}
                  >
                    {post.privacy === "public" ? "Công khai" : post.privacy === "friends" ? "Bạn bè" : "Riêng tư"}
                  </span>
                </td>
                <td>{post.views.toLocaleString()}</td>
                <td>{post.likes.toLocaleString()}</td>
                <td>{post.comments.toLocaleString()}</td>
                <td>{post.shares.toLocaleString()}</td>
                <td className={cx("actionsCell")}>
                  <div className={cx("actionsWrapper")}>
                    <button onClick={() => handleEdit(post.id)} title="Chỉnh sửa">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button title="Phân tích">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </button>
                    <button onClick={() => handleDelete(post.id)} className={cx("deleteButton")} title="Xóa">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                    <button title="Thêm">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredPosts.length === 0 && (
        <div className={cx("emptyState")}>
          <p>Không có bài đăng nào</p>
        </div>
      )}
    </div>
  )
}

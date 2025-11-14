"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import classNames from "classnames/bind"
import * as postService from "../../../../services/post.service"
import styles from "./PostsList.module.scss"
const URL = import.meta.env.VITE_BASE_URL_ME
const cx = classNames.bind(styles)

export default function PostsList({ filters }) {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const currentUser = useSelector((state) => state.auth.currentUser)

  useEffect(() => {
    const fetchPosts = async () => {
      if (!currentUser?.username) return
      setLoading(true)
      try {
        const userPosts = await postService.getUserVideosByUsername(currentUser.username)
        setPosts(userPosts || [])
      } catch (error) {
        console.error("Failed to fetch posts:", error)
        setPosts([])
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [currentUser])

  const handleEdit = (postId) => {
    navigate(`/studio/posts/${postId}/edit`)
  }

  const handleDelete = async (postId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài đăng này?")) {
      try {
        await postService.deletePost(postId)
        setPosts((prev) => prev.filter((p) => p.id !== postId))
      } catch (error) {
        console.error("Failed to delete post:", error)
      }
    }
  }

  if (loading) {
    return (
      <div className={cx("loadingState")}>
        <p>Đang tải bài đăng...</p>
      </div>
    )
  }

  const filteredPosts = posts.filter((post) => {
    if (filters.privacy !== "all" && post.privacy !== filters.privacy) return false
    return true
  })

  if (!loading && filteredPosts.length === 0) {
    return (
      <div className={cx("emptyState")}>
        <p>Không có bài đăng nào</p>
      </div>
    )
  }

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
                      <img src={post.featuredImage ? `${URL}/${post.featuredImage}` : "/placeholder.svg"} alt={post.content} />
                      {post.type === "video" && (
                        <div className={cx("durationOverlay")}>{post.duration}</div>
                      )}
                    </div>
                    <div className={cx("textWrapper")}>
                      <p>{post.content}</p>
                      <p>{post.date}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <span
                    className={cx("privacyBadge", {
                      public: post.visibility === "public",
                      friends: post.visibility === "friends",
                      private: post.visibility === "private",
                    })}
                  >
                    {post.visibility === "public" ? "Công khai" : post.visibility === "friends" ? "Bạn bè" : "Riêng tư"}
                  </span>
                </td>
                <td>{post.viewCount?.toLocaleString() || 0}</td>
                <td>{post.likesCount?.toLocaleString() || 0}</td>
                <td>{post.commentsCount?.toLocaleString() || 0}</td>
                <td>{post.sharesCount?.toLocaleString() || 0}</td>
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
    </div>
  )
}

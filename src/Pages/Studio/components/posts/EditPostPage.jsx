"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import * as postService from "../../../../services/post.service"
import classNames from "classnames/bind"
import EditPostForm from "./EditPostForm"
import styles from "./EditPostPage.module.scss"

const cx = classNames.bind(styles)

export default function EditPostPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await postService.getPostById(id)
        setPost(postData)
      } catch (error) {
        console.error("Failed to fetch post:", error)
        navigate("/studio/posts") // Điều hướng về trang danh sách nếu không tìm thấy bài đăng
      }
    }

    fetchPost()
  }, [id, navigate])

  if (!post) {
    return (
      <main className={cx("loadingContainer")}>
        <div className={cx("loadingContent")}>
          <div className={cx("spinner")}></div>
          <p className={cx("loadingText")}>Đang tải...</p>
        </div>
      </main>
    )
  }

  return (
    <main className={cx("mainContent")}>
      <div className={cx("container")}>
        <EditPostForm post={post} />
      </div>
    </main>
  )
}

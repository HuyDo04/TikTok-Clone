"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import classNames from "classnames/bind"
import EditPostForm from "./EditPostForm"
import { getPostById } from "../../utils/mockData"
import styles from "./EditPostPage.module.scss"

const cx = classNames.bind(styles)

export default function EditPostPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)

  useEffect(() => {
    const postData = getPostById(id)
    if (postData) {
      setPost(postData)
    } else {
      navigate("/studio/posts")
    }
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

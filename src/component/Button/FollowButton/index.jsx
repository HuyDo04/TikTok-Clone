import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import classNames from "classnames/bind"
import styles from "./FollowButton.module.scss"
import { checkStatus, followUser, unfollowUser } from "@/services/user.service"

const cx = classNames.bind(styles)

const STATUS_TEXT = {
  Follow: "Follow",
  Following: "Following",
  Friends: "Bạn bè",
  Blocked: "Bị chặn",
}

function FollowButton({ userId }) {
  const [status, setStatus] = useState("")
  const [loading, setLoading] = useState(true)

  const currentUser = useSelector((state) => state.auth.currentUser)
   // Lấy người dùng từ Redux store
  const navigate = useNavigate()

  const fetchStatus = useCallback(async () => {
    const currentUserId = currentUser?.id;
    // Không fetch status nếu chưa đăng nhập hoặc không có userId
    if (!currentUserId || !userId) {
      setStatus("Follow")
      setLoading(false)
      return
    }

    setLoading(true)

    try {
      const response = await checkStatus(userId)
      setStatus(response.status)
    } catch (error) {
      console.error("Error fetching follow status:", error)
      setStatus("Follow") // Mặc định là 'Follow' nếu có lỗi
    } finally {
      setLoading(false)
    }
  }, [userId, currentUser?.id]) // Chỉ phụ thuộc vào ID của currentUser

  useEffect(() => {
    fetchStatus()
  }, [fetchStatus])

  const handleClick = async () => {
    // Nếu chưa đăng nhập, chuyển hướng đến trang login
    if (!currentUser) {
      navigate("/login")
      return
    }

    if (loading || status === "Blocked") return
    setLoading(true)

    try {
      if (status === "Follow") {
        await followUser(userId)
        // Sau khi follow, API checkStatus sẽ trả về 'Following' hoặc 'Friends'
        await fetchStatus()
      } else if (status === "Following" || status === "Friends") {
        await unfollowUser(userId)
        setStatus("Follow") // Sau khi unfollow, trạng thái luôn là 'Follow'
      }
    } catch (error) {
      console.error(`Error performing action for status ${status}:`, error)
      // Nếu có lỗi, fetch lại trạng thái để đảm bảo tính đúng đắn
      await fetchStatus()
    } finally {
      setLoading(false)
    }
  }

  const buttonText = STATUS_TEXT[status] || "Follow"
  const isFollowing = status === "Following" || status === "Friends"

  return (
    <button
      className={cx("follow-button", {
        "is-following": isFollowing,
        "is-blocked": status === "Blocked",
      })}
      onClick={handleClick}
      disabled={loading || status === "Blocked"}
    >
      {loading ? "..." : buttonText}
    </button>
  )
}

export default FollowButton
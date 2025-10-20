"use client"

import styles from "./ShareModal.module.scss"

const shareOptions = [
  { id: "repost", icon: "🔄", label: "Đăng lại" },
  { id: "copy", icon: "🔗", label: "Copy" },
  { id: "whatsapp", icon: "💬", label: "WhatsApp" },
  { id: "embed", icon: "</>", label: "Nhúng" },
  { id: "facebook", icon: "📘", label: "Facebook" },
  { id: "twitter", icon: "🐦", label: "Twitter" },
]

const suggestedUsers = [
  { id: 1, username: "HD", avatar: "/abstract-geometric-shapes.png" },
  { id: 2, username: "ngocanh_2823", avatar: "/abstract-user-icon.png" },
  { id: 3, username: "Hùng Phạm", avatar: "/diverse-group-brainstorming.png" },
  { id: 4, username: "Ca Đoàn Vinh Sơn", avatar: "/diverse-group-working.png" },
  { id: 5, username: "t_0An_", avatar: "/abstract-geometric-shapes.png" },
]

export default function ShareModal({ video, onClose }) {
  const handleShare = (optionId) => {
    console.log("Sharing via:", optionId)
    // Implement share logic here
  }

  const handleShareToUser = (userId) => {
    console.log("Sharing to user:", userId)
    // Implement share to user logic here
  }

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.shareModal}>
        <div className={styles.header}>
          <h3>Chia sẻ đến</h3>
          <button className={styles.closeButton} onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
            </svg>
          </button>
        </div>

        <div className={styles.searchBar}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5S13.09 5 9.5 5 5 5.91 5 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          <input type="text" placeholder="Tìm kiếm" />
        </div>

        <div className={styles.suggestedUsers}>
          {suggestedUsers.map((user) => (
            <button key={user.id} className={styles.userButton} onClick={() => handleShareToUser(user.id)}>
              <img src={user.avatar || "/placeholder.svg"} alt={user.username} />
              <span>{user.username}</span>
            </button>
          ))}
        </div>

        <div className={styles.shareOptions}>
          {shareOptions.map((option) => (
            <button key={option.id} className={styles.shareOption} onClick={() => handleShare(option.id)}>
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>{option.icon}</span>
              </div>
              <span className={styles.label}>{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

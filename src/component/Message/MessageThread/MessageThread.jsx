import { useSelector } from "react-redux"
import classNames from "classnames/bind"
import styles from "./MessageThread.module.scss"

const cx = classNames.bind(styles)

function MessageThread({ messages }) {
  const currentUser = useSelector((state) => state.auth.currentUser)

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, "0")
    const minutes = String(date.getMinutes()).padStart(2, "0")
    return `${hours}:${minutes}`
  }

  const formatDate = (date) => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  // Group messages by date
  const groupMessagesByDate = (messages) => {
    const groups = {}
    if (Array.isArray(messages)) {
      messages.forEach((msg, index) => {
        if (!msg || !msg.createdAt) {
          console.warn(`Skipping invalid message at index ${index}:`, msg)
          return
        }
        const date = formatDate(new Date(msg.createdAt))
        if (!groups[date]) groups[date] = []
        groups[date].push(msg)
      })
    }
    return groups
  }

  const groupedMessages = groupMessagesByDate(messages)
  const sortedDates = Object.keys(groupedMessages).sort((a, b) => {
    const [dayA, monthA, yearA] = a.split("/").map(Number)
    const [dayB, monthB, yearB] = b.split("/").map(Number)
    const dateA = new Date(yearA, monthA - 1, dayA)
    const dateB = new Date(yearB, monthB - 1, dayB)
    return dateA - dateB
  })

  return (
    <div className={cx("root")}>
      {sortedDates.map((date) => {
        const dateMessages = groupedMessages[date]
        // Sort messages within the day
        dateMessages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

        return (
          <div key={date}>
            <div className={cx("date-divider")}>
              <span className={cx("date-text")}>{date}</span>
            </div>

            <div className={cx("messages")}>
              {dateMessages.map((message) => {
                const isOwn = message.senderId === currentUser?.id
                return (
                  <div
                    key={message.id}
                    className={cx("message-group", { own: isOwn })}
                  >
                    <div className={cx("message-wrapper")}>
                      {!isOwn && (
                        <img
                          src={message.sender?.avatar || "/placeholder.svg"}
                          alt={message.sender?.username || "User"}
                          className={cx("message-avatar")}
                        />
                      )}

                      <div className={cx("message-bubble-container")}>
                        <div className={cx("message-bubble", { own: isOwn })}>
                          {message.attachments && message.attachments.length > 0 ? (
                            <div className={cx("attachments")}>
                              {message.attachments.map((att, idx) => (
                                <img
                                  key={idx}
                                  src={att || "https://picsum.photos/200"}
                                  alt="Attachment"
                                  className={cx("attachment-image")}
                                />
                              ))}
                            </div>
                          ) : (
                            <p className={cx("message-text")}>{message.content}</p>
                          )}
                        </div>

                        <div className={cx("message-info")}>
                          <span className={cx("message-time")}>{formatTime(new Date(message.createdAt))}</span>
                          {isOwn && (
                            <span className={cx("message-read")}>
                              {message.read ? "✓✓" : "✓"}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default MessageThread

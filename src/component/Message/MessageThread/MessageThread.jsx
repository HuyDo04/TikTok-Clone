import classNames from "classnames/bind"
import styles from "./MessageThread.module.scss"

const cx = classNames.bind(styles)

function MessageThread({ messages }) {
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

  const groupMessagesByDate = (messages) => {
    const groups = {}
    messages.forEach((msg) => {
      const date = formatDate(new Date(msg.timestamp))
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(msg)
    })
    return groups
  }

  const groupedMessages = groupMessagesByDate(messages)

  return (
    <div className={cx("root")}>
      {Object.entries(groupedMessages).map(([date, dateMessages]) => (
        <div key={date}>
          <div className={cx("date-divider")}>
            <span className={cx("date-text")}>{date}</span>
          </div>
          <div className={cx("messages")}>
            {dateMessages.map((message, index) => (
              <div
                key={message.id}
                className={cx("message-group", {
                  own: message.sender === "current-user",
                })}
              >
                <div className={cx("message-wrapper")}>
                  {message.sender !== "current-user" && (
                    <img src={message.avatar || "https://picsum.photos/200"} alt="User" className={cx("message-avatar")} />
                  )}
                  <div className={cx("message-bubble-container")}>
                    <div
                      className={cx("message-bubble", {
                        own: message.sender === "current-user",
                      })}
                    >
                      {message.attachments && message.attachments.length > 0 ? (
                        <div className={cx("attachments")}>
                          {message.attachments.map((attachment, idx) => (
                            <img
                              key={idx}
                              src={attachment || "https://picsum.photos/200"}
                              alt="Attachment"
                              className={cx("attachment-image")}
                            />
                          ))}
                        </div>
                      ) : (
                        <p className={cx("message-text")}>{message.content}</p>
                      )}
                    </div>
                    {message.sender !== "current-user" && (
                      <span className={cx("message-time")}>{formatTime(new Date(message.timestamp))}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default MessageThread

"use client"

import { useState } from "react"
import classNames from "classnames/bind"
import styles from "./Messages.module.scss"
import MessagesList from "../MessagesList/MessagesList"
import MessageDetail from "../MessageDetail/MessageDetail"

const cx = classNames.bind(styles)

// Sample data
const SAMPLE_CONVERSATIONS = [
  {
    id: 1,
    name: "ngocanh_2823",
    username: "ngocanh_2823",
    avatar: "/diverse-avatars.png",
    preview: "Cái quán của ổ...",
    date: "4/11/2025",
    unread: 0,
    messages: [
      {
        id: 1,
        sender: "other-user",
        content: "Vãi",
        timestamp: new Date("2025-11-04T18:45:00"),
        avatar: "/diverse-avatars.png",
      },
      {
        id: 2,
        sender: "other-user",
        content: "Là aiii",
        timestamp: new Date("2025-11-04T19:43:00"),
        avatar: "/diverse-avatars.png",
      },
      {
        id: 3,
        sender: "other-user",
        content: "Cái quán của ông ca đoàn cầu hay sao nầy",
        timestamp: new Date("2025-11-04T19:43:00"),
        attachments: ["/cozy-italian-restaurant.png"],
        avatar: "/diverse-avatars.png",
      },
    ],
  },
  {
    id: 2,
    name: "Yêu cầu tin nhắn",
    username: "message-requests",
    avatar: "/diverse-avatars.png",
    preview: "Bạn nhận được 7 yêu cầu",
    date: "4/11/2025",
    unread: 4,
    messages: [],
  },
  {
    id: 3,
    name: "Dũng Phạm Billiards",
    username: "dungpham",
    avatar: "/diverse-avatars.png",
    preview: "🔥 17/10/2025",
    date: "17/10/2025",
    unread: 0,
    messages: [],
  },
  {
    id: 4,
    name: "Hùng Phạm",
    username: "hungpham",
    avatar: "/diverse-avatars.png",
    preview: "Loại tin nhắn nà... 11/8/2025",
    date: "11/8/2025",
    unread: 0,
    messages: [],
  },
  {
    id: 5,
    name: "Vũ T. Ngoc Lan",
    username: "ngoclan",
    avatar: "/diverse-avatars.png",
    preview: "Đã chia sẻ một ... 25/7/2025",
    date: "25/7/2025",
    unread: 0,
    messages: [],
  },
  {
    id: 6,
    name: "Ca Đoàn Vĩnh Sơn",
    username: "vinhdson",
    avatar: "/diverse-avatars.png",
    preview: "Đã chia sẻ một... 30/6/2025",
    date: "30/6/2025",
    unread: 0,
    messages: [],
  },
  {
    id: 7,
    name: "T_0An_",
    username: "toan",
    avatar: "/diverse-avatars.png",
    preview: "Loại tin nhắn n... 10/5/2025",
    date: "10/5/2025",
    unread: 0,
    messages: [],
  },
  {
    id: 8,
    name: "Khánh Real",
    username: "khanhreal",
    avatar: "/diverse-avatars.png",
    preview: "Loại tin nhắn nà... 7/5/2025",
    date: "7/5/2025",
    unread: 0,
    messages: [],
  },
]

function Messages() {
  const [selectedConversationId, setSelectedConversationId] = useState(1)

  const selectedConversation = SAMPLE_CONVERSATIONS.find((conv) => conv.id === selectedConversationId)

  const handleSelectConversation = (conversationId) => {
    setSelectedConversationId(conversationId)
  }

  const handleSendMessage = (message) => {
    console.log("Message sent:", message)
    // Handle message sending logic here
  }

  return (
    <div className={cx("root")}>
      <div className={cx("list-panel")}>
        <MessagesList
          conversations={SAMPLE_CONVERSATIONS}
          selectedConversationId={selectedConversationId}
          onSelectConversation={handleSelectConversation}
        />
      </div>

      <div className={cx("detail-panel")}>
        <MessageDetail conversation={selectedConversation} onSendMessage={handleSendMessage} />
      </div>
    </div>
  )
}

export default Messages

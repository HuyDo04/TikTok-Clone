
"use client"

import { useState, useEffect, useCallback} from "react"
import { useSelector, useDispatch } from "react-redux"
import classNames from "classnames/bind"
import styles from "./Messages.module.scss"
import MessagesList from "../MessagesList/MessagesList"
import MessageDetail from "../MessageDetail/MessageDetail"
import { getChats, getChatRequests, getMessages } from "@/services/chat.service"
import { markMessagesAsRead, setMessages } from "@/store/chatSlice"
import socketService from "@/utils/chat.socket"

const cx = classNames.bind(styles)

function Messages() {
  const [selectedConversationId, setSelectedConversationId] = useState(null)
  const [conversations, setConversations] = useState([])
  const [isSocketConnected, setIsSocketConnected] = useState(false)
  const [messageRequests, setMessageRequests] = useState([])
  const { messages, unreadCounts } = useSelector((state) => state.chat)
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.auth.currentUser)
  const token = useSelector((state) => state.auth.token) // Lấy token từ store
  
  const formatConversation = (chat) => {
    // currentUser ở đây sẽ luôn là giá trị mới nhất từ Redux store mỗi khi component re-render.
    if (!currentUser) return null; // Nếu không có currentUser, không format.

    const participants = chat.participants || chat.members || [];
    const isGroupChat = chat.type === "group";
    const otherParticipant = participants.find((p) => p.id !== currentUser.id);
    const lastMessage = chat.messages && chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : null;

    let conversationName, conversationUsername, conversationAvatar;
    if (isGroupChat) {
      conversationName = chat.name || "Group Chat";
      conversationUsername = chat.name || "Group Chat";
      conversationAvatar = chat.avatar || "/placeholder.svg";
    } else {
      conversationName = otherParticipant?.username || "Unknown User";
      conversationUsername = otherParticipant?.username || "Unknown User";
      conversationAvatar = otherParticipant?.avatar || "/placeholder.svg";
    }

    return {
      id: chat.id,
      name: conversationName,
      username: conversationUsername,
      avatar: conversationAvatar,
      preview: lastMessage?.content || "Chưa có tin nhắn.",
      date: lastMessage ? new Date(lastMessage.createdAt).toLocaleString() : "",
      unread: typeof chat.unreadCount === "number" ? chat.unreadCount : 0,
      messages: [],
      isRequest: chat.status === "pending",
    };
  };

  // --- Fetch conversations & requests ---
  const fetchConversations = useCallback(async () => {
    try {
      const [chatsResponse, requestsResponse] = await Promise.all([getChats(), getChatRequests()])
      console.log("chatsResponse:", chatsResponse)
      console.log("requestsResponse:", requestsResponse);
      
      // Thống nhất cách lấy dữ liệu. Giả sử API luôn trả về { data: [...] } hoặc { chats: [...] }
      const chatsData = chatsResponse || chatsResponse?.data || [];
      const requestsData = requestsResponse || requestsResponse?.data || [];

      const newConversations = chatsData.map(formatConversation).filter(Boolean); // .filter(Boolean) để loại bỏ các giá trị null
      setConversations(newConversations)

      const newRequests = requestsData.map(formatConversation)
      setMessageRequests(newRequests)
    } catch (error) {
      console.error("Error fetching conversations:", error)
    }
  }, []) // Loại bỏ dependency để useCallback chỉ tạo hàm 1 lần

  useEffect(() => {
    if (!currentUser) return
    fetchConversations()
    const intervalId = setInterval(fetchConversations, 5000)
    return () => clearInterval(intervalId)
  }, [currentUser, fetchConversations]) // Giữ nguyên dependency ở đây

  // --- Socket connect ---
  useEffect(() => {
    if (!currentUser || !token) return

    // Gọi connect với một callback để cập nhật state khi kết nối thành công
    socketService.connect(token, () => {
      setIsSocketConnected(true)
    })

    return () => {
      socketService.disconnect()
      setIsSocketConnected(false)
    }
  }, [currentUser, token])

  // --- Select conversation ---
  const handleSelectConversation = async (conversationId) => {
    if (!conversationId || !isSocketConnected) return // Chờ socket kết nối
    setSelectedConversationId(conversationId)

    // Tell socket this chat is active → will reset unread in client
    socketService.setActiveChat(conversationId)

    try {
      // Fetch messages for this chat
      const messagesResponse = await getMessages(conversationId)
      const fetchedMessages = messagesResponse?.rows || messagesResponse?.data || []

      // Dispatch action để lưu messages vào Redux store
      dispatch(setMessages({ chatId: conversationId, messages: fetchedMessages }))

      // Identify unread messages
      const unreadMessageIds = fetchedMessages
        .filter((msg) => !msg.read && msg.senderId !== currentUser?.id)
        .map((msg) => msg.id)

      if (unreadMessageIds.length > 0) {
        socketService.emit("read_message", { chatId: conversationId, messageIds: unreadMessageIds })
        dispatch(markMessagesAsRead({ chatId: conversationId }))
      }

    } catch (error) {
      console.error("Failed to open conversation:", error)
    }
  }

  // --- Prepare selectedConversation object for rendering ---
  const selectedConversation = selectedConversationId
    ? (conversations.find((c) => c.id === selectedConversationId) || messageRequests.find((c) => c.id === selectedConversationId))
    : null

  // Add messages from Redux slice
  if (selectedConversation) {
    selectedConversation.messages = messages[selectedConversationId] || []
    selectedConversation.unread = unreadCounts[selectedConversationId] || 0
  }

  // --- Send message ---
  const handleSendMessage = (content) => {
    if (!selectedConversationId || !currentUser || !isSocketConnected) return // Chờ socket kết nối
    socketService.emit("send_message", {
      chatId: selectedConversationId,
      content,
      senderId: currentUser.id,
    })
  }

  return (
    <div className={cx("root")}>
      <div className={cx("list-panel")}>
        <MessagesList
          conversations={conversations}
          messageRequests={messageRequests}
          selectedConversationId={selectedConversationId}
          onSelectConversation={handleSelectConversation}
        />
      </div>

      <div className={cx("detail-panel")}>
        {selectedConversation ? (
          <MessageDetail
            key={selectedConversation.id}
            conversation={selectedConversation}
            onSendMessage={handleSendMessage}
            isSocketConnected={isSocketConnected} // Truyền prop xuống
            currentUser={currentUser}
          />
        ) : (
          <div className={cx("no-conversation-selected")}>
            <h2>Chọn một tin nhắn</h2>
            <p>Chọn từ các cuộc trò chuyện hiện có của bạn, bắt đầu một cuộc trò chuyện mới hoặc tiếp tục lướt.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Messages

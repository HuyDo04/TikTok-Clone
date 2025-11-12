"use client"

import { useState, useEffect, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import classNames from "classnames/bind"
import styles from "./Messages.module.scss"
import MessagesList from "../MessagesList/MessagesList"
import MessageDetail from "../MessageDetail/MessageDetail"
import { getChats, getChatRequests, getMessages } from "@/services/chat.service"
import { setMessages, markChatAsRead } from "@/store/chatSlice"
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
  const token = useSelector((state) => state.auth.token)

  // --- Helper: format conversation object ---
  const formatConversation = useCallback(
    (chat) => {
      if (!currentUser) return null

      const participants = chat.participants || chat.members || []
      const isGroupChat = chat.type === "group"
      const otherParticipant = participants.find((p) => p.id !== currentUser.id)
      const lastMessage = chat.lastMessage || null

      let conversationName, conversationUsername, conversationAvatar
      if (isGroupChat) {
        conversationName = chat.name || "Group Chat"
        conversationUsername = chat.name || "Group Chat"
        conversationAvatar = chat.avatar || "/placeholder.svg"
      } else {
        conversationName = otherParticipant?.username || "Unknown User"
        conversationUsername = otherParticipant?.username || "Unknown User"
        conversationAvatar = otherParticipant?.avatar || "/placeholder.svg"
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
      }
    },
    [currentUser]
  )

  // --- Fetch all conversations and requests ---
  const fetchConversations = useCallback(async () => {
    if (!currentUser) return
    try {
      const [chatsResponse, requestsResponse] = await Promise.all([
        getChats(),
        getChatRequests(),
      ])

      const chatsData = chatsResponse?.data || chatsResponse || []
      const requestsData = requestsResponse?.data || requestsResponse || []

      const newConversations = chatsData.map(formatConversation).filter(Boolean)
      const newRequests = requestsData.map(formatConversation).filter(Boolean)

      setConversations(newConversations)
      setMessageRequests(newRequests)
    } catch (error) {
      console.error("Error fetching conversations:", error)
      console.log("[DEBUG] Lỗi khi tải cuộc trò chuyện ban đầu:", error);
    }
  }, [currentUser, formatConversation])

  // --- Fetch conversations on mount / user change ---
  useEffect(() => {
    if (!currentUser) return
    fetchConversations()
  }, [currentUser, fetchConversations])

  // --- Socket connect / disconnect ---
  useEffect(() => {
    if (!currentUser || !token) return

    socketService.connect(token, () => {
      setIsSocketConnected(true)
      console.log("[DEBUG] Socket đã kết nối thành công.");
    })

    // Khi có tin nhắn mới → cập nhật lại conversation preview hoặc thêm mới
    socketService.on("receive_message", (newMessage) => {
      console.log("[DEBUG] Nhận được tin nhắn mới:", newMessage);
      setConversations((prev) => {
        const idx = prev.findIndex((c) => c.id === newMessage.chatId)
        if (idx === -1) return prev // chat chưa tồn tại, sẽ được cập nhật bằng chat:new
        const updated = [...prev]
        updated[idx] = {
          ...updated[idx],
          preview: newMessage.content,
          date: new Date(newMessage.createdAt).toLocaleString(),
        }
        return updated
      })
    })

    // Khi có chat mới được tạo
    socketService.on("chat:new", (newChat) => {
      console.log("[DEBUG] Nhận được cuộc trò chuyện mới:", newChat);
      setConversations((prev) => {
        const formatted = formatConversation(newChat)
        return formatted ? [formatted, ...prev] : prev
      })
    })

    // Khi server cập nhật số lượng tin nhắn chưa đọc
    socketService.on("unread_count_updated", ({ chatId, unreadCount }) => {
      console.log(`[DEBUG] Nhận 'unread_count_updated' cho chatId: ${chatId}, unreadCount: ${unreadCount}`);
      setConversations((prev) =>
        prev.map((c) => (c.id === chatId ? { ...c, unread: unreadCount } : c))
      )
      // Cập nhật cho cả message requests nếu cần
      setMessageRequests((prev) =>
        prev.map((c) => (c.id === chatId ? { ...c, unread: unreadCount } : c))
      )
    })

    return () => {
      socketService.off("receive_message")
      socketService.off("chat:new")
      console.log("[DEBUG] Ngắt kết nối socket và dọn dẹp listeners.");
      socketService.off("unread_count_updated")
      socketService.disconnect()
      setIsSocketConnected(false)
    }
  }, [currentUser, token, formatConversation])

  // --- Select conversation ---
  const handleSelectConversation = async (conversationId) => {
    console.log(`[DEBUG] Bắt đầu handleSelectConversation cho chatId: ${conversationId}`);
    if (!conversationId || !isSocketConnected) return;
    setSelectedConversationId(conversationId);
  
    try {
      const messagesResponse = await getMessages(conversationId);
      const fetchedMessages = messagesResponse?.rows || messagesResponse?.data || [];
  
      //  Truyền currentUserId vào setMessages
      dispatch(setMessages({ 
        chatId: conversationId, 
        messages: fetchedMessages,
        currentUserId: currentUser.id,  // <-- đây là quan trọng
      }));
  
      // Emit event read_message
      console.log(`[DEBUG] Gửi sự kiện 'read_message' cho chatId: ${conversationId}`);
      socketService.emit("read_message", { chatId: conversationId });

      // Dispatch action để cập nhật Redux store ngay lập tức
      dispatch(markChatAsRead({ chatId: conversationId }));

      // Cập nhật UI ngay lập tức để phản ánh trạng thái đã đọc
      console.log(`[DEBUG] Cập nhật giao diện (optimistic update), unread -> 0 cho chatId: ${conversationId}`);
      setConversations((prev) =>
        prev.map((c) => (c.id === conversationId ? { ...c, unread: 0 } : c))
      );
      setMessageRequests((prev) =>
        prev.map((c) => (c.id === conversationId ? { ...c, unread: 0 } : c))
      );
    } catch (error) {
      console.log(`[DEBUG] Lỗi trong handleSelectConversation cho chatId: ${conversationId}`, error);
      console.error("Failed to open conversation:", error);
    }
  };
  
  // --- Mark as read (e.g., on input focus) ---
  const handleMarkAsRead = (conversationId) => {
    if (!conversationId || !isSocketConnected) return;

    // Lấy conversation từ state để kiểm tra
    const conv = conversations.find(c => c.id === conversationId) || messageRequests.find(c => c.id === conversationId);

    // Chỉ thực hiện nếu có tin nhắn chưa đọc để tránh gọi lại không cần thiết
    if (conv && conv.unread > 0) {
      console.log(`[DEBUG] Đánh dấu đã đọc từ input focus cho chatId: ${conversationId}`);
      socketService.emit("read_message", { chatId: conversationId });
      dispatch(markChatAsRead({ chatId: conversationId }));

      // Cập nhật UI ngay lập tức
      setConversations((prev) =>
        prev.map((c) => (c.id === conversationId ? { ...c, unread: 0 } : c))
      );
      setMessageRequests((prev) =>
        prev.map((c) => (c.id === conversationId ? { ...c, unread: 0 } : c))
      );
    }
  };

  // --- Prepare selectedConversation object for rendering ---
  const selectedConversation =
    selectedConversationId &&
    (conversations.find((c) => c.id === selectedConversationId) ||
      messageRequests.find((c) => c.id === selectedConversationId))

  if (selectedConversation) {
    selectedConversation.messages = messages[selectedConversationId] || []
    selectedConversation.unread = unreadCounts[selectedConversationId] || 0
  }

  // --- Send message ---
  const handleSendMessage = (content) => {
    if (!selectedConversationId || !currentUser || !isSocketConnected) return
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
            onInputFocus={() => handleMarkAsRead(selectedConversation.id)}
            isSocketConnected={isSocketConnected}
            currentUser={currentUser}
          />
        ) : (
          <div className={cx("no-conversation-selected")}>
            <h2>Chọn một tin nhắn</h2>
            <p>
              Chọn từ các cuộc trò chuyện hiện có của bạn, bắt đầu một cuộc trò chuyện mới hoặc tiếp tục
              lướt.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Messages

/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useState, useEffect, useCallback } from "react"
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import classNames from "classnames/bind"
import styles from "./Messages.module.scss"
import MessagesList from "../MessagesList/MessagesList"
import MessageDetail from "../MessageDetail/MessageDetail"
import {
  getChats,
  getChatRequests,
  getMessages,
  acceptChatRequest,
  declineChatRequest,
} from "@/services/chat.service"
import { setMessages, markChatAsRead } from "@/store/chatSlice"
import socketService from "@/utils/chat.socket"

const cx = classNames.bind(styles)
const DEFAULT_AVATAR = import.meta.env.VITE_DEFAULT_AVATAR;

function Messages() {
  const [selectedConversationId, setSelectedConversationId] = useState(null)
  const [conversations, setConversations] = useState([])
  const [isSocketConnected, setIsSocketConnected] = useState(false)
  const [messageRequests, setMessageRequests] = useState([])
  // console.log("[DEBUG] Bắt đầu render Messages", conversations);
  
  const { messages, unreadCounts } = useSelector((state) => state.chat)
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.auth.currentUser)
  const location = useLocation();
  const token = useSelector((state) => state.auth.token)

  // --- Helper: format conversation object ---
  const formatConversation = useCallback(
    (chat) => {
      if (!currentUser) return null
      
      const participants = chat.participants || chat.members || []
      const isGroupChat = chat.type === "group"
      const otherParticipant = participants.find((p) => p.id !== currentUser.id)
      const lastMessage = chat.lastMessage || null
      console.log("last", chat)
      let conversationName, conversationUsername, conversationAvatar
      if (isGroupChat) {
        conversationName = chat.name || "Group Chat"
        conversationUsername = chat.name || "Group Chat"
        conversationAvatar = chat.avatar || DEFAULT_AVATAR
      } else {
        conversationName = otherParticipant?.username || "Unknown User"
        conversationUsername = otherParticipant?.username || "Unknown User"
        conversationAvatar = otherParticipant?.avatar || DEFAULT_AVATAR
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
        participants: participants, // Thêm thông tin participants
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

      const chatsData = chatsResponse || []
      const requestsData = requestsResponse || []

      const newConversations = chatsData.map(formatConversation).filter(Boolean)
      console.log("[DEBUG] newConversations:", newConversations);
      
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

  // --- Auto-select conversation from navigation state ---
  useEffect(() => {
    const chatIdFromState = location.state?.selectedChatId;

    // ✅ Chỉ auto-select nếu chưa có conversation đang chọn
    if (
      chatIdFromState &&
      !selectedConversationId &&
      conversations.some(c => c.id === chatIdFromState)
    ) {
      handleSelectConversation(chatIdFromState);
    }
  }, [location.state, conversations, selectedConversationId]);

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

      const chatId = newMessage.chatId ?? newMessage.chat_id;

      // Kiểm tra xem chat đã tồn tại trong conversations hoặc requests chưa
      const chatExistsInConversations = conversations.some(c => c.id === chatId);
      const chatExistsInRequests = messageRequests.some(r => r.id === chatId);

      // TRƯỜNG HỢP 1: Chat chưa tồn tại -> Đây là tin nhắn đầu tiên của chat mới
      // Giả định `newMessage` chứa object `chat` đi kèm
      if (!chatExistsInConversations && !chatExistsInRequests && newMessage.chat) {
        const formatted = formatConversation(newMessage.chat);
        if (formatted) {
          if (formatted.isRequest) {
            setMessageRequests((prev) => [formatted, ...prev]);
          } else {
            setConversations((prev) => [formatted, ...prev]);
          }
        }
      } 
      // TRƯỜNG HỢP 2: Chat đã tồn tại, chỉ cần cập nhật preview
      else {
        const updateList = (list) => list.map(c => c.id === chatId ? { ...c, preview: newMessage.content, date: new Date(newMessage.createdAt).toLocaleString() } : c);
        
        if (chatExistsInConversations) setConversations(updateList);
        if (chatExistsInRequests) setMessageRequests(updateList);
      }
    })

    // Khi server cập nhật số lượng tin nhắn chưa đọc
    socketService.on("unread_count_updated", ({ chatId, unreadCount }) => {
      console.log(`[DEBUG] Nhận 'unread_count_updated' cho chatId: ${chatId}, unreadCount: ${unreadCount}`);
      const updateUnread = (list) => list.map((c) => (c.id === chatId ? { ...c, unread: unreadCount } : c));
      setConversations(updateUnread);
      setMessageRequests(updateUnread);
    })

    return () => {
      socketService.off("receive_message")
      socketService.off("chat:new")
      socketService.off("unread_count_updated")
      socketService.disconnect()
      setIsSocketConnected(false)
      console.log("[DEBUG] Ngắt kết nối socket và dọn dẹp listeners.");
    }
  }, [currentUser, token, formatConversation, conversations, messageRequests])

  // --- Select conversation ---
  const handleSelectConversation = async (conversationId) => {
    console.log(`[DEBUG] Bắt đầu handleSelectConversation cho chatId: ${conversationId}`);

    if (!conversationId || !isSocketConnected) return;

    // ✅ Tránh gọi lại nếu conversation đã được chọn
    if (selectedConversationId === conversationId) return;

    setSelectedConversationId(conversationId);

    // Tìm cuộc trò chuyện được chọn từ state
    const conversation =
      conversations.find((c) => c.id === conversationId) ||
      messageRequests.find((c) => c.id === conversationId);

    // Nếu cuộc trò chuyện là một yêu cầu đang chờ (pending),
    // chỉ người gửi mới có thể fetch tin nhắn ban đầu.
    // Người nhận sẽ thấy giao diện chấp nhận/từ chối.
    if (conversation && conversation.isRequest) { 
      const isReceiver = conversation.participants?.some(p => p.id === currentUser.id && p.ChatParticipant?.status === 'pending');
      
      if (isReceiver) {
        console.log(`[DEBUG] ChatId: ${conversationId} là một yêu cầu đang chờ cho người nhận. Không lấy tin nhắn.`);
        return;
      }
    }

    try {
      const messagesResponse = await getMessages(conversationId);
      const fetchedMessages = messagesResponse?.rows || messagesResponse?.data || [];

      dispatch(setMessages({ 
        chatId: conversationId, 
        messages: fetchedMessages,
        currentUserId: currentUser.id,
      }));

      console.log(`[DEBUG] Gửi sự kiện 'read_message' cho chatId: ${conversationId}`);
      socketService.emit("read_message", { chatId: conversationId });

      dispatch(markChatAsRead({ chatId: conversationId }));

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

    const conv = conversations.find(c => c.id === conversationId) || messageRequests.find(c => c.id === conversationId);

    if (conv && conv.unread > 0) {
      console.log(`[DEBUG] Đánh dấu đã đọc từ input focus cho chatId: ${conversationId}`);
      socketService.emit("read_message", { chatId: conversationId });
      dispatch(markChatAsRead({ chatId: conversationId }));

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

  // --- Accept/Decline Request ---
  const handleAcceptRequest = async (chatId) => {
    try {
      await acceptChatRequest(chatId)
      // Cập nhật state: chuyển request thành conversation
      setMessageRequests((prev) => {
        const requestToMove = prev.find((r) => r.id === chatId)
        if (requestToMove) {
          setConversations((convs) => [
            { ...requestToMove, isRequest: false },
            ...convs,
          ])
        }
        return prev.filter((r) => r.id !== chatId)
      })
      // Không cần làm gì thêm, vì component MessageDetail sẽ tự re-render
      // và isReceiverOfRequest sẽ trở thành false, hiện ra ô input.
    } catch (error) {
      console.error("Failed to accept chat request:", error)
      // Hiển thị thông báo lỗi cho người dùng
    }
  }

  const handleDeclineRequest = async (chatId) => {
    try {
      await declineChatRequest(chatId)
      // Cập nhật state: xóa request khỏi danh sách
      setMessageRequests((prev) => prev.filter((r) => r.id !== chatId))
      // Chuyển về màn hình chính nếu đang xem request đó
      if (selectedConversationId === chatId) {
        setSelectedConversationId(null)
      }
    } catch (error) {
      console.error("Failed to decline chat request:", error)
      // Hiển thị thông báo lỗi cho người dùng
    }
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
            isRequest={selectedConversation.isRequest}
            currentUser={currentUser}
            onAcceptRequest={handleAcceptRequest}
            onDeclineRequest={handleDeclineRequest}
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

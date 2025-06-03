import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./MessagePage.module.scss";
import MessageHeader from "./MessageHeader";
import MessageList from "./MessageList";
import Conversation from "./Conversation";

const cx = classNames.bind(styles);

function MessagePage() {
  const [activeChat, setActiveChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const conversations = [
    {
      id: 1,
      user: {
        name: "Người dùng 1",
        avatar: "https://picsum.photos/50/50",
        online: true,
      },
      lastMessage: "Bạn đang làm gì thế?",
      time: "10 phút trước",
      unread: 2,
    },
    {
      id: 2,
      user: {
        name: "Người dùng 2",
        avatar: "https://picsum.photos/50/50",
        online: false,
      },
      lastMessage: "Video của bạn hay quá!",
      time: "1 giờ trước",
      unread: 0,
    },
    {
      id: 3,
      user: {
        name: "Người dùng 3",
        avatar: "https://picsum.photos/50/50",
        online: false,
      },
      lastMessage: "Xin chào nhe",
      time: "1 giờ trước",
      unread: 0,
    },
  ];

  const filteredConversations = conversations.filter((conv) =>
    conv.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={cx("message-page")}>
      <MessageHeader
        onSearch={setSearchTerm}
        activeChat={activeChat}
        onBack={() => setActiveChat(null)}
      />

      <div className={cx("content-container")}>
        <div
          className={cx("message-list-container", {
            "with-active-chat": activeChat,
          })}
        >
          <MessageList
            conversations={filteredConversations}
            onSelectChat={setActiveChat}
            activeChatId={activeChat?.id}
          />
        </div>

        {activeChat && (
          <div className={cx("conversation-container")}>
            <Conversation
              chat={activeChat}
              onBack={() => setActiveChat(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default MessagePage;

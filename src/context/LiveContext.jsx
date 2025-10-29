/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useMemo, useEffect } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const LiveContext = createContext();

// Mock data - This should be replaced with API calls in the future
const liveUsers = [
    {
      id: 1,
      username: "hungmatkho",
      displayName: "Cao Hùng Logistics",
      avatar: "https://picsum.photos/50/50",
      viewers: 628,
      title: "trầm tính ít nói...chs VIP10-923",
      thumbnail: "https://picsum.photos/50/50",
      isLive: true,
    },
    {
      id: 2,
      username: "thoi0526",
      displayName: "Hoài Chế",
      avatar: "https://picsum.photos/50/50",
      viewers: 11,
      title: "Chơi game cùng bạn",
      thumbnail: "https://picsum.photos/50/50",
      isLive: true,
    },
    {
      id: 3,
      username: "sammishop",
      displayName: "SammiShop Official",
      avatar: "https://picsum.photos/50/50",
      viewers: 5,
      title: "Giới thiệu sản phẩm mới",
      thumbnail: "https://picsum.photos/50/50",
      isLive: true,
    },
    {
      id: 4,
      username: "hindeptrai123",
      displayName: "Draven TV",
      avatar: "https://picsum.photos/50/50",
      viewers: 250,
      title: "Phát trực tiếp game",
      thumbnail: "https://picsum.photos/50/50",
      isLive: true,
    },
];

export const LiveProvider = ({ children }) => {
    const [selectedLive, setSelectedLive] = useState(liveUsers[0]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        if (selectedLive) {
            // Mock fetching comments for the selected live stream
            setComments([
                {
                    id: 1,
                    username: "viewer1",
                    avatar: "https://picsum.photos/50/50",
                },
                {
                    id: 2,
                    username: "viewer2",
                    avatar: "https://picsum.photos/50/50",
                    message: "Hay quá!",
                },
                {
                    id: 3,
                    username: "viewer3",
                    avatar: "https://picsum.photos/50/50",
                    message: "Tuyệt vời",
                },
            ]);
        }
    }, [selectedLive]);

    const handleSelectLive = (live) => {
        setSelectedLive(live);
    };

    const handleSendComment = (message) => {
        const newComment = {
            id: comments.length + 1,
            username: "Bạn", // Should be the current logged-in user
            avatar: "/placeholder-user.jpg",
            message: message,
        };
        setComments([...comments, newComment]);
    };

    const value = useMemo(
        () => ({
            liveUsers,
            selectedLive,
            comments,
            handleSelectLive,
            handleSendComment,
        }),
        [selectedLive, comments]
    );

    return (
        <LiveContext.Provider value={value}>
            {children}
        </LiveContext.Provider>
    );
};

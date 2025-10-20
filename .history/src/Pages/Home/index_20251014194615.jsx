import VideoCard from "@/component/VideoCard";
import classNames from "classnames/bind";

import styles from "./Home.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "@/features/auth/authSlice";
import { BsDownload, BsPhone, BsTiktok } from "react-icons/bs";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import MessagePage from "@/component/Sidebar/component/message/MessagePage";
const cx = classNames.bind(styles);

function Home() {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const user = useSelector((state) => state.auth.currentUser);

  const videos = [
    {
        id: 1,
        user: { username: "nguyenvana", name: "Nguyễn Văn A", avatar: "https://placehold.co/56x56/FFD700/000000?text=A" },
        caption: "Khoảnh khắc tuyệt vời khi bình minh 🌄 #vietnam #dulich",
        music: "Âm nhạc: Một bài hát nhẹ nhàng...",
        likes: "1.2K",
        comments: "88",
        shares: "25",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-winter-fashion-cold-looking-woman-walking-on-the-street-39874-large.mp4", 
    },
    {
        id: 2,
        user: { username: "hotgirlB", name: "Hot Girl B", avatar: "https://placehold.co/56x56/00AABB/FFFFFF?text=B" },
        caption: "Thử thách nhảy 🕺🏻 Cả nhà cùng tham gia nhé!",
        music: "Âm nhạc: Challenge hit",
        likes: "5.5K",
        comments: "312",
        shares: "105",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-a-girl-in-a-gray-sweater-and-a-white-hat-in-a-field-of-dry-flowers-39883-large.mp4",
    },
  ];

  return (
    // The main-content and app divs were removed as they are now in App.jsx
    <div className={cx("video-feed")}>
        {/* MessagePage is preserved as in the original file */}
        <MessagePage /> 
        {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
        ))}
    </div>
    // The right-hand action bar was removed for simplicity in this refactoring step.
    // It can be added back if needed.
  );
}

export default Home;

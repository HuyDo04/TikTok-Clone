import { useState } from "react";
import ProfileHeader from "../../component/ProfileHeader";
import ProfileTabs from "../../component/ProfileTabs";
import VideoGrid from "../../component/VideoGrid";
import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import { Cog, Link } from "lucide-react";

const cx = classNames.bind(styles);

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("videos")
  // Hardcoded data from the original profile app
  const profileData = {
    avatar: "https://picsum.photos/200/300", // Using a local placeholder
    username: "hdna0402",
    followers: 98,
    following: 4,
    likes: 75,
    bio: "Chưa có tiểu sử.",
    isFollowing: false,
  };

  const videos = [
    { id: 1, thumbnail: "/tiktok-video-1.png", views: 924200 },
    { id: 2, thumbnail: "/tiktok-video-2.png", views: 391 },
    { id: 3, thumbnail: "/placeholder.jpg", views: 22200 },
    { id: 4, thumbnail: "/placeholder.jpg", views: 5800 },
    { id: 5, thumbnail: "/placeholder.jpg", views: 852 },
    { id: 6, thumbnail: "/placeholder.jpg", views: 914 },
    { id: 7, thumbnail: "/placeholder.jpg", views: 0 },
    { id: 8, thumbnail: "/placeholder.jpg", views: 579 },
    { id: 9, thumbnail: "/placeholder.jpg", views: 329 },
  ];

  const likedVideos = []; // Placeholder for liked videos

  return (
    <div className={cx('profilePage')}>
      <ProfileHeader {...profileData} />
      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === 'videos' && <VideoGrid videos={videos} />}
      {activeTab === 'likes' && <VideoGrid videos={likedVideos} />}
      {/* Add other tab contents here */}
    </div>
  );
}

export default ProfilePage;
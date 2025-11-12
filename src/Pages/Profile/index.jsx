/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileHeader from "../../component/ProfileHeader";
import ProfileTabs from "../../component/ProfileTabs";
import VideoGrid from "../../component/VideoGrid";
import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import * as userService from "@/services/user.service"; // Giữ lại để lấy thông tin profile chi tiết
import * as authService from "@/services/auth.service"; // Import service mới
import EditProfile from "@/component/EditProfile"; // Import EditProfile
import * as postService from "@/services/post.service"; // Import post service để lấy video

const cx = classNames.bind(styles);

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("videos");
  const [profileData, setProfileData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State để mở/đóng modal
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { username } = useParams(); // Lấy username từ URL, ví dụ: /@hdna0402
  const navigate = useNavigate();
  // Lấy người dùng hiện tại từ Redux store
  const currentUser = useSelector((state) => state.auth.currentUser);
  console.log(profileData);
  
  useEffect(() => {
    // Nếu không có username trên URL nhưng đã đăng nhập,
    // tự động chuyển hướng đến URL profile của người dùng hiện tại.
    // Ví dụ: từ /profile -> /@myusername
    if (!username && currentUser?.username) {
      navigate(`/profile/${currentUser.username}`, { replace: true });
    }
  }, [username, currentUser, navigate]);

  const fetchProfileData = useCallback(async () => {
    setLoading(true);
    try {
      let userProfile;
      let userIdToFetch;

      // Xác định ID của người dùng cần lấy thông tin
      if (username && (!currentUser || username !== currentUser.username)) {
        // Nếu xem trang của người khác, tìm ID của họ qua username
        const searchResult = await userService.searchUsers(username);
        console.log("searchResult", searchResult);
        
        if (searchResult && searchResult.length > 0) {
          userIdToFetch = searchResult[0].id;
        } else {
          throw new Error(`User with username "${username}" not found.`);
        }
      } else {
        // Nếu xem trang của chính mình (đã đăng nhập)
        userIdToFetch = currentUser?.id;
      }

      if (userIdToFetch) {
        // Luôn gọi API getUserById để lấy dữ liệu đầy đủ, bao gồm cả Followers và Following
        userProfile = await userService.getUserById(userIdToFetch);
        
      } else {
        throw new Error("User profile could not be fetched.");
      }

      setProfileData(userProfile);

      // Lấy danh sách video của người dùng bằng API mới
      const userPostsResponse = await postService.getUserVideosByUsername(username);
      const mappedVideos = userPostsResponse.map(post => ({
          id: post.id,
          thumbnail: post.featuredImage || '/placeholder.jpg', // Sử dụng featuredImage làm thumbnail
          title: post.content,
          views: post.viewCount,
      }));
      setVideos(mappedVideos);
    } catch (error) {
      console.error("Failed to fetch profile data:", error);
      // Nếu không tìm thấy user, có thể điều hướng về trang 404
      // navigate('/404');
    } finally {
      setLoading(false);
    }
  }, [currentUser, username]);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  const handleFollow = async () => {
    if (!currentUser) {
      // Yêu cầu đăng nhập nếu chưa đăng nhập
      navigate("/login");
      return;
    }
    try {
      await userService.followUser(profileData.id);
      // Cập nhật lại state để UI hiển thị nút "Bỏ theo dõi" và tăng số follower
      setProfileData((prev) => ({
        ...prev,
        isFollowing: true,
        followers: prev.followers + 1,
      }));
    } catch (error) {
      console.error("Failed to follow user:", error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await userService.unfollowUser(profileData.id);
      // Cập nhật lại state
      setProfileData((prev) => ({
        ...prev,
        isFollowing: false,
        followers: prev.followers - 1,
      }));
    } catch (error) {
      console.error("Failed to unfollow user:", error);
    }
  };

  const handleSaveSuccess = () => {
    // Tải lại dữ liệu profile sau khi lưu thành công
    fetchProfileData();
  };

  if (loading) {
    return <div>Loading...</div>; // Hoặc một component skeleton loading đẹp hơn
  }

  if (!profileData) {
    return <div>User not found.</div>; // Hiển thị khi không tìm thấy user
  }
  

  return (
    <div className={cx("profilePage")}>
      <ProfileHeader
        avatar={profileData.avatar}
        username={profileData.username}
        bio={profileData.bio}
        // Tính toán số lượng từ độ dài của các mảng tương ứng
        // Giả định rằng API trả về các mảng Followers, Following, và posts
        followers={profileData.Followers ? profileData.Followers.length : 0}
        following={profileData.Following ? profileData.Following.length : 0}
        // Tính tổng số lượt thích từ tất cả các bài post của người dùng
        likes={videos.reduce((total, video) => total + (video.likesCount || 0), 0)}
        isCurrentUser={currentUser && currentUser.id === profileData.id}
        isFollowing={profileData.isFollowing}
        onFollow={handleFollow}
        onUnfollow={handleUnfollow}
        onEdit={() => setIsEditModalOpen(true)}
      />
      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === "videos" && <VideoGrid videos={videos} />}
      {activeTab === "likes" && <VideoGrid videos={likedVideos} />}

      {/* Render modal EditProfile khi isEditModalOpen là true */}
      {isEditModalOpen && (
        <EditProfile
          user={profileData}
          onClose={() => setIsEditModalOpen(false)}
          onSaveSuccess={handleSaveSuccess}
        />
      )}
    </div>
  );
}

export default ProfilePage;
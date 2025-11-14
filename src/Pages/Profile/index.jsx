
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
import { getChatByMemberIds, createChat } from "@/services/chat.service";
import { blockUser, unblockUser } from "@/services/user.service";
const cx = classNames.bind(styles);
const URL = import.meta.env.VITE_BASE_URL_ME;
const DEFAULT_AVATAR = import.meta.env.VITE_DEFAULT_AVATAR;

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

  // --- Handle click "Nhắn tin" ---
  const handleMessageClick = async () => {
    if (!currentUser || !profileData?.id) return;

    // Ngăn người dùng tự nhắn tin cho chính mình
    if (currentUser.id === profileData.id) {
      console.log("[DEBUG] Người dùng không thể tự nhắn tin cho chính mình.");
      return;
    }

    let chat;
    try {
      // 1️⃣ Thử lấy chat nếu đã tồn tại
      const response = await getChatByMemberIds([currentUser.id, profileData.id]);
      chat = response; // API trả về trực tiếp object chat, không có data wrapper
    } catch (error) {
      // Nếu không tìm thấy (404), chúng ta sẽ tạo mới ở bước sau.
      if (error.response?.status !== 404) {
        console.error("Lỗi khi lấy chat đã tồn tại:", error);
        return; // Dừng lại nếu có lỗi khác 404
      }
    }

    try {
      // 2️⃣ Nếu chưa có chat, tạo một cuộc trò chuyện mới
      if (!chat || !chat.id) {
        const createRes = await createChat({ receiverId: profileData.id });
        chat = createRes; // API trả về trực tiếp object chat
      }
      // 3️⃣ Chuyển hướng đến trang tin nhắn
      if (chat?.id) navigate("/messages", { state: { selectedChatId: chat.id } }); // Sử dụng state để truyền ID, giúp trang Messages tự động chọn chat
    } catch (error) {
      console.error("Lỗi khi mở hoặc tạo chat với người dùng:", error);
    }
  };

  const handleFollow = async () => {
    if (!currentUser) {
      // Yêu cầu đăng nhập nếu chưa đăng nhập
      navigate("/auth/login");
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

  const handleBlock = async () => {
    if (!currentUser || !profileData?.id || currentUser.id === profileData.id) return;
    if (window.confirm(`Bạn có chắc chắn muốn chặn ${profileData.username}?`)) {
      try {
        await blockUser(profileData.id);
        setProfileData((prev) => ({ ...prev, isBlocked: true }));
        // Optional: Navigate away or show a success message
        alert("Đã chặn người dùng.");
        navigate("/");
      } catch (error) {
        console.error("Failed to block user:", error);
        alert("Không thể chặn người dùng. Vui lòng thử lại.");
      }
    }
  };

  const handleUnblock = async () => {
    if (!currentUser || !profileData?.id) return;
    try {
      await unblockUser(profileData.id);
      setProfileData((prev) => ({ ...prev, isBlocked: false }));
    } catch (error) {
      console.error("Failed to unblock user:", error);
    }
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
        userId={profileData.id}
        avatar={profileData.avatar ? `${URL}/${profileData.avatar}` : DEFAULT_AVATAR}
        username={profileData.username}
        bio={profileData.bio}
        // Tính toán số lượng từ độ dài của các mảng tương ứng
        // Giả định rằng API trả về các mảng Followers, Following, và posts
        followers={profileData.Followers ? profileData.Followers.length : 0}
        following={profileData.Following ? profileData.Following.length : 0}
        // Tính tổng số lượt thích từ tất cả các bài post của người dùng
        likes={videos.reduce((total, video) => total + (video.likesCount || 0), 0)}
        isCurrentUser={currentUser && currentUser.id === profileData.id}
        isBlocked={profileData.isBlocked}
        onMessage={handleMessageClick} // Đảm bảo onMessage được truyền xuống
        onEdit={() => setIsEditModalOpen(true)}
        onBlock={handleBlock}
        onUnblock={handleUnblock}
      />
      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === "videos" && <VideoGrid videos={videos} />}
      {activeTab === "likes" && <VideoGrid videos={[]} />} {/* API cho mục này chưa có, tạm thời để trống */}

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
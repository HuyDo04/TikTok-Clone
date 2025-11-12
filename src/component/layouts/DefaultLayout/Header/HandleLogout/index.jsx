import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";
import styles from "./HandleLogout.module.scss";

import notificationSocketService from "@/utils/notification.socket";
import { logout } from "@/services/auth.service"; // Gọi API logout
import { logoutUser } from "@/features/auth/authSlice"; // Action Redux

const cx = classNames.bind(styles);

function HandleLogout() {
  const dispatch = useDispatch();

  // Lấy user hiện tại từ Redux
  const currentUser = useSelector((state) => state.auth?.currentUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Kiểm tra token mỗi khi user thay đổi (ví dụ khi logout hoặc login)
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      await logout(refreshToken); // gửi token cho backend
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      // Xóa token, refreshToken ở localStorage và redux
      dispatch(logoutUser());
      notificationSocketService.disconnect();
  
      // Reload trang về Home để reset mọi state
      window.location.href = "/";
    }
  };
  

  return (
    <>
      {isLoggedIn && (
        <button className={cx("subButton")} onClick={handleLogout}>
          Đăng xuất
        </button>
      )}
    </>
  );
}

export default HandleLogout;

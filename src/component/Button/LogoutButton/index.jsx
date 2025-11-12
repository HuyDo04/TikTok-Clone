import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/features/auth/authSlice";
import { logout } from "@/services/auth.service";
import notificationSocketService from "@/utils/notification.socket";
import Button from "@/component/Button/LogoutButton";

function LogoutButton({ className }) {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await logout(refreshToken); // Gọi API xóa refresh token backend
      }
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      // Xóa token ở frontend
      dispatch(logoutUser());

      // Ngắt kết nối socket nếu có
      notificationSocketService.disconnect();

      // Reload trang về home để reset state
      // window.location.href = "/";
    }
  };

  return (
    <Button primary size="large" className={className} onClick={handleLogout}>
      Log out
    </Button>
  );
}

export default LogoutButton;

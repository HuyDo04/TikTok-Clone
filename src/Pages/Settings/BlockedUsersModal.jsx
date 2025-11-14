import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import * as userService from "@/services/user.service";
import { Button } from "./index"; // Import Button từ file Settings

const DEFAULT_AVATAR = import.meta.env.VITE_DEFAULT_AVATAR;
const URL = import.meta.env.VITE_BASE_URL_ME;

export default function BlockedUsersModal({ isOpen, onClose }) {
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlockedUsers = useCallback(async () => {
    setLoading(true);
    try {
      const users = await userService.getMyBlockedUsers();
      setBlockedUsers(users || []);
    } catch (error) {
      console.error("Failed to fetch blocked users:", error);
      setBlockedUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchBlockedUsers();
    }
  }, [isOpen, fetchBlockedUsers]);

  const handleUnblock = async (userId) => {
    try {
      await userService.unblockUser(userId);
      // Cập nhật UI bằng cách xóa người dùng khỏi danh sách
      setBlockedUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Failed to unblock user:", error);
      alert("Không thể bỏ chặn người dùng. Vui lòng thử lại.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-black dark:text-white">Tài khoản đã chặn</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto pr-2">
          {loading ? (
            <p className="text-center text-gray-500 dark:text-gray-400">Đang tải...</p>
          ) : blockedUsers.length > 0 ? (
            <ul className="space-y-3">
              {blockedUsers.map((user) => (
                <li key={user.id} className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700/50">
                  <div className="flex items-center space-x-3">
                    <img
                      src={user.avatar ? `${URL}/${user.avatar}` : DEFAULT_AVATAR}
                      alt={user.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="font-medium text-black dark:text-white">{user.username}</span>
                  </div>
                  <Button variant="outline" onClick={() => handleUnblock(user.id)}>
                    Bỏ chặn
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">Chưa có tài khoản nào bị chặn.</p>
          )}
        </div>

        <div className="flex justify-end mt-6">
            <Button variant="secondary" onClick={onClose}>
                Đóng
            </Button>
        </div>
      </div>
    </div>
  );
}
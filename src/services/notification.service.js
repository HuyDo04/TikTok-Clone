import httpRequest from "@/utils/httpRequest";

// Get all notifications for the current user
export const getNotifications = async (page = 1, limit = 10) => {
  try {
    const response = await httpRequest.get("/notifications", {
      params: { page, limit },
    });
    
    return response; // trả về data trực tiếp
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

// Mark a notification as read
export const markAsRead = async (id) => {
  try {
    const response = await httpRequest.patch(`/notifications/${id}/read`);
    return response;
  } catch (error) {
    console.error(`Error marking notification ${id} as read:`, error);
    throw error;
  }
};

// Mark all notifications as read
export const markAllAsRead = async () => {
  try {
    const response = await httpRequest.post("/notifications/read-all"); // sửa method thành POST
    return response;
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    throw error;
  }
};

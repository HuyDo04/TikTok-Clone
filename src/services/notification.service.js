import httpRequest from "@/utils/httpRequest";

// Get all notifications for the current user
export const getNotifications = async () => {
  const response = await httpRequest.get("/notifications");
  return response;
};

// Mark a notification as read
export const markAsRead = async (id) => {
  const response = await httpRequest.patch(`/notifications/${id}/read`);
  return response;
};

// Mark all notifications as read
export const markAllAsRead = async () => {
  const response = await httpRequest.patch("/notifications/read-all");
  return response;
};

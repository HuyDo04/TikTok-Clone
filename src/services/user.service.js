import httpRequest from "@/utils/httpRequest";

/**
 * Tìm kiếm hoặc lấy tất cả người dùng.
 * @param {string} query - Chuỗi tìm kiếm (username).
 * @returns {Promise<any>}
 */
export const searchUsers = async (query = "") => {
  const response = await httpRequest.get("/users", {
    params: { q: query },
  });
  return response;
};

export const getMyVideo = async (id) => {
  const response = await httpRequest.get(`users/${id}/posts`)
  return response
}

// Get user by ID
export const getUserById = async (id) => {
  const response = await httpRequest.get(`/users/${id}`);
  return response;
};

// Update existing user
export const updateUser = async (id, userData) => {
  const response = await httpRequest.put(`/users/${id}`, userData);
  return response;
};

// Delete user
export const deleteUser = async (id) => {
  const response = await httpRequest.del(`/users/${id}`);
  return response;
};

// Update user avatar
export const updateAvatar = async (formData) => {
  // httpRequest cần có cấu hình để xử lý multipart/form-data
  const response = await httpRequest.patch(`/users/me/avatar`, formData);
  return response;
};

// Check if username exists
export const checkUsername = async (username) => {
  const response = await httpRequest.get(`/users/check-username`, {
    params: { username },
  });
  return response;
};

// Follow a user
export const followUser = async (id) => {
  const response = await httpRequest.post(`/users/${id}/follow`, {});
  return response;
};

// Unfollow a user
export const unfollowUser = async (id) => {
  const response = await httpRequest.del(`/users/${id}/follow`,{});
  return response;
};

// Get a user's followers
export const getFollowers = async (id) => {
  const response = await httpRequest.get(`/users/${id}/followers`);
  return response;
};

export const checkStatus = async (id) => {
  const response = await httpRequest.get(`/users/${id}/follow-status`);
  return response
}

// Get a user's following list
export const getFollowing = async (id) => {
  const response = await httpRequest.get(`/users/${id}/following`);
  return response;
};

// Block a user
export const blockUser = async (id) => {
  const response = await httpRequest.post(`/users/${id}/block`);
  return response;
};

// Unblock a user
export const unblockUser = async (id) => {
  const response = await httpRequest.del(`/users/${id}/block`);
  return response;
};

// Get the current user's blocked list
export const getMyBlockedUsers = async () => {
  const response = await httpRequest.get(`/users/blocked/me`);
  return response;
};

// Get the current user's friend list
export const getMyFriends = async () => {
  const response = await httpRequest.get(`/users/friends/me`);
  return response;
};

// Get all posts by user ID
export const getUserPosts = async (userId) => {
  const response = await httpRequest.get(`/users/${userId}/posts`);
  return response;
};

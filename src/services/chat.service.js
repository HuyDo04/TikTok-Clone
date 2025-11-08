import httpRequest from "@/utils/httpRequest";

// ===============================
//  Chat CRUD
// ===============================

// Tạo chat mới
export const createChat = async (data) => {
  const response = await httpRequest.post("/chats", data);
  return response;
};

// Lấy tất cả chat của người dùng hiện tại
export const getChats = async () => { 
  const response = await httpRequest.get("/chats"); 
  console.log("getChats response", response);
  
  return response; 
};

// Lấy chi tiết chat theo ID
export const getChatById = async (chatId) => {
  const response = await httpRequest.get(`/chats/${chatId}`);
  return response;
};

// Cập nhật thông tin chat (ví dụ: tên nhóm, ảnh đại diện)
export const updateChat = async (chatId, data) => {
  const response = await httpRequest.put(`/chats/${chatId}`, data);
  return response;
};

// Xóa chat (nếu là chủ sở hữu hoặc chat cá nhân)
export const deleteChat = async (chatId) => {
  const response = await httpRequest.del(`/chats/${chatId}`);
  return response;
};

// ===============================
//  Tin nhắn (chỉ load lịch sử, gửi/đọc qua WebSocket)
// ===============================

// Lấy danh sách tin nhắn trong chat
export const getMessages = async (chatId, params = {}) => {
  const response = await httpRequest.get(`/chats/${chatId}/messages`, { params });
  return response;
};

// ===============================
//  Chat request (tin nhắn chờ)
// ===============================

// Lấy danh sách chat request
export const getChatRequests = async () => {
  const response = await httpRequest.get("/chats/requests");
  return response;
};

// Chấp nhận chat request
export const acceptChatRequest = async (chatId) => {
  const response = await httpRequest.patch(`/chats/requests/${chatId}/accept`);
  return response;
};

// Từ chối chat request
export const declineChatRequest = async (chatId) => {
  const response = await httpRequest.del(`/chats/requests/${chatId}/decline`);
  return response;
};

// ===============================
//  Thành viên trong chat
// ===============================

// Lấy danh sách thành viên trong chat
export const getChatMembers = async (chatId) => {
  const response = await httpRequest.get(`/chats/${chatId}/members`);
  return response;
};

// Thêm thành viên mới vào chat
export const addMember = async (chatId, data) => {
  const response = await httpRequest.post(`/chats/${chatId}/members`, data);
  return response;
};

// Xóa thành viên khỏi chat
export const removeMember = async (chatId, userId) => {
  const response = await httpRequest.del(`/chats/${chatId}/members/${userId}`);
  return response;
};

// Thành viên rời khỏi chat
export const leaveChat = async (chatId) => {
  const response = await httpRequest.patch(`/chats/${chatId}/leave`);
  return response;
};

// ===============================
//  Tìm chat theo danh sách thành viên (ví dụ: giữa 2 người)
// ===============================
export const getChatByMemberIds = async (memberIds) => {
  const query = Array.isArray(memberIds) ? memberIds.join(",") : memberIds;
  const response = await httpRequest.get(`/chats/find/by-members`, {
    params: { memberIds: query },
  });
  return response;
};

import httpRequest from "@/utils/httpRequest";

// Create a new chat
export const createChat = async (data) => {
  const response = await httpRequest.post("/chats", data);
  return response;
};

// Get all chats for the current user
export const getChats = async () => {
  const response = await httpRequest.get("/chats");
  return response;
};

// Get messages for a specific chat
export const getMessages = async (chatId) => {
  const response = await httpRequest.get(`/chats/${chatId}/messages`);
  return response;
};

// Send a message in a chat
export const sendMessage = async (chatId, data) => {
  const response = await httpRequest.post(`/chats/${chatId}/messages`, data);
  return response;
};

// Get chat by ID
export const getChatById = async (chatId) => {
  const response = await httpRequest.get(`/chats/${chatId}`);
  return response;
};

// Add a member to a chat
export const addMember = async (chatId, data) => {
  const response = await httpRequest.post(`/chats/${chatId}/members`, data);
  return response;
};

// Remove a member from a chat
export const removeMember = async (chatId, userId) => {
  const response = await httpRequest.del(`/chats/${chatId}/members/${userId}`);
  return response;
};

import httpRequest from "@/utils/httpRequest";

export const createComment = async (data) => {
  const response = await httpRequest.post("/comments", data);
  return response;
};

export const getCommentsByPost = async (postId) => {
  const response = await httpRequest.get(`/comments/post/${postId}`);
  return response;
};

export const updateComment = async (id, data) => {
  const response = await httpRequest.put(`/comments/${id}`, data);
  return response;
};

export const deleteComment = async (id) => {
  const response = await httpRequest.del(`/comments/${id}`);
  return response;
};

export const replyComment = async (id, data) => {
  const response = await httpRequest.post(`/comments/${id}/reply`, data);
  return response;
}

// Like a comment
export const likeComment = async (id) => {
    return await httpRequest.post(`/comments/${id}/like`);
};

// Unlike a comment
export const unlikeComment = async (id) => {
    return await httpRequest.del(`/comments/${id}/like`);
};
import httpRequest from "@/utils/httpRequest";

// Build FormData từ object postData
const buildFormData = (postData) => {
  const formData = new FormData();
  for (const key in postData) {
    if (!postData[key]) continue;

    if (key === "featuredImage") {
      formData.append("file", postData.featuredImage); // backend nhận file với key "file"
    } else if (key === "media") {
      postData.media.forEach((m) => formData.append("file", m)); // tất cả media upload từng file
    } else {
      formData.append(key, postData[key]);
    }
  }
  return formData;
};

// Upload file đơn lẻ (ảnh hoặc video)
export const uploadPostFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return await httpRequest.post("/posts/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Tạo bài viết mới
export const createPost = async (postData) => {
  const dataToSend =
    postData instanceof FormData ? postData : buildFormData(postData);
  return await httpRequest.post("/posts", dataToSend, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Cập nhật bài viết
export const updatePost = async (id, postData) => {
  const dataToSend =
    postData instanceof FormData ? postData : buildFormData(postData);
  return await httpRequest.put(`/posts/${id}`, dataToSend, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Lấy list video có xử lý login
export const getUserVideosByUsername = async (username) => {
  const response = await httpRequest.get(`/users/${username}/videos`);
  return response;
}

// Các API khác 
export const getFeedPosts = async ({ page = 1, limit = 3, body = {} }) => {
  // API này sử dụng POST, và backend sẽ tự xác định user đã login hay chưa
  // dựa vào Authorization header được gắn tự động bởi httpRequest interceptor.
  // Body có thể chứa các thông tin bổ sung như `excludedPostIds`.
  return httpRequest.post("/posts/feed", body, { params: { page, limit } });
};

export const searchPostsByHashtag = async (tagName) =>
  httpRequest.get(`/posts/search/hashtag/${tagName}`);

export const getPostsByMentionedUser = async (username) =>
  httpRequest.get(`/posts/mentions/${username}`);

export const getPostBySlug = async (slug) =>
  httpRequest.get(`/posts/by-slug/${slug}`);

export const getPostById = async (id) =>
  httpRequest.get(`/posts/${id}`);

export const incrementPostView = async (id) =>
  httpRequest.post(`/posts/${id}/view`);

export const deletePost = async (id) =>
  httpRequest.del(`/posts/${id}`);

export const deletePostMedia = async (id, mediaIndex) =>
  httpRequest.del(`/posts/${id}/media/${mediaIndex}`);

export const likePost = async (id) =>
  httpRequest.post(`/posts/${id}/like`);

export const unlikePost = async (id) =>
  httpRequest.del(`/posts/${id}/unlike`);

export const repost = async (id) => 
  httpRequest.post(`/posts/${id}/repost`);

export const unRepost = async (id) => 
  httpRequest.del(`/posts/${id}/repost`);

import httpRequest from "@/utils/httpRequest";

// Search for content (posts, users, etc.)
export const search = async (query) => {
  const response = await httpRequest.get("/search", {
    params: { q: query },
  });
  return response;
};

// Get search history for the current user
export const getSearchHistory = async () => {
  const response = await httpRequest.get("/search/history");
  return response;
};

// Clear all search history for the current user
export const clearSearchHistory = async () => {
  const response = await httpRequest.del("/search/history");
  return response;
};

// Delete a specific search history item for the current user
export const deleteSearchHistoryItem = async (historyId) => {
  const response = await httpRequest.del(`/search/history/${historyId}`);
  return response;
};
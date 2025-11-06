import httpRequest from "@/utils/httpRequest";

// Create a new livestream
export const createStream = async (data) => {
  const response = await httpRequest.post("/streams/create", data);
  return response;
};

// Get all live streams
export const getLiveStreams = async () => {
  const response = await httpRequest.get("/streams");
  return response;
};

// Get stream details by ID
export const getStreamById = async (id) => {
  const response = await httpRequest.get(`/streams/${id}`);
  return response;
};

// End a livestream
export const endStream = async (id) => {
  const response = await httpRequest.post(`/streams/${id}/end`);
  return response;
};

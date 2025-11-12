
export const formatImageUrl = (url) => {
  if (typeof url === "string" && url.startsWith("public/")) {
    return `/${url.substring(7)}`;
  }
  return url;
};
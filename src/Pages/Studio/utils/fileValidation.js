export const validateVideoFile = async (file) => {
  // Check file size (max 30GB = 30 * 1024 * 1024 * 1024 bytes)
  const maxSize = 30 * 1024 * 1024 * 1024
  if (file.size > maxSize) {
    return "Video vượt quá dung lượng tối đa 30GB"
  }

  // Check video duration
  return new Promise((resolve) => {
    const video = document.createElement("video")
    video.preload = "metadata"

    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src)
      const duration = video.duration

      if (duration < 5) {
        resolve("Video phải dài ít nhất 5 giây")
      } else if (duration > 1000) {
        // 5 minutes = 300 seconds
        resolve("Video không được dài quá 5 phút")
      } else {
        resolve(null)
      }
    }

    video.onerror = () => {
      resolve("Không thể đọc thông tin video")
    }

    video.src = URL.createObjectURL(file)
  })
}

export const validateImageFiles = (files) => {
  // Check file types
  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]

  for (const file of files) {
    if (!validTypes.includes(file.type)) {
      return `File ${file.name} không phải là định dạng ảnh hợp lệ`
    }

    // Check file size (max 10MB per image)
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      return `Ảnh ${file.name} vượt quá dung lượng tối đa 10MB`
    }
  }

  return null
}

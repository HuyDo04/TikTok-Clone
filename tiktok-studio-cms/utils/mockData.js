// Mock data for posts
const mockPosts = [
  {
    id: "1",
    caption: "Không có mô tả",
    thumbnail: "/video-thumbnail-1.png",
    type: "video",
    duration: "00:28",
    date: "21 tháng 2, 2024, 11:09 CH",
    createdAt: "2024-02-21T23:09:00",
    privacy: "friends",
    views: 577,
    likes: 14,
    comments: 1,
    shares: 0,
  },
  {
    id: "2",
    caption: "😂",
    thumbnail: "/video-thumbnail-2.png",
    type: "video",
    duration: "00:12",
    date: "4 tháng 2, 2024, 11:35 CH",
    createdAt: "2024-02-04T23:35:00",
    privacy: "private",
    views: 329,
    likes: 14,
    comments: 1,
    shares: 0,
  },
  {
    id: "3",
    caption: "Peaceful. #CapCut",
    thumbnail: "/video-thumbnail-3.jpg",
    type: "video",
    duration: "00:12",
    date: "11 tháng 2, 2024, 10:07 CH",
    createdAt: "2024-02-11T22:07:00",
    privacy: "friends",
    views: 250,
    likes: 5,
    comments: 0,
    shares: 0,
  },
  {
    id: "4",
    caption: "#TikTokAwardsVN2023",
    thumbnail: "/video-thumbnail-4.jpg",
    type: "video",
    duration: "00:16",
    date: "24 tháng 11, 2023, 6:21 CH",
    createdAt: "2023-11-24T18:21:00",
    privacy: "public",
    views: 359,
    likes: 12,
    comments: 0,
    shares: 0,
  },
  {
    id: "5",
    caption: "Không có mô tả",
    thumbnail: "/video-thumbnail-5.jpg",
    type: "video",
    duration: "00:13",
    date: "22 tháng 1, 2023, 1:10 CH",
    createdAt: "2023-01-22T13:10:00",
    privacy: "private",
    views: 0,
    likes: 0,
    comments: 0,
    shares: 0,
  },
]

export const getAllPosts = () => {
  return [...mockPosts]
}

export const getPostById = (id) => {
  return mockPosts.find((post) => post.id === id)
}

export const getRecentPosts = (limit = 3) => {
  return mockPosts.slice(0, limit)
}

export const getStatsForPeriod = (period) => {
  // Mock stats based on period
  const baseStats = {
    views: 1515,
    viewsChange: 12,
    profileViews: 0,
    profileViewsChange: 0,
    likes: 45,
    likesChange: 8,
    comments: 2,
    commentsChange: -50,
    shares: 0,
    sharesChange: 0,
  }

  return baseStats
}

export const getChartDataForPeriod = (period) => {
  const days = period === "7" ? 7 : period === "28" ? 28 : 60
  const data = []

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)

    data.push({
      label: `${date.getDate()}/${date.getMonth() + 1}`,
      value: Math.floor(Math.random() * 100) + 50,
    })
  }

  return data
}

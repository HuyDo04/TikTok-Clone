"use client"

export default function TipsSection() {
  const tips = [
    {
      title: "Duy trì tài khoản của bạn ở trạng thái tốt nhất thì năng điểm tra nỗ dụng nhanh",
      description:
        "Bạn muốn tối ưu hoá tài khoản của mình? Tìm hiểu kiểm tra nỗ dụng nhanh! Khi bật mục cài này, bạn sẽ...",
      image: "/creator-tips.jpg",
    },
    {
      title: "Xin giới thiệu Cẩm hồng sáng tạo",
      description:
        "Bạn cần bạo giá để tìm ý tưởng nội dụng mới chưa? Chúng tôi hoàn toàn hiểu! Đó là lý do chúng tôi tạo ra Cẩm hồng sáng tạo.",
      image: "/creative-inspiration.jpg",
    },
    {
      title: "Hoàn thiện chiến lược của bạn với Trợ lý nhà sáng tạo",
      description:
        "Trợ lý nhà sáng tạo của TikTok là trình quản lý tài khoản được cá nhân hoá dành riêng cho bạn. Bước tuy chiến lược theo nhu cầu...",
      image: "/strategy-assistant.jpg",
    },
    {
      title: "Tại sao video của bạn không được đề xuất trên bảng tin Để xuất?",
      description:
        "Bằng tin Để xuất là trái tim của TikTok. Đây là nơi có cơ hội để bạn và nội dụng của bạn được khám phá...",
      image: "/video-recommendations.jpg",
    },
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Thông tin cho bạn</h3>

      <div className="space-y-4">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="flex gap-3">
              <img
                src={tip.image || "/placeholder.svg"}
                alt={tip.title}
                className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">{tip.title}</h4>
                <p className="text-xs text-gray-600 line-clamp-2">{tip.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

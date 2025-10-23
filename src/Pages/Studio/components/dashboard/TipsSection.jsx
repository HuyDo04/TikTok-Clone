"use client"

import classNames from "classnames/bind"
import styles from "./TipsSection.module.scss"

const cx = classNames.bind(styles)

export default function TipsSection() {
  const tips = [
    {
      title: "Cách tạo nét riêng cho hồ sơ TikTok của bạn",
      description: "Chào mừng bạn đến với TikTok! Bây giờ tài khoản của bạn đã được thiết lập xong, hãy cùng tìm hiểu cách khiến cho hồ sơ của bạn mang đậm dấu ấn cá nhân.",
      image: "https://p16-ttark-sg.tiktokcdn.com/tos-alisg-i-0twjg7x6w4-sg/5bac72a5ac913a35a09f9d1b3b8ce8e2.PNG~tplv-0twjg7x6w4-default:0:0:q75.image",
      href: "https://www.tiktok.com/creator-academy/article/how-to-personalize-profile"
    },
    {
      title: "Nguyên tắc Cộng đồng",
      description: "TikTok là nơi để mọi người khám phá những điều họ yêu thích, xây dựng cộng đồng và thể hiện bản thân.Sứ mệnh của chúng tôi rất đơn giản: chúng tôi muốn truyền cảm hứng sáng tạo và mang lại niềm vui",
      image: "https://p16-ttark-sg.tiktokcdn.com/tos-alisg-i-0twjg7x6w4-sg/7fe8b3a7d359f175a71dd088b18751a0.JPEG~tplv-0twjg7x6w4-default:0:0:q75.image",
      href: "https://www.tiktok.com/creator-academy/article/community-guidelines-overview"
    },
    {
      title: "Chương trình Creator Rewards",
      description: "Nếu bạn đam mê tạo video TikTok dài, chất lượng cao và biến khả năng sáng tạo của mình thành phần thưởng, chúng tôi có một chương trình đặc biệt dành riêng cho bạn:Chương trình Creator Rewards!",
      image: "https://p16-ttark-sg.tiktokcdn.com/tos-alisg-i-0twjg7x6w4-sg/3b4cf29b9b5fc06ef82f531e30182012.png~tplv-0twjg7x6w4-default:0:0:q75.image",
       href: "https://www.tiktok.com/creator-academy/article/creator-rewards-program"
    },
    {
      title: "Tại sao video của bạn không được đề xuất trên bảng tin Đề xuất?",
      description: "Bảng tin Đề xuất là trái tim của trải nghiệm TikTok. Đây là nơi bạn có thể khám phá những sở thích và thú vui mới, và là nơi các nhà sáng tạo xây dựng những cộng đồng mới phát triển mạnh mẽ. Bảng tin hoạt động nhờhệ thống đề xuấtcủa chúng tôi, giúp kết nối bạn với nội dung, các nhà sáng tạo khác và các chủ đề mà có thể bạn yêu thích. Hệ thống cân nhắc những điều bạn thích, chia sẻ, bình luận và tìm kiếm, cũng như những nội dung đang thịnh hành. Chúng tôi áp dụngcác tiêu chuẩn về điều kiện đối với nội dung hiển thị trên bảng tin Đề xuất, ưu tiên sự an toàn và dựa trên sự đa dạng của các hoạt động văn hóa và cộng đồng của chúng tôi.",
      image: "https://p16-ttark-sg.tiktokcdn.com/tos-alisg-i-0twjg7x6w4-sg/4c1484977206fa0502b05d9884839831.PNG~tplv-0twjg7x6w4-default:0:0:q75.image",
      href: "https://www.tiktok.com/creator-academy/article/video-not-recommended"
    },
  ]

  return (
    <div className={cx("wrapper")}>
      <h3 className={cx("title")}>Thông tin cho bạn</h3>

      <div className={cx("tipsList")}>
        {tips.map((tip, index) => (
          <a href={tip.href} target="_blank" rel="noopener noreferrer">
            <div key={index} className={cx("tipCard")}>
            <div className={cx("tipContent")}>
              <img
                src={tip.image || "/placeholder.svg"}
                alt={tip.title}
                className={cx("tipImage")}
              />
              <div className={cx("tipTextContainer")}>
                <h4 className={cx("tipTitle")}>{tip.title}</h4>
                <p className={cx("tipDescription")}>{tip.description}</p>
              </div>
            </div>
          </div>
          </a>
        ))}
      </div>
    </div>
  )
}

import styles from "./Explore.module.scss";
import classNames from "classnames/bind";
import { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaHeart } from "react-icons/fa";

const cx = classNames.bind(styles);

function Explore() {
  const listItem = [
    "Tất cả",
    "Ca hát và khiêu vũ",
    "Giải trí",
    "Thể thao",
    "Truyện tranh và hoạt hình",
    "Mối quan hệ",
    "Chương trình",
    "Hát nhép",
    "Đời sống",
    "Chăm sóc sắc đẹp",
    "Trò chơi",
    "Xã hội",
    "Trang phục",
    "Xe hơi",
    "Ẩm thực",
    "Thú Cưng",
    "Bé yêu & Gia đình",
    "Chuyện Drama",
    "Gym & Sức khỏe",
    "Giáo dục",
    "Công nghệ",
  ];

  const videos = [
    {
      id: 1,
      videoUrl:
        "https://www.pexels.com/vi-vn/video/thien-nga-thanh-th-n-l-t-tren-h-killarney-31225606/",
      username: "user1",
      likes: 1000,
      comments: 200,
      caption: "Đây là video đầu tiên!",
      thumbnail: "https://picsum.photos/200/300",
    },
    {
      id: 2,
      videoUrl:
        "https://www.pexels.com/vi-vn/video/thien-nga-thanh-th-n-l-t-tren-h-killarney-31225606/",
      username: "user2",
      likes: 500,
      comments: 50,
      caption: "Video thứ hai nè!",
      thumbnail: "https://picsum.photos/200/300",
    },
    {
      id: 3,
      videoUrl:
        "https://www.pexels.com/vi-vn/video/thien-nga-thanh-th-n-l-t-tren-h-killarney-31225606/",
      username: "user2",
      likes: 500,
      comments: 50,
      caption: "Video thứ hai nè!",
      thumbnail: "https://picsum.photos/200/300",
    },
    {
      id: 4,
      videoUrl:
        "https://www.pexels.com/vi-vn/video/thien-nga-thanh-th-n-l-t-tren-h-killarney-31225606/",
      username: "user2",
      likes: 500,
      comments: 50,
      caption: "Video thứ hai nè!",
      thumbnail: "https://picsum.photos/200/300",
    },
    {
      id: 5,
      videoUrl:
        "https://www.pexels.com/vi-vn/video/thien-nga-thanh-th-n-l-t-tren-h-killarney-31225606/",
      username: "user2",
      likes: 500,
      comments: 50,
      caption: "Video thứ hai nè!",
      thumbnail: "https://picsum.photos/200/300",
    },
    {
      id: 6,
      videoUrl:
        "https://www.pexels.com/vi-vn/video/thien-nga-thanh-th-n-l-t-tren-h-killarney-31225606/",
      username: "user2",
      likes: 500,
      comments: 50,
      caption: "Video thứ hai nè!",
      thumbnail: "https://picsum.photos/200/300",
    },
    {
      id: 7,
      videoUrl:
        "https://www.pexels.com/vi-vn/video/thien-nga-thanh-th-n-l-t-tren-h-killarney-31225606/",
      username: "user2",
      likes: 500,
      comments: 50,
      caption: "Video thứ hai nè!",
      thumbnail: "https://picsum.photos/200/300",
    },
    {
      id: 8,
      videoUrl:
        "https://www.pexels.com/vi-vn/video/thien-nga-thanh-th-n-l-t-tren-h-killarney-31225606/",
      username: "user2",
      likes: 500,
      comments: 50,
      caption: "Video thứ hai nè!",
      thumbnail: "https://picsum.photos/200/300",
    },
    {
      id: 9,
      videoUrl:
        "https://www.pexels.com/vi-vn/video/thien-nga-thanh-th-n-l-t-tren-h-killarney-31225606/",
      username: "user2",
      likes: 500,
      comments: 50,
      caption: "Video thứ hai nè!",
      thumbnail: "https://picsum.photos/200/300",
    },
  ];

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const tabListRef = useRef(null);

  const handleScroll = () => {
    const tabList = tabListRef.current;
    if (tabList) {
      const { scrollLeft, scrollWidth, clientWidth } = tabList;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const handlePrev = () => {
    const tabList = tabListRef.current;
    if (tabList) {
      tabList.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    const tabList = tabListRef.current;
    if (tabList) {
      tabList.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  useEffect(() => {
    handleScroll();
  }, []);

  return (
    <div className={cx("tab-content")}>
      <div className={cx("tabs-container")}>
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            className={cx("nav-button", "nav-button-left")}
            onClick={handlePrev}
            aria-label="Previous tabs"
          >
            <FaChevronLeft />
          </button>
        )}

        <div className={cx("tabs-wrapper")}>
          <div className={cx("tabs-inner-wrapper")}>
            <div
              className={cx("tabs-list")}
              ref={tabListRef}
              onScroll={handleScroll}
            >
              {listItem.map((item, index) => (
                <button
                  key={index}
                  className={cx("tab-btn", {
                    active: activeIndex === index,
                  })}
                  onClick={() => setActiveIndex(index)}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className={cx("tab-content-inner")}>
              <div className={cx("video-list")}>
                {videos.map((video) => (
                  <div key={video.id} className={cx("video-card")}>
                    <div className={cx("video-wrapper")}>
                      <video
                        className={cx("video")}
                        src={video.videoUrl}
                        controls
                        muted
                        loop
                        poster={video.thumbnail}
                      />
                    </div>
                    <div className={cx("video-info")}>
                      <div className={cx("user-info")}>
                        <span className={cx("username")}>
                          {video.username}
                        </span>
                      </div>
                      <div className={cx("video-stats")}>
                        <span>
                          <FaHeart /> {video.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {canScrollRight && (
          <button
            className={cx("nav-button", "nav-button-right")}
            onClick={handleNext}
            aria-label="Next tabs"
          >
            <FaChevronRight />
          </button>
        )}
      </div>
    </div>
  );
}

export default Explore;

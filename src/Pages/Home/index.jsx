import Sidebar from "@/component/Sidebar";
import VideoCard from "@/component/VideoCard";
import classNames from "classnames/bind";

import styles from "./Home.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "@/features/auth/authAsync";
import { BsDownload, BsPhone, BsTiktok } from "react-icons/bs";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import MessagePage from "@/component/Sidebar/component/message/MessagePage";
const cx = classNames.bind(styles);

function Home() {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const user = useSelector((state) => state.auth.currentUser);

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
  ];

  return (
    <div className={cx("app")}>
      <div className={cx("main-content")}>
        <Sidebar />
        <div className={cx("video-feed")}>
          <MessagePage />
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
        {user ? (
          <div className={cx("action-buttons-container")}>
            <div className={cx("action-buttons")}>
              <div className={cx("top-righ-action-bar")}>
                <div className={cx("action-button")}>
                  <button className={cx("button")}>
                    <BsTiktok />
                  </button>
                  <div className={cx("button-hover")}>Nhận xu</div>
                </div>
                <div className={cx("action-button")}>
                  <button className={cx("button")}>
                    <BsPhone />
                  </button>
                  <div className={cx("button-hover")}>Tải ứng dụng</div>
                </div>
                <div className={cx("action-button")}>
                  <button className={cx("button")}>
                    <BsDownload />
                  </button>
                  <div className={cx("button-hover")} style={{ left: "auto" }}>
                    Ứng dung dành cho máy tính
                  </div>
                </div>
                <div className={cx("action-button")}>
                  <button
                    className={cx("button-avatar")}
                    onClick={handleToggle}
                  >
                    <img src="https://picsum.photos/200" />
                  </button>
                  {open && (
                    <div className={cx("menu")}>
                      <Link
                        to={`/profile/${user.username}`}
                        className={cx("menu-item")}
                      >
                        <FaUser /> <span> Xem hồ sơ</span>
                      </Link>
                      <Link to="" className={cx("menu-item")}>
                        <FaSignOutAlt /> <span>Đăng xuất</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {/* <SuggestedAccounts /> */}
      </div>
    </div>
  );
}

export default Home;

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./LiveDetailPage.module.scss";

import LiveVideo from "@/component/Live/LiveVideo";
import LiveChat from "@/component/Live/LiveChat";
import Button from "@/component/Button";

const cx = classNames.bind(styles);

// Mock data - This should be replaced with API calls in the future
const liveUsers = [
    {
      id: 1,
      username: "hungmatkho",
      displayName: "Cao Hùng Logistics",
      avatar: "https://picsum.photos/200/300",
      viewers: 628,
      title: "trầm tính ít nói...chs VIP10-923",
      isLive: true,
    },
    {
      id: 2,
      username: "thoi0526",
      displayName: "Hoài Chế",
      avatar: "https://picsum.photos/200/300",
      viewers: 11,
      title: "Chơi game cùng bạn",
      isLive: true,
    },
    {
      id: 3,
      username: "sammishop",
      displayName: "SammiShop Official",
      avatar: "https://picsum.photos/200/300",
      viewers: 5,
      title: "Giới thiệu sản phẩm mới",
      isLive: true,
    },
    {
      id: 4,
      username: "hindeptrai123",
      displayName: "Draven TV",
      avatar: "https://picsum.photos/200/300",
      viewers: 250,
      title: "Phát trực tiếp game",
      isLive: true,
    },
];


function LiveDetailPage() {
  const { id } = useParams();
  const [live, setLive] = useState(null);
  const [comments, setComments] = useState([]);
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    const selectedLive = liveUsers.find(user => user.id === parseInt(id));
    setLive(selectedLive);

    if (selectedLive) {
      // Mock fetching comments for the selected live
      setComments([
        { id: 1, username: "viewer1", avatar: "/placeholder-user.jpg", message: "Hello!" },
        { id: 2, username: "viewer2", avatar: "/placeholder-user.jpg", message: "Great stream!" },
      ]);
    }
  }, [id]);

  const handleSendComment = (message) => {
    const newComment = {
      id: comments.length + 1,
      username: "You",
      avatar: "/current-user.jpg",
      message: message,
    };
    setComments([...comments, newComment]);
  };

  const handleFollowToggle = () => {
    setIsFollowed(!isFollowed);
  };

  if (!live) {
    return <div className={cx("loading")}>Loading...</div>;
  }

  return (
    <div className={cx("live-detail-wrapper")}>
        <div className={cx("header-container")}>
            <Link to="/live" className={cx("back-button")}>&larr; Back to Live List</Link>
            <div className={cx("stream-header")}>
                <div className={cx("user-info")}>
                    <img src={live.avatar} alt={live.displayName} className={cx("avatar")} />
                    <div>
                        <h2 className={cx("username")}>{live.displayName}</h2>
                        <p className={cx("viewers")}>{live.viewers} viewers</p>
                    </div>
                </div>
                <Button primary onClick={handleFollowToggle}>
                {isFollowed ? "Following" : "Follow"}
                </Button>
            </div>
        </div>
      <div className={cx("main-content")}>
        <LiveVideo live={live} />
        <LiveChat comments={comments} onSendComment={handleSendComment} />
      </div>
    </div>
  );
}

export default LiveDetailPage;
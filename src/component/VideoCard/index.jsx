import { FaHeart, FaComment, FaShare, FaBookmark } from "react-icons/fa";
import styles from "./VideoCard.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function VideoCard({ video }) {
  return (
    <div className={cx("video-card")}>
      <div className={cx("video-container")}>
        <video src={video.videoUrl} controls />
      </div>
      <div className={cx("video-actions")}>
        <button>
          <FaHeart />
          <span>{video.likes}</span>
        </button>
        <button>
          <FaComment />
          <span>{video.comments}</span>
        </button>
        <button>
          <FaShare />
          <span>Chia sẻ</span>
        </button>
        <button>
          <FaBookmark />
        </button>
      </div>
      <div className={cx("video-info")}>
        <p className={cx("username")}>@{video.username}</p>
        <p className={cx("caption")}>{video.caption}</p>
      </div>
    </div>
  );
}

export default VideoCard;

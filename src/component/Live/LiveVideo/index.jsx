
import classNames from "classnames/bind";
import styles from "./LiveVideo.module.scss";

const cx = classNames.bind(styles);

function LiveVideo({ live }) {
  return (
    <div className={cx("video-player")}>
      <div className={cx("video-container")}>
        <img src={live.thumbnail || "/placeholder.svg"} alt={live.title} className={cx("video")} />
        <div className={cx("overlay")}>
          <div className={cx("live-info")}>
            <span className={cx("live-badge")}>LIVE</span>
            <span className={cx("viewers")}>{live.viewers} người xem</span>
          </div>
        </div>
      </div>

      <div className={cx("live-details")}>
        <div className={cx("header")}>
          <div className={cx("user-info")}>
            <img src={live.avatar || "/placeholder.svg"} alt={live.username} className={cx("avatar")} />
            <div className={cx("info")}>
              <h3>{live.username}</h3>
              <p>{live.displayName}</p>
            </div>
          </div>
          <button className={cx("follow-btn")}>+ Follow</button>
        </div>

        <h2 className={cx("title")}>{live.title}</h2>
      </div>
    </div>
  );
}

export default LiveVideo;

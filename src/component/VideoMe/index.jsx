
import classNames from "classnames/bind";
import styles from "./VideoMe.module.scss";

const cx = classNames.bind(styles);

function VideoMe({ video }) {
  const formatViews = (views) => {
    if (views >= 1000000) return (views / 1000000).toFixed(1) + "M";
    if (views >= 1000) return (views / 1000).toFixed(1) + "K";
    return views.toString();
  };

  return (
    <div className={cx('videome')}>
      <img 
        src={video.thumbnail || "/placeholder.svg"} 
        alt={video.title || "Video thumbnail"} 
        className={cx('thumbnail')}
      />
      <div className={cx('overlay')}>
        <span className={cx('playIcon')}>
          ▶
        </span>
      </div>
      <div className={cx('views')}>
          <span className={cx('viewsIcon')}>▶</span>
          <span>{formatViews(video.views)}</span>
        </div>
    </div>
  );
}

export default VideoMe;

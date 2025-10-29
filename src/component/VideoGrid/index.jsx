
import classNames from "classnames/bind";
import styles from "./VideoGrid.module.scss";
import VideoMe from "../VideoMe";

const cx = classNames.bind(styles);

function VideoGrid({ videos }) {
  if (!videos || videos.length === 0) {
    return <div className={cx('noVideos')}>No videos to display.</div>;
  }

  return (
    <div className={cx('videoGrid')}>
      {videos.map((video) => (
        <VideoMe key={video.id} video={video} />
      ))}
    </div>
  );
}

export default VideoGrid;


import classNames from "classnames/bind";
import styles from "./VideoGrid.module.scss";
import VideoMe from "../VideoMe";
import { PlayIcon } from "lucide-react";

const cx = classNames.bind(styles);

function VideoGrid({ videos, onVideoClick }) {
  if (!videos || videos.length === 0) {
    return <div className={cx('noVideos')}>Chưa có video nào.</div>;
  }

  return (
    <div className={cx('videoGrid')}>
      {videos.map((video) => (
        <VideoMe key={video.id} video={video} onClick={() => onVideoClick && onVideoClick(video)} />
      ))}
    </div>
  );
}

export default VideoGrid;

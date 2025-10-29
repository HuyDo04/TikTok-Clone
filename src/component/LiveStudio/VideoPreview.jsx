import { forwardRef } from "react";
import classNames from "classnames/bind";
import styles from "./VideoPreview.module.scss";

const cx = classNames.bind(styles);

const VideoPreview = forwardRef(({ videoRef, isLive }, ref) => {
  return (
    <div className={cx("video-preview")}>
      <div className={cx("video-container")}>
        {isLive ? (
          <video ref={videoRef} autoPlay playsInline muted className={cx("video")} />
        ) : (
          <div className={cx("placeholder")}>
            <p>Camera sẽ hiển thị ở đây</p>
            <p className={cx("hint")}>Bấm "Go Live" để bắt đầu</p>
          </div>
        )}
      </div>

      {isLive && (
        <div className={cx("live-indicator")}>
          <span className={cx("dot")}></span>
          <span>LIVE</span>
        </div>
      )}
    </div>
  )
});

export default VideoPreview;
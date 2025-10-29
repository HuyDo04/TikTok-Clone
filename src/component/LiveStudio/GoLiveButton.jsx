import classNames from "classnames/bind";
import styles from "./GoLiveButton.module.scss";

const cx = classNames.bind(styles);

function GoLiveButton({ isLive, onStartLive, onStopLive }) {
  return (
    <div className={cx("go-live-container")}>
      {!isLive ? (
        <button className={cx("go-live-btn")} onClick={onStartLive}>
          Go LIVE
        </button>
      ) : (
        <button className={cx("stop-live-btn")} onClick={onStopLive}>
          Stop LIVE
        </button>
      )}
    </div>
  )
}

export default GoLiveButton;
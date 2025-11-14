
import classNames from "classnames/bind";
import styles from "./LiveSidebar.module.scss";

const cx = classNames.bind(styles);
const DEFAULT_AVATAR = import.meta.env.VITE_DEFAULT_AVATAR;

function LiveSidebar({ liveUsers, selectedLive, onSelectLive }) {
  return (
    <aside className={cx("sidebar")}>
      <div className={cx("sidebar-header")}>
        <h2>Khám phá LIVE</h2>
      </div>

      <div className={cx("users-list")}>
        {liveUsers.map((user) => (
          <div
            key={user.id}
            className={cx("user-item", { active: selectedLive?.id === user.id })}
            onClick={() => onSelectLive(user)}
          >
            <div className={cx("user-info")}>
              <img src={user.avatar || DEFAULT_AVATAR} alt={user.username} className={cx("avatar")} />
              <div className={cx("details")}>
                <p className={cx("username")}>{user.username}</p>
                <p className={cx("display-name")}>{user.displayName}</p>
                <p className={cx("viewers")}>{user.viewers} người xem</p>
              </div>
            </div>
            <div className={cx("live-badge")}>LIVE</div>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default LiveSidebar;

import classNames from "classnames/bind"
import styles from "./UserCard.module.scss"

const cx = classNames.bind(styles)

function UserCard({ user }) {
  return (
    <div className={cx("user-card")}>
      <div className={cx("user-card-content")}>
        <div className={cx("user-avatar-section")}>
          <img src={user.avatar || "/placeholder.svg"} alt={user.displayName} className={cx("user-avatar")} />
        </div>

        <div className={cx("user-info")}>
          <div className={cx("user-header")}>
            <div className={cx("user-names")}>
              <h2 className={cx("username")}>{user.username}</h2>
              <p className={cx("user-display-name")}>
                {user.displayName}
                {user.isVerified && <span className={cx("verified-icon")}>✓</span>}
              </p>
              <p className={cx("user-meta")}>
                <span className={cx("follower-count")}>{user.followers}</span>
                <span className={cx("follower-label")}>Follower</span>
              </p>
            </div>

            <button className={cx("follow-button")}>Follow</button>
          </div>

          <p className={cx("user-bio")}>{user.bio}</p>
        </div>
      </div>
    </div>
  )
}

export default UserCard

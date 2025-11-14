import { Link } from "react-router-dom"
import classNames from "classnames/bind"
import styles from "./UserCard.module.scss"
import FollowButton from "@/component/Button/FollowButton"

const cx = classNames.bind(styles)
const URL = import.meta.env.VITE_BASE_URL_ME
const DEFAULT_AVATAR = import.meta.env.VITE_DEFAULT_AVATAR;

function UserCard({ user }) {
  console.log(user)
  return (
    <div className={cx("user-card")}>
      <Link to={`/profile/${user.username}`} className={cx("user-card-content")}>
        <div t className={cx("user-avatar-section")}>
          <img src={user.avatar ? `${URL}/${user.avatar}` : DEFAULT_AVATAR} alt={user.displayName} className={cx("user-avatar")} />
        </div>

        <div className={cx("user-info")}>
          <p className={cx("username")}>{user.username}</p>
          <div className={cx("info-detail")}>
            <p className={cx("follow-text")}>{user.username}</p>
           
            <strong className={cx("follow-text")}><span>{user.followerCount}</span> Follower</strong>
          </div>
          <strong className={cx("user-bio")}>{user.bio || "No bio yet"}</strong>
        </div>
        <FollowButton userId={user.id} />

      </Link>
    </div>
  )
}

export default UserCard

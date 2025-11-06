import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Cog, Share, MessageSquare, UserPlus } from "lucide-react";
import classNames from "classnames/bind";
import styles from "./ProfileHeader.module.scss";
import EditProfile from "../EditProfile";
import SettingsGearIcon from "../Icons/SettingsGearIcon";
import ShareArrowIcon from "../Icons/ShareArrowIcon";
import ShareMenu from "../ShareMenu/ShareMenu";

const cx = classNames.bind(styles);

function ProfileHeader({
  avatar,
  username,
  followers,
  following,
  likes,
  bio,
  isFollowing,
  isCurrentUser, // Nhận prop này từ ProfilePage
  onEdit, // Nhận hàm xử lý sự kiện từ ProfilePage
  onFollow, // Nhận hàm xử lý sự kiện từ ProfilePage
  onUnfollow, // Nhận hàm xử lý sự kiện từ ProfilePage
}) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  console.log(followers),
  console.log(following)
  return (
    <header className={cx("header")}>
      {/* Top Header with Icons */}
      {/* Main Profile Info */}
      <div className={cx("mainProfile")}>
        <div className={cx("avatarContainer")}>
          <img
            src={avatar || "https://picsum.photos/200/300"}
            alt={username}
            className={cx("avatar")}
          />
        </div>

        <div className={cx("profileInfo")}>
          <div className={cx("usernameContainer")}>
            <h1 className={cx("username")}>{username}</h1>
          </div>

          <div className={cx("stats")}>
            <div className={cx("stat")}>
              <span className={cx("statValue")}>{following}</span>
              <span className={cx("statLabel")}>Following</span>
            </div>
            <div className={cx("stat")}>
              <span className={cx("statValue")}>{followers}</span>
              <span className={cx("statLabel")}>Followers</span>
            </div>
            <div className={cx("stat")}>
              <span className={cx("statValue")}>{likes}</span>
              <span className={cx("statLabel")}>Likes</span>
            </div>
          </div>

          <p className={cx("bio")}>{bio}</p>

          {/* --- Hành động (Edit, Follow, Share...) --- */}
          <div className={cx("actions")}>
            {isCurrentUser ? (
              <>
                <button
                  className={cx("button", "editButton")}
                  onClick={onEdit} // Gọi hàm onEdit được truyền từ cha
                >
                  Sửa Hồ Sơ
                </button>
                <Link to={`/settings`} className={cx("settingsLink")}>
                  <div className={cx("settingsIcon")}>
                    <SettingsGearIcon />
                  </div>
                </Link>

                <div className={cx("shareButton")}>
                  <button
                    className={cx("shareIcon")}
                    onClick={() => setShowShareMenu(true)}
                  >
                    <ShareArrowIcon />
                  </button>
                </div>

                <ShareMenu
                  isOpen={showShareMenu}
                  onClose={() => setShowShareMenu(false)}
                />
              </>
            ) : (
              <>
                {isFollowing ? (
                  <button onClick={onUnfollow} className={cx("button", "unfollowButton")}>Bỏ theo dõi</button>
                ) : (
                  <button onClick={onFollow} className={cx("button", "followButton")}>Theo dõi</button>
                )}
                <button className={cx("button", "messageButton")}>
                  <MessageSquare className={cx("icon-sm")} /> Nhắn tin
                </button>
                <button className={cx("button", "shareButton")}>
                  <Share className={cx("icon-sm")} />
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}

export default ProfileHeader;

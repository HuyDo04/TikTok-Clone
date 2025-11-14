/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Ellipsis, OptionIcon, Share } from "lucide-react";
import classNames from "classnames/bind";
import styles from "./ProfileHeader.module.scss";
import FollowButton from "../Button/FollowButton";
import ShareMenu from "../ShareMenu/ShareMenu";
import SettingsGearIcon from "../Icons/SettingsGearIcon";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

function ProfileHeader({
  avatar,
  userId,
  username,
  followers,
  following,
  likes,
  bio,
  isCurrentUser,
  isBlocked,
  onEdit,
  onMessage,
  onBlock,
  onUnblock,
}) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const optionsMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (optionsMenuRef.current && !optionsMenuRef.current.contains(event.target)) {
        setShowOptionsMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [optionsMenuRef]);

  return (
    <header className={cx("header")}>
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

          <div className={cx("actions")}>
            {isCurrentUser ? (
              <>
                <button
                  className={cx("button", "editButton")}
                  onClick={onEdit}
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
                    <Share />
                  </button>
                </div>

                <ShareMenu
                  isOpen={showShareMenu}
                  onClose={() => setShowShareMenu(false)}
                />
              </>
            ) : (
              <>
                <FollowButton userId={userId} />

                <button
                  className={cx("button", "messageButton")}
                  onClick={onMessage}
                >
                  Nhắn tin
                </button>

                <button
                  className={cx("button", "shareButton")}
                  onClick={() => setShowShareMenu(true)}
                >
                  <Share className={cx("icon-sm")} />
                </button>

                <ShareMenu
                  isOpen={showShareMenu}
                  onClose={() => setShowShareMenu(false)}
                />

                <div className={cx("optionsContainer")} ref={optionsMenuRef}>
                  <button
                    className={cx("ellip-btn", "shareButton")}
                    onClick={() => setShowOptionsMenu((prev) => !prev)}
                  >
                    <Ellipsis />
                  </button>
                  {showOptionsMenu && (
                    <div className={cx("optionsMenu")}>
                      <button onClick={isBlocked ? onUnblock : onBlock}>
                        {isBlocked ? "Bỏ chặn" : "Chặn"}
                      </button>
                      {/* Thêm các tùy chọn khác ở đây nếu cần */}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default ProfileHeader;

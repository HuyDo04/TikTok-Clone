import { FaSearch, FaPlus, FaInbox, FaUser, FaBars } from "react-icons/fa";
import { BsTiktok } from "react-icons/bs";
import styles from "./NavBar.module.scss";
import classNames from "classnames/bind";
import HandleLogout from "../HandleLogout";
import { NavLink } from "react-router-dom";

const cx = classNames.bind(styles);

function Navbar({ toggleSidebar }) {
  return (
    <nav className={cx("navbar")}>
      <div className={cx("logo-container")}>
        <button className={cx("menu-btn")} onClick={toggleSidebar}>
            <FaBars />  hehhe
        </button>
        <div className={cx("logo")}>
            <NavLink to="/">
            <BsTiktok className={cx("tiktok-icon")} />
            <span>TikTok</span>
            </NavLink>
        </div>
      </div>

      <div className={cx("search-bar")}>
        <input type="text" placeholder="Tìm kiếm" />
        <button>
          <FaSearch />
        </button>
      </div>

      <div className={cx("nav-buttons")}>
        <button className={cx("upload-btn")}>
          <FaPlus />
          <span>Tải lên</span>
        </button>
        <button className={cx("inbox-btn")}>
          <FaInbox />
        </button>
        <button className={cx("profile-btn")}>
          <FaUser />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
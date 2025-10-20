/* eslint-disable no-unused-vars */
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";
import { useTheme } from "@/context/ThemeContext";
import Button from "../Button";

// Custom icons
import HomeIcon from "../Icons/HomeIcon";
import UsersIcon from "../Icons/UsersIcon";
import PlusSquareIcon from "../Icons/PlusSquareIcon";
import FocusIcon from "../Icons/FocusIcon";
import LiveIcon from "../Icons/LiveIcon";
import SearchIcon from "../Icons/SearchIcon";
import TiktokLogo from "../Icons/TiktokLogo";

// React icons
import { FaPaperPlane, FaMoon, FaSun, FaBars } from "react-icons/fa";
import MessageIcon from "../Icons/MessageIcon";

const cx = classNames.bind(styles);

// ===================== Sidebar Menu =====================
const sidebarMenu = [
  { title: "For You", icon: HomeIcon, path: "/" },
  { title: "Following", icon: UsersIcon, path: "/following" },
  { title: "Explore", icon: FocusIcon, path: "/explore" },
  { title: "LIVE", icon: LiveIcon, path: "/live" },
  { title: "Messages", icon: MessageIcon, path: "/messages" },
  { title: "Upload", icon: PlusSquareIcon, path: "/upload" },
];

const suggestedAccounts = [
  {
    id: 1,
    username: "thuytien",
    name: "Thủy Tiên",
    avatar: "https://placehold.co/40x40/FF5588/FFFFFF?text=TT",
  },
  {
    id: 2,
    username: "truongan",
    name: "Trường An Official",
    avatar: "https://placehold.co/40x70/007bff/FFFFFF?text=TA",
  },
  {
    id: 3,
    username: "minh_hieu",
    name: "Minh Hiếus",
    avatar: "https://placehold.co/40x40/28a745/FFFFFF?text=MH",
  },
];

// ===================== NavItem Component =====================
const NavItem = ({ icon: Icon, title, path, isCollapsed, onClick }) => {
  const navLinkClasses = ({ isActive }) =>
    cx("nav-item", { "nav-item-active": isActive });

  const iconProps = {className: cx("nav-icon") };

  if (path) {
    return (
      <NavLink to={path} className={navLinkClasses} onClick={onClick}>
        <Icon {...iconProps} />
        {!isCollapsed && <span className={cx("nav-text")}>{title}</span>}
      </NavLink>
    );
  }

  return (
    <div className={cx("nav-item")} onClick={onClick}>
      <Icon {...iconProps} />
      {!isCollapsed && <span className={cx("nav-text")}>{title}</span>}
    </div>
  );
};

// ===================== Sidebar Component =====================
function Sidebar({ isCollapsed, toggleSidebar, toggleSearch, closeSearch }) {
  const { theme, toggleTheme } = useTheme();

  const sidebarClasses = cx("sidebar", {
    "sidebar-collapsed": isCollapsed,
    "sidebar-expanded": !isCollapsed,
  });

  return (
    <aside className={sidebarClasses}>
      {/* ===== Logo Section ===== */}
      <div className={cx("logo-section")}>
        <NavLink to="/" className={cx("logo-link")} onClick={closeSearch}>
          {!isCollapsed && <TiktokLogo width={118} height={42} />}
        </NavLink>
        <button className={cx("menu-btn")} onClick={toggleSidebar}>
          <FaBars size={22} />
        </button>
      </div>

      {/* ===== Main Navigation ===== */}
      <div className={cx("main-nav")}>

      <NavItem
          icon={SearchIcon}
          title="Search"
          isCollapsed={isCollapsed}
          onClick={toggleSearch}
        />

        {sidebarMenu.map((item) => (
          <NavItem
            key={item.title}
            {...item}
            isCollapsed={isCollapsed}
            onClick={closeSearch}
          />
        ))}

        {/* Custom "Search" item */}
        
      </div>

      {/* ===== Theme Toggle ===== */}
      <div className={cx("nav-item")} onClick={toggleTheme}>
        {theme === "light" ? (
          <FaMoon size={24} className={cx("nav-icon")} />
        ) : (
          <FaSun size={24} className={cx("nav-icon")} />
        )}
        {!isCollapsed && (
          <span className={cx("nav-text")}>
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </span>
        )}
      </div>

      {/* ===== Expanded Only Content ===== */}
      {!isCollapsed && (
        <>
          <div className={styles.separator}></div>

          {/* Login Prompt */}
          <div className={styles["login-prompt"]}>
            <p>Log in to follow creators, like videos, and view comments.</p>
            <Button primary size="large" to="/login" onClick={closeSearch}>
              Log in
            </Button>
          </div>

          <div className={styles.separator}></div>

          {/* Suggested Accounts */}
          <div className={styles["suggested-accounts"]}>
            <p className={styles["suggested-title"]}>Suggested accounts</p>
            {suggestedAccounts.map((account) => (
              <div
                key={account.id}
                className={styles["account-item"]}
                onClick={closeSearch}
              >
                <img
                  src={account.avatar}
                  alt={account.name}
                  className={styles["account-avatar"]}
                />
                <div className={styles["account-info"]}>
                  <p className={styles["account-username"]}>
                    {account.username}
                  </p>
                  <p className={styles["account-name"]}>{account.name}</p>
                </div>
              </div>
            ))}
            <div className={styles["view-all"]} onClick={closeSearch}>
              See all
            </div>
          </div>
        </>
      )}
    </aside>
  );
}

export default Sidebar;

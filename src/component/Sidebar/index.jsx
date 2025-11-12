/* eslint-disable no-unused-vars */
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/features/auth/authSlice"; // Vui lòng kiểm tra lại đường dẫn này
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
import TiktokLogoDarkFull from "../Icons/TiktokLogoDarkFull";
import TiktokLogoLightFull from "../Icons/TiktokLogoLightFull";
import TiktokLogoDark from "../Icons/TikTokIconDark";
import TiktokLogoLight from "../Icons/TikTokIconLight";


// React icons
import { FaPaperPlane, FaMoon, FaSun, FaBars } from "react-icons/fa";
import MessageIcon from "../Icons/MessageIcon";
import FollowedIcon from "../Icons/FollowedIcon";
import AlertIcon from "../Icons/AlertIcon";
import notificationSocketService from "@/utils/notification.socket";
import { logout } from "@/services/auth.service";

const cx = classNames.bind(styles);

// ===================== Sidebar Menu =====================
const baseSidebarMenu = [
  { title: "Đề xuất", icon: HomeIcon, path: "/" },
  { title: "Khám phá", icon: FocusIcon, path: "/explore" },
  { title: "Đã follow", icon: FollowedIcon, path: "/following" },
  { title: "Bạn bè", icon: UsersIcon, path: "/friends" },
  { title: "LIVE", icon: LiveIcon, path: "/live" },
  { title: "Tin nhắn", icon: MessageIcon, path: "/messages" },
  { title: "Thông báo", icon: AlertIcon, path: "/notifications" },
  { title: "Tải lên", icon: PlusSquareIcon, path: "/studio" },
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
const NavItem = ({ icon: Icon, title, path, isCollapsed, onClick, classNames }) => {
  const navLinkClasses = ({ isActive }) =>
    cx("nav-item", { "nav-item-active": isActive });

  const iconProps = {className: cx("nav-icon") };

  if (path) {
    return (
      
      <NavLink to={path} className={navLinkClasses} onClick={onClick}>
        <div className={cx("nav-item-icon")}> 
          
          <Icon {...iconProps} />
          
        </div>
        {!isCollapsed && <span className={cx("nav-text")}>{title}</span>}
      </NavLink>
    );
  }

  return (
    <div className={cx("nav-item", classNames)} onClick={onClick}>
      <Icon {...iconProps} />
      {!isCollapsed && <span className={cx("nav-text")}>{title}</span>}
    </div>
  );
};

// ===================== Sidebar Component =====================
function Sidebar({ isCollapsed, toggleSidebar, toggleSearch, closeSearch }) {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);

  // Tạo menu động dựa trên trạng thái đăng nhập của người dùng
  const sidebarMenu = [
    ...baseSidebarMenu,
    {
      title: "Hồ sơ",
      icon: UsersIcon,
      path: currentUser ? `/profile/${currentUser.username}` : "/profile",
    },
  ];

   const handleLogout = async () => {
     try {
       const refreshToken = localStorage.getItem("refreshToken");
       if (refreshToken) {
         await logout(refreshToken); // Gọi API xóa refresh token backend
       }
     } catch (error) {
       console.error("Logout API error:", error);
     } finally {
       // Xóa token ở frontend
       dispatch(logoutUser());
 
       // Ngắt kết nối socket nếu có
       notificationSocketService.disconnect();
 
       // Reload trang về home để reset state
       window.location.href = "/";
     }
   };

  const sidebarClasses = cx("sidebar", {
    "sidebar-collapsed": isCollapsed,
    "sidebar-expanded": !isCollapsed,
  });

  return (
    <aside className={sidebarClasses}>
      {/* ===== Logo Section ===== */}
      <div className={cx("logo-section", { collapsed: isCollapsed, expanded: !isCollapsed })}>
        <NavLink
          to="/"
          className={cx("logo-link")}
          onClick={closeSearch}
        >
          {isCollapsed 
            ? (theme === 'light' ? <TiktokLogoDark /> : <TiktokLogoLight />) 
            : (theme === 'light' ? <TiktokLogoDarkFull width={118} height={42} /> : <TiktokLogoLightFull width={118} height={42} />)
          }
        </NavLink>
        <button className={cx("menu-btn")} onClick={toggleSidebar}>
          <FaBars size={22} />
        </button>
      </div>

      {/* ===== Main Navigation ===== */}
      <div className={cx("main-nav")}>
            <NavItem
              classNames={cx("search-type")}
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
          <FaMoon size={23} className={cx("nav-icon")} />
        ) : (
          <FaSun size={23} className={cx("nav-icon")} />
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

          {/* Login/Logout Section */}
          {!currentUser ? (
            <div className={styles["login-prompt"]}>
              <p>Log in to follow creators, like videos, and view comments.</p>
              <Button primary size="large" to="/auth/login" onClick={closeSearch}>
                Log in
              </Button>
            </div>
          ) : (
            <div onClick={handleLogout}>
              <Button primary size="large">
                Log out
              </Button>
            </div>
          )}

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
import { NavLink } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { useTheme } from "@/context/ThemeContext";
import Button from "../Button";

// Import icons
import { FaHome, FaCompass, FaUserFriends, FaVideo, FaMoon, FaSun } from "react-icons/fa";

const cx = classNames.bind(styles);

// Mock data from file.js
const sidebarMenu = [
    { title: "For You", icon: FaHome, active: true, path: "/" },
    { title: "Following", icon: FaUserFriends, active: false, path: "/following" },
    { title: "Explore", icon: FaCompass, active: false, path: "/explore" },
    { title: "LIVE", icon: FaVideo, active: false, path: "/live" },
];

const suggestedAccounts = [
    { id: 1, username: "thuytien", name: "Thủy Tiên", avatar: "https://placehold.co/40x40/FF5588/FFFFFF?text=TT" },
    { id: 2, username: "truongan", name: "Trường An Official", avatar: "https://placehold.co/40x70/007bff/FFFFFF?text=TA" },
    { id: 3, username: "minh_hieu", name: "Minh Hiếu", avatar: "https://placehold.co/40x40/28a745/FFFFFF?text=MH" },
];

// NavItem Component (nested for simplicity)
const NavItem = ({ icon: Icon, title, path, isCollapsed }) => (
    <NavLink to={path} className={({ isActive }) => cx("nav-item", { "nav-item-active": isActive })}>
        <Icon className={cx("nav-icon")} />
        {!isCollapsed && <span className={cx("nav-text")}>{title}</span>}
    </NavLink>
);

function Sidebar({ isCollapsed }) {
    const { theme, toggleTheme } = useTheme();

    const sidebarClasses = cx("sidebar", {
        "sidebar-expanded": !isCollapsed,
        "sidebar-collapsed": isCollapsed,
    });

    return (
        <aside className={sidebarClasses}>
            {/* Main Menu */}
            <div className={cx("main-menu")}>
                {sidebarMenu.map((item) => (
                    <NavItem key={item.title} {...item} isCollapsed={isCollapsed} />
                ))}
                 {/* Theme Toggle Button */}
                <div className={cx("nav-item")} onClick={toggleTheme}>
                    {theme === 'light' ? <FaMoon className={cx("nav-icon")} /> : <FaSun className={cx("nav-icon")} />}
                    {!isCollapsed && <span className={cx("nav-text")}>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>}
                </div>
            </div>
            
            <div className={cx("separator")}></div>

            {/* Login/Suggested accounts only show when expanded */}
            {!isCollapsed && (
                <>
                    <div className={cx("login-prompt")}>
                        <p>Log in to follow creators, like videos, and view comments.</p>
                        <Button primary size="large" to="/login">
                            Log in
                        </Button>
                    </div>

                    <div className={cx("separator")}></div>
                    
                    <div className={cx("suggested-accounts")}>
                        <p className={cx("suggested-title")}>Suggested accounts</p>
                        {suggestedAccounts.map((account) => (
                            <div key={account.id} className={cx("account-item")}>
                                <img src={account.avatar} alt={account.name} className={cx("account-avatar")} />
                                <div className={cx("account-info")}>
                                    <p className={cx("account-username")}>{account.username}</p>
                                    <p className={cx("account-name")}>{account.name}</p>
                                </div>
                            </div>
                        ))}
                        <div className={cx("view-all")}>See all</div>
                    </div>
                </>
            )}
        </aside>
    );
}

export default Sidebar;

/* eslint-disable no-unused-vars */
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import { useTheme } from "@/context/ThemeContext";
import Button from "../Button";
import classNames from "classnames/bind";

// Import icons
import { 
    FaHome, FaCompass, FaUserFriends, FaVideo, FaMoon, FaSun, 
    FaPaperPlane, FaSearch, FaBars 
} from "react-icons/fa";
import { BsTiktok } from "react-icons/bs";
import HomeIcon from "../Icons/HomeIcon";
import UsersIcon from "../Icons/UsersIcon";
import PlusSquareIcon from "../Icons/PlusSquareIcon";
import FocusIcon from "../Icons/FocusIcon";

const cx = classNames.bind(styles);

const sidebarMenu = [
    { title: "For You", icon: HomeIcon , path: "/" },
    { title: "Following", icon: UsersIcon, path: "/following" },
    { title: "Explore", icon: FocusIcon, path: "/explore" },
    { title: "LIVE", icon: FaVideo, path: "/live" },
];

const suggestedAccounts = [
    { id: 1, username: "thuytien", name: "Thủy Tiên", avatar: "https://placehold.co/40x40/FF5588/FFFFFF?text=TT" },
    { id: 2, username: "truongan", name: "Trường An Official", avatar: "https://placehold.co/40x70/007bff/FFFFFF?text=TA" },
    { id: 3, username: "minh_hieu", name: "Minh Hiếu", avatar: "https://placehold.co/40x40/28a745/FFFFFF?text=MH" },
];

const NavItem = ({ icon: Icon, title, path, isCollapsed, onClick }) => {
    const navLinkClasses = ({ isActive }) => cx("nav-item", { "nav-item-active": isActive });

    if (path) {
        return (
            <NavLink to={path} className={navLinkClasses} onClick={onClick}>
                <Icon className={cx("nav-icon")} />
                {!isCollapsed && <span className={cx("nav-text")}>{title}</span>}
            </NavLink>
        );
    }
    // For non-link items like Search
    return (
        <div className={cx("nav-item")} onClick={onClick}>
            <Icon className={cx("nav-icon")} />
            {!isCollapsed && <span className={cx("nav-text")}>{title}</span>}
        </div>
    )
};

function Sidebar({ isCollapsed, toggleSidebar, toggleSearch, closeSearch }) {
    const { theme, toggleTheme } = useTheme();

    const sidebarClasses = cx("sidebar", {
        "sidebar-collapsed": isCollapsed,
        "sidebar-expanded": !isCollapsed,
    });

    return (
        <aside className={sidebarClasses}>
            <div className={cx("logo-section")}>
                 <NavLink to="/" className={cx("logo-link")} onClick={closeSearch}>
                    {!isCollapsed && <BsTiktok className={cx("logo-icon")} />}
                 </NavLink>
                 <button className={cx("menu-btn")} onClick={toggleSidebar}>
                    <FaBars />
                </button>
            </div>

            <div className={cx("main-nav")}>
                {sidebarMenu.map((item) => (
                    <NavItem key={item.title} {...item} isCollapsed={isCollapsed} onClick={closeSearch} />
                ))}
                <NavItem icon={FaSearch} title="Search" isCollapsed={isCollapsed} onClick={toggleSearch} />
            </div>
            
            <div className={cx("nav-item")} onClick={toggleTheme}>
                {theme === 'light' ? <FaMoon className={cx('nav-icon')} /> : <FaSun className={cx('nav-icon')} />}
                {!isCollapsed && <span className={cx('nav-text')}>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>}
            </div>

            {!isCollapsed && (
                <>
                    <div className={styles.separator}></div>
                    <div className={styles['login-prompt']}>
                        <p>Log in to follow creators, like videos, and view comments.</p>
                        <Button primary size="large" to="/login" onClick={closeSearch}>
                            Log in
                        </Button>
                    </div>

                    <div className={styles.separator}></div>
                    
                    <div className={styles['suggested-accounts']}>
                        <p className={styles['suggested-title']}>Suggested accounts</p>
                        {suggestedAccounts.map((account) => (
                            <div key={account.id} className={styles['account-item']} onClick={closeSearch}>
                                <img src={account.avatar} alt={account.name} className={styles['account-avatar']} />
                                <div className={styles['account-info']}>
                                    <p className={styles['account-username']}>{account.username}</p>
                                    <p className={styles['account-name']}>{account.name}</p>
                                </div>
                            </div>
                        ))}
                        <div className={styles['view-all']} onClick={closeSearch}>See all</div>
                    </div>
                </>
            )}
        </aside>
    );
}

export default Sidebar;
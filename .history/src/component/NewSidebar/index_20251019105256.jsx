
import { NavLink } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./NewSidebar.module.scss";

// Import icons from react-icons
import { 
    FaHome, FaCompass, FaUserFriends, FaVideo, FaMoon, FaSun, 
    FaPaperPlane, FaSearch, FaPlus, FaInbox, FaUser, FaBars 
} from "react-icons/fa";
import { BsTiktok } from "react-icons/bs";

import { useTheme } from "@/context/ThemeContext";
import Button from "../Button";
import HomeIcon from "../Icons/HomeIcon";
import UsersIcon from "../Icons/UsersIcon";

const cx = classNames.bind(styles);

// const mainMenuItems = [
//     { title: "For You", icon: <HomeIcon size={"1em"}/>, path: "/" },
//     { title: "Following", icon: <UsersIcon />, path: "/following" },
//     { title: "Explore", icon: , path: "/explore" },
//     { title: "LIVE", icon: FaVideo, path: "/live" },
// ];

const userMenuItems = [
    { title: "Messages", icon: FaPaperPlane, path: "/messages" },
    { title: "Inbox", icon: FaInbox, path: "/inbox" },
    { title: "Profile", icon: FaUser, path: "/profile" },
];


const NavItem = ({ icon: Icon, title, path, isCollapsed }) => {
    const navLinkClasses = ({ isActive }) => cx("nav-item", { "nav-item-active": isActive });

    return (
        <NavLink to={path} className={navLinkClasses}>
            <Icon className={cx("nav-icon")} />
            {!isCollapsed && <span className={cx("nav-text")}>{title}</span>}
        </NavLink>
    );
};

const SearchItem = ({ isCollapsed, onSearchClick }) => {
    return (
        <div className={cx("nav-item")} onClick={onSearchClick}>
            <FaSearch className={cx("nav-icon")} />
            {!isCollapsed && <span className={cx("nav-text")}>Search</span>}
        </div>
    );
};


function NewSidebar({ isCollapsed, toggleCollapse, setIsSearchActive }) {
    const { theme, toggleTheme } = useTheme();

    const handleSearchClick = () => {
        setIsSearchActive(true);
        if (!isCollapsed) {
            toggleCollapse(); // Collapse sidebar if it's open
        }
    };

    const sidebarClasses = cx("sidebar", {
        "sidebar-collapsed": isCollapsed,
        "sidebar-expanded": !isCollapsed,
    });

    return (
        <aside className={sidebarClasses}>
            <div className={cx("logo-container")}>
                <NavLink to="/">
                    <BsTiktok className={cx("tiktok-icon")} />
                </NavLink>
            </div>

            <div className={cx("menu-toggle-container")}>
                 <button className={cx("menu-btn")} onClick={toggleCollapse}>
                    <FaBars />
                </button>
            </div>

            <nav className={cx("main-nav")}>
                {mainMenuItems.map((item) => (
                    <NavItem key={item.title} {...item} isCollapsed={isCollapsed} />
                ))}
                <SearchItem isCollapsed={isCollapsed} onSearchClick={handleSearchClick} />
            </nav>

            <div className={cx("user-nav")}>
                 <Button className={cx('upload-btn')} outline>
                    <FaPlus />
                    {!isCollapsed && <span>Tải lên</span>}
                </Button>
                {userMenuItems.map((item) => (
                    <NavItem key={item.title} {...item} isCollapsed={isCollapsed} />
                ))}
                <div className={cx("nav-item")} onClick={toggleTheme}>
                    {theme === "light" ? <FaMoon className={cx("nav-icon")} /> : <FaSun className={cx("nav-icon")} />}
                    {!isCollapsed && <span className={cx("nav-text")}>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>}
                </div>
            </div>
        </aside>
    );
}

export default NewSidebar;

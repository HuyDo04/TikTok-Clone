import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import { useTheme } from "@/context/ThemeContext";
import Button from "../Button";

// Import icons
import { FaHome, FaCompass, FaUserFriends, FaVideo, FaMoon, FaSun, FaPaperPlane } from "react-icons/fa";

const sidebarMenu = [
    { title: "For You", icon: FaHome, path: "/" },
    { title: "Following", icon: FaUserFriends, path: "/following" },
    { title: "Explore", icon: FaCompass, path: "/explore" },
    { title: "Messages", icon: FaPaperPlane, path: "/messages" },
    { title: "LIVE", icon: FaVideo, path: "/live" },
];

const suggestedAccounts = [
    { id: 1, username: "thuytien", name: "Thủy Tiên", avatar: "https://placehold.co/40x40/FF5588/FFFFFF?text=TT" },
    { id: 2, username: "truongan", name: "Trường An Official", avatar: "https://placehold.co/40x70/007bff/FFFFFF?text=TA" },
    { id: 3, username: "minh_hieu", name: "Minh Hiếu", avatar: "https://placehold.co/40x40/28a745/FFFFFF?text=MH" },
];

const NavItem = ({ title, path, isCollapsed }) => {
    const navLinkClasses = ({ isActive }) => {
        return `${styles['nav-item']} ${isActive ? styles['nav-item-active'] : ''}`;
    };

    return (
        <NavLink to={path} className={navLinkClasses}>
            <Icon className={styles['nav-icon']} />
            {!isCollapsed && <span className={styles['nav-text']}>{title}</span>}
        </NavLink>
    );
};

function Sidebar({ isCollapsed }) {
    const { theme, toggleTheme } = useTheme();

    const sidebarClasses = `${styles.sidebar} ${isCollapsed ? styles['sidebar-collapsed'] : styles['sidebar-expanded']}`;

    return (
        <aside className={sidebarClasses}>
            {/* Main navigation items */}
            {sidebarMenu.map((item) => (
                <NavItem key={item.title} {...item} isCollapsed={isCollapsed} />
            ))}
            
            {/* Theme toggle is also a nav item */}
            <div className={styles['nav-item']} onClick={toggleTheme}>
                {theme === 'light' ? <FaMoon className={styles['nav-icon']} /> : <FaSun className={styles['nav-icon']} />}
                {!isCollapsed && <span className={styles['nav-text']}>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>}
            </div>

            {/* Separator and all content below will now be correctly hidden when collapsed */}
            {!isCollapsed && (
                <>
                    <div className={styles.separator}></div>
                    <div className={styles['login-prompt']}>
                        <p>Log in to follow creators, like videos, and view comments.</p>
                        <Button primary size="large" to="/login">
                            Log in
                        </Button>
                    </div>

                    <div className={styles.separator}></div>
                    
                    <div className={styles['suggested-accounts']}>
                        <p className={styles['suggested-title']}>Suggested accounts</p>
                        {suggestedAccounts.map((account) => (
                            <div key={account.id} className={styles['account-item']}>
                                <img src={account.avatar} alt={account.name} className={styles['account-avatar']} />
                                <div className={styles['account-info']}>
                                    <p className={styles['account-username']}>{account.username}</p>
                                    <p className={styles['account-name']}>{account.name}</p>
                                </div>
                            </div>
                        ))}
                        <div className={styles['view-all']}>See all</div>
                    </div>
                </>
            )}
        </aside>
    );
}

export default Sidebar;

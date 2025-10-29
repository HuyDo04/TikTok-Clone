import { useNavigate, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './LiveNavigation.module.scss';

// Import icons from react-icons
import { FaHome, FaVideo } from 'react-icons/fa';

const cx = classNames.bind(styles);

const mainMenuItems = [
    { title: "Khám phá LIVE", icon: FaHome, page: "feed", path: "/live" },
    { title: "Bắt đầu LIVE", icon: FaVideo, page: "studio", path: "/live-studio" },
];

const NavItem = ({ icon: Icon, title, page, path }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = location.pathname === path;
    return (
        <div className={cx("nav-link", { active: isActive })} onClick={() => navigate(path)}>
            <Icon className={cx("nav-icon")} />
            <span className={cx("nav-text")}>{title}</span>
        </div>
    );
};

function LiveNavigation() {
  const location = useLocation();
  const currentPage = location.pathname.includes("/live-studio") ? "studio" : "feed";

  return (
    <nav className={cx("navigation")}>
      <div className={cx("logo")}>
        <span className={cx("tiktok-icon")}>♪</span>
        <span className={cx("logo-text")}>TikTok</span>
      </div>

      <div className={cx("nav-links")}>
        {mainMenuItems.map((item) => (
          <NavItem key={item.title} {...item} currentPage={currentPage} />
        ))}
      </div>
    </nav>
  )
}

export default LiveNavigation;
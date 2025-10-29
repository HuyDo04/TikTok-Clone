
import classNames from "classnames/bind";
import { Link } from "react-router-dom"; // Assuming react-router-dom is used for navigation
import styles from "./SettingsSidebar.module.scss";

const cx = classNames.bind(styles);

function SettingsSidebar({ menuItems, activeSection, onSectionChange }) {
  return (
    <aside className={cx('sidebar')}>
      <div className={cx('header')}>
        {/* Assuming the back button navigates to the profile page */}
        <Link to="/profile/hdna0402" className={cx('backLink')}>
          ←
        </Link>
      </div>

      <nav className={cx('nav')}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={cx('navItem', { active: activeSection === item.id })}
            onClick={() => onSectionChange(item.id)}
          >
            <span className={cx('icon')}>{item.icon}</span>
            <span className={cx('label')}>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default SettingsSidebar;

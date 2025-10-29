
import classNames from "classnames/bind";
import styles from "./ProfileTabs.module.scss";
import AnalyticsBarsIcon from "../Icons/AnalyticsBarsIcon";
import ImportExportIcon from "../Icons/ImportExportIcon";
import LikedIcon from "../Icons/LikedIcon";

const cx = classNames.bind(styles);

function ProfileTabs({ activeTab, onTabChange }) {
  const tabs = [
    { id: "videos", label: "Video", icon: AnalyticsBarsIcon }, // Using a more standard icon name
    { id: "reposts", label: "Bài đăng lại", icon: ImportExportIcon },
    { id: "likes", label: "Đã thích", icon: LikedIcon },
  ];

  return (
    <div className={cx('tabsContainer')}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            className={cx('tab', { active: activeTab === tab.id })}
            onClick={() => onTabChange(tab.id)}
          >
            <span className={cx('icon' )}><Icon /></span>
            <span className={cx('label')}>{tab.label}</span>
          </button>
        )
  })}
    </div>
  );
}

export default ProfileTabs;

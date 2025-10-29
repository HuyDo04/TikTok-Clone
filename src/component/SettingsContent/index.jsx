
import SettingsItem from "../SettingsItem"; // Adjusted import path
import classNames from "classnames/bind";
import styles from "./SettingsContent.module.scss";

const cx = classNames.bind(styles);

function SettingsContent({ section }) {
  if (!section) return null;

  return (
    <main className={cx('content')}>
      <div className={cx('header')}>
        <h1 className={cx('title')}>{section.title}</h1>
      </div>

      <div className={cx('items')}>
        {section.items.map((item, index) => (
          <SettingsItem key={index} item={item} />
        ))}
      </div>
    </main>
  );
}

export default SettingsContent;

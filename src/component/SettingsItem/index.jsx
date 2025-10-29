
import classNames from "classnames/bind";
import styles from "./SettingsItem.module.scss";

const cx = classNames.bind(styles);

function SettingsItem({ item }) {
  return (
    <div className={cx('item')}>
      <div className={cx('info')}>
        <h3 className={cx('label')}>{item.label}</h3>
        <p className={cx('description')}>{item.description}</p>
      </div>
      <button className={cx('arrow')}>
        ›
      </button>
    </div>
  );
}

export default SettingsItem;

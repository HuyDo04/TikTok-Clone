import { Outlet } from "react-router-dom";

import styles from "./SettingsLayout.module.scss";
import classNames from "classnames/bind";
import Header from "../DefaultLayout/Header";

const cx = classNames.bind(styles);

function SettingLayout() {
  return (
    <div className={cx("layout")}>
      <Header />
      <main className={cx("content")}>
        <Outlet />
      </main>
    </div>
  );
}

export default SettingLayout;

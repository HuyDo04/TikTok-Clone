import { useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./LiveLayout.module.scss";
import LiveNavigation from "@/component/LiveNavigation";

const cx = classNames.bind(styles);

function LiveLayout({ children }) {
  const location = useLocation();
  const currentPage = location.pathname.includes("/live-studio") ? "studio" : "feed";

  return (
    <div className={cx("live-layout-wrapper")}>
      <LiveNavigation currentPage={currentPage} />
      <main className={cx("live-content")}>{children}</main>
    </div>
  );
}

export default LiveLayout;

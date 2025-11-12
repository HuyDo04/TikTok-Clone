import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "@/component/Sidebar";
import SearchView from "@/component/SearchView";
import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";
import Notifications from "@/component/Notifications";

const cx = classNames.bind(styles);

function DefaultLayout() {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [sidebarStateBeforeSearch, setSidebarStateBeforeSearch] = useState(false);
  const [isNotificationsVisible, setNotificationsVisible] = useState(false);
  const location = useLocation();

  // Close search on route change
  useEffect(() => {
    if (isSearchActive) {
      setIsSearchActive(false);
      setSidebarCollapsed(sidebarStateBeforeSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const toggleSidebar = () => {
    if (isSearchActive) {
      setIsSearchActive(false);
      setSidebarCollapsed(sidebarStateBeforeSearch);
    } else {
      setSidebarCollapsed((prev) => !prev);
    }
  };

  const toggleSearch = () => {
    const nextSearchState = !isSearchActive;
    setIsSearchActive(nextSearchState);

    if (nextSearchState) {
      // Opening search
      setSidebarStateBeforeSearch(isSidebarCollapsed);
      setSidebarCollapsed(true);
    } else {
      // Closing search
      setSidebarCollapsed(sidebarStateBeforeSearch);
    }
  };

  const closeSearch = () => {
      if (isSearchActive) {
          setIsSearchActive(false);
          setSidebarCollapsed(sidebarStateBeforeSearch);
      }
  }

  const toggleNotifications = () => {
    setNotificationsVisible(prev => !prev);
    setSidebarCollapsed(false); // Đóng tìm kiếm khi mở thông báo
  };
  const closeNotifications = () => setNotificationsVisible(false);

  // The main content's margin is now static, set in the SCSS file.
  const mainContentClass = cx("mainContent");

  return (
    <div className={cx("container")}>
      <div className={cx("sidebar-content")}>
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        toggleSidebar={toggleSidebar}
        toggleSearch={toggleSearch}
        closeSearch={closeSearch}
        toggleNotifications={toggleNotifications}
        closeNotifications={closeNotifications}
      />
      </div>
      <div className={cx("main-content")}>
        <div className={mainContentClass}>
          {isSearchActive && <SearchView closeSearch={closeSearch} />}
          {isNotificationsVisible && <Notifications closeNotifications={closeNotifications} />}
          <main className={styles.content}>
              <Outlet />
          </main>
        </div>
      </div>
      
    </div>
  );
}

export default DefaultLayout;

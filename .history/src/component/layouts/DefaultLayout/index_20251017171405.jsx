import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "@/component/Sidebar";
import SearchView from "@/component/SearchView";
import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function DefaultLayout() {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [sidebarStateBeforeSearch, setSidebarStateBeforeSearch] = useState(false);
  const location = useLocation();

  // Close search on route change
  useEffect(() => {
    if (isSearchActive) {
      setIsSearchActive(false);
      setSidebarCollapsed(sidebarStateBeforeSearch);
    }
  }, [isSearchActive, location, sidebarStateBeforeSearch]);

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

  // The main content's margin is ONLY dependent on the sidebar's state.
  const mainContentClass = cx("mainContent", {
    "content-sidebar-expanded": !isSidebarCollapsed,
    "content-sidebar-collapsed": isSidebarCollapsed,
  });

  return (
    <div className={cx("container")}>
      <div className={cx("sidebar-content")}>
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        toggleSidebar={toggleSidebar}
        toggleSearch={toggleSearch}
        closeSearch={closeSearch}
      />
      </div>
      <div className={cx("mainContentClass")}>
        {isSearchActive && <SearchView closeSearch={toggleSearch} />}
        <main className={styles.content}>
            <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DefaultLayout;

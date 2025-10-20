import { useState, useEffect } from "react";
import {
  FaHome,
  FaCompass,
  FaMusic,
  FaUserFriends,
  FaSearch,
  FaEllipsisH,
} from "react-icons/fa";
import { BsTiktok } from "react-icons/bs";
import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";
import Button from "../Button";
import { NavLink } from "react-router-dom";
import HandleLogout from "../layouts/DefaultLayout/Header/HandleLogout";
import Footer from "../layouts/DefaultLayout/Footer";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "@/features/auth/authSlice";
import useDebounce from "@/hooks/useBounce";
import SearchPage from "./component/SearchPage/SearchPage";

const cx = classNames.bind(styles);

const extend = [
  "Tạo hiệu ứng tiktok",
  "Công cụ dành cho nhà sáng tạo",
  "Tiếng việt",
  "Chế độ tối",
  "Phản hồi và trợ giúp",
];
function Sidebar() {
  const [panel, setPanel] = useState(null);
  const [searchValue, setSearchValue] = useState([]);
  const debouncedSearch = useDebounce(searchValue, 500);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const togglePanel = (panelType) => {
    // prev nhận lại biến trước đó của panel
    setPanel((prev) => (prev === panelType ? null : panelType));
  };

  const user = useSelector((state) => state.auth.currentUser);

  const loading = useSelector((state) => state.auth.isLoading);

  if (loading) {
    return <div className={cx("sidebar-loading")}>Đang tải...</div>;
  }

  return (
    <div className={cx("sidebar")}>
      {/* Logo */}
      <div className={cx("sidebar-item")} style={{ marginBottom: "20px" }}>
        <div className={cx("logo")}>
          <NavLink to="/">
            <BsTiktok className={cx("tiktok-icon")} />
            {!panel && <span>TikTok</span>}
          </NavLink>
        </div>
      </div>

      <div className={cx("sidebar-item")}>
        <button
          className={cx("search-bar")}
          onClick={() => togglePanel("search")}
        >
          <div className={cx("button-content")}>
            <FaSearch />
            {!panel && <span>Tìm kiếm</span>}
          </div>
        </button>
      </div>

      {panel === "search" &&
        ReactDOM.createPortal(
          <div className={cx(panel ? "panel" : "panel-exit")}>
            <div className={cx("panel-header")}>
              <span>Tìm kiếm</span>
              <button onClick={() => setPanel(null)}>✕</button>
            </div>
            <div className={cx("panel-content")}>
              <div className={cx("panel-item")}>
                <form action="" className={cx("form-search")}>
                  <input
                    type="search"
                    placeholder="Tìm kiếm"
                    className={cx("input-search")}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </form>
                <span className={cx("my-like")}>Có thể bạn thích</span>
                <SearchPage keyword={debouncedSearch} />
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Other Sidebar Items */}
      <div className={cx("sidebar-item")}>
        <FaHome />
        {!panel && <span>Đề xuất</span>}
      </div>
      <div className={cx("sidebar-item")}>
        <FaCompass />
        {!panel ? (
          <NavLink to="/explore">Khám phá</NavLink>
        ) : (
          <span style={{ display: "none" }}>Khám phá</span>
        )}
      </div>
      <div className={cx("sidebar-item")}>
        <FaMusic />
        {!panel && <span>Nhạc</span>}
      </div>
      <div className={cx("sidebar-item")}>
        <FaUserFriends />
        {!panel && <span>Đang follow</span>}
      </div>
      <div className={cx("sidebar-item")}>
        <FaUserFriends />
        {!panel && <span>Đang follow</span>}
      </div>

      {/* More Button */}
      <div className={cx("sidebar-item")}>
        <button
          className={cx("search-bar")}
          onClick={() => togglePanel("more")}
        >
          <div className={cx("button-content")}>
            <FaEllipsisH />
            {!panel && <span>Thêm</span>}
          </div>
        </button>
      </div>

      {panel === "more" && (
        <div className={cx("panel")}>
          <div className={cx("panel-header")}>
            <span>Thêm</span>
            <button onClick={() => setPanel(null)}>✕</button>
          </div>
          <div className={cx("panel-content")}>
            <div className={cx("panel-item")}>
              <ul className={cx("list-extend")}>
                {extend.map((item) => (
                  <li key={item} className={cx("item-extend")}>
                    <button>{item}</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Login/Logout */}

      <div style={{ display: panel ? "none" : undefined }}>
        {!user ? (
          <div className={cx("sidebar-item")}>
            <NavLink to="/login">
              <Button primary size="medium">
                Login
              </Button>
            </NavLink>
          </div>
        ) : (
          <div className={cx("sidebar-item")}>
            <HandleLogout />
          </div>
        )}
      </div>
      <div className={cx("footer")}>
        <Footer />
      </div>
    </div>
  );
}

export default Sidebar;

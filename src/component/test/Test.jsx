import React, { useState } from 'react';
import { Home, Compass, UserPlus, Users, Tv, MessageCircle, Bell, PlusSquare, User, MoreHorizontal, X } from 'lucide-react';
import classNames from 'classnames/bind';
import styles from './Test.module.scss';

const cx = classNames.bind(styles);

const Test = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchFocus = () => setIsSearchActive(true);
  const handleSearchClose = () => setIsSearchActive(false);

  return (
    <aside className={cx('sidebar', { active: isSearchActive })}>
      {!isSearchActive ? (
        <>
          <div className={cx('logo')}>
            <img src="/tiktok-logo.svg" alt="TikTok" />
          </div>

          <div className={cx('searchBar')} onClick={handleSearchFocus}>
            <input type="text" placeholder="Tìm kiếm" disabled />
          </div>

          <nav className={cx('menu')}>
            <a href="#" className={cx('menuItem', 'active')}>
              <Home /> <span>Đề xuất</span>
            </a>
            <a href="#"><Compass /> <span>Khám phá</span></a>
            <a href="#"><UserPlus /> <span>Đã follow</span></a>
            <a href="#"><Users /> <span>Bạn bè</span></a>
            <a href="#"><Tv /> <span>LIVE</span></a>
            <a href="#"><MessageCircle /> <span>Tin nhắn</span></a>
            <a href="#"><Bell /> <span>Thông báo</span></a>
            <a href="#"><PlusSquare /> <span>Tải lên</span></a>
            <a href="#"><User /> <span>Hồ sơ</span></a>
            <a href="#"><MoreHorizontal /> <span>Thêm</span></a>
          </nav>
        </>
      ) : (
        <div className={cx('searchMode')}>
          <div className={cx('searchHeader')}>
            <input
              type="text"
              placeholder="Tìm kiếm"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              autoFocus
            />
            <button onClick={handleSearchClose}><X /></button>
          </div>

          <div className={cx('searchHistory')}>
            <h4>Tìm kiếm gần đây</h4>
            <ul>
              <li>live billiards</li>
              <li>duong quoc hoang</li>
              <li>hà thành billiards hill</li>
              <li>ca đoàn vinh sơn</li>
              <li>quán nước có đàn piano</li>
            </ul>
          </div>

          <div className={cx('searchSuggestions')}>
            <h4>Bạn có thể thích</h4>
            <ul>
              <li>reyes cup trực tiếp</li>
              <li>billiard trực tiếp</li>
              <li>Dũng Phạm Billiards</li>
              <li>Hoàng Sao Tham Gia Reyes Cup</li>
            </ul>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Test;

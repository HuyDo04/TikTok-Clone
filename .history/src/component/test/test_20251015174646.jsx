// src/components/Test/Test.js
import React, { useState } from 'react';
import styles from './Test.module.scss';

const Test = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);

  const handleSearchFocus = () => {
    setIsCollapsed(true);
    setShowSearchSuggestions(true);
  };

  const handleSearchBlur = () => {
    setTimeout(() => {
      setIsCollapsed(false);
      setShowSearchSuggestions(false);
    }, 150);
  };

  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      {/* Top Section */}
      <div className={styles['sidebar-top']}>
        <div className={styles['tiktok-logo']}>
          <svg
            width="28"
            height="28"
            viewBox="0 0 40 40"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.167 0C8.583 0 0 8.583 0 19.167S8.583 38.333 19.167 38.333 38.333 29.75 38.333 19.167 29.75 0 19.167 0zM30 19.167c0 2.292-1.875 4.167-4.167 4.167S21.667 21.458 21.667 19.167c0-2.292 1.875-4.167 4.167-4.167S30 16.875 30 19.167zM18.333 19.167c0 2.292-1.875 4.167-4.167 4.167S10 21.458 10 19.167c0-2.292 1.875-4.167 4.167-4.167S18.333 16.875 18.333 19.167z"
              fill="#000000"
            />
          </svg>
          <span className={styles['logo-text']}>TikTok</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className={styles['search-bar-container']}>
        <input
          type="text"
          placeholder="Tìm kiếm"
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={styles['search-icon']}
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <circle cx="10" cy="10" r="7"></circle>
          <line x1="21" y1="21" x2="15" y2="15"></line>
        </svg>
      </div>

      {/* Search Suggestions */}
      {showSearchSuggestions && (
        <div className={styles['search-suggestions']}>
          <div className={styles.section}>
            <h4>Tìm kiếm gần đây</h4>
            <ul>
              <li>
                <svg
                  className={styles['clock-icon']}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                live billiards
              </li>
              <li>
                <svg
                  className={styles['clock-icon']}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                duong quoc hoang
              </li>
            </ul>
          </div>
          <div className={styles.section}>
            <h4>Bạn có thể thích</h4>
            <ul>
              <li>
                <span className={styles.dot}></span> bitcoindefi
              </li>
              <li>
                <span className={styles.dot}></span> phạm tuấn
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Menu */}
      <ul className={styles['menu-list']}>
        <li>
          <a href="#">
            <span className={styles.icon}>🏠</span>
            <span className={styles.text}>Đề xuất</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span className={styles.icon}>🧭</span>
            <span className={styles.text}>Khám phá</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span className={styles.icon}>👥</span>
            <span className={styles.text}>Đã follow</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span className={styles.icon}>🧑‍🤝‍🧑</span>
            <span className={styles.text}>Bạn bè</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Test;

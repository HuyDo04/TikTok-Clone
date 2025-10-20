import { useState } from 'react';
import { X } from 'lucide-react';
import classNames from 'classnames/bind';
import styles from './SearchView.module.scss';

const cx = classNames.bind(styles);

const SearchView = ({ closeSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className={cx('search-view')}>
        <div className={cx('search-container')}>
            <div className={cx('search-header')}>
                <h3>Search</h3>
                <button onClick={closeSearch} className={cx('close-btn')}>
                    <X size={24} />
                </button>
            </div>
            <div className={cx('search-body')}>
                <div className={cx('search-input')}>
                <input
                    type="text"
                    placeholder="Tìm kiếm"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    autoFocus
                />
                </div>
                {/* You can add search history and suggestions here */}
                <div className={cx('search-history')}>
                    <h4>Recent searches</h4>
                    <ul>
                        <li>live billiards</li>
                        <li>duong quoc hoang</li>
                    </ul>
                </div>
                <div className={cx('search-suggestions')}>
                    <h4>You might like</h4>
                    <ul>
                        <li>reyes cup live</li>
                        <li>billiards live</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  );
};

export default SearchView;
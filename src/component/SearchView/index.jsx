import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { X } from 'lucide-react';
import classNames from 'classnames/bind';
import styles from './SearchView.module.scss';
import useDebounce from '@/hooks/useBounce';
import { search, getSearchHistory, deleteSearchHistoryItem, clearSearchHistory } from '@/services/search.service';

const cx = classNames.bind(styles);

const SearchView = ({ closeSearch }) => {
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState({
    content: [],
    username: [],
    hashtag: [],
  });
  const [history, setHistory] = useState([]);
  const debouncedSearchValue = useDebounce(searchValue, 500); 
  const navigate = useNavigate();

  // Load search history khi mở search view
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await getSearchHistory();
        setHistory(res || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHistory();
  }, []);

  // Query API autocomplete khi giá trị search thay đổi (debounce)
  useEffect(() => {
    const fetchSuggestions = async () => {
      const query = debouncedSearchValue.trim();
      if (!query) {
        setSuggestions({ content: [], username: [], hashtag: [] });
        return;
      }

      try {
        const res = await search(query);
        setSuggestions({
          content: res.content || [],
          username: res.users || [],
          hashtag: res.hashtags || [],
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchSuggestions();
  }, [debouncedSearchValue]);

  // Handle submit search: navigate và cập nhật history
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const trimmedValue = searchValue.trim();
    if (!trimmedValue) return;

    navigate(`/search?q=${encodeURIComponent(trimmedValue)}`);
    setSearchValue(''); // Clear search input
    setSuggestions({ content: [], username: [], hashtag: [] }); // Clear suggestions
    closeSearch();

    try {
      const res = await getSearchHistory();
      setHistory(res || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClickSuggestion = (type, value) => {
    if (type === 'content') navigate(`/post/${value.id}`);
    if (type === 'username') navigate(`/search?q=${encodeURIComponent(value.username)}`);
    if (type === 'hashtag') navigate(`/hashtag/${value.name}`);
    closeSearch();
  };

  const handleDeleteHistoryItem = async (id) => {
    try {
      await deleteSearchHistoryItem(id);
      setHistory(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleClearHistory = async () => {
    try {
      await clearSearchHistory();
      setHistory([]);
    } catch (err) {
      console.error(err);
    }
  };

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
          <form className={cx('search-input-form')} onSubmit={handleSearchSubmit}>
            <div className={cx('search-input')}>
              <input
                type="text"
                placeholder="Tìm kiếm"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                autoFocus
              />
            </div>
          </form>

          {searchValue.trim() === '' ? (
            <div className={cx('search-history')}>
              <h4>
                Recent searches
                {history.length > 0 && (
                  <span className={cx('clear-history')} onClick={handleClearHistory}>
                    Xóa tất cả
                  </span>
                )}
              </h4>
              <ul>
                {history.map((item) => (
                  <li key={item.id} className={cx('history-item')}>
                    <span onClick={() => navigate(`/search?q=${encodeURIComponent(item.query)}`)}>
                      {item.query}
                    </span>
                    <X
                      size={16}
                      className={cx('delete-icon')}
                      onClick={() => handleDeleteHistoryItem(item.id)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className={cx('search-suggestions')}>
              {['content', 'username', 'hashtag'].map((type) => (
                suggestions[type].length > 0 && (
                  <div key={type}>
                    <h4>{type === 'content' ? 'Posts' : type === 'username' ? 'Users' : 'Hashtags'}</h4>
                    <ul>
                      {suggestions[type].map((item) => (
                        <li key={item.id || item.name} onClick={() => handleClickSuggestion(type, item)}>
                          {type === 'content' ? item.title : type === 'username' ? item.username : `#${item.name}`}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchView;

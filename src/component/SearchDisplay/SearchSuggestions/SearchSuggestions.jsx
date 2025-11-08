import classNames from "classnames/bind"
import styles from "./SearchSuggestions.module.scss"

const cx = classNames.bind(styles)

function SearchSuggestions({ suggestions }) {
  return (
    <aside className={cx("suggestions-sidebar")}>
      <div className={cx("suggestions-container")}>
        <h3 className={cx("suggestions-title")}>Những người bạn đã tìm kiếm</h3>

        <div className={cx("suggestions-list")}>
          {suggestions.map((suggestion, index) => (
            <button key={index} className={cx("suggestion-item")} aria-label={`Search for ${suggestion}`}>
              <svg className={cx("search-icon")} viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M10.5 2a8.5 8.5 0 0 1 8.5 8.5c0 2.12-.84 4.04-2.2 5.45l6.48 6.48a1 1 0 1 1-1.42 1.42l-6.48-6.48A8.5 8.5 0 1 1 10.5 2zm0 2a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13z" />
              </svg>
              <span className={cx("suggestion-text")}>{suggestion}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default SearchSuggestions

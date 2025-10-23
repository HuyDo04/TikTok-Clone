'use client'

import classNames from "classnames/bind"
import styles from "./Header.module.scss"

const cx = classNames.bind(styles)

export default function Header() {
  return (
    <header className={cx("header")}>
      <div className={cx("container")}>
        <button className={cx("userButton")}>
          <span className={cx("userInitial")}>U</span>
        </button>
      </div>
    </header>
  )
}

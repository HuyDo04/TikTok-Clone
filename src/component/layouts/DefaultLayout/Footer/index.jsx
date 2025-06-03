import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
function Footer() {
  const cx = classNames.bind(styles);
  const listFooter = [
    "Công ty",
    "Chương trình",
    "Điều khoản và chính sách",
    "Thêm",
  ];
  return (
    <footer className={cx("footer-wrapper")}>
      <ul className={cx("footer-container")}>
        {listFooter.map((item, i) => (
          <li className={cx("footer-item")} key={i}>
            {item}
          </li>
        ))}
        <span className={cx("span")}>© 2025 TikTok</span>
      </ul>
    </footer>
  );
}

export default Footer;

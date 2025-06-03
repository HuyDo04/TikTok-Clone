import userService from "@/service/userService";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SearchPage.module.scss";
function SearchPage({ keyword }) {
  const [users, setUsers] = useState([]);
  const cx = classNames.bind(styles);

  const suggest = [
    "Tạo hiệu ứng tiktok",
    "Công cụ dành cho nhà sáng tạo",
    "Tiếng việt",
    "Chế độ tối",
    "Phản hồi và trợ giúp",
  ];

  useEffect(() => {
    if (!String(keyword || "").trim()) {
      setUsers([]);
      return;
    }

    (async () => {
      const res = await userService.getAll();

      const filtered = res.data.filter((user) => {
        const fullname = `${user.firstName || ""} ${
          user.lastName || ""
        }`.toLowerCase();
        const username = (user.username || "").toLowerCase();
        const keywordLower = keyword.toLowerCase();
        return (
          fullname.includes(keywordLower) || username.includes(keywordLower)
        );
      });

      setUsers(filtered);
    })();
  }, [keyword]);

  return (
    <ul className={cx("list-user")}>
      {users.length > 0 ? (
        users.map((user) => (
          <li key={user.id} className={cx("li-item")}>
            <Link to={`/profile/${user.username}`} className="user">
              {user.firstName} {user.lastName}
            </Link>
          </li>
        ))
      ) : (
        <ul>
          {suggest.map((item, i) => (
            <li className={cx("li-item")} key={i}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </ul>
  );
}

export default SearchPage;

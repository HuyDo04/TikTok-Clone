import classNames from "classnames/bind";

import styles from "./SuggestedAccounts.module.scss";
const cx = classNames.bind(styles);

function SuggestedAccounts() {
  const accounts = [
    { id: 1, username: "user1", avatar: "url-to-avatar" },
    { id: 2, username: "user2", avatar: "url-to-avatar" },
  ];

  return (
    <div className={cx("suggested-accounts")}>
      <h3>Tài khoản đề xuất</h3>
      {accounts.map((account) => (
        <div key={account.id} className={cx("account")}>
          <img src={account.avatar} alt={account.username} />
          <span>@{account.username}</span>
        </div>
      ))}
    </div>
  );
}

export default SuggestedAccounts;

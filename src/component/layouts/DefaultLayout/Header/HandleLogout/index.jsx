import { logout } from "@/services/auth.service";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HandleLogout.module.scss";
import classNames from "classnames/bind";
import UserContext from "@/context/UserContext";
const cx = classNames.bind(styles);
function HandleLogout() {
  const [login, setLogin] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    setLogin(!!token);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      alert("Logout Thành công");
      localStorage.removeItem("token");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {login && (
        <button className={cx("subButton")} onClick={handleLogout}>
          Logout
        </button>
      )}
    </>
  );
}

export default HandleLogout;

import InputText from "@/component/InputText";
import config from "@/config";
import useQuery from "@/hooks/useQuery";
import loginSchema from "@/schema/loginSchema";
import authService from "@/service/authService";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserContext from "@/context/UserContext";
import Form from "@/component/Forms";

import styles from "./Login.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
function Login() {
  const { setUser } = useContext(UserContext);
  const query = useQuery();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await authService.login(data);
      const { accsess_token, refresh_token } = response.data;
      localStorage.setItem("token", accsess_token);
      localStorage.setItem("refresh_token", refresh_token);
      const user = await authService.getCurrentUser();
      setUser(user);
      alert("Đăng nhập thành công");
      navigate(query.get("continue") || config.routes.home);
    } catch (errors) {
      console.log(errors);
      throw new Error("Tài khoản mật khẩu không chính xác");
    }
  };

  return (
    <div className={cx("container")}>
      <Form schema={loginSchema} onSubmit={onSubmit} className={cx("form")}>
        <label className={cx("label")}>Email</label>
        <InputText type="email" name="email" className={cx("input")} />

        <label className={cx("label")}>Password</label>
        <InputText type="password" name="password" className={cx("input")} />

        <div className={cx("Button")}>
          <button type="submit" className={cx("subButton")}>
            Đăng nhập
          </button>
        </div>

        <div className={cx("register-link")}>
          <NavLink to="/register">Bạn chưa có tài khoản. Đăng ký ngay.</NavLink>
        </div>
      </Form>
    </div>
  );
}

export default Login;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "@/services/auth.service";
import Input from "@/component/Input";
import Button from "@/component/Button";
import styles from "./Register.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = "Vui lòng nhập tên người dùng";
    } else if (formData.username.length < 3) {
      newErrors.username = "Tên người dùng phải có ít nhất 3 ký tự";
    }

    if (!formData.email) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else if (formData.password.length < 8) {
      newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Vui lòng nhập lại mật khẩu";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không khớp";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage("");

    try {


      const result = await register(formData);

      setSuccessMessage(result.message || "Đăng ký thành công! Vui lòng kiểm tra email để xác thực.");

      setTimeout(() => {
        navigate("/login", {
          replace: true,
          state: { message: "Đăng ký thành công, vui lòng xác thực email rồi đăng nhập." },
        });
      }, 2000);

    } catch (error) {
      console.error("Registration failed:", error);
      const errorMessage = error.response?.data?.message || "Đăng ký thất bại, vui lòng thử lại";
      setErrors({
        submit: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cx("container")}>
      <form onSubmit={handleSubmit} className={cx("form")}>
        <h1>Đăng ký tài khoản</h1>

        {successMessage && (
          <div className={cx("successMessage")}>{successMessage}</div>
        )}

        <Input
          label="Tên người dùng"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          error={errors.username}
          placeholder="Nhập tên người dùng"
        />

        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          placeholder="Nhập email"
          autoComplete="email"
        />

        <Input
          label="Mật khẩu"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          placeholder="Nhập mật khẩu"
          autoComplete="new-password"
        />

        <Input
          label="Nhập lại mật khẩu"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          error={errors.confirmPassword}
          placeholder="Nhập lại mật khẩu"
           autoComplete="new-password"
        />

        {errors.submit && (
          <div className={cx("submitError")}>{errors.submit}</div>
        )}

        <div className={cx("Button")}>
            <Button type="submit" primary disabled={isSubmitting} loading={isSubmitting}>
            {isSubmitting ? "Đang đăng ký..." : "Đăng ký"}
            </Button>
        </div>
        <div className={cx("registerLink")}>
            <p>
                Đã có tài khoản?{" "}
                <Link to="/login">
                Đăng nhập
                </Link>
            </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
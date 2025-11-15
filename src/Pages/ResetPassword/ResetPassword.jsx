import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Input from "@/component/Input";
import Button  from "@/component/Button";
import styles from "./ResetPassword.module.scss";
import { resetPassword } from "@/services/auth.service";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";
    
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu mới.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không khớp.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});
    setMessage("");

    try {

      const res = await resetPassword({...formData, email});
      setMessage(res.message || "Đặt lại mật khẩu thành công.");
      // Redirect sang login sau 2s
      setTimeout(() => navigate("/auth/login"), 2000);
    } catch (error) {
      console.error("Reset password error:", error);
      setErrors({
        submit:
          error.response?.data?.message ||
          "Không thể đặt lại mật khẩu. Vui lòng thử lại.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className={cx("header")}>
        <h1 className={cx("title")}>Đặt lại mật khẩu</h1>
        <p className={cx("subtitle")}>
          Nhập mật khẩu mới cho tài khoản <strong>{email}</strong>.
        </p>
      </div>

      <form className={cx("form")} onSubmit={handleSubmit}>
        <Input
          label="Mật khẩu mới"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInput}
          error={errors.password}
          placeholder="Nhập mật khẩu mới"
          required
        />

        <Input
          label="Xác nhận mật khẩu"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInput}
          error={errors.confirmPassword}
          placeholder="Nhập lại mật khẩu"
          required
        />

        {errors.submit && (
          <div className={cx("submitError")}>{errors.submit}</div>
        )}

        {message && (
          <div className={cx("successMessage")}>{message}</div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Đang đặt lại..." : "Đặt lại mật khẩu"}
        </Button>
      </form>

      <div className={cx("footer")}>
        <Link to="/login" className={cx("backLink")}>
          ← Quay lại đăng nhập
        </Link>
      </div>
    </>
  );
};

export default ResetPassword;

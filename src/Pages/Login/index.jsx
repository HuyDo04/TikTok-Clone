import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "@/component/Input";
import Button  from "@/component/Button";
import { login, resendVerification } from "@/services/auth.service";
import { setToken } from "@/utils/httpRequest";
import { loginSuccess } from "@/features/auth/authSlice";
import { fetchCurrentUser } from "@/features/auth/authActions";
import { useDispatch } from "react-redux";
import styles from "./Login.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const [resendMessage, setResendMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu tối thiểu 6 ký tự";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});
    setResendMessage("");
    setShowResend(false);

    try {
      // 1. Gọi API login
      console.log("[DEBUG] Bước 1: Bắt đầu gọi API login...");
      const result = await login(formData);
      console.log("[DEBUG] Bước 1: Login thành công, nhận được token:", result);

      // 2. Lưu token vào Redux & localStorage
      console.log("[DEBUG] Bước 2: Lưu token vào Redux và cấu hình httpRequest...");
      dispatch(loginSuccess(result.access_token));
      setToken(result.access_token); // Set token cho httpRequest
      localStorage.setItem("refresh_token", result.refresh_token);
      
      // 3. Gọi API lấy user
      console.log("[DEBUG] Bước 3: Bắt đầu fetch thông tin người dùng hiện tại (currentUser)...");
      await dispatch(fetchCurrentUser()).unwrap();
      console.log("[DEBUG] Bước 3: Fetch currentUser thành công!");

      // 4. Điều hướng khi đã lấy user thành công
      console.log("[DEBUG] Bước 4: Điều hướng đến trang chủ...");
      navigate("/", { replace: true });

    } catch (error) {
      console.error("Login failed:", error);

      if (
        error.response &&
        error.response.status === 401 &&
        error.response.data === "Vui lòng xác thục email"
      ) {
        setErrors({
          submit: "Tài khoản chưa được xác thực. Vui lòng kiểm tra email.",
        });
        setShowResend(true);
      } else {
        setErrors({
          submit:
            error.response?.data?.message ||
            "Đăng nhập thất bại. Vui lòng thử lại.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      setIsSubmitting(true);
      setResendMessage("");
        
      const res = await resendVerification(formData.email);
      
      setResendMessage(
        res.message || "Đã gửi lại email xác thực. Vui lòng kiểm tra hộp thư."
      );
    } catch (error) {
      console.error("Resend verification failed:", error);
      setResendMessage(
        error.response?.data?.message ||
          "Không thể gửi lại email xác thực. Vui lòng thử lại sau."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/api/v1/auth/oauth/google";
  };

  return (
    <div className={cx("login-container")}>
      <h1 className={cx("title")}>Đăng nhập</h1>

      <form onSubmit={handleSubmit} className={cx("form")}>
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          placeholder="Nhập email"
          required
        />

        <Input
          label="Mật khẩu"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          placeholder="Nhập mật khẩu"
          required
        />

        {errors.submit && (
          <div className={cx("submit-error")}>{errors.submit}</div>
        )}

        {showResend && (
          <div className={cx("resend-section")}>
            <button
              type="button"
              onClick={handleResendVerification}
              disabled={isSubmitting}
              className={cx("resend-button")}
            >
              {isSubmitting ? "Đang gửi..." : "Gửi lại email xác thực"}
            </button>
            {resendMessage && <p className={cx("resend-message")}>{resendMessage}</p>}
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
        </Button>
      </form>

      <div className={cx("divider")}>
        <span>HOẶC</span>
      </div>

      <Button
        variant="secondary"
        size="lg"
        fullWidth
        onClick={handleGoogleLogin}
      >
        Đăng nhập với Google
      </Button>

      <p className={cx("register-prompt")}>
        Chưa có tài khoản? <a href="/auth/register">Đăng ký</a>
      </p>
      <p className={cx("register-prompt")}>
        <a href="/forgot-password">Quên mật khẩu</a>
      </p>
    </div>
  );
};

export default Login;
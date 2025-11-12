import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import config from "@/config";

function ProtectedRoute({ children }) {
  console.log("Xin chào")
  const currentUser = useSelector((state) => state.auth.currentUser);
  console.log("currentUser:", currentUser);
  
  const location = useLocation();

  if (!currentUser) {
    // Lưu lại đường dẫn hiện tại (bao gồm query string)
    const continuePath = encodeURIComponent(location.pathname + location.search);
    console.log("continuePath:", config.routes.login);
    
    const loginPath = config.routes.login || "/auth/login"; // fallback nếu chưa config đúng

    console.log("Redirecting to login:", `${loginPath}?continue=${continuePath}`);

    return (
      <Navigate
        to={`${loginPath}?continue=${continuePath}`}
        replace
      />
    );
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ProtectedRoute;

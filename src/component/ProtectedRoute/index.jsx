import PropTypes from "prop-types";
import config from "@/config";
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import authService from "@/services/auth.service";
import { useLoading } from "@/hooks/useLoading";

function ProtectedRoute({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const data = await authService.getCurrentUser();
        console.log(data);
        setCurrentUser(data);
      } catch (error) {
        console.log(error);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [setLoading]);

  if (loading) {
    return <div>Loading.............</div>;
  }

  if (!currentUser) {
    const path = encodeURIComponent(location.pathname);
    return (
      <Navigate
        to={`${config.routes.login}${path ? `?continue=${path}` : ""}`}
      />
    );
  }

  // Nếu có currentUser, render children
  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.element,
};

export default ProtectedRoute;

import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import authService from "@/service/authService";

const UserContext = createContext();
UserContext.displayName = "UserContext";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const data = await authService.getCurrentUser();
        if (data) {
          setUser(data);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const values = {
    user,
    loading,
    setUser,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContext;

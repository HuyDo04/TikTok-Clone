import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const values = {
    loading,
    setLoading,
  };

  return (
    <LoadingContext.Provider value={values}>{children}</LoadingContext.Provider>
  );
};

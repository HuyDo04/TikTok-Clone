import PropTypes from "prop-types";
import { createContext } from "react";
import { Provider as ReduxProvider } from "react-redux"; // Import react-redux Provider

// Create custom context
// eslint-disable-next-line react-refresh/only-export-components
export const ReduxContext = createContext();

export const CustomReduxProvider = ({ children, store }) => {
  // You can add custom values to pass through your context
  const values = {
    store, // You can include the store or other custom data
    // Add other custom values or logic here, e.g., custom dispatch methods
  };

  return (
    <ReduxContext.Provider value={values}>
      {/* Wrap children with react-redux Provider to support useSelector */}
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </ReduxContext.Provider>
  );
};

CustomReduxProvider.propTypes = {
  store: PropTypes.object.isRequired,
  children: PropTypes.node,
};

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { LoadingProvider } from "./context/LoadingContext";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import { ThemeProvider } from "./context/ThemeContext"; // Import ThemeProvider

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider> {/* Wrap the app with ThemeProvider */}
          <LoadingProvider>
            <UserProvider>
              <App />
            </UserProvider>
          </LoadingProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
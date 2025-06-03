import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { LoadingProvider } from "./context/LoadingContext";
import { store } from "./store";
import { CustomReduxProvider } from "./context/ReduxContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <LoadingProvider>
      <UserProvider>
        <CustomReduxProvider store={store}>
          <App />
        </CustomReduxProvider>
      </UserProvider>
    </LoadingProvider>
  </BrowserRouter>
);

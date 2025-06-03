import { Router } from "react-router-dom";
import AppRoutes from "./component/AppRoutes";
import UserProvider from "./component/UserProvider";
import "./App.css";
function App() {
  return (
    <div>
      <AppRoutes />
      <UserProvider />
    </div>
  );
}

export default App;

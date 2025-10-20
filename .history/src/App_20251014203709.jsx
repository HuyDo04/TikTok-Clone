import { useState } from "react";
import AppRoutes from "./component/AppRoutes";
import Header from "./component/layouts/DefaultLayout/Header";
import Sidebar from "./component/Sidebar";
import "./App.css";

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  // This class will be added to the main content area
  const mainContentClassName = isSidebarCollapsed ? "main-content-collapsed" : "main-content-expanded";

  return (
    <div className="app-layout">
      <Header toggleSidebar={toggleSidebar} />
      <div className="app-body">
        <Sidebar isCollapsed={isSidebarCollapsed} />
        <main className={mainContentClassName}>
          <AppRoutes />
        </main>
      </div>
    </div>
  );
}

export default App;
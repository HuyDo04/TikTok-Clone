import { Outlet } from "react-router-dom";
import Sidebar from "@/component/Sidebar";

function DefaultLayout() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}

export default DefaultLayout;

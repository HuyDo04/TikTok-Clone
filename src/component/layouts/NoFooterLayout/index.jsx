import { Outlet } from "react-router-dom";
import Header from "../DefaultLayout/Header";

function NoFooterLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default NoFooterLayout;

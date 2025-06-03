import { Outlet } from "react-router-dom";
import Footer from "../DefaultLayout/Footer";

function NoHeaderLayout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}

export default NoHeaderLayout;

import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <>
      <Outlet />
      <h1>AdminLayout</h1>
    </>
  );
}

export default AdminLayout;

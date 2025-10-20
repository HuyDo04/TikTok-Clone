import Navbar from "@/component/layouts/DefaultLayout/Header/NavBar";

function Header({ toggleSidebar }) {
  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
    </>
  );
}

export default Header;
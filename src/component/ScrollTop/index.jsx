import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollTop() {
  const location = useLocation();
  console.log(location);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
}

export default ScrollTop;

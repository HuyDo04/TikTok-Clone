import { useLocation } from "react-router-dom";

function useQuery() {
  const location = useLocation();
  return new URLSearchParams(location.search);
}

export default useQuery;

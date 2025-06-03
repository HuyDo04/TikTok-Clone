import { useSelector } from "react-redux";

function useCurrentUser() {
  return useSelector((state) => state.auth.currentUser);
}

export default useCurrentUser;

import UserContext from "@/context/UserContext";
import { useContext } from "react";

function useUser() {
  const data = useContext(UserContext);
  // console.log(data);
  // if (!data) return {};
  return data.user;
}

export default useUser;

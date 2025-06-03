import { LoadingContext } from "@/context/LoadingContext";
import { useContext } from "react";

export const useLoading = () => {
  const loading = useContext(LoadingContext);
  return loading;
};

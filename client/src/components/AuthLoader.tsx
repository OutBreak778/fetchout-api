import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";

const AuthLoader =  () => {
  const { fetchUser } = useAuthStore();
  useEffect(() => {
    const hasSession = document.cookie.includes("token")
    const fetchData = async () => {
      if(hasSession) {
        fetchUser();
      }
    }
    fetchData()
  }, [fetchUser]);


  return null;
};

export default AuthLoader;

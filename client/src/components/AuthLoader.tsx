// components/AuthLoader.tsx
import { useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";

const AuthLoader = () => {
  const { fetchUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return null; // This component doesn't render anything
};

export default AuthLoader;

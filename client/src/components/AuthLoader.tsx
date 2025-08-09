import { useAuthStore } from "@/stores/useAuthStore";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

const AuthLoader = () => {
  const { fetchUser, isLoading } = useAuthStore();
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <Loader2 className="h-12 w-12 text-white animate-spin" />
      </div>
    );
  }
  return null;
};

export default AuthLoader;

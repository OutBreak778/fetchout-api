import { useAuthStore } from "@/stores/useAuthStore";
import { Loader2 } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const { isLoading, isAuthenticated } = useAuthStore();
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <Loader2 className="h-12 w-12 text-white animate-spin" />
      </div>
    );
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoutes;

import { useAuthStore } from "@/stores/useAuthStore";
import { Loader2 } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";

const PrivateRoutes = () => {
 const { isLoading, isAuthenticated } = useAuthStore()
  if (isLoading) {
    return (
      <div className="container w-full h-full bg-white">
        <Loader2 className="w-12 h-12 animate-spin" />
      </div>
    );
  }
  if (!isAuthenticated) {
    toast.error("Please login first.");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoutes;

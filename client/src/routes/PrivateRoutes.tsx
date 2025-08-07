import { useAuthStore } from "@/stores/useAuthStore"
import { Navigate, Outlet } from "react-router-dom"
import { toast } from "sonner"

const PrivateRoutes = () => {
  const {isAuthenticated } = useAuthStore()
 
  if (isAuthenticated) {
    toast.error("Authentication failed.")
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default PrivateRoutes
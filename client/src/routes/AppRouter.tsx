import VerifyEmail from "@/components/VerifyEmail";
import { AuthLayout } from "@/layouts/AuthLayout";
import { MainLayout } from "@/layouts/MainLayout";
import Dashboard from "@/pages/Dashboard";
import Error404 from "@/pages/Error404";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoutes />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Route>
      </Route>

      {/* Protected Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default AppRouter;

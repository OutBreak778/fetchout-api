import VerifyEmail from "@/components/VerifyEmail";
import { AuthLayout } from "@/layouts/AuthLayout";
import { MainLayout } from "@/layouts/MainLayout";
import Dashboard from "@/pages/Dashboard";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import { Error404 } from "@/pages/Error404";
import Navbar from "@/components/Navbar";
import Endpoint from "@/components/Endpoint";
import UsageLog from "@/components/UsageLog";
import Settings from "@/components/Settings";

const AppRouter = () => {
  return (
    <Routes>
      {/* Public */}
      <Route
        path="/"
        element={
          <div className="bg-white text-black">
            <div className="border-b sticky top-0 z-40 bg-transparent backdrop-blur-lg border-gray-300">
              <Navbar />
            </div>
            <Home />
          </div>
        }
      />
      <Route element={<PublicRoutes />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Route>
      </Route>

      {/* Protected */}
      <Route element={<MainLayout />}>
        <Route element={<PrivateRoutes />}>
          <Route element={<AuthLayout />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/endpoints" element={<Endpoint />} />
          <Route path="/usage-log" element={<UsageLog />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default AppRouter;

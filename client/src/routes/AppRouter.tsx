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
import Endpoint from "@/features/endpoint/components/Endpoint";
import UsageLog from "@/features/usage-log/components/UsageLog";
import Profile from "@/features/profile/components/Profile";
import Documentation from "@/components/Documentation";
import CreateEndpoint from "@/features/create-api/components/CreateEndpoint";
import UsageLogSlug from "@/features/usage-log/components/UsageLogSlug";
import { HelpSupportPage } from "@/components/HelpSupportPage";

const AppRouter = () => {
  return (
    <Routes>
      {/* Public */}
      <Route
        path="/"
        element={
          <div className="bg-white h-full w-full text-black">
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
          
          {/* Sidebar Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/endpoints" element={<Endpoint />} />


          <Route path="/usage-log" element={<UsageLog />} />
          <Route path="/usage-log/:slug" element={<UsageLogSlug />} />

          {/* UserButton Routes */}
          <Route path="/profile" element={<Profile />} />

          <Route path="/help-support" element={<HelpSupportPage />} />
          <Route path="/documentation" element={<Documentation />} />

          {/* Endpoint Routes */}
          <Route path="/create-api" element={<CreateEndpoint />} />
        </Route>
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default AppRouter;

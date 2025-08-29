import { LogOut, PlusIcon, Trash2 } from "lucide-react";
import logo from "../assets/logo.svg";
import { routes } from "@/config";
import { useAuthStore } from "@/stores/useAuthStore";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const Sidebar = () => {
  const path = useLocation();

  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div
      className={`flex flex-col h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 w-64`}
    >
      {/* Header Section with Logo and Collapse Toggle */}
      <div className="relative flex items-center justify-center border-b border-gray-300">
        <div className="h-16 flex items-center justify-between px-4">
          <div
            onClick={() => navigate("/")}
            className="flex items-center justify-center space-x-3 group cursor-pointer"
          >
            <div className="relative">
              <img
                src={logo}
                alt="Fetchout Logo"
                className="invert w-10 h-10 transition-transform"
              />
            </div>
            <span className="text-xl font-bold text-sidebar-foreground tracking-tight">
              Fetchout
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 ">
        {/* Create Endpoint - Primary Action */}
        <div className="p-4">
          <button
            onClick={() => navigate("/create-api")}
            className={`group relative flex cursor-pointer items-center justify-center gap-3 px-4 py-3 bg-primary text-primary-foreground rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] w-full `}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/90 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <PlusIcon size={18} className="relative z-10" />
            <span className="font-semibold text-sm relative z-10">
              Create Endpoint
            </span>
            <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
              Create Endpoint
            </div>
            {/* Subtle glow effect */}
            <div className="absolute -inset-1 bg-primary/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </div>

        {/* Navigation Section */}
        <div className="px-4 space-y-1">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Navigation
            </p>
          </div>

          {routes.map((route) => {
            const IconComponent = route.icon;

            return (
              <button
                key={route.id}
                onClick={() => navigate(route.route)}
                className={`group relative flex items-center cursor-pointer gap-3 py-3 px-3 rounded-xl transition-all duration-200 w-full ${
                  path.pathname === route.route
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                }`}
              >
                <div
                  className={`relative p-2 rounded-lg transition-all duration-200 ${
                    path.pathname === route.route
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                  }`}
                >
                  <IconComponent size={18} />
                  {path.pathname === route.route && (
                    <div className="absolute -inset-1 bg-primary/20 rounded-lg blur opacity-50"></div>
                  )}
                </div>

                <>
                  <span className="font-medium flex-1 text-left">
                    {route.title}
                  </span>
                  {path.pathname === route.route && (
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  )}
                </>

                {/* Tooltip for collapsed state */}
                <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  {route.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Additional Features Section */}
        <div className="px-4 mt-8">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Quick Actions
          </p>
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 py-2 px-3 text-sm text-sidebar-foreground hover:bg-sidebar-accent/30 rounded-lg transition-colors">
              <div className="w-2 h-2 bg-chart-2 rounded-full"></div>
              Recent Activity
            </button>
            <button className="w-full flex items-center gap-3 py-2 px-3 text-sm text-sidebar-foreground hover:bg-sidebar-accent/30 rounded-lg transition-colors">
              {/* <Link to="/help-support" className="flex items-center gap-x-3"> */}
                <div className="w-2 h-2 bg-chart-3 rounded-full"></div>
                <span>
                Help & Support
                </span>
              {/* </Link> */}
            </button>
          </div>
        </div>
      </div>

      {/* Footer Section with Logout */}
      <Dialog>
        <DialogTrigger asChild>
          <div className="border-t border-sidebar-border bg-gradient-to-r from-sidebar to-sidebar/95">
            <div className="w-full flex items-center cursor-pointer gap-3 py-3 px-4 text-sidebar-foreground hover:bg-red-50 hover:text-red-600 transition-all duration-200 group">
              <div className="p-2 rounded-lg bg-muted text-muted-foreground group-hover:bg-red-100 group-hover:text-red-600 transition-all">
                <LogOut size={18} />
              </div>
              <span className="font-medium">Logout</span>
            </div>
          </div>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[420px] bg-white text-gray-800 rounded-2xl shadow-xl border border-gray-200 p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Are you absolutely sure?
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500 mt-1">
              Are you sure you want to log out of your account? You can log back
              in anytime.
            </DialogDescription>
          </DialogHeader>

          <div className="w-full gap-3 mt-6">
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm w-full cursor-pointer font-medium flex items-center justify-center gap-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
            >
              <Trash2 className="w-4 h-4" />
              Logout
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Sidebar;

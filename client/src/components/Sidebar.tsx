import { Link, NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import logo from "../assets/logo.svg";
import { routes } from "@/config";
import { useAuthStore } from "@/stores/useAuthStore";

const Sidebar = () => {
  const navigate = useNavigate()
  const { logout } = useAuthStore()
  const handleLogout = async () => {
    await logout()
    navigate("/")
  }
  return (
    <div className="flex flex-col justify-between h-full text-black">
      <div className="relative">
        <Link
          to="/"
          className="h-16 flex items-center justify-center border-gray-200 space-x-2"
        >
          <img src={logo} alt="logo" className="invert w-10 h-10" />
          <span className="text-xl font-bold">FetchOut</span>
        </Link>

        <nav className="flex flex-col gap-2 p-6 border-t border-gray-300">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-3">
            Navigation
          </p>
          {routes.map((route) => {
            const IconComponent = route.icon;
            return (
              <NavLink
                key={route.id}
                to={route.route}
                className={({ isActive }) =>
                  `group flex items-center gap-3 py-3 px-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm border-l-4 border-blue-500"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div
                      className={`p-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-700"
                      }`}
                    >
                      <IconComponent size={18} />
                    </div>
                    <span
                      className={`font-medium ${
                        isActive
                          ? "text-blue-700"
                          : "text-gray-700 group-hover:text-gray-900"
                      }`}
                    >
                      {route.title}
                    </span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="border-t border-gray-200 bg-gray-50">
        <button onClick={handleLogout} className="w-full flex items-center gap-3 py-3 px-3 text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group">
          <div className="p-2 rounded-lg bg-gray-100 text-gray-500 group-hover:bg-red-100 group-hover:text-red-500">
            <LogOut size={18} />
          </div>
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

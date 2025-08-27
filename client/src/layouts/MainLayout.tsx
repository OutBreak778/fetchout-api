import MobileSidebar from "@/components/MobileSidebar";
import Sidebar from "@/components/Sidebar";
import UserButton from "@/components/UserButton";
import { useAuthStore } from "@/stores/useAuthStore";
import { Link, Outlet, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";

export function MainLayout() {
  const { pathname } = useLocation();
  const { user } = useAuthStore();

  const showSidebar = pathname !== "/";
  const showHamburger = pathname !== "/";

  return (
    <div className="w-full h-screen flex bg-white">
      {showSidebar && (
        <aside className="w-72 hidden lg:flex left-0 h-screen bg-white border-r border-gray-300">
          <Sidebar />
        </aside>
      )}

      <div className={`flex flex-col h-full w-full`}>
        <header className="h-16 px-5 text-black border-b  border-gray-200 flex items-center justify-between py-4 bg-white z-40 w-full">
          <div className="hidden lg:flex" />
          <div className="lg:hidden flex">
            {showHamburger && <MobileSidebar />}
          </div>
          <Link
            to="/"
            className="flex lg:hidden items-center gap-3 group transition-all duration-300 hover:scale-105"
          >
            <div className="relative">
              <img src={logo} alt="logo" className="w-10 h-10 invert" />
            </div>
            <span className="text-xl font-bold text-black group-hover:text-gray-800 transition-colors duration-300">
              Fetchout
            </span>
          </Link>
          {user && (
            <div className="cursor-pointer">
              <UserButton user={user} />
            </div>
          )}
        </header>

        <main className="w-full px-3 py-5 no-scrollbar overflow-y-scroll">
          <div className="bg-white">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

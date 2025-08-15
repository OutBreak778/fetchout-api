import MobileSidebar from "@/components/MobileSidebar";
import Sidebar from "@/components/Sidebar";
import UserButton from "@/components/UserButton";
import { useAuthStore } from "@/stores/useAuthStore";
import { Outlet, useLocation } from "react-router-dom";

export function MainLayout() {
  const { pathname } = useLocation();
  const { user } = useAuthStore();

  const showSidebar = pathname !== "/";
  const showHamburger = pathname !== "/";

  return (
    <div className="w-full h-screen flex bg-white">
      {showSidebar && (
        <aside className="w-72 hidden md:flex left-0 h-screen bg-white border-r border-gray-300">
          <Sidebar />
        </aside>
      )}

      <div className={`flex flex-col h-full w-full`}>
        <header className="h-16 px-5 text-black border-b  border-gray-200 flex items-center justify-between py-4 bg-white z-40 w-full">
          <div className="hidden md:flex" />
          <div className="md:hidden flex">
            {showHamburger && <MobileSidebar />}
          </div>
          {user && (
            <div className="cursor-pointer">
              <UserButton user={user} />
            </div>
          )}
        </header>

        <main className="flex-1 overflow-y-auto  px-3 py-5 no-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

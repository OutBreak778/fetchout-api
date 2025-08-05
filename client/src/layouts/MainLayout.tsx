import Navbar from "@/components/Navbar";
import { Outlet, useLocation } from "react-router-dom";

export function MainLayout() {
  const { pathname } = useLocation();
  const loca = pathname !== "/";
  return (
    <div className="min-h-screen w-full flex">
      {/* Sidebar */}
      {loca && (
        <aside className="w-64 bg-gray-900 text-white p-4">Sidebar</aside>
      )}
      {/* Main Content */}
      <div className="w-full">
        {/* Navbar */}
        <header className="h-16 sticky top-0 z-50 bg-white">
          <Navbar />
        </header>

        {/* Page Content */}
        <main className="flex-1 bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

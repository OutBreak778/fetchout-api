import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      Sidebar
      <div className="flex">
        Navbar
        <Outlet />
      </div>
    </div>
  );
}

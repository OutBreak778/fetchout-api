import { Menu } from "lucide-react";
import logo from "../assets/logo.svg";
import NavRoute from "./NavRoute";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import UserButton from "./UserButton";

const routes = [
  {
    id: 1,
    title: "Dashboard",
    route: "/dashboard",
  },
  {
    id: 2,
    title: "Endpoints",
    route: "/endpoints",
  },
  {
    id: 3,
    title: "Usage Log",
    route: "/usage-log",
  },
  {
    id: 4,
    title: "Settings",
    route: "/settings",
  },
];

const Navbar = () => {
  const {isAuthenticated} = useAuthStore();
  return (
    <header className="w-full text-black py-3 px-4 shadow">
      <div className="max-w-7xl mx-auto flex items-center justify-between">


        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <Menu className="w-6 h-6 text-gray-700 dark:text-white" />
        </div>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-10 h-10 invert" />
          <span className="text-xl font-semibold text-black">Fetchout</span>
        </Link>

        {/* Desktop Nav */}
        {isAuthenticated && (
          <nav className="hidden md:flex items-center gap-6">
            {routes.map((item) => (
              <NavRoute key={item.id} title={item.title} route={item.route} />
            ))}
          </nav>
        )}

        {/* CTA */}
        <Link to={"/login"} className="hidden md:block">
          <Button variant="outline" size="lg" className="cursor-pointer">
            Get Started
          </Button>
        </Link>

        <UserButton />

      </div>
    </header>
  );
};

export default Navbar;

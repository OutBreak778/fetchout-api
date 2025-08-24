import logo from "../assets/logo.svg";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import MobileSidebar from "./MobileSidebar";
import UserButton from "./UserButton";
import { Zap } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 mb-12 bg-white border-b border-gray-200`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <span className="flex md:hidden">
            {isAuthenticated && <MobileSidebar />}
          </span>
          <Link
            to="/"
            className="flex items-center gap-3 group transition-all duration-300 hover:scale-105"
          >
            <div className="relative">
              <img src={logo} alt="logo" className="w-10 h-10 invert" />
            </div>
            <span className="text-xl font-bold text-black group-hover:text-gray-800 transition-colors duration-300">
              Fetchout
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {isAuthenticated && ["Dashboard", "Documentation", "Community"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="relative text-black hover:text-gray-600 transition-colors duration-300 group py-2"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <div className="rounded-full flex items-center justify-center text-white font-semibold hover:scale-105 transition-transform duration-300 cursor-pointer">
                  <UserButton user={user} />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="hidden sm:inline-flex text-black hover:text-gray-600 hover:bg-black/5 transition-all duration-300"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-black text-white hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-lg group">
                    <Zap className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

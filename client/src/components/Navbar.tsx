import logo from "../assets/logo.svg";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import UserButton from "./UserButton";
import { useAuthStore } from "@/stores/useAuthStore";
import MobileSidebar from "./MobileSidebar";

const Navbar = () => {
  const { isAuthenticated } = useAuthStore();
  return (
    <header className="w-full text-black px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {isAuthenticated && (
          <div className="md:hidden block ml-2">
            <MobileSidebar />
          </div>
        )}

        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-10 h-10 invert" />
          <span className="text-xl font-semibold text-black">Fetchout</span>
        </Link>

        {isAuthenticated ? (
          <div className="p-2">
            <UserButton />
          </div>

        ) : (
          <Link to={"/login"} className="hidden md:block">
            <Button
              variant="outline"
              size="lg"
              className="cursor-pointer"
            >
              Get Started
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;

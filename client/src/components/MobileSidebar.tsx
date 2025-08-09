import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from "./Sidebar";
import { MenuIcon } from "lucide-react";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="p-2 rounded-md border border-gray-300 hover:bg-gray-100">
        <MenuIcon className="w-5 h-5" />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-64">
        <SheetTitle />
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;

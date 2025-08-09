import { BarChart3, Globe, Home, Settings } from "lucide-react";

export const routes = [
  {
    id: 1,
    title: "Dashboard",
    route: "/dashboard",
    icon: Home,
  },
  {
    id: 2,
    title: "Endpoints",
    route: "/endpoints",
    icon: Globe,
  },
  {
    id: 3,
    title: "Usage Log",
    route: "/usage-log",
    icon: BarChart3,
  },
  {
    id: 4,
    title: "Settings",
    route: "/settings",
    icon: Settings,
  },
];

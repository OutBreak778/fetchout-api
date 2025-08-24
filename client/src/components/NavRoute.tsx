// import { Link } from "react-router-dom";
// import { Button } from "./ui/button";
// import { LogOut, type LucideIcon } from "lucide-react";

// interface NavRouteProps {
//   title: string;
//   route: string;
//   isActive: boolean;
//   icon: LucideIcon;
// }

// const NavRoute = ({ title, route, icon, isActive }: NavRouteProps) => {
//   const IconComponent = icon;

//   return (
//     <div
//       className={`group relative flex items-center gap-3 py-3 px-3 rounded-xl transition-all duration-200 w-full ${
//         isActive
//           ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
//           : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
//       }`}
//     >
//       <div
//         className={`relative p-2 rounded-lg transition-all duration-200 ${
//           isActive
//             ? "bg-primary text-primary-foreground shadow-md"
//             : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
//         }`}
//       >
//         <IconComponent size={18} />
//         {isActive && (
//           <div className="absolute -inset-1 bg-primary/20 rounded-lg blur opacity-50"></div>
//         )}
//       </div>

//       <>
//         <span className="font-medium flex-1 text-left">{title}</span>
//         {isActive && (
//           <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
//         )}
//       </>

//       {/* Tooltip for collapsed state */}
//       <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
//         {title}
//       </div>
//     </div>
//   );
// };

// export default NavRoute;

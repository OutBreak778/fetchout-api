// import { Link } from "react-router-dom";
// import { Button } from "./ui/button";
// import { LogOut } from "lucide-react";

// interface NavRouteProps {
//   title: string;
//   route: string;
// }

// const NavRoute = ({ title, route }: NavRouteProps) => {
//   return (
//     <div>
//       {/* Header with Logo */}
//       <div className="border-b border-sidebar-border">
//         <div className="flex items-center gap-3 px-3 py-4">
//           <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg">
//             A
//           </div>
//           <div className="flex flex-col">
//             <span className="text-lg font-semibold text-sidebar-foreground">
//               API Hub
//             </span>
//             <span className="text-xs text-sidebar-foreground/60">
//               v2.1.0
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Navigation Content */}
//       <div className="px-2">
//         <div className="py-2">
//           <div>
 
//                 <div>
//                   <div 
//                     className="w-full justify-start gap-3 px-3 py-2.5 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
//                   >
//                     <Link to={route} className="flex items-center gap-3">
//                       <span className="truncate">{title}</span>
//                     </Link>
//                   </div>
//                 </div>
 
//             Routes will be here...
//           </div>
//         </div>
//       </div>

//       {/* Footer with Logout */}
//       <div className="border-t border-sidebar-border">
//         <div className="p-2">
//           <div>
//             <div>
//               <Button
//                 variant="ghost"
//                 className="w-full justify-start gap-3 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950 dark:hover:text-red-300"
//               >
//                 <LogOut className="h-4 w-4 shrink-0" />
//                 <span>Logout</span>
//               </Button>
//             </div>
//           </div>
//         </div>
        
//         {/* User Info */}
//         <div className="px-3 py-2 border-t border-sidebar-border/50">
//           <div className="flex items-center gap-3">
//             <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white text-sm font-medium">
//               JD
//             </div>
//             <div className="flex flex-col min-w-0">
//               <span className="text-sm font-medium text-sidebar-foreground truncate">
//                 John Doe
//               </span>
//               <span className="text-xs text-sidebar-foreground/60 truncate">
//                 john@example.com
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NavRoute;

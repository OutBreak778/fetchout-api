import { Calendar, LogOut, Shield, ShieldCheck } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAuthStore } from "@/stores/useAuthStore";
import type { userButtonProps } from "@/types";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { formatJoinDate } from "@/lib/formatDate";
import { GetInitial } from "@/lib/getInitials";
import { userButtonRoutes } from "@/config";


const UserButton = ({ user }: userButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const { logout } = useAuthStore()
  const navigate = useNavigate()

  if (!user || !user.userName) {
    return null
  }

  const handleNavigation = (href: string) => {
    navigate(href)
    setIsOpen(false)
  }

  const handleLogout = async () => {
    await logout()
    navigate("/")
    setIsOpen(false)
  }


  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full ring-offset-background transition-all hover:ring-2 hover:ring-ring hover:ring-offset-2"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.userName} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
              {GetInitial(user.userName)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-72 border border-gray-200" align="end" sideOffset={5}>
        <DropdownMenuLabel className="p-0">
          <div className="flex items-center gap-3 p-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.userName} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold text-lg">
                {GetInitial(user.userName)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-sm leading-none">{user.userName}</p>
                {user.isVerified && <ShieldCheck className="h-4 w-4 text-emerald-500" />}
              </div>
              <p className="text-xs text-muted-foreground leading-none">{user.email}</p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <div className="p-2">
          {userButtonRoutes.map((item) => (
            <DropdownMenuItem
              key={item.id}
              className="cursor-pointer rounded-md p-3 transition-colors hover:bg-accent/50"
              onClick={() => handleNavigation(item.route)}
            >
              <item.icon className="mr-3 h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{item.title}</span>
            </DropdownMenuItem>
          ))}
        </div>

        <DropdownMenuSeparator />

        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Account Status</span>
            </div>
            <Badge
              variant={user.isVerified ? "default" : "secondary"}
              className={
                user.isVerified
                  ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400"
                  : "bg-amber-100 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-400"
              }
            >
              {user.isVerified ? "Verified" : "Pending"}
            </Badge>
          </div>

          {user.createdAt && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Member since {formatJoinDate(`${user.createdAt}`)}</span>
            </div>
          )}
        </div>

        <DropdownMenuSeparator />

        <div className="p-2">
          <DropdownMenuItem
            className="cursor-pointer rounded-md p-3 text-red-600 transition-colors hover:bg-red-50 hover:text-red-700 focus:bg-red-50 focus:text-red-700 dark:hover:bg-red-950/10 dark:focus:bg-red-950/10"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-4 w-4" />
            <span className="font-medium">Sign out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton;

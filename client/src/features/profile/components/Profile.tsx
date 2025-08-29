import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEndpointStore } from "@/stores/useEndpointStore";
import {
  Copy,
  Globe,
  Loader2,
  Lock,
  MoreHorizontal,
  Plus,
  Trash2,
} from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Profile = () => {
  const { user } = useAuthStore();
  const { data, isLoading, fetchEndpoint, deleteEndpoint } = useEndpointStore();
  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-green-100 text-green-700 border-green-200";
      case "POST":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "PUT":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "DELETE":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  useEffect(() => {
    fetchEndpoint();
  }, [fetchEndpoint]);

  if (!data) {
    return (
      <div className="flex items-center text-gray-600 justify-center w-full h-[70vh]">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  const filtered = Array.isArray(data) ? [...data] : [];
  const totalEndpoint = filtered.length;
  const activeUserEnpoint = new Set(filtered.filter((item) => item.name)).size;

  const copyClipboard = async (url: string) => {
    await window.navigator.clipboard.writeText(url);
    setTimeout(() => {
      toast.success("Copied to clipboard successfully.");
    }, 300);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };
  const formatDateWithYear = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      year: "numeric",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  if (!user) return null;

  if (isLoading) {
    return (
      <div className="flex items-center text-gray-600 justify-center w-full h-[70vh]">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section with User Profile */}

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 via-gray-300/10 rounded-md to-gray-400/10"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            {/* Avatar Section */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-indigo-500 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <Avatar className="relative h-32 w-32 border-4 border-white shadow-xl">
                <AvatarImage
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.userName}
                />
                <AvatarFallback className="text-3xl font-semibold bg-indigo-500 text-white">
                  {user.userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-2">
                {user.userName}
              </h1>
              <p className="text-xl text-gray-600 mb-4">{user.email}</p>
              <p className="text-gray-500 mb-6">
                Member since {user && formatDateWithYear(user.createdAt ?? "").slice(0, 12)}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">
                    {totalEndpoint}
                  </div>
                  <div className="text-sm text-gray-500">Total Endpoints</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {activeUserEnpoint ?? 0}
                  </div>
                  <div className="text-sm text-gray-500">Active</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Separator className="mt-5" />
      {/* Endpoints Section */}
      <div className="max-w-6xl mx-auto py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Custom Endpoints
            </h2>
            <p className="text-gray-600">
              Manage and monitor your API endpoints
            </p>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid gap-6">
            {data &&
              filtered.map((endpoint, index) => {
                  const urlPath = endpoint.urlPath.split("/").slice(0,-1).join("/")
                return (
                <div
                  key={endpoint._id}
                  className="group relative bg-white rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* <div className="absolute inset-0 bg-gradient-to-r from-violet-600/5 to-pink-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}

                  <div className="relative p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Endpoint Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-gradient-to-br from-violet-100 to-purple-100 rounded-lg">
                            <Globe className="h-5 w-5 text-violet-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">
                              {endpoint.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge
                                variant="outline"
                                className={`${getMethodColor(
                                  endpoint.methods
                                )} font-medium`}
                              >
                                {endpoint.methods}
                              </Badge>
                              <Badge
                                variant={
                                  endpoint.isPublic ? "default" : "secondary"
                                }
                                className={
                                  endpoint.isPublic
                                    ? "bg-green-50 text-green-700 border-none"
                                    : "bg-red-50 text-red-700 border-none"
                                }
                              >
                                {endpoint.isPublic ? (
                                  <Badge
                                    variant="outline"
                                    className="text-xs bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700"
                                  >
                                    <Globe className="w-3 h-3 mr-1" />
                                    Public
                                  </Badge>
                                ) : (
                                  <Badge
                                    variant="outline"
                                    className="text-xs bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-700"
                                  >
                                    <Lock className="w-3 h-3 mr-1" />
                                    Private
                                  </Badge>
                                )}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-100 w-full rounded-lg px-3 py-2 mb-4">
                          <code className="text-sm text-gray-700 font-mono">
                            {<span className="hidden md:block">{endpoint.urlPath}</span>}
                            {<span className="block md:hidden">{urlPath}</span>}
                          </code>
                        </div>

                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <span>
                            Last used: {formatDate(endpoint.createdAt).slice(0,20)}
                          </span>
                          <span>
                            Requests limit: {endpoint.rateLimit.limit}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex w-full lg:w-auto items-center gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-black cursor-pointer border border-gray-200 rounded-sm mt-5"
                            >
                              <MoreHorizontal className="h-4 w-4 mr-1" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-40 space-y-1 border-2 border-gray-200"
                          >
                            <DropdownMenuItem
                              onClick={() => copyClipboard(endpoint.urlPath)}
                              className="cursor-pointer hover:bg-gray-200"
                            >
                              <Copy className="h-4 w-4 mr-1" />
                              Copy
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => deleteEndpoint(endpoint.slug)}
                              className="cursor-pointer text-red-500"
                            >
                              <Trash2 className="h-4 w-4 mr-1 text-red-500" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>
              )})}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-pink-600/20 rounded-full blur-xl"></div>
              <div className="relative bg-gradient-to-br from-violet-100 to-pink-100 p-6 rounded-full">
                <Globe className="h-16 w-16 text-indigo-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No endpoints created yet
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Get started by creating your first custom endpoint to begin
              managing your APIs
            </p>
            <Button
              size="lg"
              type="button"
              className="bg-gradient-to-r from-indigo-500 to-indigo-600 cursor-pointer hover:from-indigo-600 hover:to-indigo-700 shadow-lg"
            >
              <Link to="/create-api" className="flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Create Your First Endpoint
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

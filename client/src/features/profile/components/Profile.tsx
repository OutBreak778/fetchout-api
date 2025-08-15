import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/formatDate";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEndpointStore } from "@/stores/useEndpointStore";
import {
  Copy,
  Edit3,
  ExternalLink,
  Globe,
  Loader2,
  Lock,
  MoreVertical,
  Play,
  Plus,
} from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Profile = () => {
  const { user } = useAuthStore();
  const { data, isLoading, fetchEndpoint } = useEndpointStore();
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

  const copyClipboard = async (url: string) => {
    await window.navigator.clipboard.writeText(url);
    setTimeout(() => {
      toast.success("Copied to clipboard successfully.");
    }, 300);
  };

  if (!user) return null;

  if (isLoading) {
    return (
      <div className="flex items-center text-gray-600 justify-center w-full h-full">
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
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <Avatar className="relative h-32 w-32 border-4 border-white shadow-xl">
                <AvatarImage
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.userName}
                />
                <AvatarFallback className="text-3xl font-semibold bg-gradient-to-br from-blue-500 to-purple-500 text-white">
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
              <p className="text-gray-500 mb-6">Member since July, 2024</p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-violet-600">12</div>
                  <div className="text-sm text-gray-500">Total Endpoints</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">5</div>
                  <div className="text-sm text-gray-500">Active</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">2.1k</div>
                  <div className="text-sm text-gray-500">Total Requests</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <Link to="/edit-profile" className="flex gap-3">
              <Button
                size="lg"
                className="bg-gradient-to-r cursor-pointer from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Separator className="mt-5" />
      {/* Endpoints Section */}
      <div className="max-w-6xl mx-auto px-6 py-12">
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

        {data.length > 0 ? (
          <div className="grid gap-6">
            {data.map((endpoint, index) => (
              <div
                key={endpoint._id}
                className="group relative bg-white rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/5 to-pink-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

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

                      <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <code className="text-sm text-gray-700 font-mono break-all">
                          {endpoint.urlPath}
                        </code>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <span>Last used: {formatDate(endpoint.createdAt)}</span>
                        <span>Requests: {endpoint.rateLimit.limit}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyClipboard(endpoint.urlPath)}
                        className="hover:bg-blue-50 hover:border-blue-200 bg-transparent  text-black cursor-pointer"
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-green-50 hover:border-green-200 bg-transparent  text-black cursor-pointer"
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Test
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-purple-50 hover:border-purple-200 bg-transparent  text-black cursor-pointer"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Open
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-black"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-pink-600/20 rounded-full blur-xl"></div>
              <div className="relative bg-gradient-to-br from-violet-100 to-pink-100 p-6 rounded-full">
                <Globe className="h-16 w-16 text-violet-600" />
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
              className="bg-gradient-to-r from-violet-600 to-purple-600 cursor-pointer hover:from-violet-700 hover:to-purple-700 shadow-lg"
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

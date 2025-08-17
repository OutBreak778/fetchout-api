import {
  Copy,
  Zap,
  Globe,
  Lock,
  Clock,
  TrendingUp,
  Star,
  Code,
  Activity,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatJoinDate } from "@/lib/formatDate";
import type { EndpointData } from "@/types";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { methodColors, methodIcons } from "@/config";

interface EndpointCardProps {
  filteredEndpoints: EndpointData[];
}

const EndpointCards = ({ filteredEndpoints }: EndpointCardProps) => {
  const [showApiKey, setShowApiKey] = useState<boolean>(false);

  const copyToClipboard = async (item: string) => {
    await window.navigator.clipboard.writeText(item);
    setTimeout(() => {
      toast.success("Copied to clipboard successfully.");
    }, 300);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 text-gray-800">
      {filteredEndpoints.map((endpoint) => {
        const isHighTraffic = endpoint.hits > 1000;
        const MethodIcon = methodIcons[endpoint.methods] || Code;
        const isNew = formatDate(endpoint.createdAt).includes("day");
        const cleanedPath = endpoint.urlPath.split("/").slice(0, -1).join("/");

        return (
          <div
            key={endpoint._id}
            className={`group relative bg-card border-2 border-gray-200 rounded-2xl p-6 transition-all duration-300 card-hover hover:shadow-2xl hover:border-primary/30 w-full ${
              isNew ? "pulse-glow border-primary/30 shadow-xl" : "border-border"
            }`}
          >
            {/* Card Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-xl ${
                    methodColors[endpoint.methods]
                  } border`}
                >
                  <MethodIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-card-foreground group-hover:text-primary transition-colors">
                    {endpoint.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={`text-xs font-semibold border`}>
                      {endpoint.methods}
                    </Badge>
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
                    {isNew && (
                      <Badge className="text-xs bg-gradient-to-r from-blue-400 to-purple-500 text-gray-50 animate-pulse">
                        <Star className="w-3 h-3 mr-1" />
                        New
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="flex flex-col items-end gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    isHighTraffic
                      ? "bg-green-500 animate-pulse"
                      : "bg-yellow-500"
                  }`}
                />
                {isHighTraffic && (
                  <Badge
                    variant="outline"
                    className="text-xs bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20"
                  >
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Hot
                  </Badge>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2 h-12 leading-relaxed">
              {endpoint.description}
            </p>

            {/* URL Path */}
            <div className="mb-4">
              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg border border-border/50">
                <Code className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <code className="text-sm font-mono text-card-foreground flex-1 truncate">
                  {cleanedPath}
                </code>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(cleanedPath)}
                  className="h-6 w-6 p-0 hover:bg-primary/10"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center p-2 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Activity className="w-3 h-3 text-primary" />
                  <span className="text-xs font-medium text-muted-foreground">
                    HITS
                  </span>
                </div>
                <p className="text-sm font-bold text-card-foreground">
                  {endpoint.hits > 1000
                    ? `${(endpoint.hits / 1000).toFixed(1)}K`
                    : endpoint.hits}
                </p>
              </div>

              <div className="text-center p-2 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Zap className="w-3 h-3 text-amber-500" />
                  <span className="text-xs font-medium text-muted-foreground">
                    LIMIT
                  </span>
                </div>
                <p className="text-sm font-bold text-card-foreground">
                  {endpoint.rateLimit.limit}/
                  {endpoint.rateLimit.period < 3600000 ? "min" : "day"}
                </p>
              </div>

              <div className="text-center p-2 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Clock className="w-3 h-3 text-blue-500" />
                  <span className="text-xs font-medium text-muted-foreground">
                    AGE
                  </span>
                </div>
                <p className="text-sm font-bold text-card-foreground">
                  {formatJoinDate(endpoint.createdAt).replace(" ago", "")}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 text-gray-800">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex-1 bg-primary hover:bg-primary/90 text-white  cursor-pointer hover:text-white  shadow-lg hover:shadow-xl transition-all"
                    type="button"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="!w-[500px] !max-w-none overflow-y-auto no-scrollbar">
                  <DialogHeader>
                    <DialogTitle className="flex text-gray-800 items-center gap-2">
                      {endpoint.name}
                      <Badge className={methodColors[endpoint.methods]}>
                        {endpoint.methods}
                      </Badge>
                      <Badge
                        variant={endpoint.isPublic ? "default" : "destructive"}
                      >
                        {endpoint.isPublic ? "Public" : "Private"}
                      </Badge>
                    </DialogTitle>
                    <DialogDescription>
                      {endpoint.description}
                    </DialogDescription>
                  </DialogHeader>

                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="parameters">Parameters</TabsTrigger>
                      <TabsTrigger value="example">Example</TabsTrigger>
                      <TabsTrigger value="metadata">Metadata</TabsTrigger>
                    </TabsList>

                    <TabsContent
                      value="overview"
                      className="space-y-4 text-gray-800"
                    >
                      <div className="flex flex-col text-gray-800 space-y-3">
                        <div>
                          <Label className="text-sm font-medium">
                            URL Path
                          </Label>
                          <div className="flex items-center gap-2 mt-1 overflow-x-scroll no-scrollbar">
                            <code className="bg-muted px-2 py-1 rounded text-sm flex-1">
                              {cleanedPath}
                            </code>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyToClipboard(cleanedPath)}
                              aria-label="Copy Link"
                              name="Copy the Link"
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        {endpoint.isPublic && (
                          <div>
                            <Label className="text-sm font-medium">
                              API Key
                            </Label>
                            <div className="flex items-center gap-2 mt-1">
                              <code className="px-2 py-1 rounded text-sm flex-1">
                                {showApiKey
                                  ? endpoint.apiKey
                                  : "ptfo_••••••••••••••••••••••••••••••••"}
                              </code>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setShowApiKey(!showApiKey)}
                              >
                                {showApiKey ? (
                                  <EyeOff className="w-3 h-3" />
                                ) : (
                                  <Eye className="w-3 h-3" />
                                )}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => copyToClipboard(endpoint.apiKey)}
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                      <Separator className="my-6" />
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label className="text-xs font-medium">Hits</Label>
                          <p className="text-xl font-bold mt-1">
                            {endpoint.hits.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <Label className="text-xs font-medium">
                            Rate Limit
                          </Label>
                          <p className="text-[16px] font-semibold mt-1">
                            {endpoint.rateLimit.limit} req/
                            {endpoint.rateLimit.period < 3600000
                              ? "minute"
                              : "day"}
                          </p>
                        </div>
                        <div>
                          <Label className="text-xs font-medium">
                            Last Updated
                          </Label>
                          <p className="text-xs mt-1">
                            {formatDate(endpoint.updatedAt)}
                          </p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="parameters" className="text-gray-800">
                      <Table className="border border-gray-300">
                        <TableHeader>
                          <TableRow>
                            <TableHead>type</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Parameter ID</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {endpoint.params.map((param) => (
                            <TableRow key={param._id}>
                              <TableCell className="font-medium">key</TableCell>
                              <TableCell>
                                <code className="px-1 py-0.5 rounded text-xs">
                                  {param.name}
                                </code>
                              </TableCell>
                              <TableCell>{param._id}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TabsContent>

                    <TabsContent
                      value="example"
                      className="space-y-4 text-gray-800"
                    >
                      <div className="max-w-[440px]">
                        <Label className="text-sm font-medium">
                          Example Request
                        </Label>
                        <div className="p-4 rounded-lg mt-2">
                          <pre className="text-sm overflow-auto px-3 py-2 border-2 border-gray-200 no-scrollbar">
                            <code className="text-gray-500">
                              {`${endpoint.methods} ${" "} ${cleanedPath}
Headers: { "Authorization": "Bearer ${endpoint.apiKey}" }`}
                            </code>
                          </pre>
                        </div>
                      </div>

                      <div className="border px-2 py-3 max-w-[440px] no-scrollbar !max-h-[200px] overflow-y-scroll border-gray-300 rounded-xl">
                        <Label className="text-sm font-medium">
                          Example Response
                        </Label>
                        <div className="p-4 rounded-lg mt-2">
                          <pre className="text-sm">
                            <code>
                              {JSON.stringify(endpoint.response, null, 2)}
                            </code>
                          </pre>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent
                      value="metadata"
                      className="space-y-4 text-gray-800"
                    >
                      <div className="grid grid-cols-2 gap-4 mt-3">
                        <div>
                          <Label className="text-sm font-medium">
                            Endpoint Name
                          </Label>
                          <p className="text-sm mt-1 font-mono">
                            {endpoint.name}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Slug</Label>
                          <p className="text-sm mt-1 font-mono">
                            {endpoint.slug}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">
                            Endpoint ID
                          </Label>
                          <p className="text-sm mt-1 font-mono">
                            {endpoint._id}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">
                            Created At
                          </Label>
                          <p className="text-sm mt-1">
                            {new Date(endpoint.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">
                            Updated At
                          </Label>
                          <p className="text-sm mt-1">
                            {new Date(endpoint.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>

              <Button
                variant="outline"
                size="sm"
                className="px-3 hover:bg-primary/10 hover:border-primary/30 transition-all bg-transparent cursor-pointer"
                onClick={() => copyToClipboard(cleanedPath)}
                aria-label="Copy Link"
                name="Copy the Link"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>

            {/* Hover Overlay Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        );
      })}
    </div>
  );
};

export default EndpointCards;

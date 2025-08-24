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
import { cleanPath } from "@/lib/utils";
// import { cleanPath } from "@/lib/utils";

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
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 p-1">
      {filteredEndpoints.map((endpoint) => {
        const isHighTraffic = endpoint.hits > 1000
        const MethodIcon = methodIcons[endpoint.methods] || Code
        const isNew = formatDate(endpoint.createdAt).includes("day")
        const cleanedPath = cleanPath(endpoint.urlPath || "")

        return (
          <div key={endpoint._id}
            className={`premium-card group bg-card border-2 rounded-xl p-6 transition-all duration-300 ${
              isNew ? "border-primary/20 shadow-lg" : "border-border/60"
            }`}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4 flex-1">
                <div
                  className={`p-3 rounded-xl border-2 ${methodColors[endpoint.methods]} transition-all duration-200 group-hover:scale-105`}
                >
                  <MethodIcon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-xl text-card-foreground group-hover:text-primary transition-colors duration-200 mb-2 truncate">
                    {endpoint.name}
                  </h3>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`method-badge ${
                        endpoint.methods === "GET"
                          ? "text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg"
                          : endpoint.methods === "POST"
                            ? "text-blue-600 bg-blue-50 px-2 py-1 rounded-lg"
                            : endpoint.methods === "PUT"
                              ? "text-indigo-500 bg-indigo-50 px-2 py-1 rounded-lg"
                              : "text-red-500 bg-red-50 px-2 py-1 rounded-lg"
                      }`}
                    >
                      {endpoint.methods}
                    </span>
                    {endpoint.isPublic ? (
                      <Badge className="text-xs bg-green-50 text-green-700 border-green-200 hover:bg-green-100 transition-colors">
                        <Globe className="w-3 h-3 mr-1" />
                        Public
                      </Badge>
                    ) : (
                      <Badge className="text-xs bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 transition-colors">
                        <Lock className="w-3 h-3 mr-1" />
                        Private
                      </Badge>
                    )}
                    {isNew && (
                      <Badge className="text-xs bg-primary text-primary-foreground animate-pulse">
                        <Star className="w-3 h-3 mr-1" />
                        New
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3 ml-4">
                <div
                  className={`w-3 h-3 rounded-full shadow-sm ${
                    isHighTraffic ? "bg-green-500 shadow-green-200 animate-pulse" : "bg-yellow-500 shadow-yellow-200"
                  }`}
                />
                {isHighTraffic && (
                  <Badge className="text-xs bg-green-50 text-green-700 border-green-200 hover:bg-green-100 transition-colors">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Hot
                  </Badge>
                )}
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-6 leading-relaxed line-clamp-2 h-10">
              {endpoint.description}
            </p>

            <div className="mb-6">
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-muted/40 to-muted/60 rounded-xl border border-border/50 group-hover:border-border transition-all duration-200">
                <Code className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <code className="text-sm font-mono text-card-foreground flex-1 truncate font-medium">
                  {cleanedPath}
                </code>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(cleanedPath)}
                  className="h-8 w-8 p-0 hover:bg-primary/10 hover:scale-105 transition-all duration-200"
                >
                  <Copy className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="metric-card text-center">
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  <Activity className="w-4 h-4 text-green-600" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Hits</span>
                </div>
                <p className="text-lg font-bold text-card-foreground">
                  {endpoint.hits > 1000 ? `${(endpoint.hits / 1000).toFixed(1)}K` : endpoint.hits}
                </p>
              </div>

              <div className="metric-card text-center">
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  <Zap className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Limit</span>
                </div>
                <p className="text-lg font-bold text-card-foreground">
                  {endpoint.rateLimit.limit}/{endpoint.rateLimit.period < 3600000 ? "min" : "day"}
                </p>
              </div>

              <div className="metric-card text-center">
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Age</span>
                </div>
                <p className="text-lg font-bold text-card-foreground">
                  {formatJoinDate(endpoint.createdAt).replace(" ago", "")}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 font-semibold py-2.5"
                    type="button"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="!w-[500px] !max-w-none overflow-y-auto no-scrollbar">
                  <DialogHeader>
                    <DialogTitle className="flex text-card-foreground items-center gap-2">
                      {endpoint.name}
                      <Badge className={methodColors[endpoint.methods]}>{endpoint.methods}</Badge>
                      <Badge variant={endpoint.isPublic ? "default" : "destructive"}>
                        {endpoint.isPublic ? "Public" : "Private"}
                      </Badge>
                    </DialogTitle>
                    <DialogDescription className="max-w-[400px]">{endpoint.description}</DialogDescription>
                  </DialogHeader>

                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="parameters">Parameters</TabsTrigger>
                      <TabsTrigger value="example">Example</TabsTrigger>
                      <TabsTrigger value="metadata">Metadata</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4 text-card-foreground">
                      <div className="flex flex-col text-card-foreground space-y-3">
                        <div>
                          <Label className="text-sm font-medium">URL Path</Label>
                          <div className="flex items-center gap-2 mt-1 overflow-x-scroll no-scrollbar">
                            <code className="bg-muted px-2 py-1 rounded text-sm flex-1">{cleanedPath}</code>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyToClipboard(cleanedPath)}
                              aria-label="Copy Link"
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        {endpoint.isPublic && (
                          <div>
                            <Label className="text-sm font-medium">API Key</Label>
                            <div className="flex items-center gap-2 mt-1">
                              <code className="px-2 py-1 rounded text-sm flex-1">
                                {showApiKey ? endpoint.apiKey : "ptfo_••••••••••••••••••••••••••••••••"}
                              </code>
                              <Button size="sm" variant="outline" onClick={() => setShowApiKey(!showApiKey)}>
                                {showApiKey ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => copyToClipboard(endpoint.apiKey)}>
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
                          <p className="text-xl font-bold mt-1">{endpoint.hits}</p>
                        </div>
                        <div>
                          <Label className="text-xs font-medium">Rate Limit</Label>
                          <p className="text-[16px] font-semibold mt-1">
                            {endpoint.rateLimit.limit} req/{endpoint.rateLimit.period < 3600000 ? "min" : "day"}
                          </p>
                        </div>
                        <div>
                          <Label className="text-xs font-medium">Last Updated</Label>
                          <p className="text-xs mt-1">{formatDate(endpoint.updatedAt)}</p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="parameters" className="text-card-foreground">
                      <Table className="border border-border">
                        <TableHeader>
                          <TableRow>
                            <TableHead>Type</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Parameter ID</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {endpoint.params.map((param) => (
                            <TableRow key={param._id}>
                              <TableCell className="font-medium">key</TableCell>
                              <TableCell>
                                <code className="px-1 py-0.5 rounded text-xs">{param.name}</code>
                              </TableCell>
                              <TableCell>{param._id}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TabsContent>

                    <TabsContent value="example" className="space-y-4 text-card-foreground">
                      <div className="max-w-[440px]">
                        <Label className="text-sm font-medium">Example Request</Label>
                        <div className="p-4 rounded-lg mt-2">
                          <pre className="text-sm overflow-auto px-3 py-2 border-2 border-border no-scrollbar">
                            <code className="text-muted-foreground">
                              {`${endpoint.methods} ${cleanedPath || ""}
Headers: { "Authorization": "Bearer ${endpoint.apiKey}" }`}
                            </code>
                          </pre>
                        </div>
                      </div>

                      <div className="border px-2 py-3 max-w-[440px] no-scrollbar !max-h-[200px] overflow-y-scroll border-border rounded-xl">
                        <Label className="text-sm font-medium">Example Response</Label>
                        <div className="p-4 rounded-lg mt-2">
                          <pre className="text-sm">
                            <code>{JSON.stringify(endpoint.response, null, 2)}</code>
                          </pre>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="metadata" className="space-y-4 text-card-foreground">
                      <div className="grid grid-cols-2 gap-4 mt-3">
                        <div>
                          <Label className="text-sm font-medium">Endpoint Name</Label>
                          <p className="text-sm mt-1 font-mono">{endpoint.name}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Slug</Label>
                          <p className="text-sm mt-1 font-mono">{endpoint.slug}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Endpoint ID</Label>
                          <p className="text-sm mt-1 font-mono">{endpoint._id}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Created At</Label>
                          <p className="text-sm mt-1">{new Date(endpoint.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Updated At</Label>
                          <p className="text-sm mt-1">{new Date(endpoint.updatedAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>

              <Button
                variant="outline"
                size="sm"
                className="px-4 hover:bg-primary/5 hover:border-primary/30 transition-all duration-200 border-2 bg-transparent"
                onClick={() => copyToClipboard(cleanedPath || "Error! Nothing copied.")}
                aria-label="Copy Link"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>

            <div className="absolute inset-0 bg-gradient-to-br from-primary/2 to-accent/3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        )
      })}
    </div>
  )
};

export default EndpointCards;

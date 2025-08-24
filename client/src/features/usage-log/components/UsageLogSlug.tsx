import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatDate } from "@/lib/formatDate";
import { copyToClipboard } from "@/lib/utils";
import { useUsagelogStore } from "@/stores/useUsagelogStore";
import { Activity, ChevronLeft, Copy, Database } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

function getStatusColor(statusCode: number) {
  if (statusCode >= 200 && statusCode < 300)
    return "bg-green-100 text-green-800 border-green-200";
  if (statusCode >= 300 && statusCode < 400)
    return "bg-yellow-100 text-yellow-800 border-yellow-200";
  if (statusCode >= 400 && statusCode < 500)
    return "bg-orange-100 text-orange-800 border-orange-200";
  if (statusCode >= 500) return "bg-red-100 text-red-800 border-red-200";
  return "bg-gray-100 text-gray-800 border-gray-200";
}

function getResponseTimeColor(responseTime: number) {
  if (responseTime < 300) return "text-green-600";
  if (responseTime < 500) return "text-yellow-600";
  if (responseTime < 1000) return "text-orange-600";
  return "text-red-600";
}

const UsageLogSlug = () => {
  const { slug } = useParams();
  const { usage, fetchLogs } = useUsagelogStore();
  const filteredLogs = useMemo(() => {
    const filtered = usage.filter((item) => item.endpointId.slug === slug);
    return filtered;
  }, [usage, slug]);
  // console.log(filteredLogs.filtered[0])

  const stats = useMemo(() => {
    if (!filteredLogs.length) return null;

    const totalHits = filteredLogs.length;
    const responseTime =
      filteredLogs.reduce((item, log) => item + log.responseTime, 0) /
      totalHits;
    const successCount = filteredLogs.filter(
      (item) => item.statusCode >= 200 && item.statusCode < 300
    ).length;
    const successRate = (successCount / totalHits) * 100;
    return {
      totalHits,
      responseTime,
      successRate,
      endpointInfo: filteredLogs[0].endpointId,
      userInfo: filteredLogs[0].userId,
    };
  }, [filteredLogs]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return (
    <TooltipProvider>
      <div className="w-full bg-background text-black">
        <Button
          variant="ghost"
          onClick={() => window.history.back()}
          className="ml-6 text-gray-600 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
          aria-label="Go back"
          title="Go back"
        >
          <ChevronLeft className="h-10 w-10 text-gray-800" />
        </Button>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="grid gap-6">
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Endpoint Overview
                </CardTitle>
                <CardDescription>
                  Statistics for{" "}
                  <span className="text-black relative">
                    {stats?.endpointInfo.name}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black opacity-20" />
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-lg border-2 border-gray-200">
                    <div className="text-2xl font-bold">{stats?.totalHits}</div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Total Requests
                    </p>
                  </div>
                  <div className="text-center p-4 rounded-lg border-2 border-gray-200">
                    <div
                      className={`text-2xl font-bold ${getResponseTimeColor(
                        stats?.responseTime ?? 0
                      )}`}
                    >
                      {stats?.responseTime.toFixed(2)}
                      <span className="text-xs">ms</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Avg Response Time
                    </p>
                  </div>
                  <div className="text-center p-4 rounded-lg border-2 border-gray-200">
                    <div className="text-2xl font-bold text-green-600">
                      {stats?.successRate.toFixed(2)}
                      <span className="text-xs">%</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Success Rate
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Endpoint Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Name
                    </label>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="font-mono text-sm px-2 py-1 rounded">
                        {stats?.endpointInfo.name}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Methods
                    </label>
                    <div className="flex items-center gap-2 mt-1">
                      <p className={`font-mono text-sm px-2 py-1 rounded`}>
                        {stats?.endpointInfo.methods}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Slug
                    </label>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="font-mono text-sm bg-muted px-2 py-1 rounded">
                        {stats?.endpointInfo.slug}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(
                            stats?.endpointInfo.slug 
                          )
                        }
                        className="cursor-pointer"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      User Name
                    </label>
                    <div className="flex flex-col items-start gap-2 mt-1">
                      <p className="font-mono flex flex-col text-sm px-2 rounded">
                        <span>{stats?.userInfo.userName}</span>
                        <span className="text-muted-foreground text-xs">
                          {stats?.userInfo.email}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Total hits
                    </label>
                    <div className="flex flex-col items-start gap-2 mt-1">
                      <p className="font-mono text-sm px-2 rounded">
                        {stats?.endpointInfo.hits}{" "}
                        <span className="text-[10px] text-muted-foreground">
                          till now
                        </span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Endpoint ID
                    </label>
                    <div className="flex flex-col items-start gap-2 mt-1">
                      <p className="font-mono text-sm px-2 rounded">
                        {stats?.endpointInfo._id}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Created At
                    </label>
                    <div className="flex flex-col items-start gap-2 mt-1">
                      <p className="font-mono text-sm px-2 rounded">
                        {formatDate(stats?.endpointInfo.createdAt ?? "Date Error")}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Description
                  </label>
                  <p className="mt-1 text-sm">
                    This is the description about what to do, first step is to
                    redeploy so hits and other things can be accessible from
                    live URL
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle>Request Logs</CardTitle>
                <CardDescription>
                  All requests made to this endpoint
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredLogs.map((log, index) => (
                    <div
                      key={log._id}
                      className="border-2 border-gray-200 rounded-lg p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">#{index + 1}</Badge>
                          <Badge className={getStatusColor(log.statusCode)}>
                            {log.statusCode}
                          </Badge>
                          <span
                            className={`font-mono text-sm ${getResponseTimeColor(
                              log.responseTime
                            )}`}
                          >
                            {log.responseTime}ms
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(log.createdAt)}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <label className="text-muted-foreground text-xs">
                            user
                          </label>
                          <p className="font-medium">{log.userId.userName}</p>
                        </div>
                        <div>
                          <Tooltip>
                            <TooltipTrigger>
                              <code className="px-2 py-1 bg-muted/50 rounded text-xs">
                                {log.ipAddress.slice(0, 20)}...
                              </code>
                            </TooltipTrigger>
                            <TooltipContent>{log.ipAddress}</TooltipContent>
                          </Tooltip>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm text-muted-foreground">
                          URL Path
                        </label>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="font-mono text-xs bg-muted px-2 py-1 rounded break-all flex-1">
                            {log.urlPath}
                          </p>
                          <Button className="cursor-pointer" variant="ghost" size="sm" onClick={() => copyToClipboard(log.urlPath)}>
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default UsageLogSlug;

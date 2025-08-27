import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface RecentLogsTableProps {
  data: Array<{
    urlPath: string;
    statusCode: number;
    responseTime: number;
    createdAt: string;
  }>;
}

export function RecentLogsTable({ data }: RecentLogsTableProps) {
  const getStatusBadgeVariant = (statusCode: number) => {
    if (statusCode >= 200 && statusCode < 300) return "default";
    if (statusCode >= 400 && statusCode < 500) return "secondary";
    if (statusCode >= 500) return "destructive";
    return "outline";
  };

  const getResponseTimeColor = (responseTime: number) => {
    if (responseTime < 200) return "text-green-600";
    if (responseTime < 500) return "text-yellow-600";
    return "text-red-600";
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

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest API requests and their performance
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" className="border border-gray-200">
            <Link to="/usage-log" className="flex items-center">
              <ExternalLink className="w-4 h-4 mr-2" />
              View All Logs
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((log, index) => {
            const urlPath = log.urlPath.split("/").slice(0, -1).join("/");
            return (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-start md:items-center justify-between px-3 py-4 bg-muted/30 rounded-lg border border-border overflow-x-scroll no-scrollbar"
              >
                <div className="flex items-center gap-4">
                  <Badge
                    variant={getStatusBadgeVariant(log.statusCode)}
                    className="font-mono text-xs"
                  >
                    {log.statusCode}
                  </Badge>
                  <div className="max-w-7xl">
                    <p className="text-sm w-full font-medium text-foreground font-mono">
                      <span className="block md:hidden">{urlPath}</span>
                      <span className="hidden md:block">{log.urlPath}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(log.createdAt).slice(0,16)}
                    </p>
                  </div>
                </div>
                <div className="relative right-0 text-right">
                  <p
                    className={`text-sm font-medium ${getResponseTimeColor(
                      log.responseTime
                    )}`}
                  >
                    {log.responseTime}ms
                  </p>
                  <p className="text-xs text-muted-foreground hidden md:block">Response time</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

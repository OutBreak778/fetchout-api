import HeaderData from "@/components/HeaderData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useUsagelogStore } from "@/stores/useUsagelogStore";
import {
  BarChart3,
  Copy,
  Eye,
  Filter,
  Globe,
  MoreHorizontal,
  Search,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import UsageMetrics from "./UsageMetrics";
import { Link } from "react-router-dom";

const UsageLog = () => {
  const [searchLog, setSearchLog] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [pageSize, setPageSize] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState(1);

  const { usage, fetchLogs } = useUsagelogStore();

  const overview = useMemo(() => {
    const totalRequest = usage.length;
    const successfullRequest = usage.filter(
      (item) => item.statusCode < 400
    ).length;
    const errorRequest = usage.filter((item) => item.statusCode >= 400).length;
    const successRate =
      totalRequest > 0
        ? Number(((successfullRequest / totalRequest) * 100).toFixed(2))
        : 0;
    const avgResponseTime =
      totalRequest > 0
        ? Number(
            (
              usage.reduce((sum, item) => sum + item.responseTime, 0) /
              totalRequest
            ).toFixed(2)
          )
        : 0;

    const uniqueUser = new Set(usage.map((item) => item.userId.userName)).size;
    const uniqueEndpoint = new Set(usage.map((item) => item.endpointId.name)).size;

    return {
      totalRequest,
      successfullRequest,
      errorRequest,
      successRate,
      avgResponseTime,
      uniqueUser,
      uniqueEndpoint,
    };
  }, [usage]);

  const filteredLogs = useMemo(() => {
    let filtered = [...usage];
    if (searchLog) {
      const search = searchLog.toLowerCase();
      filtered = filtered.filter((item) => {
        return (
          item.urlPath?.toLowerCase().includes(search) ||
          item.userId.userName.toLowerCase().includes(search) ||
          item.endpointId.name.toLowerCase().includes(search) ||
          item.ipAddress?.includes(search)
        );
      });
    }

    if (statusFilter !== "all") {
      if (statusFilter === "success") {
        filtered = filtered.filter(
          (item) => item.statusCode >= 200 && item.statusCode < 300
        );
      } else if (statusFilter === "error") {
        filtered = filtered.filter((item) => item.statusCode >= 400);
      } else if (statusFilter === "redirect") {
        filtered = filtered.filter(
          (item) => item.statusCode >= 300 && item.statusCode < 400
        );
      }
    }

    return {
      filtered,
    };
  }, [usage, searchLog, statusFilter]);

  const getStatusBadge = (statusCode: number) => {
    if (statusCode >= 200 && statusCode < 300) {
      return (
        <Badge
          variant="secondary"
          className="bg-chart-3/10 text-chart-2 hover:bg-chart-1/20"
        >
          {statusCode}
        </Badge>
      );
    } else if (statusCode >= 300 && statusCode < 400) {
      return (
        <Badge
          variant="secondary"
          className="bg-chart-5/10 text-chart-5 hover:bg-chart-5/20"
        >
          {statusCode}
        </Badge>
      );
    } else {
      return (
        <Badge
          variant="secondary"
          className="bg-chart-4/10 text-chart-4 hover:bg-chart-2/20"
        >
          {statusCode}
        </Badge>
      );
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const totalPages = Math.ceil(filteredLogs.filtered.length / pageSize);
  const pageinatedLogs = filteredLogs.filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return (
    <TooltipProvider>
      <div className="text-gray-800 max-w-7xl mx-auto w-full space-y-5">
        <div className="flex items-start flex-col">
          <HeaderData
            title="Check you Endpoint usage"
            description="Verify your usage per endpoint at a time."
            icon={BarChart3}
            iconColor="text-gray-800"
            bgColor="bg-gray-100"
          />
          <div className="ml-10 flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-foreground animate-pulse" />
              <span className="text-muted-foreground">
                Live monitoring active
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                Global endpoints tracked
              </span>
            </div>
          </div>
        </div>
        <UsageMetrics overview={overview} />

        <div className="relative max-w-7xl w-full mx-auto">
          <Card className="shadow-md border border-gray-300 w-full">
            <CardHeader className="flex flex-col md:flex-row items-start w-full">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <CardTitle className="text-xl font-semibold w-64">
                  Total Request Logs ({usage.length})
                </CardTitle>

                <div className="flex flex-col md:flex-row space-y-3 relative overflow-hidden w-full space-x-3 items-start">
                  <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search logs..."
                      value={searchLog}
                      onChange={(e) => setSearchLog(e.target.value)}
                      className="pl-9 w-full"
                    />
                  </div>

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-40">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Select your status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="success">Success</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                      <SelectItem value="redirect">Redirect</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <Separator />

            <CardContent className="px-4">
              <div className="overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 hover:bg-muted/40 border-border/50">
                      <TableHead className="font-semibold text-foreground">
                        Timestamp
                      </TableHead>
                      <TableHead className="font-semibold text-foreground">
                        IP Address
                      </TableHead>
                      <TableHead className="font-semibold text-foreground">
                        Endpoint Path
                      </TableHead>
                      <TableHead className="font-semibold text-foreground">
                        Status
                      </TableHead>
                      <TableHead className="font-semibold text-foreground">
                        Response
                      </TableHead>
                      <TableHead className="font-semibold text-foreground hidden xl:flex">
                        User
                      </TableHead>
                      <TableHead className="font-semibold text-foreground">
                        Endpoint
                      </TableHead>
                      <TableHead className="font-semibold text-foreground">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pageinatedLogs.map((log, index) => {
                      const urlPath = log.urlPath
                        ?.split("/")
                        .slice(3, -1)
                        .join("/");
                      const ipAddress = log.ipAddress
                        ?.split(".")
                        .slice(1, -1)
                        .join(".");
                      // const {url} = slug
                      return (
                        <TableRow
                          key={log._id}
                          className={cn(
                            "hover:bg-muted/20 transition-colors border-border/30",
                            index % 2 === 0 ? "bg-background/50" : "bg-muted/10"
                          )}
                        >
                          <TableCell className="font-mono text-xs text-muted-foreground">
                            <Tooltip>
                              <TooltipTrigger>
                                <div className="text-sm">
                                  {formatDate(log.createdAt).slice(0, 14)}...
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{formatDate(log.createdAt)}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TableCell>
                          <TableCell className="font-mono text-sm">
                            <Tooltip>
                              <TooltipTrigger>
                                <code className="px-2 py-1 bg-muted/50 rounded text-xs">
                                  {ipAddress.slice(0, 14)}...
                                </code>
                              </TooltipTrigger>
                              <TooltipContent>{ipAddress}</TooltipContent>
                            </Tooltip>
                          </TableCell>
                          <TableCell
                            className="font-mono text-xs"
                            title={log.urlPath}
                          >
                            <Tooltip>
                              <TooltipTrigger>
                                <code className="px-2 py-1 bg-muted/50 rounded text-xs">
                                  /{urlPath}
                                </code>
                              </TooltipTrigger>
                              <TooltipContent>/{urlPath}</TooltipContent>
                            </Tooltip>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(log.statusCode)}
                          </TableCell>
                          <TableCell className="font-mono">
                            <span
                              className={cn(
                                "px-2 py-1 rounded text-xs font-medium",
                                log.responseTime > 1000
                                  ? "bg-destructive/10 text-destructive"
                                  : log.responseTime > 300
                                  ? "bg-muted-foreground/10 text-muted-foreground"
                                  : "bg-foreground/10 text-foreground"
                              )}
                            >
                              {log.responseTime}ms
                            </span>
                          </TableCell>
                          <TableCell className="hidden xl:flex">
                            <Tooltip>
                              <TooltipTrigger>
                                <span className="space-y-1 flex flex-col">
                                  <span className="font-medium text-sm text-foreground">
                                    {log.userId.userName}
                                  </span>
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <span className="space-y-1 flex flex-col text-white">
                                  <span className="font-medium text-sm">
                                    {log.userId.userName}
                                  </span>
                                  <span className="text-xs">
                                    {log.userId.email}
                                  </span>
                                </span>
                              </TooltipContent>
                            </Tooltip>
                          </TableCell>
                          <TableCell>
                            <Tooltip>
                              <TooltipTrigger>
                                <span className="space-y-1 flex flex-col">
                                  {log.endpointId.name}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <span className="space-y-1 flex flex-col">
                                  <span className="font-medium text-sm">
                                    {log.endpointId.name}
                                  </span>
                                  <code className="text-xs font-mono">
                                    {log.endpointId._id}
                                  </code>
                                </span>
                              </TooltipContent>
                            </Tooltip>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 hover:bg-muted/50 cursor-pointer"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="end"
                                className="w-36 space-y-1 border-2 border-gray-100"
                              >
                                <DropdownMenuItem className="cursor-pointer">
                                  <Link
                                    to={`/usage-log/${log.endpointId.slug}`}
                                    className="flex items-center"
                                  >
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Details
                                  </Link>
                                </DropdownMenuItem>
                                <Separator className="border border-gray-100" />
                                <DropdownMenuItem className="cursor-pointer">
                                  <Copy className="h-4 w-4 mr-2" />
                                  Copy URL
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 border-t border-border/50 bg-muted/10">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    Rows per page:
                  </span>
                  <Select
                    value={pageSize.toString()}
                    onValueChange={(value) => {
                      setPageSize(Number(value));
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue placeholder="pages" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">15</SelectItem>
                      <SelectItem value="50">25</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 border-border/50 hover:bg-muted/50 bg-transparent"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    <span className="text-sm px-3 py-1 bg-foreground text-primary-foreground rounded font-medium">
                      {currentPage}
                    </span>
                    <span className="text-sm text-muted-foreground px-2">
                      of {totalPages}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 border-border/50 hover:bg-muted/50 bg-transparent"
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default UsageLog;

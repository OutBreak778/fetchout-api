import HeaderData from "@/components/HeaderData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RecentLogsTable } from "@/features/dashboard/components/RecentLogsTable";
import { RequestTrendsChart } from "@/features/dashboard/components/RequestTrendsChart";
import { StatsCard } from "@/features/dashboard/components/StatsCard";
import { StatusCodeChart } from "@/features/dashboard/components/StatusCodeChart";
import { SuccessRatioCard } from "@/features/dashboard/components/SuccessRatioCard";
import { TopEndpointsCard } from "@/features/dashboard/components/TotalEndpointsCard";
import { useDashboardStore } from "@/stores/useDashboardStore";
import {
  Activity,
  CheckCircle,
  Clock,
  Code,
  Globe,
  Home,
  Loader2,
} from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { data, fetchDashboard, isLoading } = useDashboardStore();

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  if (!data || isLoading) return (
    <div className="flex items-center justify-center w-full min-h-[70vh]">
      <Loader2 className="w-5 h-5 text-black animate-spin" />
    </div>
  )

  const successRate =
    data.successErrorRatio.find((item) => item._id === "success")?.count || 0;
  const errorRate =
    data.successErrorRatio.find((item) => item._id === "error")?.count || 1;

  const totalRequest = successRate + errorRate;

  const successPercentage =
    totalRequest > 0 ? ((successRate / totalRequest) * 100).toFixed(1) : 0;
  // console.log(successRate / errorRate);

  return (
    <div className="text-gray-800 relative max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
        <HeaderData
          title="Dashboard"
          description="Review all your Endpoint and other info from here."
          icon={Home}
          bgColor="bg-gray-100"
          iconColor="text-gray-800"
        />
        <div className="flex  items-center justify-between mx-6">
          <div className="flex flex-col sm:flex-row lg:items-center gap-3">
            <Badge
              variant="outline"
              className="bg-background border-none outline-none"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              All Systems Operational
            </Badge>
            <Button
              variant="outline"
              size="sm"
              className="border-2 border-gray-200"
            >
              <Link to="/documentation" className="flex items-center">
                <Code className="w-4 h-4 mr-2" />
                API Docs
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="min-h-screen bg-background">
        <div className="px-6 py-8">
          {/* Key Metrics */}
          {data && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard
                title="Total Requests"
                value={data.TotalRequest}
                icon={<Activity className="w-5 h-5" />}
                trend={data.trends.totalRequest.percent}
                trendUp={data.trends.totalRequest.up}
              />
              <StatsCard
                title="Avg Response Time"
                value={`${data.AvgResponseTime[0].responseTime.toFixed(2)} ms`}
                icon={<Clock className="w-5 h-5" />}
                trend={`${data.trends.avgResponseTime.percent} ms`}
                trendUp={data.trends.avgResponseTime.up}
              />
              <StatsCard
                title="Success Rate"
                value={`${successPercentage}%`}
                icon={<CheckCircle className="w-5 h-5" />}
                trend={`${data.trends.successRate.percent} %`}
                trendUp={data.trends.successRate.up}
              />
              <StatsCard
                title="Active Endpoints"
                value={data.requestPerEndpoint.length}
                icon={<Globe className="w-5 h-5" />}
                trend={`${data.trends.totalRequest.percent}`}
                trendUp={data.trends.totalRequest.up}
              />
            </div>
          )}

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="col-span-2">
            <RequestTrendsChart data={data.requestTrends} />
            </div>
            <div className="col-span-2 lg:col-span-1">
            <StatusCodeChart data={data.allStatusCode} />
            </div>
          </div>

          {/* Analytics Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <TopEndpointsCard data={data.top5Trends} />
            <SuccessRatioCard
              successCount={successRate}
              errorCount={errorRate}
              successPercentage={successPercentage}
            />
          </div>

          {/* Recent Activity */}
          <RecentLogsTable data={data.recentUsageLogs} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

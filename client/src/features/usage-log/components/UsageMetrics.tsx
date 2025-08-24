import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Activity,
  CheckCircle,
  Clock,
  Globe,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

type Overview = {
  totalRequest: number;
  successfullRequest: number;
  errorRequest: number;
  successRate: number;
  avgResponseTime: number;
  uniqueUser: number;
  uniqueEndpoint: number;
};

type UsageMetricProps = {
  overview: Overview;
};

const UsageMetrics = ({ overview }: UsageMetricProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
      <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-foreground/20 bg-card/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Requests
          </CardTitle>
          <div className="p-2 rounded-lg bg-foreground/5 group-hover:bg-foreground/10 transition-colors">
            <Activity className="h-4 w-4 text-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground mb-1">
            {overview.totalRequest.toLocaleString()}
          </div>
          <div className="flex items-center gap-2 text-xs">
            <TrendingUp className="h-3 w-3 text-foreground/60" />
            <span className="text-muted-foreground">
              {overview.successfullRequest} successful, {overview.errorRequest}{" "}
              errors
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-foreground/20 bg-card/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Success Rate
          </CardTitle>
          <div className="p-2 rounded-lg bg-foreground/5 group-hover:bg-foreground/10 transition-colors">
            <CheckCircle className="h-4 w-4 text-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground mb-1">
            {overview.successRate}
            <span className="text-lg font-normal">%</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-full bg-muted rounded-full h-1.5">
              <div
                className="bg-foreground h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${overview.successRate}%` }}
              />
            </div>
            <span className="text-muted-foreground whitespace-nowrap">
              {overview.successfullRequest}/{overview.totalRequest}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-foreground/20 bg-card/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Avg Response
          </CardTitle>
          <div className="p-2 rounded-lg bg-foreground/5 group-hover:bg-foreground/10 transition-colors">
            <Zap className="h-4 w-4 text-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground mb-1">
            {overview.avgResponseTime}
            <span className="text-lg font-normal">ms</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">Average response time</span>
          </div>
        </CardContent>
      </Card>

      <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-foreground/20 bg-card/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Active Users
          </CardTitle>
          <div className="p-2 rounded-lg bg-foreground/5 group-hover:bg-foreground/10 transition-colors">
            <Users className="h-4 w-4 text-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground mb-1">
            {overview.uniqueUser}
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Globe className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">
              Across {overview.uniqueEndpoint} endpoints
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsageMetrics;

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { TrendingUp } from "lucide-react"

interface RequestTrendsChartProps {
  data: Array<{ _id: string; countEndpoint: number }>
}

export function RequestTrendsChart({ data }: RequestTrendsChartProps) {
  const chartData = data.map((item) => ({
    date: new Date(item._id).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    requests: item.countEndpoint,
  }))

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Request Trends
        </CardTitle>
        <CardDescription>Daily API request volume over the past week</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Line
                type="monotone"
                dataKey="requests"
                stroke="hsl(var(--foreground))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--foreground))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "hsl(var(--foreground))", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

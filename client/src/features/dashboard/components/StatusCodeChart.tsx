import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { BarChart3 } from "lucide-react"

interface StatusCodeChartProps {
  data: Array<{ _id: number; count: number }>
}

export function StatusCodeChart({ data }: StatusCodeChartProps) {
  const chartData = data.map((item) => ({
    statusCode: item._id.toString(),
    count: item.count,
    fill:
      item._id >= 200 && item._id < 300
        ? "hsl(var(--foreground))"
        : item._id >= 400
          ? "hsl(var(--muted-foreground))"
          : "hsl(var(--foreground))",
  }))

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2 truncate">
          <BarChart3 className="w-5 h-5" />
          Status Code Distribution
        </CardTitle>
        <CardDescription className="truncate">HTTP response status codes breakdown</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="statusCode" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Bar dataKey="count" fill="hsl(var(--foreground))" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

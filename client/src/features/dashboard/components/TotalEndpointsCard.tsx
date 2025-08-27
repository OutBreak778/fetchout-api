import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Globe } from "lucide-react"

interface TopEndpointsCardProps {
  data: Array<{ _id: string; count: number }>
}

export function TopEndpointsCard({ data }: TopEndpointsCardProps) {
  const maxCount = Math.max(...data.map((item) => item.count))

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Top Endpoints
        </CardTitle>
        <CardDescription>Most frequently used API endpoints</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((endpoint, index) => (
          <div key={endpoint._id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  #{index + 1}
                </Badge>
                <span className="text-sm font-medium text-foreground">{endpoint._id}</span>
              </div>
              <span className="text-sm text-muted-foreground">{endpoint.count.toLocaleString()}</span>
            </div>
            <Progress value={(endpoint.count / maxCount) * 100} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

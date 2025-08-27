import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react"
import type { ReactNode } from "react"

interface StatsCardProps {
  title: string
  value: string | number
  icon: ReactNode
  trend: string | number
  trendUp: number | boolean | null
}

export function StatsCard({ title, value, icon, trend, trendUp }: StatsCardProps) {
  return (
    <Card className="bg-card border-border hover:bg-accent/50 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
          </div>
          <div className="p-2 bg-muted rounded-lg">{icon}</div>
        </div>
        <div className="flex items-center mt-4">
          {trendUp === true && <ArrowUpRight className="w-4 h-4 text-green-600 mr-1" />}
          {trendUp === false && <ArrowDownRight className="w-4 h-4 text-red-600 mr-1" />}
          {trendUp === null && <Minus className="w-4 h-4 text-muted-foreground mr-1" />}
          <span
            className={`text-sm font-medium ${
              trendUp === true ? "text-green-600" : trendUp === false ? "text-red-600" : "text-muted-foreground"
            }`}
          >
            {trend}
          </span>
          <span className="text-sm text-muted-foreground ml-1">vs last week</span>
        </div>
      </CardContent>
    </Card>
  )
}

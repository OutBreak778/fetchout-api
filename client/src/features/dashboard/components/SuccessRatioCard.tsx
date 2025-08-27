import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { CheckCircle } from "lucide-react"

interface SuccessRatioCardProps {
  successCount: number
  errorCount: number
  successPercentage: number | string
}

export function SuccessRatioCard({ successCount, errorCount, successPercentage }: SuccessRatioCardProps) {
  const data = [
    { name: "Success", value: successCount, color: "oklch(58.511% 0.18342 145.127)" },
    { name: "Error", value: errorCount, color: "oklch(59.63% 0.24154 28.934)" },
  ]

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Success Rate
        </CardTitle>
        <CardDescription>Request success vs error ratio</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <div className="w-32 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={2} dataKey="value">
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{successPercentage}%</div>
                <div className="text-xs text-muted-foreground">Success</div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-sm ">Successful</span>
            </div>
            <span className="text-sm font-medium">{successCount.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="text-sm text-muted-foreground">Errors</span>
            </div>
            <span className="text-sm font-medium">{errorCount.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

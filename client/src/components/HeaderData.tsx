import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

type HeaderDataProps = {
    title: string
    description: string
    icon: LucideIcon
    iconColor?: string
    bgColor?: string
}

const HeaderData = ({title, description, icon: Icon, iconColor, bgColor}: HeaderDataProps) => {
  return (
    <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
      <div className={cn("p-2 w-fit rounded-md", bgColor)}>
        <Icon className={cn("w-8 h-8", iconColor)} />
      </div>
      <div>
        <h2 className={cn("text-[22px] font-extrabold")}>{title}</h2>
        <p className="text-[15px] text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  )
}

export default HeaderData
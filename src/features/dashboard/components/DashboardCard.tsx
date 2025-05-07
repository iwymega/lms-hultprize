import { Button } from "@/components/ui/button"
import { ArrowUpRight, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

type DashboardCardProps = {
    title: string
    icon: React.ReactNode
    iconBg?: string // << Tambahkan ini
    value: string
    change?: string
    changeType?: "up" | "down"
    onDetailClick?: () => void
}

export function DashboardCard({
    title,
    icon,
    iconBg,
    value,
    change,
    changeType = "up",
    onDetailClick,
}: DashboardCardProps) {
    return (
        <div className="bg-white p-6 rounded-lg border">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconBg ?? 'bg-muted'}`}>
                        {icon}
                    </div>
                    <span className="text-base font-semibold text-gray-800">{title}</span>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={onDetailClick}
                >
                    <ExternalLink className="h-4 w-4 text-gray-500 hover:text-gray-800" />
                </Button>
            </div>
            <div className="flex items-end justify-between">
                <span className="text-2xl font-bold text-gray-900">{value}</span>
                {change && (
                    <div
                        className={cn(
                            "flex items-center text-sm font-medium",
                            changeType === "up" ? "text-green-600" : "text-red-600"
                        )}
                    >
                        <ArrowUpRight className="h-3 w-3 mr-1 rotate-0" />
                        {change}
                    </div>
                )}
            </div>
        </div>
    )
}
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface SummaryCardProps {
    title: string
    value: string | number
    description?: string
    icon: LucideIcon
    trend?: {
        value: number
        label: string
        direction: "up" | "down"
    }
}

export function SummaryCard({
    title,
    value,
    description,
    icon: Icon,
    trend,
}: SummaryCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {(description || trend) && (
                    <p className="text-xs text-muted-foreground">
                        {trend && (
                            <span className={trend.direction === "up" ? "text-green-500" : "text-red-500"}>
                                {trend.direction === "up" ? "+" : "-"}{trend.value}%
                            </span>
                        )}
                        {trend && description && " "}
                        {description}
                    </p>
                )}
            </CardContent>
        </Card>
    )
}

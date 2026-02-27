"use client"

import { useEffect, useState } from "react"
import { Package, ShoppingCart, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

type DashboardStats = {
    totalProducts: number
    totalOrders: number
    totalRevenue: number
}

function formatRupiah(value: number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value)
}

const statConfig = [
    {
        key: "totalProducts" as const,
        title: "Total Product",
        icon: Package,
        color: "text-blue-600",
        bgColor: "bg-blue-100",
        format: (v: number) => v.toLocaleString("id-ID"),
    },
    {
        key: "totalOrders" as const,
        title: "Total Order",
        icon: ShoppingCart,
        color: "text-green-600",
        bgColor: "bg-green-100",
        format: (v: number) => v.toLocaleString("id-ID"),
    },
    {
        key: "totalRevenue" as const,
        title: "Total Revenue",
        icon: DollarSign,
        color: "text-amber-600",
        bgColor: "bg-amber-100",
        format: (v: number) => formatRupiah(v),
    },
]

export function StatsCards() {
    const [stats, setStats] = useState<DashboardStats | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("/api/dashboard/stats")
            .then((res) => res.json())
            .then((data) => setStats(data))
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            {statConfig.map(({ key, title, icon: Icon, color, bgColor, format }) => (
                <Card key={key} className="py-4">
                    <CardHeader className="flex flex-row items-center justify-between pb-1">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            {title}
                        </CardTitle>
                        <div className={`rounded-md p-2 ${bgColor}`}>
                            <Icon className={`size-4 ${color}`} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <Skeleton className="h-8 w-24" />
                        ) : (
                            <p className={`text-2xl font-bold ${color}`}>
                                {stats ? format(stats[key]) : "—"}
                            </p>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

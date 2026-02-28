"use client"

import {
    Package,
    ShoppingCart,
    DollarSign
} from "lucide-react"

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { useEffect, useState } from "react"
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
        format: (v: number) => v.toLocaleString("id-ID"),
    },
    {
        key: "totalOrders" as const,
        title: "Total Order",
        icon: ShoppingCart,
        format: (v: number) => v.toLocaleString("id-ID"),
    },
    {
        key: "totalRevenue" as const,
        title: "Total Revenue",
        icon: DollarSign,
        format: (v: number) => formatRupiah(v),
    },
]

export function StatsCards() {
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState<DashboardStats | null>(null)

    useEffect(() => {
        fetch("/api/dashboard/stats")
            .then((res) => res.json())
            .then((data) => setStats(data))
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            {statConfig.map(({ key, title, icon: Icon, format }) => (
                <Card key={key}>
                    <CardHeader className="pb-2">
                        <CardDescription className="flex items-center justify-between">
                            {title}
                            <Icon className="size-4 text-muted-foreground" />
                        </CardDescription>
                        <CardTitle className="text-3xl font-bold tabular-nums">
                            {loading ? (
                                <Skeleton className="h-9 w-28" />
                            ) : (
                                stats ? format(stats[key]) : "—"
                            )}
                        </CardTitle>
                    </CardHeader>
                </Card>
            ))}
        </div>
    )
}

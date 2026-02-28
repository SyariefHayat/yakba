"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import * as React from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

type ChartDataItem = {
    date: string
    digital: number
    physical: number
}

const chartConfig = {
    transaksi: {
        label: "Transaksi",
    },
    digital: {
        label: "Digital",
        color: "var(--chart-1)",
    },
    physical: {
        label: "Fisik",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

function formatRupiah(value: number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value)
}

export function TransactionChart() {
    const [timeRange, setTimeRange] = React.useState("90d")
    const [chartData, setChartData] = React.useState<ChartDataItem[]>([])
    const [totalRevenue, setTotalRevenue] = React.useState(0)
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90

        setLoading(true)
        fetch(`/api/dashboard/transactions?days=${days}`)
            .then((res) => res.json())
            .then((data) => {
                setChartData(data.chartData ?? [])
                setTotalRevenue(data.totalRevenue ?? 0)
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [timeRange])

    return (
        <Card className="pt-0">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                    <CardTitle >Total Transaksi</CardTitle>
                    <CardDescription>
                        {loading ? (
                            <Skeleton className="h-4 w-32" />
                        ) : (
                            formatRupiah(totalRevenue)
                        )}
                    </CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="3 Bulan Terakhir" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="90d" className="rounded-lg">
                            3 Bulan Terakhir
                        </SelectItem>
                        <SelectItem value="30d" className="rounded-lg">
                            30 Hari Terakhir
                        </SelectItem>
                        <SelectItem value="7d" className="rounded-lg">
                            7 Hari Terakhir
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                {loading ? (
                    <Skeleton className="h-[250px] w-full rounded-md" />
                ) : (
                    <ChartContainer
                        config={chartConfig}
                        className="aspect-auto h-[250px] w-full"
                    >
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="fillDigital" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="5%"
                                        stopColor="var(--color-digital)"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="var(--color-digital)"
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                                <linearGradient id="fillPhysical" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="5%"
                                        stopColor="var(--color-physical)"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="var(--color-physical)"
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                minTickGap={32}
                                tickFormatter={(value) => {
                                    const date = new Date(value)
                                    return date.toLocaleDateString("id-ID", {
                                        month: "short",
                                        day: "numeric",
                                    })
                                }}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent
                                        labelFormatter={(value) => {
                                            return new Date(value).toLocaleDateString("id-ID", {
                                                month: "short",
                                                day: "numeric",
                                            })
                                        }}
                                        formatter={(value, name) => {
                                            const label = name === "digital" ? " Digital" : " Fisik"
                                            return [`${formatRupiah(value as number)}`, label]
                                        }}
                                        indicator="dot"
                                    />
                                }
                            />
                            <Area
                                dataKey="physical"
                                type="natural"
                                fill="url(#fillPhysical)"
                                stroke="var(--color-physical)"
                                stackId="a"
                            />
                            <Area
                                dataKey="digital"
                                type="natural"
                                fill="url(#fillDigital)"
                                stroke="var(--color-digital)"
                                stackId="a"
                            />
                            <ChartLegend content={<ChartLegendContent />} />
                        </AreaChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    )
}

"use client"

import {
    CreditCard,
    DollarSign,
    ShoppingBag,
    TrendingDown,
    TrendingUp,
} from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CalendarDateRangePicker } from "@/components/modules/admin/report/date-range-picker"
import { SummaryCard } from "@/components/modules/admin/report/summary-card"

// Dummy Data
const summaryData = {
    revenue: {
        value: "Rp 125.450.000",
        trend: { value: 12.5, label: "dari bulan lalu", direction: "up" as const },
    },
    transactions: {
        value: "1,429",
        trend: { value: 8.2, label: "dari bulan lalu", direction: "up" as const },
    },
    averageOrder: {
        value: "Rp 87.500",
        trend: { value: 2.1, label: "dari bulan lalu", direction: "down" as const },
    },
}

const chartData = [
    { date: "2024-01-01", revenue: 4500000 },
    { date: "2024-01-02", revenue: 3800000 },
    { date: "2024-01-03", revenue: 6200000 },
    { date: "2024-01-04", revenue: 5100000 },
    { date: "2024-01-05", revenue: 4900000 },
    { date: "2024-01-06", revenue: 7500000 },
    { date: "2024-01-07", revenue: 8100000 },
]

const recentTransactions = [
    {
        id: "TRX-9871",
        user: "Budi Santoso",
        amount: "Rp 250.000",
        status: "success",
        date: "2024-01-07",
    },
    {
        id: "TRX-9872",
        user: "Siti Aminah",
        amount: "Rp 150.000",
        status: "processing",
        date: "2024-01-07",
    },
    {
        id: "TRX-9873",
        user: "John Doe",
        amount: "Rp 500.000",
        status: "success",
        date: "2024-01-06",
    },
    {
        id: "TRX-9874",
        user: "Jane Smith",
        amount: "Rp 1.200.000",
        status: "failed",
        date: "2024-01-06",
    },
    {
        id: "TRX-9875",
        user: "Ahmad Rizki",
        amount: "Rp 75.000",
        status: "success",
        date: "2024-01-05",
    },
]

const chartConfig = {
    revenue: {
        label: "Pendapatan",
        color: "hsl(var(--primary))",
    },
} satisfies ChartConfig

export default function SalesReportPage() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Laporan Penjualan</h1>
                <div className="flex items-center gap-2">
                    <CalendarDateRangePicker />
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <SummaryCard
                    title="Total Pendapatan"
                    value={summaryData.revenue.value}
                    icon={DollarSign}
                    trend={summaryData.revenue.trend}
                    description="dari bulan lalu"
                />
                <SummaryCard
                    title="Total Transaksi"
                    value={summaryData.transactions.value}
                    icon={CreditCard}
                    trend={summaryData.transactions.trend}
                    description="dari bulan lalu"
                />
                <SummaryCard
                    title="Rata-rata Order"
                    value={summaryData.averageOrder.value}
                    icon={ShoppingBag}
                    trend={summaryData.averageOrder.trend}
                    description="dari bulan lalu"
                />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Tren Pendapatan</CardTitle>
                        <CardDescription>
                            Pendapatan dalam 7 hari terakhir
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <ChartContainer config={chartConfig} className="h-[350px] w-full">
                            <BarChart data={chartData}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="date"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) =>
                                        new Date(value).toLocaleDateString("id-ID", {
                                            weekday: "short",
                                        })
                                    }
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Bar
                                    dataKey="revenue"
                                    fill="var(--color-revenue)"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Transaksi Terakhir</CardTitle>
                        <CardDescription>
                            5 transaksi terakhir yang masuk sistem
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Jumlah</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentTransactions.map((trx) => (
                                    <TableRow key={trx.id}>
                                        <TableCell>
                                            <div className="font-medium">{trx.user}</div>
                                            <div className="text-xs text-muted-foreground">
                                                {trx.id}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    trx.status === "success"
                                                        ? "default"
                                                        : trx.status === "processing"
                                                            ? "secondary"
                                                            : "destructive"
                                                }
                                                className="capitalize"
                                            >
                                                {trx.status === "success" ? "Berhasil" : trx.status === "processing" ? "Proses" : "Gagal"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">{trx.amount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

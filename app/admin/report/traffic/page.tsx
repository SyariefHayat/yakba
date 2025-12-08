"use client"

import {
    Activity,
    Globe,
    MousePointerClick,
} from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

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
import { CalendarDateRangePicker } from "@/components/modules/admin/report/date-range-picker"
import { SummaryCard } from "@/components/modules/admin/report/summary-card"
import { Progress } from "@/components/ui/progress"

// Dummy Data
const summaryData = {
    visitors: {
        value: "142.5K",
        trend: { value: 12.3, label: "dari bulan lalu", direction: "up" as const },
    },
    pageViews: {
        value: "543.2K",
        trend: { value: 8.1, label: "dari bulan lalu", direction: "up" as const },
    },
    bounceRate: {
        value: "42.5%",
        trend: { value: 2.1, label: "dari bulan lalu", direction: "down" as const },
    },
}

const trafficSourceData = [
    { source: "Google Search", visitors: 45000, percent: 45 },
    { source: "Direct", visitors: 32000, percent: 32 },
    { source: "Social Media", visitors: 15000, percent: 15 },
    { source: "Referral", visitors: 5000, percent: 5 },
    { source: "Email", visitors: 3000, percent: 3 },
]

const topPages = [
    { path: "/", title: "Homepage", views: "125K" },
    { path: "/program/online", title: "Program Online", views: "45K" },
    { path: "/blog/tips-belajar", title: "Tips Belajar Efektif", views: "32K" },
    { path: "/tentang-kami", title: "Tentang Kami", views: "15K" },
    { path: "/contact", title: "Hubungi Kami", views: "8K" },
]

const dailyTraffic = [
    { date: "2024-01-01", visitors: 2500 },
    { date: "2024-01-02", visitors: 3200 },
    { date: "2024-01-03", visitors: 4100 },
    { date: "2024-01-04", visitors: 3800 },
    { date: "2024-01-05", visitors: 5200 },
    { date: "2024-01-06", visitors: 4800 },
    { date: "2024-01-07", visitors: 5500 },
]

const chartConfig = {
    visitors: {
        label: "Pengunjung",
        color: "hsl(var(--primary))",
    },
} satisfies ChartConfig

export default function TrafficReportPage() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Traffic Website</h1>
                <div className="flex items-center gap-2">
                    <CalendarDateRangePicker />
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <SummaryCard
                    title="Total Pengunjung"
                    value={summaryData.visitors.value}
                    icon={Globe}
                    trend={summaryData.visitors.trend}
                    description="Total sesi unik"
                />
                <SummaryCard
                    title="Halaman Dilihat"
                    value={summaryData.pageViews.value}
                    icon={MousePointerClick}
                    trend={summaryData.pageViews.trend}
                    description="Total page views"
                />
                <SummaryCard
                    title="Bounce Rate"
                    value={summaryData.bounceRate.value}
                    icon={Activity}
                    trend={summaryData.bounceRate.trend}
                    description="Rata-rata bounce rate"
                />
            </div>

            <div className="grid gap-4 md:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Tren Pengunjung</CardTitle>
                        <CardDescription>
                            Jumlah pengunjung harian dalam 7 hari terakhir
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <ChartContainer config={chartConfig} className="h-[350px] w-full">
                            <BarChart data={dailyTraffic}>
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
                                    dataKey="visitors"
                                    fill="var(--color-visitors)"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Sumber Traffic</CardTitle>
                        <CardDescription>
                            Asal pengunjung website anda
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {trafficSourceData.map((source) => (
                                <div key={source.source} className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">{source.source}</span>
                                        <span className="text-muted-foreground">{source.visitors.toLocaleString()} ({source.percent}%)</span>
                                    </div>
                                    <Progress value={source.percent} className="h-2" />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Halaman Populer</CardTitle>
                        <CardDescription>
                            Halaman yang paling sering dikunjungi
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Halaman</TableHead>
                                    <TableHead>URL</TableHead>
                                    <TableHead className="text-right">Views</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {topPages.map((page) => (
                                    <TableRow key={page.path}>
                                        <TableCell className="font-medium">{page.title}</TableCell>
                                        <TableCell className="text-muted-foreground font-mono text-xs">{page.path}</TableCell>
                                        <TableCell className="text-right">{page.views}</TableCell>
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

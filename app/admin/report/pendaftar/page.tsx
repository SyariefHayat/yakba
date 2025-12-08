"use client"

import {
    Users,
    UserPlus,
    UserCheck,
} from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Dummy Data
const summaryData = {
    totalUsers: {
        value: "2,845",
        trend: { value: 5.4, label: "dari bulan lalu", direction: "up" as const },
    },
    activeUsers: {
        value: "1,203",
        trend: { value: 10.1, label: "dari bulan lalu", direction: "up" as const },
    },
    newUsers: {
        value: "324",
        trend: { value: 2.5, label: "dari bulan lalu", direction: "down" as const },
    },
}

const chartData = [
    { date: "2024-01-01", users: 120 },
    { date: "2024-01-02", users: 132 },
    { date: "2024-01-03", users: 101 },
    { date: "2024-01-04", users: 154 },
    { date: "2024-01-05", users: 190 },
    { date: "2024-01-06", users: 230 },
    { date: "2024-01-07", users: 210 },
]

const recentRegistrants = [
    {
        id: "USR-1001",
        name: "Alice Johnson",
        email: "alice@example.com",
        role: "student",
        status: "active",
        joined: "2024-01-07",
        avatar: "/avatars/01.png",
    },
    {
        id: "USR-1002",
        name: "Bob Smith",
        email: "bob@example.com",
        role: "tentor",
        status: "pending",
        joined: "2024-01-07",
        avatar: "/avatars/02.png",
    },
    {
        id: "USR-1003",
        name: "Charlie Brown",
        email: "charlie@example.com",
        role: "student",
        status: "active",
        joined: "2024-01-06",
        avatar: "/avatars/03.png",
    },
    {
        id: "USR-1004",
        name: "Diana Prince",
        email: "diana@example.com",
        role: "student",
        status: "inactive",
        joined: "2024-01-06",
        avatar: "/avatars/04.png",
    },
    {
        id: "USR-1005",
        name: "Evan Wright",
        email: "evan@example.com",
        role: "student",
        status: "active",
        joined: "2024-01-05",
        avatar: "/avatars/05.png",
    },
]

const chartConfig = {
    users: {
        label: "Pengguna Baru",
        color: "hsl(var(--primary))",
    },
} satisfies ChartConfig

export default function RegistrantsReportPage() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Laporan Pendaftar</h1>
                <div className="flex items-center gap-2">
                    <CalendarDateRangePicker />
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <SummaryCard
                    title="Total Pengguna"
                    value={summaryData.totalUsers.value}
                    icon={Users}
                    trend={summaryData.totalUsers.trend}
                    description="Total pengguna terdaftar"
                />
                <SummaryCard
                    title="Pengguna Aktif"
                    value={summaryData.activeUsers.value}
                    icon={UserCheck}
                    trend={summaryData.activeUsers.trend}
                    description="Aktif dalam 30 hari terakhir"
                />
                <SummaryCard
                    title="Pendaftar Baru"
                    value={summaryData.newUsers.value}
                    icon={UserPlus}
                    trend={summaryData.newUsers.trend}
                    description="Bulan ini"
                />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Pertumbuhan Pengguna</CardTitle>
                        <CardDescription>
                            Jumlah pengguna baru harian dalam 7 hari terakhir
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <ChartContainer config={chartConfig} className="h-[350px] w-full">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="fillUsers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--color-users)" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="var(--color-users)" stopOpacity={0.1} />
                                    </linearGradient>
                                </defs>
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
                                <Area
                                    dataKey="users"
                                    type="natural"
                                    fill="url(#fillUsers)"
                                    fillOpacity={0.4}
                                    stroke="var(--color-users)"
                                />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Pendaftar Baru</CardTitle>
                        <CardDescription>
                            User yang baru saja mendaftar
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentRegistrants.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="flex items-center gap-2">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={user.avatar} alt={user.name} />
                                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-sm">{user.name}</span>
                                                <span className="text-xs text-muted-foreground">{user.email}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="capitalize">{user.role}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    user.status === "active"
                                                        ? "default"
                                                        : user.status === "pending"
                                                            ? "secondary"
                                                            : "outline"
                                                }
                                                className="text-xs capitalize"
                                            >
                                                {user.status === "active" ? "Aktif" : user.status === "pending" ? "Pending" : "Non-aktif"}
                                            </Badge>
                                        </TableCell>
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

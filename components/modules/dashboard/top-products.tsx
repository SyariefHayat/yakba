"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'

import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

type ReportData = {
    totalRevenue: number
    successRevenue: number
    totalOrders: number
    totalProducts: number
    totalCategories: number
    totalUsers: number
    statusBreakdown: { status: string; label: string; count: number }[]
    topProducts: { name: string; revenue: number; qty: number }[]
    revenueChart: { date: string; revenue: number }[]
}

function formatRupiah(value: number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value)
}

const TopProducts = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<ReportData | null>(null)
    const [period, setPeriod] = useState("30")

    useEffect(() => {
        setLoading(true)
        fetch(`/api/dashboard/reports?days=${period}`)
            .then((res) => res.json())
            .then((json) => setData(json))
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [period])

    return (
        <Card className="pt-0">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                    <CardTitle>Top 5 Produk Terlaris</CardTitle>
                    <CardDescription>Berdasarkan revenue dalam periode terpilih</CardDescription>
                </div>
                <Select value={period} onValueChange={setPeriod}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="7">7 Hari Terakhir</SelectItem>
                        <SelectItem value="30">30 Hari Terakhir</SelectItem>
                        <SelectItem value="90">3 Bulan Terakhir</SelectItem>
                        <SelectItem value="365">1 Tahun Terakhir</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="pt-4">
                {loading ? (
                    <div className="space-y-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} className="h-10 w-full" />
                        ))}
                    </div>
                ) : (data?.topProducts?.length ?? 0) === 0 ? (
                    <p className="text-center py-8 text-muted-foreground">Belum ada data penjualan.</p>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12">#</TableHead>
                                <TableHead>Produk</TableHead>
                                <TableHead className="text-center">Qty Terjual</TableHead>
                                <TableHead className="text-right">Revenue</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.topProducts.map((p, i) => (
                                <TableRow key={p.name}>
                                    <TableCell className="font-medium text-muted-foreground">{i + 1}</TableCell>
                                    <TableCell className="font-medium">{p.name}</TableCell>
                                    <TableCell className="text-center">
                                        <Badge variant="outline">{p.qty}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right font-semibold">
                                        {formatRupiah(p.revenue)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    )
}

export default TopProducts
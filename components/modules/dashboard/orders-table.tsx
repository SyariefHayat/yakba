"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState, useCallback } from "react"
import { Eye, Loader2, MoreHorizontalIcon, Pencil, Search, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type OrderItem = {
    id: string
    productId: string
    quantity: number
    priceAtOrder: number
    product: { id: string; name: string; slug: string; type: string }
}

type Order = {
    id: string
    customerName: string
    customerPhone: string
    status: "PENDING" | "CONTACTED" | "SUCCESS" | "CANCELED"
    notes: string | null
    total: number
    itemCount: number
    items: OrderItem[]
    createdAt: string
}

type Meta = {
    page: number
    limit: number
    total: number
    totalPages: number
}

const STATUS_OPTIONS = [
    { value: "PENDING", label: "Pending", color: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100" },
    { value: "CONTACTED", label: "Dihubungi", color: "bg-blue-100 text-blue-700 hover:bg-blue-100" },
    { value: "SUCCESS", label: "Sukses", color: "bg-green-100 text-green-700 hover:bg-green-100" },
    { value: "CANCELED", label: "Dibatalkan", color: "bg-red-100 text-red-700 hover:bg-red-100" },
] as const

function formatRupiah(value: number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value)
}

function getStatusConfig(status: string) {
    return STATUS_OPTIONS.find((s) => s.value === status) ?? STATUS_OPTIONS[0]
}

export function OrdersTable() {
    const [orders, setOrders] = useState<Order[]>([])
    const [meta, setMeta] = useState<Meta | null>(null)
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("ALL")
    const [page, setPage] = useState(1)

    const [detailOrder, setDetailOrder] = useState<Order | null>(null)

    const [editOrder, setEditOrder] = useState<Order | null>(null)
    const [editStatus, setEditStatus] = useState("")
    const [editNotes, setEditNotes] = useState("")
    const [submitting, setSubmitting] = useState(false)

    const [deleteOrder, setDeleteOrder] = useState<Order | null>(null)
    const [deleting, setDeleting] = useState(false)

    const fetchOrders = useCallback(async () => {
        setLoading(true)
        try {
            const params = new URLSearchParams({
                page: String(page),
                limit: "10",
                ...(search && { search }),
                ...(statusFilter !== "ALL" && { status: statusFilter }),
            })
            const res = await fetch(`/api/orders?${params}`)
            const json = await res.json()
            setOrders(json.data ?? [])
            setMeta(json.meta ?? null)
        } catch {
            toast.error("Gagal memuat data order")
        } finally {
            setLoading(false)
        }
    }, [page, search, statusFilter])

    useEffect(() => {
        const timer = setTimeout(() => fetchOrders(), 300)
        return () => clearTimeout(timer)
    }, [fetchOrders])

    function openEditDialog(order: Order) {
        setEditOrder(order)
        setEditStatus(order.status)
        setEditNotes(order.notes ?? "")
    }

    async function handleEditSubmit() {
        if (!editOrder) return
        setSubmitting(true)
        try {
            const res = await fetch(`/api/orders/${editOrder.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: editStatus, notes: editNotes }),
            })
            const json = await res.json()
            if (!res.ok) throw new Error(json.error)
            toast.success("Order berhasil diperbarui")
            setEditOrder(null)
            fetchOrders()
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Terjadi kesalahan")
        } finally {
            setSubmitting(false)
        }
    }

    async function handleDelete() {
        if (!deleteOrder) return
        setDeleting(true)
        try {
            const res = await fetch(`/api/orders/${deleteOrder.id}`, { method: "DELETE" })
            const json = await res.json()
            if (!res.ok) throw new Error(json.error)
            toast.success("Order berhasil dihapus")
            setDeleteOrder(null)
            fetchOrders()
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Gagal menghapus order")
        } finally {
            setDeleting(false)
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                            placeholder="Cari nama / telepon..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value)
                                setPage(1)
                            }}
                            className="pl-9"
                        />
                    </div>
                    <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1) }}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Filter status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">Semua Status</SelectItem>
                            {STATUS_OPTIONS.map((s) => (
                                <SelectItem key={s.value} value={s.value}>
                                    {s.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12">#</TableHead>
                            <TableHead>Pelanggan</TableHead>
                            <TableHead>Telepon</TableHead>
                            <TableHead>Items</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Tanggal</TableHead>
                            <TableHead>Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    {Array.from({ length: 8 }).map((_, j) => (
                                        <TableCell key={j}>
                                            <Skeleton className="h-5 w-full" />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : orders.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                    Tidak ada data order ditemukan.
                                </TableCell>
                            </TableRow>
                        ) : (
                            orders.map((order, index) => {
                                const statusCfg = getStatusConfig(order.status)
                                return (
                                    <TableRow key={order.id}>
                                        <TableCell className="text-muted-foreground">
                                            {(page - 1) * 10 + index + 1}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {order.customerName}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {order.customerPhone}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{order.itemCount} item</Badge>
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {formatRupiah(order.total)}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className={statusCfg.color}>
                                                {statusCfg.label}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {new Date(order.createdAt).toLocaleDateString("id-ID", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="size-8 cursor-pointer">
                                                        <MoreHorizontalIcon />
                                                        <span className="sr-only">Open menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem className="cursor-pointer" onClick={() => setDetailOrder(order)}>
                                                        <Eye className="size-4" />
                                                        Detail
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="cursor-pointer" onClick={() => openEditDialog(order)}>
                                                        <Pencil className="size-4" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="cursor-pointer" variant="destructive" onClick={() => setDeleteOrder(order)}>
                                                        <Trash2 className="size-4" />
                                                        Hapus
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            {meta && meta.totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        Menampilkan {(page - 1) * 10 + 1}–{Math.min(page * 10, meta.total)} dari {meta.total} order
                    </p>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                            Sebelumnya
                        </Button>
                        <Button variant="outline" size="sm" disabled={page >= meta.totalPages} onClick={() => setPage((p) => p + 1)}>
                            Selanjutnya
                        </Button>
                    </div>
                </div>
            )}

            {/* Detail Dialog */}
            <Dialog open={!!detailOrder} onOpenChange={(open) => !open && setDetailOrder(null)}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Detail Order</DialogTitle>
                        <DialogDescription>
                            {detailOrder?.customerName} — {detailOrder?.customerPhone}
                        </DialogDescription>
                    </DialogHeader>
                    {detailOrder && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Status</span>
                                <Badge variant="secondary" className={getStatusConfig(detailOrder.status).color}>
                                    {getStatusConfig(detailOrder.status).label}
                                </Badge>
                            </div>
                            {detailOrder.notes && (
                                <div>
                                    <span className="text-sm text-muted-foreground">Catatan</span>
                                    <p className="text-sm mt-1">{detailOrder.notes}</p>
                                </div>
                            )}
                            <div className="rounded-lg border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Produk</TableHead>
                                            <TableHead className="text-center">Qty</TableHead>
                                            <TableHead className="text-right">Harga</TableHead>
                                            <TableHead className="text-right">Subtotal</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {detailOrder.items.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell className="font-medium">{item.product.name}</TableCell>
                                                <TableCell className="text-center">{item.quantity}</TableCell>
                                                <TableCell className="text-right">{formatRupiah(item.priceAtOrder)}</TableCell>
                                                <TableCell className="text-right font-medium">
                                                    {formatRupiah(item.quantity * item.priceAtOrder)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                            <div className="flex justify-between items-center font-semibold text-lg border-t pt-3">
                                <span>Total</span>
                                <span>{formatRupiah(detailOrder.total)}</span>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Edit Status Dialog */}
            <Dialog open={!!editOrder} onOpenChange={(open) => !open && setEditOrder(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Order</DialogTitle>
                        <DialogDescription>
                            Order dari {editOrder?.customerName}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-2">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Status</label>
                            <Select value={editStatus} onValueChange={setEditStatus}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {STATUS_OPTIONS.map((s) => (
                                        <SelectItem key={s.value} value={s.value}>
                                            {s.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="edit-notes" className="text-sm font-medium">
                                Catatan
                            </label>
                            <textarea
                                id="edit-notes"
                                rows={3}
                                placeholder="Tambahkan catatan..."
                                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                value={editNotes}
                                onChange={(e) => setEditNotes(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setEditOrder(null)}>
                            Batal
                        </Button>
                        <Button onClick={handleEditSubmit} disabled={submitting}>
                            {submitting && <Loader2 className="size-4 mr-2 animate-spin" />}
                            Simpan
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <AlertDialog open={!!deleteOrder} onOpenChange={(open) => !open && setDeleteOrder(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Order?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Anda yakin ingin menghapus order dari <strong>{deleteOrder?.customerName}</strong> senilai{" "}
                            <strong>{deleteOrder ? formatRupiah(deleteOrder.total) : ""}</strong>?
                            Tindakan ini tidak dapat dibatalkan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={deleting}>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={deleting}
                            className="bg-destructive text-white hover:bg-destructive/90"
                        >
                            {deleting && <Loader2 className="size-4 mr-2 animate-spin" />}
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

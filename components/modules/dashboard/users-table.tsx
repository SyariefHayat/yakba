"use client"

import { useEffect, useState, useCallback } from "react"
import { toast } from "sonner"
import { Loader2, Pencil, Plus, Search, Trash2 } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

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

// ---------- Types ----------
type User = {
    id: string
    name: string | null
    email: string
    role: "ADMIN" | "USER"
    createdAt: string
}

type Meta = {
    page: number
    limit: number
    total: number
    totalPages: number
}

type FormData = {
    name: string
    email: string
    password: string
    role: "ADMIN" | "USER"
}

const emptyForm: FormData = { name: "", email: "", password: "", role: "USER" }

// ---------- Component ----------
export function UsersTable() {
    const [users, setUsers] = useState<User[]>([])
    const [meta, setMeta] = useState<Meta | null>(null)
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)

    // Dialog states
    const [formOpen, setFormOpen] = useState(false)
    const [editingUser, setEditingUser] = useState<User | null>(null)
    const [formData, setFormData] = useState<FormData>(emptyForm)
    const [submitting, setSubmitting] = useState(false)

    // Delete dialog
    const [deleteUser, setDeleteUser] = useState<User | null>(null)
    const [deleting, setDeleting] = useState(false)

    // ---------- Fetch ----------
    const fetchUsers = useCallback(async () => {
        setLoading(true)
        try {
            const params = new URLSearchParams({
                page: String(page),
                limit: "10",
                ...(search && { search }),
            })
            const res = await fetch(`/api/users?${params}`)
            const json = await res.json()
            setUsers(json.data ?? [])
            setMeta(json.meta ?? null)
        } catch {
            toast.error("Gagal memuat data user")
        } finally {
            setLoading(false)
        }
    }, [page, search])

    useEffect(() => {
        const timer = setTimeout(() => fetchUsers(), 300)
        return () => clearTimeout(timer)
    }, [fetchUsers])

    // ---------- Create / Edit ----------
    function openCreateDialog() {
        setEditingUser(null)
        setFormData(emptyForm)
        setFormOpen(true)
    }

    function openEditDialog(user: User) {
        setEditingUser(user)
        setFormData({
            name: user.name ?? "",
            email: user.email,
            password: "",
            role: user.role,
        })
        setFormOpen(true)
    }

    async function handleSubmit() {
        setSubmitting(true)
        try {
            if (editingUser) {
                // PATCH
                const body: Record<string, string> = {}
                if (formData.name !== (editingUser.name ?? "")) body.name = formData.name
                if (formData.email !== editingUser.email) body.email = formData.email
                if (formData.role !== editingUser.role) body.role = formData.role
                if (formData.password) body.password = formData.password

                const res = await fetch(`/api/users/${editingUser.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                })
                const json = await res.json()
                if (!res.ok) throw new Error(json.error)
                toast.success("User berhasil diperbarui")
            } else {
                // POST
                const res = await fetch("/api/users", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                })
                const json = await res.json()
                if (!res.ok) throw new Error(json.error)
                toast.success("User berhasil ditambahkan")
            }
            setFormOpen(false)
            fetchUsers()
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Terjadi kesalahan")
        } finally {
            setSubmitting(false)
        }
    }

    // ---------- Delete ----------
    async function handleDelete() {
        if (!deleteUser) return
        setDeleting(true)
        try {
            const res = await fetch(`/api/users/${deleteUser.id}`, { method: "DELETE" })
            const json = await res.json()
            if (!res.ok) throw new Error(json.error)
            toast.success("User berhasil dihapus")
            setDeleteUser(null)
            fetchUsers()
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Gagal menghapus user")
        } finally {
            setDeleting(false)
        }
    }

    // ---------- Render ----------
    return (
        <div className="space-y-4">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                        placeholder="Cari nama atau email..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                            setPage(1)
                        }}
                        className="pl-9"
                    />
                </div>
                <Button onClick={openCreateDialog}>
                    <Plus className="size-4 mr-2" />
                    Tambah User
                </Button>
            </div>

            {/* Table */}
            <div className="rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12">#</TableHead>
                            <TableHead>Nama</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Tanggal Dibuat</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    {Array.from({ length: 6 }).map((_, j) => (
                                        <TableCell key={j}>
                                            <Skeleton className="h-5 w-full" />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : users.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                    Tidak ada data user ditemukan.
                                </TableCell>
                            </TableRow>
                        ) : (
                            users.map((user, index) => (
                                <TableRow key={user.id}>
                                    <TableCell className="text-muted-foreground">
                                        {(page - 1) * 10 + index + 1}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {user.name || "—"}
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {new Date(user.createdAt).toLocaleDateString("id-ID", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => openEditDialog(user)}
                                            >
                                                <Pencil className="size-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive hover:text-destructive"
                                                onClick={() => setDeleteUser(user)}
                                            >
                                                <Trash2 className="size-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            {meta && meta.totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        Menampilkan {(page - 1) * 10 + 1}–{Math.min(page * 10, meta.total)} dari {meta.total} user
                    </p>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page <= 1}
                            onClick={() => setPage((p) => p - 1)}
                        >
                            Sebelumnya
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page >= meta.totalPages}
                            onClick={() => setPage((p) => p + 1)}
                        >
                            Selanjutnya
                        </Button>
                    </div>
                </div>
            )}

            {/* Create / Edit Dialog */}
            <Dialog open={formOpen} onOpenChange={setFormOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editingUser ? "Edit User" : "Tambah User Baru"}
                        </DialogTitle>
                        <DialogDescription>
                            {editingUser
                                ? "Perbarui informasi user. Kosongkan password jika tidak ingin mengubahnya."
                                : "Isi form di bawah untuk menambahkan user baru."}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-2">
                        <div className="grid gap-2">
                            <label htmlFor="name" className="text-sm font-medium">
                                Nama
                            </label>
                            <Input
                                id="name"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
                            />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="email" className="text-sm font-medium">
                                Email
                            </label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
                            />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="password" className="text-sm font-medium">
                                Password {editingUser && <span className="text-muted-foreground">(opsional)</span>}
                            </label>
                            <Input
                                id="password"
                                type="password"
                                placeholder={editingUser ? "Kosongkan jika tidak diubah" : "Min. 8 karakter"}
                                value={formData.password}
                                onChange={(e) => setFormData((f) => ({ ...f, password: e.target.value }))}
                            />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Role</label>
                            <Select
                                value={formData.role}
                                onValueChange={(value) =>
                                    setFormData((f) => ({ ...f, role: value as "ADMIN" | "USER" }))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="USER">User</SelectItem>
                                    <SelectItem value="ADMIN">Admin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setFormOpen(false)}>
                            Batal
                        </Button>
                        <Button onClick={handleSubmit} disabled={submitting}>
                            {submitting && <Loader2 className="size-4 mr-2 animate-spin" />}
                            {editingUser ? "Simpan" : "Tambah"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <AlertDialog open={!!deleteUser} onOpenChange={(open) => !open && setDeleteUser(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus User?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Anda yakin ingin menghapus <strong>{deleteUser?.name || deleteUser?.email}</strong>?
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

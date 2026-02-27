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

// ---------- Types ----------
type Category = {
    id: string
    name: string
    slug: string
    isActive: boolean
    createdAt: string
    _count: { products: number }
}

type Meta = {
    page: number
    limit: number
    total: number
    totalPages: number
}

type FormData = {
    name: string
    isActive: boolean
}

const emptyForm: FormData = { name: "", isActive: true }

// ---------- Component ----------
export function CategoriesTable() {
    const [categories, setCategories] = useState<Category[]>([])
    const [meta, setMeta] = useState<Meta | null>(null)
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)

    // Dialog states
    const [formOpen, setFormOpen] = useState(false)
    const [editingCategory, setEditingCategory] = useState<Category | null>(null)
    const [formData, setFormData] = useState<FormData>(emptyForm)
    const [submitting, setSubmitting] = useState(false)

    // Delete dialog
    const [deleteCategory, setDeleteCategory] = useState<Category | null>(null)
    const [deleting, setDeleting] = useState(false)

    // ---------- Fetch ----------
    const fetchCategories = useCallback(async () => {
        setLoading(true)
        try {
            const params = new URLSearchParams({
                page: String(page),
                limit: "10",
                ...(search && { search }),
            })
            const res = await fetch(`/api/categories?${params}`)
            const json = await res.json()
            setCategories(json.data ?? [])
            setMeta(json.meta ?? null)
        } catch {
            toast.error("Gagal memuat data kategori")
        } finally {
            setLoading(false)
        }
    }, [page, search])

    useEffect(() => {
        const timer = setTimeout(() => fetchCategories(), 300)
        return () => clearTimeout(timer)
    }, [fetchCategories])

    // ---------- Create / Edit ----------
    function openCreateDialog() {
        setEditingCategory(null)
        setFormData(emptyForm)
        setFormOpen(true)
    }

    function openEditDialog(category: Category) {
        setEditingCategory(category)
        setFormData({
            name: category.name,
            isActive: category.isActive,
        })
        setFormOpen(true)
    }

    async function handleSubmit() {
        if (!formData.name.trim()) {
            toast.error("Nama kategori wajib diisi.")
            return
        }

        setSubmitting(true)
        try {
            if (editingCategory) {
                const res = await fetch(`/api/categories/${editingCategory.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                })
                const json = await res.json()
                if (!res.ok) throw new Error(json.error)
                toast.success("Kategori berhasil diperbarui")
            } else {
                const res = await fetch("/api/categories", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                })
                const json = await res.json()
                if (!res.ok) throw new Error(json.error)
                toast.success("Kategori berhasil ditambahkan")
            }
            setFormOpen(false)
            fetchCategories()
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Terjadi kesalahan")
        } finally {
            setSubmitting(false)
        }
    }

    // ---------- Delete ----------
    async function handleDelete() {
        if (!deleteCategory) return
        setDeleting(true)
        try {
            const res = await fetch(`/api/categories/${deleteCategory.id}`, { method: "DELETE" })
            const json = await res.json()
            if (!res.ok) throw new Error(json.error)
            toast.success("Kategori berhasil dihapus")
            setDeleteCategory(null)
            fetchCategories()
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Gagal menghapus kategori")
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
                        placeholder="Cari nama kategori..."
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
                    Tambah Kategori
                </Button>
            </div>

            {/* Table */}
            <div className="rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12">#</TableHead>
                            <TableHead>Nama</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead className="text-center">Jumlah Produk</TableHead>
                            <TableHead className="text-center">Status</TableHead>
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
                        ) : categories.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                    Tidak ada data kategori ditemukan.
                                </TableCell>
                            </TableRow>
                        ) : (
                            categories.map((cat, index) => (
                                <TableRow key={cat.id}>
                                    <TableCell className="text-muted-foreground">
                                        {(page - 1) * 10 + index + 1}
                                    </TableCell>
                                    <TableCell className="font-medium">{cat.name}</TableCell>
                                    <TableCell className="text-muted-foreground font-mono text-sm">
                                        {cat.slug}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Badge variant="outline">
                                            {cat._count.products} produk
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Badge
                                            variant={cat.isActive ? "default" : "secondary"}
                                            className={cat.isActive
                                                ? "bg-green-100 text-green-700 hover:bg-green-100"
                                                : "bg-red-100 text-red-700 hover:bg-red-100"}
                                        >
                                            {cat.isActive ? "Aktif" : "Nonaktif"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => openEditDialog(cat)}
                                            >
                                                <Pencil className="size-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive hover:text-destructive"
                                                onClick={() => setDeleteCategory(cat)}
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
                        Menampilkan {(page - 1) * 10 + 1}–{Math.min(page * 10, meta.total)} dari {meta.total} kategori
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
                            {editingCategory ? "Edit Kategori" : "Tambah Kategori Baru"}
                        </DialogTitle>
                        <DialogDescription>
                            {editingCategory
                                ? "Perbarui informasi kategori di bawah ini."
                                : "Isi form di bawah untuk menambahkan kategori baru. Slug akan digenerate otomatis."}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-2">
                        <div className="grid gap-2">
                            <label htmlFor="cat-name" className="text-sm font-medium">
                                Nama Kategori <span className="text-destructive">*</span>
                            </label>
                            <Input
                                id="cat-name"
                                placeholder="Contoh: Buku, Elektronik, dll."
                                value={formData.name}
                                onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                id="cat-active"
                                type="checkbox"
                                checked={formData.isActive}
                                onChange={(e) => setFormData((f) => ({ ...f, isActive: e.target.checked }))}
                                className="rounded border-gray-300"
                            />
                            <label htmlFor="cat-active" className="text-sm font-medium">
                                Kategori Aktif
                            </label>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setFormOpen(false)}>
                            Batal
                        </Button>
                        <Button onClick={handleSubmit} disabled={submitting}>
                            {submitting && <Loader2 className="size-4 mr-2 animate-spin" />}
                            {editingCategory ? "Simpan" : "Tambah"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <AlertDialog open={!!deleteCategory} onOpenChange={(open) => !open && setDeleteCategory(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Kategori?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Anda yakin ingin menghapus kategori <strong>{deleteCategory?.name}</strong>?
                            {deleteCategory && deleteCategory._count.products > 0 && (
                                <span className="block mt-1 text-destructive font-medium">
                                    ⚠️ Kategori ini masih memiliki {deleteCategory._count.products} produk dan tidak bisa dihapus.
                                </span>
                            )}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={deleting}>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={deleting || (deleteCategory?._count.products ?? 0) > 0}
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

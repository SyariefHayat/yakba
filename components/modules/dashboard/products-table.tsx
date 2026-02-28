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

import {
    ImagePlus,
    Loader2,
    MoreHorizontalIcon,
    Pencil,
    Plus,
    Search,
    Trash2,
    X,
} from "lucide-react"

import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState, useCallback } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type Category = {
    id: string
    name: string
    slug: string
}

type ProductDetail = {
    stock: number | null
    weight: number | null
    fileUrl: string | null
}

type Product = {
    id: string
    name: string
    slug: string
    description: string
    price: number
    discount: number | null
    type: "DIGITAL" | "PHYSICAL"
    isActive: boolean
    categoryId: string
    category: { id: string; name: string; slug: string }
    detail: ProductDetail | null
    images: { id: string; imageUrl: string }[]
    _count: { items: number }
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
    description: string
    price: string
    discount: string
    type: "DIGITAL" | "PHYSICAL"
    categoryId: string
    isActive: boolean
    stock: string
    weight: string
    fileUrl: string
}

const emptyForm: FormData = {
    name: "",
    description: "",
    price: "",
    discount: "",
    type: "PHYSICAL",
    categoryId: "",
    isActive: true,
    stock: "",
    weight: "",
    fileUrl: "",
}

function formatRupiah(value: number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value)
}

export function ProductsTable() {
    const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [meta, setMeta] = useState<Meta | null>(null)
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)

    const [formOpen, setFormOpen] = useState(false)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [formData, setFormData] = useState<FormData>(emptyForm)
    const [submitting, setSubmitting] = useState(false)
    const [uploadedImages, setUploadedImages] = useState<string[]>([])
    const [uploading, setUploading] = useState(false)

    const [deleteProduct, setDeleteProduct] = useState<Product | null>(null)
    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
        fetch("/api/categories")
            .then((res) => res.json())
            .then((json) => setCategories(json.data ?? []))
            .catch(console.error)
    }, [])

    const fetchProducts = useCallback(async () => {
        setLoading(true)
        try {
            const params = new URLSearchParams({
                page: String(page),
                limit: "10",
                ...(search && { search }),
            })
            const res = await fetch(`/api/products?${params}`)
            const json = await res.json()
            setProducts(json.data ?? [])
            setMeta(json.meta ?? null)
        } catch {
            toast.error("Gagal memuat data produk")
        } finally {
            setLoading(false)
        }
    }, [page, search])

    useEffect(() => {
        const timer = setTimeout(() => fetchProducts(), 300)
        return () => clearTimeout(timer)
    }, [fetchProducts])

    function openCreateDialog() {
        setEditingProduct(null)
        setFormData(emptyForm)
        setUploadedImages([])
        setFormOpen(true)
    }

    function openEditDialog(product: Product) {
        setEditingProduct(product)
        setFormData({
            name: product.name,
            description: product.description,
            price: String(product.price),
            discount: product.discount ? String(product.discount) : "",
            type: product.type,
            categoryId: product.categoryId,
            isActive: product.isActive,
            stock: product.detail?.stock ? String(product.detail.stock) : "",
            weight: product.detail?.weight ? String(product.detail.weight) : "",
            fileUrl: product.detail?.fileUrl ?? "",
        })
        setUploadedImages(product.images.map((img) => img.imageUrl))
        setFormOpen(true)
    }

    async function handleImageUpload(files: FileList | null) {
        if (!files || files.length === 0) return
        setUploading(true)
        try {
            const newUrls: string[] = []
            for (const file of Array.from(files)) {
                const fd = new window.FormData()
                fd.append("file", file)
                const res = await fetch("/api/upload", { method: "POST", body: fd })
                const json = await res.json()
                if (!res.ok) throw new Error(json.error)
                newUrls.push(json.url)
            }
            setUploadedImages((prev) => [...prev, ...newUrls])
            toast.success(`${newUrls.length} gambar berhasil diupload`)
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Gagal upload gambar")
        } finally {
            setUploading(false)
        }
    }

    function removeImage(url: string) {
        setUploadedImages((prev) => prev.filter((u) => u !== url))
    }

    async function handleSubmit() {
        if (!formData.name || !formData.description || !formData.price || !formData.categoryId) {
            toast.error("Nama, deskripsi, harga, dan kategori wajib diisi.")
            return
        }

        setSubmitting(true)
        try {
            const payload = {
                name: formData.name,
                description: formData.description,
                price: Number(formData.price),
                discount: formData.discount ? Number(formData.discount) : null,
                type: formData.type,
                categoryId: formData.categoryId,
                isActive: formData.isActive,
                stock: formData.stock ? Number(formData.stock) : null,
                weight: formData.weight ? Number(formData.weight) : null,
                fileUrl: formData.fileUrl || null,
                imageUrls: uploadedImages,
            }

            if (editingProduct) {
                const res = await fetch(`/api/products/${editingProduct.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                })
                const json = await res.json()
                if (!res.ok) throw new Error(json.error)
                toast.success("Produk berhasil diperbarui")
            } else {
                const res = await fetch("/api/products", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                })
                const json = await res.json()
                if (!res.ok) throw new Error(json.error)
                toast.success("Produk berhasil ditambahkan")
            }
            setFormOpen(false)
            fetchProducts()
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Terjadi kesalahan")
        } finally {
            setSubmitting(false)
        }
    }

    async function handleDelete() {
        if (!deleteProduct) return
        setDeleting(true)
        try {
            const res = await fetch(`/api/products/${deleteProduct.id}`, { method: "DELETE" })
            const json = await res.json()
            if (!res.ok) throw new Error(json.error)
            toast.success("Produk berhasil dihapus")
            setDeleteProduct(null)
            fetchProducts()
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Gagal menghapus produk")
        } finally {
            setDeleting(false)
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                        placeholder="Cari nama produk..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                            setPage(1)
                        }}
                        className="pl-9"
                    />
                </div>
                <Button onClick={openCreateDialog} className="cursor-pointer">
                    <Plus className="size-4 mr-2" />
                    Tambah Produk
                </Button>
            </div>

            <div className="rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12">#</TableHead>
                            <TableHead className="w-16">Foto</TableHead>
                            <TableHead>Nama Produk</TableHead>
                            <TableHead>Kategori</TableHead>
                            <TableHead>Tipe</TableHead>
                            <TableHead>Harga</TableHead>
                            <TableHead>Diskon</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    {Array.from({ length: 9 }).map((_, j) => (
                                        <TableCell key={j}>
                                            <Skeleton className="h-5 w-full" />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : products.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                                    Tidak ada data produk ditemukan.
                                </TableCell>
                            </TableRow>
                        ) : (
                            products.map((product, index) => (
                                <TableRow key={product.id}>
                                    <TableCell className="text-muted-foreground">
                                        {(page - 1) * 10 + index + 1}
                                    </TableCell>
                                    <TableCell>
                                        {product.images.length > 0 ? (
                                            <div className="relative size-10 rounded-md overflow-hidden border">
                                                <img
                                                    src={product.images[0].imageUrl}
                                                    alt={product.name}
                                                    className="size-full object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div className="size-10 rounded-md border bg-muted flex items-center justify-center">
                                                <ImagePlus className="size-4 text-muted-foreground" />
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <p className="font-medium">{product.name}</p>
                                            <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                                                {product.description}
                                            </p>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{product.category.name}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={product.type === "DIGITAL" ? "default" : "secondary"}>
                                            {product.type === "DIGITAL" ? "Digital" : "Fisik"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {formatRupiah(product.price)}
                                    </TableCell>
                                    <TableCell>
                                        {product.discount
                                            ? formatRupiah(product.discount)
                                            : <span className="text-muted-foreground">—</span>}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={product.isActive ? "default" : "secondary"}
                                            className={product.isActive
                                                ? "bg-green-100 text-green-700 hover:bg-green-100"
                                                : "bg-red-100 text-red-700 hover:bg-red-100"}
                                        >
                                            {product.isActive ? "Aktif" : "Nonaktif"}
                                        </Badge>
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
                                                <DropdownMenuItem className="cursor-pointer" onClick={() => openEditDialog(product)}>
                                                    <Pencil className="size-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="cursor-pointer" variant="destructive" onClick={() => setDeleteProduct(product)}>
                                                    <Trash2 className="size-4" />
                                                    Hapus
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {meta && meta.totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        Menampilkan {(page - 1) * 10 + 1}–{Math.min(page * 10, meta.total)} dari {meta.total} produk
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

            <Dialog open={formOpen} onOpenChange={setFormOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {editingProduct ? "Edit Produk" : "Tambah Produk Baru"}
                        </DialogTitle>
                        <DialogDescription>
                            {editingProduct
                                ? "Perbarui informasi produk di bawah ini."
                                : "Isi form di bawah untuk menambahkan produk baru."}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-2">
                        <div className="grid gap-2">
                            <label htmlFor="name" className="text-sm font-medium">
                                Nama Produk <span className="text-destructive">*</span>
                            </label>
                            <Input
                                id="name"
                                placeholder="Nama produk"
                                value={formData.name}
                                onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
                            />
                        </div>

                        <div className="grid gap-2">
                            <label htmlFor="description" className="text-sm font-medium">
                                Deskripsi <span className="text-destructive">*</span>
                            </label>
                            <textarea
                                id="description"
                                rows={3}
                                placeholder="Deskripsi produk"
                                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                value={formData.description}
                                onChange={(e) => setFormData((f) => ({ ...f, description: e.target.value }))}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <label htmlFor="price" className="text-sm font-medium">
                                    Harga (Rp) <span className="text-destructive">*</span>
                                </label>
                                <Input
                                    id="price"
                                    type="number"
                                    placeholder="0"
                                    value={formData.price}
                                    onChange={(e) => setFormData((f) => ({ ...f, price: e.target.value }))}
                                />
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="discount" className="text-sm font-medium">
                                    Diskon (Rp)
                                </label>
                                <Input
                                    id="discount"
                                    type="number"
                                    placeholder="0"
                                    value={formData.discount}
                                    onChange={(e) => setFormData((f) => ({ ...f, discount: e.target.value }))}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">
                                    Tipe <span className="text-destructive">*</span>
                                </label>
                                <Select
                                    value={formData.type}
                                    onValueChange={(v) =>
                                        setFormData((f) => ({ ...f, type: v as "DIGITAL" | "PHYSICAL" }))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="PHYSICAL">Fisik</SelectItem>
                                        <SelectItem value="DIGITAL">Digital</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">
                                    Kategori <span className="text-destructive">*</span>
                                </label>
                                <Select
                                    value={formData.categoryId}
                                    onValueChange={(v) => setFormData((f) => ({ ...f, categoryId: v }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih kategori" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((cat) => (
                                            <SelectItem key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {formData.type === "PHYSICAL" && (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <label htmlFor="stock" className="text-sm font-medium">
                                        Stok
                                    </label>
                                    <Input
                                        id="stock"
                                        type="number"
                                        placeholder="0"
                                        value={formData.stock}
                                        onChange={(e) => setFormData((f) => ({ ...f, stock: e.target.value }))}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="weight" className="text-sm font-medium">
                                        Berat (gram)
                                    </label>
                                    <Input
                                        id="weight"
                                        type="number"
                                        placeholder="0"
                                        value={formData.weight}
                                        onChange={(e) => setFormData((f) => ({ ...f, weight: e.target.value }))}
                                    />
                                </div>
                            </div>
                        )}

                        {formData.type === "DIGITAL" && (
                            <div className="grid gap-2">
                                <label htmlFor="fileUrl" className="text-sm font-medium">
                                    URL File
                                </label>
                                <Input
                                    id="fileUrl"
                                    placeholder="https://example.com/file.pdf"
                                    value={formData.fileUrl}
                                    onChange={(e) => setFormData((f) => ({ ...f, fileUrl: e.target.value }))}
                                />
                            </div>
                        )}

                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Foto Produk</label>
                            <div className="grid grid-cols-4 gap-3">
                                {uploadedImages.map((url, i) => (
                                    <div key={i} className="relative group aspect-square rounded-lg overflow-hidden border">
                                        <img
                                            src={url}
                                            alt={`Product image ${i + 1}`}
                                            className="size-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(url)}
                                            className="absolute top-1 right-1 size-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                        >
                                            <X className="size-3" />
                                        </button>
                                    </div>
                                ))}
                                <label className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-muted-foreground/50 transition-colors">
                                    <input
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp,image/gif"
                                        multiple
                                        className="hidden"
                                        onChange={(e) => handleImageUpload(e.target.files)}
                                        disabled={uploading}
                                    />
                                    {uploading ? (
                                        <Loader2 className="size-5 text-muted-foreground animate-spin" />
                                    ) : (
                                        <ImagePlus className="size-5 text-muted-foreground" />
                                    )}
                                    <span className="text-xs text-muted-foreground">
                                        {uploading ? "Uploading..." : "Tambah"}
                                    </span>
                                </label>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Format: JPG, PNG, WebP, GIF. Maks 5MB per file.
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                id="isActive"
                                type="checkbox"
                                checked={formData.isActive}
                                onChange={(e) => setFormData((f) => ({ ...f, isActive: e.target.checked }))}
                                className="rounded border-gray-300"
                            />
                            <label htmlFor="isActive" className="text-sm font-medium">
                                Produk Aktif
                            </label>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setFormOpen(false)}>
                            Batal
                        </Button>
                        <Button onClick={handleSubmit} disabled={submitting}>
                            {submitting && <Loader2 className="size-4 mr-2 animate-spin" />}
                            {editingProduct ? "Simpan" : "Tambah"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <AlertDialog open={!!deleteProduct} onOpenChange={(open) => !open && setDeleteProduct(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Produk?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Anda yakin ingin menghapus produk <strong>{deleteProduct?.name}</strong>?
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

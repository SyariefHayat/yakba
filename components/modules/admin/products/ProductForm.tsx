"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Save, ImageIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { IProduct } from "@/models/Product";

interface IProductForm extends Omit<Partial<IProduct>, "_id" | "createdAt" | "updatedAt"> {
    _id?: string;
    createdAt?: string;
    updatedAt?: string;
}

interface ProductFormProps {
    initialData?: IProductForm | null;
}

export function ProductForm({ initialData }: ProductFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Initialize states with initialData or defaults
    const [name, setName] = useState(initialData?.name || "");
    const [slug, setSlug] = useState(initialData?.slug || "");
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
        initialData?.images && initialData.images.length > 0 ? initialData.images[0] : null
    );

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setName(value);

        // Auto-generate slug if we are in "create" mode (no initialData) 
        // OR if the user hasn't manually edited the slug yet (simplification: just check if slug matches old generated one? or just always generate if empty?)
        // Let's stick to: if it's a new product, or if the slug field is empty.
        // Actually, existing logic in new page was: always generate on name change.
        // For edit: we might not want to change the slug automatically if the user just fixes a typo in the name to avoid breaking SEO links.
        // So, only auto-gen if !initialData or if slug is empty.
        if (!initialData || !slug) {
            const generatedSlug = value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)+/g, "");
            setSlug(generatedSlug);
        }
    };

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setThumbnailPreview(url);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        // Explicitly set the slug if it was modified in state but not input (?) - Input is controlled, so formData should pick it up.
        // However, if we need to append anything else:

        if (initialData?.images && initialData.images.length > 0 && !formData.get("image")) {
            // If we have existing images and no new image uploaded, we might need to tell the backend to keep existing.
            // Looking at route logic: "if (imageFile ...)" -> upload. "else if (existingImages) ...".
            // We should append existingImages to formData so backend knows.
            formData.append("existingImages", initialData.images.join(","));
        }

        try {
            const url = initialData?._id
                ? `/api/products/${initialData._id}`
                : "/api/products";

            const method = initialData?._id ? "PUT" : "POST";

            const res = await fetch(url, {
                method: method,
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Gagal menyimpan produk");
            }

            toast.success(initialData ? "Produk berhasil diperbarui!" : "Produk berhasil dibuat!");
            router.push("/admin/produk");
            router.refresh(); // Ensure data is refreshed
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Dasar</CardTitle>
                        <CardDescription>Detail utama produk Anda.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nama Produk <span className="text-red-500">*</span></Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Contoh: Kursus React JS Masterclass"
                                value={name}
                                onChange={handleNameChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="slug">Slug (Opsional)</Label>
                            <Input
                                id="slug"
                                name="slug"
                                placeholder="kursus-react-js-masterclass"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground">URL ramah SEO. Jika kosong, akan dibuat otomatis dari nama.</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Deskripsi</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Jelaskan detail produk..."
                                className="min-h-[120px]"
                                defaultValue={initialData?.description || ""}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Inventaris & Kategori</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="sku">SKU (Kode Unik) <span className="text-red-500">*</span></Label>
                                <Input
                                    id="sku"
                                    name="sku"
                                    placeholder="PRD-001"
                                    required
                                    defaultValue={initialData?.sku || ""}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="stock">Stok <span className="text-red-500">*</span></Label>
                                <Input
                                    id="stock"
                                    name="stock"
                                    type="number"
                                    min="0"
                                    placeholder="100"
                                    required
                                    defaultValue={initialData?.stock || 0}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Kategori</Label>
                            <Input
                                id="category"
                                name="category"
                                placeholder="Contoh: Course, Ebook"
                                defaultValue={initialData?.category || ""}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="tags">Tags</Label>
                            <Input
                                id="tags"
                                name="tags"
                                placeholder="Contoh: programming, react, javascript (pisahkan dengan koma)"
                                defaultValue={initialData?.tags?.join(", ") || ""}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Harga & Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="price">Harga (Rp) <span className="text-red-500">*</span></Label>
                            <Input
                                id="price"
                                name="price"
                                type="number"
                                min="0"
                                placeholder="150000"
                                required
                                defaultValue={initialData?.price || ""}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select name="status" defaultValue={initialData?.status || "draft"}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="archived">Archived</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Media</CardTitle>
                        <CardDescription>Gambar produk utama.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <div className="aspect-video w-full relative rounded-md border-2 border-dashed border-muted-foreground/25 flex flex-col items-center justify-center bg-muted/50 overflow-hidden hover:bg-muted/70 transition-colors">
                                {thumbnailPreview ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={thumbnailPreview}
                                        alt="Thumbnail preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center text-muted-foreground p-4 text-center">
                                        <ImageIcon className="h-10 w-10 mb-2 opacity-50" />
                                        <span className="text-xs font-medium">
                                            Klik untuk Upload Gambar
                                        </span>
                                    </div>
                                )}
                                <Input
                                    name="image"
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={handleThumbnailChange}
                                />
                            </div>
                            <p className="text-xs text-muted-foreground">Format: JPG, PNG, WEBP. Maksimal 5MB.</p>
                        </div>
                    </CardContent>
                </Card>

                <div className="ml-auto flex gap-2">
                    <Button variant="outline" disabled={loading} asChild>
                        <Link href="/admin/produk">Batal</Link>
                    </Button>
                    <Button type="submit" disabled={loading}>
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Menyimpan...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                {initialData ? "Simpan Perubahan" : "Simpan Produk"}
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </form>
    );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Plus, Save, ArrowLeft, ImageIcon } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";

export default function AddProductPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

    // State for fields that need controlled input for logic (like slug auto-gen)
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setName(value);

        // Auto-generate slug from name if slug hasn't been manually edited (or just always auto-gen if that's the desired behavior)
        // Here we auto-gen whenever name changes
        const generatedSlug = value
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");
        setSlug(generatedSlug);
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

        try {
            const res = await fetch("/api/products", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Gagal membuat produk");
            }

            toast.success("Produk berhasil dibuat!");
            router.push("/admin/produk");
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold tracking-tight">Tambah Produk Baru</h1>
                <p className="text-muted-foreground">Isi detail di bawah ini untuk menambahkan produk digital baru.</p>
            </div>
            <Separator />

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
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category">Kategori</Label>
                                <Input
                                    id="category"
                                    name="category"
                                    placeholder="Contoh: Course, Ebook"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="tags">Tags</Label>
                                <Input
                                    id="tags"
                                    name="tags"
                                    placeholder="Contoh: programming, react, javascript (pisahkan dengan koma)"
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
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select name="status" defaultValue="draft">
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
                                    Simpan Produk
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

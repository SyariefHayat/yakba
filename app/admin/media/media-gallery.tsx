"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Copy, Trash2, Loader2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { deleteImage, getImages } from "./actions";

interface CloudinaryImage {
    public_id: string;
    secure_url: string;
    format: string;
    width: number;
    height: number;
    created_at: string;
}

interface MediaGalleryProps {
    initialImages: CloudinaryImage[];
    initialNextCursor?: string;
}

export function MediaGallery({ initialImages, initialNextCursor }: MediaGalleryProps) {
    const [images, setImages] = useState<CloudinaryImage[]>(initialImages);
    const [nextCursor, setNextCursor] = useState<string | undefined>(initialNextCursor);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    const loadMore = async () => {
        if (!nextCursor) return;
        setIsLoading(true);
        const res = await getImages(nextCursor);
        if (res.success) {
            setImages((prev) => [...prev, ...res.resources]);
            setNextCursor(res.next_cursor);
        } else {
            toast.error("Gagal memuat lebih banyak gambar");
        }
        setIsLoading(false);
    };

    const handleCopyUrl = (url: string) => {
        navigator.clipboard.writeText(url);
        toast.success("URL berhasil disalin");
    };

    const handleDelete = async (publicId: string) => {
        if (!confirm("Apakah Anda yakin ingin menghapus gambar ini?")) return;

        setIsDeleting(publicId);
        const res = await deleteImage(publicId);

        if (res.success) {
            setImages((prev) => prev.filter((img) => img.public_id !== publicId));
            toast.success("Gambar berhasil dihapus");
        } else {
            toast.error("Gagal menghapus gambar");
        }
        setIsDeleting(null);
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {images.map((image) => (
                    <Card key={image.public_id} className="overflow-hidden group">
                        <div className="relative aspect-square bg-muted">
                            <Image
                                src={image.secure_url}
                                alt={image.public_id}
                                fill
                                className="object-cover transition-transform group-hover:scale-105"
                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <Button
                                    size="icon"
                                    variant="secondary"
                                    onClick={() => window.open(image.secure_url, "_blank")}
                                    title="Lihat Gambar"
                                >
                                    <ExternalLink className="h-4 w-4" />
                                </Button>
                                <Button
                                    size="icon"
                                    variant="secondary"
                                    onClick={() => handleCopyUrl(image.secure_url)}
                                    title="Salin URL"
                                >
                                    <Copy className="h-4 w-4" />
                                </Button>
                                <Button
                                    size="icon"
                                    variant="destructive"
                                    onClick={() => handleDelete(image.public_id)}
                                    disabled={isDeleting === image.public_id}
                                    title="Hapus"
                                >
                                    {isDeleting === image.public_id ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Trash2 className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </div>
                        <CardContent className="p-3">
                            <p className="text-xs text-muted-foreground truncate" title={image.public_id}>
                                {image.public_id}
                            </p>
                            <p className="text-[10px] text-muted-foreground mt-1">
                                {image.width}x{image.height} • {image.format.toUpperCase()}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {nextCursor && (
                <div className="flex justify-center pt-4">
                    <Button onClick={loadMore} disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Muat Lebih Banyak
                    </Button>
                </div>
            )}

            {images.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    Tidak ada media ditemukan.
                </div>
            )}
        </div>
    );
}

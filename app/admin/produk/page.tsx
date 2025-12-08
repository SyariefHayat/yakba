import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function ProductListPage() {
    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Daftar Produk</h1>
                <Button asChild>
                    <Link href="/admin/produk/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Tambah Produk
                    </Link>
                </Button>
            </div>
            <div className="border rounded-lg p-8 text-center text-muted-foreground">
                <p>Belum ada produk yang ditampilkan (Placeholder).</p>
                <p>Silakan tambah produk baru.</p>
            </div>
        </div>
    );
}

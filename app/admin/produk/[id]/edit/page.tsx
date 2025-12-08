
import { Separator } from "@/components/ui/separator";
import { ProductForm } from "@/components/modules/admin/products/ProductForm";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { redirect } from "next/navigation";
import { Types } from "mongoose";

interface EditProductPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
    await connectDB();

    const { id } = await params;

    // Validate ID format first to prevent database errors
    if (!Types.ObjectId.isValid(id)) {
        redirect("/admin/produk");
    }

    const product = await Product.findById(id).lean();

    if (!product) {
        redirect("/admin/produk");
    }

    // Serialize product data for client component
    // Convert _id and Dates to strings
    const serializedProduct = {
        ...product,
        _id: product._id.toString(),
        createdAt: product.createdAt?.toISOString(),
        updatedAt: product.updatedAt?.toISOString(),
        // Handle potentially null/undefined arrays if database has incomplete data
        images: product.images || [],
        tags: product.tags || [],
    };

    return (
        <div className="flex flex-col gap-6 p-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Edit Produk</h1>
                <p className="text-muted-foreground">
                    Perbarui informasi produk yang sudah ada.
                </p>
            </div>
            <Separator />
            <ProductForm
                initialData={serializedProduct}
            />
        </div>
    );
}


import { NextResponse } from "next/server";
import { Buffer } from "buffer";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import cloudinary from "@/lib/cloudinary";
import { UploadApiResponse } from "cloudinary";

// Helper function to create slug
function createSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
}

interface RouteParams {
    params: Promise<{ id: string }>;
}


export async function GET(req: Request, { params }: RouteParams) {
    try {
        await connectDB();
        const { id } = await params;

        const product = await Product.findById(id);

        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        console.error("Error fetching product:", error);
        return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: RouteParams) {
    let imageUrl = "";
    let publicId = "";

    try {
        await connectDB();
        const { id } = await params;

        const product = await Product.findById(id);

        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        const formData = await req.formData();

        const name = formData.get("name") as string;
        let slug = formData.get("slug") as string;
        const description = formData.get("description") as string;
        const price = formData.get("price") as string;
        const stock = formData.get("stock") as string;
        const sku = formData.get("sku") as string;
        const category = formData.get("category") as string;
        const status = formData.get("status") as string;
        const tags = formData.get("tags") as string;
        const imageFile = formData.get("image") as File | null;
        const existingImages = formData.get("existingImages") as string; // Comma separated

        // Auto-generate slug if not provided, or update if name changed and slug wasn't manually set?
        // Simpler: if slug is provided, use it. If not and name changed, generate.
        // For Update, we rely on client sending the slug. if empty, regenerate from name.
        if ((!slug || slug.trim() === "") && name) {
            slug = createSlug(name);
        }

        // Check unique slug if changed
        if (slug !== product.slug) {
            const existingSlug = await Product.findOne({ slug });
            if (existingSlug) {
                return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
            }
        }

        // Check unique SKU if changed
        if (sku !== product.sku) {
            const existingSku = await Product.findOne({ sku });
            if (existingSku) {
                return NextResponse.json({ error: "SKU already exists" }, { status: 400 });
            }
        }

        let finalImages = product.images;

        // Handle Image Upload
        if (imageFile && imageFile.size > 0) {
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const uploadResult: UploadApiResponse = await new Promise(
                (resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        {
                            folder: "yakba/products",
                            resource_type: "image",
                        },
                        (err, result) => {
                            if (err || !result) return reject(err);
                            resolve(result);
                        }
                    );
                    uploadStream.end(buffer);
                }
            );

            imageUrl = uploadResult.secure_url;
            publicId = uploadResult.public_id;

            // Replace images (assuming single image editing logic for now based on UI)
            finalImages = [imageUrl];
        } else if (existingImages) {
            // If strictly using existing images passed back
            // finalImages = existingImages.split(",");
            // For now keep existing logic: if no new file, keep existing.
        }

        product.name = name;
        product.slug = slug;
        product.description = description;
        product.price = Number(price);
        product.stock = Number(stock);
        product.sku = sku;
        product.category = category;
        product.status = (status as "active" | "draft" | "archived") || "draft";
        product.images = finalImages;
        product.tags = tags ? tags.split(",").map(t => t.trim()) : [];

        const updatedProduct = await product.save();

        return NextResponse.json(updatedProduct, { status: 200 });

    } catch (error: any) {
        console.error("Error updating product:", error);
        // Rollback image if DB save fails
        if (publicId) {
            try {
                await cloudinary.uploader.destroy(publicId);
            } catch (e) {
                console.error("Failed to delete image after error", e);
            }
        }
        return NextResponse.json({ error: error.message || "Failed to update product" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: RouteParams) {
    try {
        await connectDB();
        const { id } = await params;

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting product:", error);
        return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
    }
}

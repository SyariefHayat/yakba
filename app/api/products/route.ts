
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

export async function POST(req: Request) {
    let imageUrl = "";
    let publicId = "";

    try {
        await connectDB();

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

        // Auto-generate slug if not provided
        if ((!slug || slug.trim() === "") && name) {
            slug = createSlug(name);
        }

        // Check if slug exists
        const existingProduct = await Product.findOne({ slug });
        if (existingProduct) {
            return NextResponse.json(
                { error: "Product with this slug already exists" },
                { status: 400 }
            );
        }

        // Check if SKU exists
        const existingSku = await Product.findOne({ sku });
        if (existingSku) {
            return NextResponse.json(
                { error: "Product with this SKU already exists" },
                { status: 400 }
            );
        }

        // Handle Image Upload
        // Check if imageFile exists AND has content (size > 0)
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
        }

        const newProduct = new Product({
            name,
            slug,
            description,
            price: Number(price),
            stock: Number(stock),
            sku,
            category,
            status: status || "draft",
            images: imageUrl ? [imageUrl] : [],
            tags: tags ? tags.split(",").map(t => t.trim()) : [],
        });

        const savedProduct = await newProduct.save();

        return NextResponse.json(savedProduct, { status: 201 });
    } catch (error: any) {
        console.error("Error creating product:", error);

        // Rollback image if DB save fails
        if (publicId) {
            try {
                await cloudinary.uploader.destroy(publicId);
            } catch (e) {
                console.error("Failed to delete image after error", e);
            }
        }

        return NextResponse.json(
            { error: error.message || "Failed to create product" },
            { status: 500 }
        );
    }
}

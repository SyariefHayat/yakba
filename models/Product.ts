import mongoose, { Schema, Model, Types } from "mongoose";

export interface IProduct {
    _id?: Types.ObjectId;
    name: string;
    slug: string;
    description?: string;
    price: number;
    compareAtPrice?: number; // Harga coret / diskon
    costPerItem?: number; // HPP (opsional, untuk internal)
    stock: number; // Bisa diset unlimited atau sesuai lisensi
    sku: string; // Stock Keeping Unit
    images: string[];
    category?: string; // Bisa ubah ke ObjectId jika ada collection Category
    tags?: string[];
    status: "active" | "draft" | "archived";

    // Digital Product Fields
    fileUrl?: string; // Link download atau akses konten
    fileType?: string; // misal: "pdf", "video", "zip"
    fileSize?: number; // dalam bytes
    deliveryMethod?: "automatic" | "manual"; // Otomatis kirim email/link atau perlu proses manual

    attributes?: {
        name: string; // misal: "License", "Format"
        value: string; // misal: "Commercial", "MP4"
    }[];
    createdAt?: Date;
    updatedAt?: Date;
}

const ProductSchema = new Schema<IProduct>(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        description: { type: String },
        price: { type: Number, required: true },
        compareAtPrice: { type: Number },
        costPerItem: { type: Number },
        stock: { type: Number, required: true, default: 0 },
        sku: { type: String, required: true, unique: true },
        images: { type: [String], default: [] },
        category: { type: String },
        tags: { type: [String], default: [] },
        status: {
            type: String,
            enum: ["active", "draft", "archived"],
            default: "draft",
        },
        fileUrl: { type: String },
        fileType: { type: String },
        fileSize: { type: Number },
        deliveryMethod: {
            type: String,
            enum: ["automatic", "manual"],
            default: "automatic",
        },
        attributes: [
            {
                name: { type: String, required: true },
                value: { type: String, required: true },
            },
        ],
    },
    { timestamps: true }
);

export const ProductValidationSchema = {
    $jsonSchema: {
        bsonType: "object",
        required: ["name", "slug", "price", "sku", "status"],
        properties: {
            _id: {
                bsonType: "objectId",
            },
            name: {
                bsonType: "string",
                description: "Nama produk harus berupa string dan wajib diisi",
            },
            slug: {
                bsonType: "string",
                description: "Slug URL unik untuk produk",
            },
            description: {
                bsonType: ["string", "null"],
                description: "Deskripsi produk (opsional)",
            },
            price: {
                bsonType: ["double", "int", "long"],
                minimum: 0,
                description: "Harga jual produk, wajib diisi",
            },
            compareAtPrice: {
                bsonType: ["double", "int", "long", "null"],
                minimum: 0,
                description: "Harga sebelum diskon (opsional)",
            },
            costPerItem: {
                bsonType: ["double", "int", "long", "null"],
                minimum: 0,
                description: "Harga modal per item (opsional)",
            },
            stock: {
                bsonType: "int",
                minimum: 0,
                description: "Jumlah stok / lisensi tersedia (bisa unlimited)",
            },
            sku: {
                bsonType: "string",
                description: "Kode unik inventaris (SKU)",
            },
            images: {
                bsonType: "array",
                items: {
                    bsonType: "string",
                },
                description: "Array URL gambar/thumbnail produk",
            },
            category: {
                bsonType: ["string", "null"],
                description: "Kategori produk",
            },
            tags: {
                bsonType: "array",
                items: {
                    bsonType: "string",
                },
            },
            status: {
                enum: ["active", "draft", "archived"],
                description: "Status produk: active, draft, atau archived",
            },
            fileUrl: {
                bsonType: ["string", "null"],
                description: "URL file produk digital",
            },
            fileType: {
                bsonType: ["string", "null"],
                description: "Tipe file (pdf, mp4, dll)",
            },
            fileSize: {
                bsonType: ["double", "int", "long", "null"],
                description: "Ukuran file dalam bytes",
            },
            deliveryMethod: {
                enum: ["automatic", "manual"],
                description: "Metode pengiriman produk",
            },
            attributes: {
                bsonType: "array",
                items: {
                    bsonType: "object",
                    required: ["name", "value"],
                    properties: {
                        name: { bsonType: "string" },
                        value: { bsonType: "string" },
                    },
                },
            },
            createdAt: {
                bsonType: "date",
            },
            updatedAt: {
                bsonType: "date",
            },
        },
    },
};

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;

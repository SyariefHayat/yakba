import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

// POST /api/upload — upload image to Cloudinary
export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json(
                { error: "File tidak ditemukan." },
                { status: 400 }
            );
        }

        const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: "Format file tidak didukung. Gunakan JPG, PNG, WebP, atau GIF." },
                { status: 400 }
            );
        }

        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: "Ukuran file maksimal 5MB." },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const result = await new Promise<{ secure_url: string; public_id: string }>(
            (resolve, reject) => {
                cloudinary.uploader
                    .upload_stream(
                        {
                            folder: "yakba/products",
                            resource_type: "image",
                            transformation: [
                                { width: 1200, height: 1200, crop: "limit" },
                                { quality: "auto", fetch_format: "auto" },
                            ],
                        },
                        (error, result) => {
                            if (error || !result) reject(error);
                            else resolve({ secure_url: result.secure_url, public_id: result.public_id });
                        }
                    )
                    .end(buffer);
            }
        );

        return NextResponse.json({
            url: result.secure_url,
            publicId: result.public_id,
        });
    } catch (error) {
        console.error("[POST /api/upload]", error);
        return NextResponse.json(
            { error: "Gagal mengupload gambar." },
            { status: 500 }
        );
    }
}

// DELETE /api/upload — delete image from Cloudinary
export async function DELETE(req: NextRequest) {
    try {
        const body = await req.json();
        const { publicId } = body;

        if (!publicId) {
            return NextResponse.json(
                { error: "publicId wajib diisi." },
                { status: 400 }
            );
        }

        await cloudinary.uploader.destroy(publicId);

        return NextResponse.json({ message: "Gambar berhasil dihapus." });
    } catch (error) {
        console.error("[DELETE /api/upload]", error);
        return NextResponse.json(
            { error: "Gagal menghapus gambar." },
            { status: 500 }
        );
    }
}

import { NextResponse } from "next/server";
import { UploadApiResponse } from "cloudinary";
import { Buffer } from "buffer";
import connectDB from "@/lib/mongodb";
import EventPromotion from "@/models/EventPromotion";
import cloudinary from "@/lib/cloudinary";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;
        const event = await EventPromotion.findById(id);

        if (!event) {
            return NextResponse.json(
                { message: "Event/Promosi tidak ditemukan" },
                { status: 404 }
            );
        }

        return NextResponse.json(event, { status: 200 });
    } catch (error) {
        console.error("Error fetching event:", error);
        return NextResponse.json(
            { message: "Terjadi kesalahan saat mengambil data" },
            { status: 500 }
        );
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    let imageUrl = "";

    try {
        await connectDB();
        const { id } = await params;

        const formData = await req.formData();
        const title = formData.get("title") as string;
        const slug = formData.get("slug") as string;
        const type = formData.get("type") as string;
        const description = formData.get("description") as string;
        const startDate = formData.get("startDate") as string;
        const endDate = formData.get("endDate") as string;
        const location = formData.get("location") as string;
        const link = formData.get("link") as string;
        const price = formData.get("price") as string;
        const isActive = formData.get("isActive") === "true";
        const isFeatured = formData.get("isFeatured") === "true";
        const imageFile = formData.get("imageUrl") as File | null;

        const existingEvent = await EventPromotion.findById(id);
        if (!existingEvent) {
            return NextResponse.json(
                { message: "Event/Promosi tidak ditemukan" },
                { status: 404 }
            );
        }

        // Keep existing image if no new one is uploaded
        imageUrl = existingEvent.imageUrl || "";

        if (imageFile && imageFile.size > 0) {
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const uploadResult: UploadApiResponse = await new Promise(
                (resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        {
                            folder: "yakba/events",
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
        }

        const updatedEvent = await EventPromotion.findByIdAndUpdate(
            id,
            {
                title,
                slug,
                type,
                description,
                startDate: startDate ? new Date(startDate) : undefined,
                endDate: endDate ? new Date(endDate) : undefined,
                location,
                link,
                price: price ? parseFloat(price) : 0,
                isActive,
                isFeatured,
                imageUrl,
            },
            { new: true }
        );

        return NextResponse.json(updatedEvent, { status: 200 });
    } catch (error) {
        console.error("Error updating event:", error);
        return NextResponse.json(
            { message: "Terjadi kesalahan saat memperbarui data" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;
        const deletedEvent = await EventPromotion.findByIdAndDelete(id);

        if (!deletedEvent) {
            return NextResponse.json(
                { message: "Event/Promosi tidak ditemukan" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Event/Promosi berhasil dihapus" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting event:", error);
        return NextResponse.json(
            { message: "Terjadi kesalahan saat menghapus data" },
            { status: 500 }
        );
    }
}

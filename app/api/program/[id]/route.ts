import { NextResponse } from "next/server";
import { UploadApiResponse } from "cloudinary";
import { Buffer } from "buffer";
import connectDB from "@/lib/mongodb";
import Program from "@/models/Program";
import cloudinary, { extractPublicIdFromUrl } from "@/lib/cloudinary";

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    let bannerUrl = "";
    let newPublicId = "";

    try {
        await connectDB();
        const { id } = params;

        const formData = await req.formData();

        const name = formData.get("name") as string;
        const slug = formData.get("slug") as string;
        const type = formData.get("type") as string;
        const level = formData.get("level") as string;
        const ageMin = formData.get("ageMin") as string;
        const ageMax = formData.get("ageMax") as string;
        const description = formData.get("description") as string;
        const price = formData.get("price") as string;
        const discountPrice = formData.get("discountPrice") as string;
        const billingPeriod = formData.get("billingPeriod") as string;
        const isActive = formData.get("isActive") === "true";
        const thumbnailUrl = formData.get("thumbnailUrl") as File | null;
        const createdBy = formData.get("createdBy") as string;

        // Validation
        if (!name || !slug || !type || !description || !createdBy) {
            return NextResponse.json(
                { message: "Name, Slug, Type, Description, dan CreatedBy wajib diisi" },
                { status: 400 }
            );
        }

        const existingProgram = await Program.findById(id);
        if (!existingProgram) {
            return NextResponse.json(
                { message: "Program tidak ditemukan" },
                { status: 404 }
            );
        }

        // Initialize with existing URL, defaulting to empty string if undefined
        bannerUrl = existingProgram.thumbnailUrl || "";

        if (thumbnailUrl && thumbnailUrl instanceof File) {
            const arrayBuffer = await thumbnailUrl.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const uploadResult: UploadApiResponse = await new Promise(
                (resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        {
                            folder: "yakba/programs",
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

            bannerUrl = uploadResult.secure_url;
            newPublicId = uploadResult.public_id;
        }

        const updatedProgram = await Program.findByIdAndUpdate(
            id,
            {
                name,
                slug,
                type,
                level,
                ageMin: ageMin ? parseInt(ageMin, 10) : undefined,
                ageMax: ageMax ? parseInt(ageMax, 10) : undefined,
                description,
                price: price ? parseFloat(price) : undefined,
                discountPrice: discountPrice ? parseFloat(discountPrice) : undefined,
                billingPeriod,
                isActive,
                thumbnailUrl: bannerUrl,
                createdBy,
            },
            { new: true }
        );

        // Clean up old image if a new one was uploaded and update was successful
        if (newPublicId && existingProgram.thumbnailUrl) {
            const oldPublicId = extractPublicIdFromUrl(existingProgram.thumbnailUrl);
            if (oldPublicId) {
                try {
                    await cloudinary.uploader.destroy(oldPublicId);
                    console.log(`Deleted old image: ${oldPublicId}`);
                } catch (error) {
                    console.error(`Failed to delete old image ${oldPublicId}:`, error);
                }
            }
        }

        return NextResponse.json(updatedProgram, { status: 200 });
    } catch (error) {
        console.error("Error updating program:", error);

        // Rollback: Delete new image if uploaded but DB update failed
        if (newPublicId) {
            try {
                await cloudinary.uploader.destroy(newPublicId);
                console.log(`Rollback: Deleted new image ${newPublicId} due to update failure.`);
            } catch (deleteError) {
                console.error(`Rollback failed for new image ${newPublicId}:`, deleteError);
            }
        }

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

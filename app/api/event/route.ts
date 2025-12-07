import { NextResponse } from "next/server";
import { UploadApiResponse } from "cloudinary";
import { Buffer } from "buffer";
import connectDB from "@/lib/mongodb";
import EventPromotion from "@/models/EventPromotion";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  let imageUrl = "";
  let publicId = "";

  try {
    await connectDB();

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

    // Validate required fields
    if (!title || !slug || !description) {
      return NextResponse.json(
        { message: "Title, Slug, and Description are required" },
        { status: 400 }
      );
    }

    // Upload image if present
    if (imageFile) {
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
      publicId = uploadResult.public_id;
    }

    // Create database entry
    const eventPromotion = await EventPromotion.create({
      title,
      slug,
      type: type || "event",
      description,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      location,
      link,
      price: price ? parseFloat(price) : 0,
      isActive,
      isFeatured,
      imageUrl: imageUrl,
    });

    return NextResponse.json(eventPromotion, { status: 201 });
  } catch (error) {
    console.error("Error during event/promotion creation:", error);

    // Rollback: Delete image from Cloudinary if it was uploaded but database creation failed
    if (publicId) {
      try {
        await cloudinary.uploader.destroy(publicId);
        console.log(`Rollback: Deleted image ${publicId} from Cloudinary due to creation failure.`);
      } catch (deleteError) {
        console.error(`Rollback failed: Could not delete image ${publicId} from Cloudinary.`, deleteError);
      }
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

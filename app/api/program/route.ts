import { NextResponse } from "next/server";
import { UploadApiResponse } from "cloudinary";

import { Buffer } from "buffer";
import connectDB from "@/lib/mongodb";
import Program from "@/models/Program";
import cloudinary from "@/lib/cloudinary";

export async function GET() {
  try {
    await connectDB();

    const programs = await Program.find().sort({ createdAt: -1 });
    return NextResponse.json(programs, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Gagal mengambil daftar program" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

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

    if (!name || !slug || !type || !description || !createdBy) {
      return NextResponse.json(
        { message: "Name, Slug, Type, Description, dan CreatedBy wajib diisi" },
        { status: 400 }
      );
    }

    let bannerUrl = "";

    if (thumbnailUrl) {
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
    }

    const program = await Program.create({
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
    });

    return NextResponse.json(program, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

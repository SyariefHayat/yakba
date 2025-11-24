import { NextResponse } from "next/server";

import { Buffer } from "buffer";
import cloudinary from "@/lib/cloudinary";
import type { UploadApiResponse } from "cloudinary";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { message: "No file provided" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult: UploadApiResponse = await new Promise(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "yakba/article",
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

    return NextResponse.json(
      {
        secureUrl: uploadResult.secure_url,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return NextResponse.json(
      { message: "Failed to upload image" },
      { status: 500 }
    );
  }
}

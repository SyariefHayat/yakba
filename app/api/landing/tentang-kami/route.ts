import { NextResponse } from "next/server";

import { Buffer } from "buffer";
import type { UploadApiResponse } from "cloudinary";

import connectDB from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";
import AboutPage from "@/models/AboutPage";

export async function GET() {
  try {
    await connectDB();

    let about = await AboutPage.findOne();

    if (!about) {
      about = await AboutPage.create({
        title: "Selamat Datang di Yakba Learning Center",
        shortDescription:
          "Yakba Learning Center adalah tempat belajar ceria untuk anak usia dini dengan pendekatan Islami dan menyenangkan.",
        content:
          "Silakan edit konten ini dari dashboard untuk menyesuaikan informasi lembaga Anda.",
        bannerUrl: "",
        visi: [],
        misi: [],
      });
    }

    return NextResponse.json(about, { status: 200 });
  } catch (error) {
    console.error("[TENTANG-KAMI][GET] Error:", error);
    return NextResponse.json(
      { message: "Gagal mengambil data Tentang Kami" },
      { status: 500 }
    );
  }
}

function extractPublicId(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/");

    const uploadIndex = pathParts.findIndex((part) => part === "upload");
    if (uploadIndex === -1) return null;

    const publicIdParts = pathParts.slice(uploadIndex + 2);
    const publicIdWithExt = publicIdParts.join("/");

    const dotIndex = publicIdWithExt.lastIndexOf(".");
    if (dotIndex === -1) return publicIdWithExt;

    return publicIdWithExt.slice(0, dotIndex);
  } catch {
    return null;
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const shortDescription = formData.get("shortDescription") as string;
    const content = formData.get("content") as string;

    const file = formData.get("file") as File | null;

    const visiArray = formData.getAll("visi[]").map((v) => String(v));
    const misiArray = formData.getAll("misi[]").map((v) => String(v));

    if (!title || !shortDescription || !content) {
      return NextResponse.json(
        { message: "Title, deskripsi singkat, dan konten wajib diisi" },
        { status: 400 }
      );
    }

    let about = await AboutPage.findOne();
    let bannerUrl = about?.bannerUrl || "";

    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      if (about?.bannerUrl) {
        const publicId = extractPublicId(about.bannerUrl);
        if (publicId) {
          await cloudinary.uploader.destroy(publicId);
        }
      }

      const uploadResult: UploadApiResponse = await new Promise(
        (resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: "yakba/tentang-kami",
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

    if (!about) {
      about = await AboutPage.create({
        title,
        shortDescription,
        content,
        bannerUrl,
        visi: visiArray,
        misi: misiArray,
      });
    } else {
      about.title = title;
      about.shortDescription = shortDescription;
      about.content = content;
      if (bannerUrl) about.bannerUrl = bannerUrl;
      about.visi = visiArray;
      about.misi = misiArray;
      await about.save();
    }

    return NextResponse.json(
      {
        message: "Data Tentang Kami berhasil disimpan",
        data: about,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[TENTANG-KAMI][PUT] Error:", error);
    return NextResponse.json(
      { message: "Gagal menyimpan data Tentang Kami" },
      { status: 500 }
    );
  }
}

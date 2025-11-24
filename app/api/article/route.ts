import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Article from "@/models/Article";

export async function GET() {
  try {
    await connectDB();

    const articles = await Article.find().sort({ createdAt: -1 });
    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Gagal mengambil daftar artikel" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const data = await req.json();
    const { title, slug, excerpt, contentHtml, thumbnailUrl, tags, author } =
      data;

    if (!title || !slug || !contentHtml) {
      return NextResponse.json(
        { message: "Judul, Slug, dan Konten Wajib Diisi" },
        { status: 400 }
      );
    }

    const article = await Article.create({
      title,
      slug,
      excerpt,
      contentHtml,
      thumbnailUrl: thumbnailUrl || "",
      tags: Array.isArray(tags) ? tags : [],
      author,
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Gagal membuat artikel" },
      { status: 500 }
    );
  }
}

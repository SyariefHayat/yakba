import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Article from "@/models/Article";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const article = await Article.findById(id);

    if (!article) {
      return NextResponse.json(
        { message: "Artikel tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Gagal mengambil artikel" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const data = await req.json();
    const updatedArticle = await Article.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedArticle) {
      return NextResponse.json(
        { message: "Artikel tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedArticle, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Gagal memperbarui artikel" },
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

    const deletedArticle = await Article.findByIdAndDelete(id);
    if (!deletedArticle) {
      return NextResponse.json(
        { message: "Artikel tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Artikel berhasil dihapus" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Gagal menghapus artikel" },
      { status: 500 }
    );
  }
}

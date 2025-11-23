import { NextResponse } from "next/server";

import Mitra from "@/models/Mitra";
import connectDB from "@/lib/mongodb";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function PUT(req: Request, context: RouteContext) {
  try {
    await connectDB();

    const { id } = await context.params;

    const body = await req.json();
    const { name, city, phone, address, email, isActive } = body;

    if (!name || !city || !phone || !address) {
      return NextResponse.json(
        {
          success: false,
          message: "Nama, kota, telepon, dan alamat wajib diisi.",
        },
        { status: 400 }
      );
    }

    const mitra = await Mitra.findByIdAndUpdate(
      id,
      {
        name,
        city,
        phone,
        address,
        email,
        isActive,
      },
      { new: true }
    );

    if (!mitra) {
      return NextResponse.json(
        { success: false, message: "Mitra tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: mitra }, { status: 200 });
  } catch (error) {
    console.error("PUT /api/landing/mitra/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengupdate mitra" },
      { status: 500 }
    );
  }
}

export async function DELETE(_req: Request, context: RouteContext) {
  try {
    await connectDB();

    const { id } = await context.params;

    const mitra = await Mitra.findByIdAndDelete(id);

    if (!mitra) {
      return NextResponse.json(
        { success: false, message: "Mitra tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Mitra berhasil dihapus" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/landing/mitra/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menghapus mitra" },
      { status: 500 }
    );
  }
}

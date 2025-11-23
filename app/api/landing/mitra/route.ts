import Mitra from "@/models/Mitra";
import connectDB from "@/lib/mongodb";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const mitras = await Mitra.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: mitras }, { status: 200 });
  } catch (error) {
    console.error("GET /api/mitra error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data mitra" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
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

    const mitra = await Mitra.create({
      name,
      city,
      phone,
      address,
      email,
      isActive: typeof isActive === "boolean" ? isActive : true,
    });

    return NextResponse.json({ success: true, data: mitra }, { status: 201 });
  } catch (error) {
    console.error("POST /api/mitra error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menambahkan mitra" },
      { status: 500 }
    );
  }
}

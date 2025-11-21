import { NextResponse } from "next/server";

import User from "@/models/User";
import connectDB from "@/lib/mongodb";
import VerificationToken from "@/models/VerificationToken";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { message: "Email dan OTP wajib diisi" },
        { status: 400 }
      );
    }

    const tokenDoc = await VerificationToken.findOne({
      identifier: email,
      token: otp,
    });

    if (!tokenDoc) {
      return NextResponse.json({ message: "OTP salah" }, { status: 400 });
    }

    if (tokenDoc.expires < new Date()) {
      await VerificationToken.deleteOne({ _id: tokenDoc._id });

      return NextResponse.json({ message: "OTP kadaluarsa" }, { status: 400 });
    }

    await User.findOneAndUpdate({ email }, { emailVerified: new Date() });

    await VerificationToken.deleteOne({ _id: tokenDoc._id });

    return NextResponse.json(
      { message: "Email berhasil diverifikasi" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Verify OTP error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

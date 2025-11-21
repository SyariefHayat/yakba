import bcrypt from "bcryptjs";
import { Resend } from "resend";
import { NextResponse } from "next/server";

import User from "@/models/User";
import connectDB from "@/lib/mongodb";
import VerificationToken from "@/models/VerificationToken";

const resend = new Resend(process.env.RESEND_API_KEY);

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const { name, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email dan password wajib diisi" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email sudah terdaftar" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      emailVerified: null,
    });

    const otp = generateOtp();
    const expires = new Date(Date.now() + 10 * 60 * 1000);

    await VerificationToken.deleteMany({ identifier: email });

    await VerificationToken.create({
      identifier: email,
      token: otp,
      expires: expires,
    });

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Kode OTP Verifikasi",
      html: `
        <h1>${otp}</h1>
        <p>Kode OTP berlaku selama 10 menit.</p>
      `,
    });

    return NextResponse.json(
      {
        message: "User dibuat, OTP telah dikirim ke email",
        devOtp: otp,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

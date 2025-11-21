import { Resend } from "resend";
import { NextResponse } from "next/server";

import User from "@/models/User";
import connectDB from "@/lib/mongodb";
import VerificationToken from "@/models/VerificationToken";

const resend = new Resend(process.env.RESEND_API_KEY);

const OTP_EXPIRES_IN = 10 * 60 * 1000;
const RESEND_COOLDOWN_MS = 60 * 1000;
const MAX_RESEND_PER_HOUR = 5;

function generateOtp(length = 6) {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return String(Math.floor(Math.random() * (max - min + 1)) + min);
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email wajib diisi" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    if (user.emailVerified) {
      return NextResponse.json(
        { message: "Email sudah terverifikasi" },
        { status: 400 }
      );
    }

    const now = new Date();
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    // Ambil semua token dalam 1 jam terakhir (untuk limit per jam)
    const recentTokens = await VerificationToken.find({
      identifier: email,
      createdAt: { $gt: oneHourAgo },
    }).sort({ createdAt: -1 });

    // 1) Limit jumlah resend per jam
    if (recentTokens.length >= MAX_RESEND_PER_HOUR) {
      return NextResponse.json(
        {
          message: `Terlalu banyak permintaan OTP. Coba lagi setelah 1 jam.`,
        },
        { status: 429 } // Too Many Requests
      );
    }

    // 2) Cooldown: cek token terakhir, jangan boleh spam < 60 detik
    const lastToken = recentTokens[0];
    if (lastToken && lastToken.createdAt) {
      const diffMs = now.getTime() - lastToken.createdAt.getTime();
      if (diffMs < RESEND_COOLDOWN_MS) {
        const waitSec = Math.ceil((RESEND_COOLDOWN_MS - diffMs) / 1000);
        return NextResponse.json(
          {
            message: `Terlalu sering mengirim OTP. Tunggu ${waitSec} detik sebelum kirim ulang.`,
          },
          { status: 429 }
        );
      }
    }

    // Kalau lolos rate limiting → generate OTP baru
    const otp = generateOtp();
    const expires = new Date(Date.now() + OTP_EXPIRES_IN);

    // Hapus token lama biar nggak numpuk (opsional, bisa juga dibiarkan karena ada TTL)
    await VerificationToken.deleteMany({ identifier: email });

    await VerificationToken.create({
      identifier: email,
      token: otp,
      expires,
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
        message: "OTP baru telah dikirim ke email",
        devOtp: otp, // HANYA untuk development
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Resend OTP error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

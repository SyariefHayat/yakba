"use client";

import * as React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { useAuthStore } from "@/store/auth-store";
import { Card, CardContent } from "@/components/ui/card";

function formatTimeLeft(seconds: number | null) {
  if (seconds === null) return "";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function VerifyOtpPage() {
  const router = useRouter();

  const signupEmail = useAuthStore((state) => state.signupEmail);

  const [otp, setOtp] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [resendLoading, setResendLoading] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState<number | null>(600);

  const isExpired = timeLeft !== null && timeLeft <= 0;

  React.useEffect(() => {
    if (!signupEmail) {
      toast.error("Email tidak ditemukan. Silakan ulangi proses signup.");
      router.push("/signup");
    }
  }, [signupEmail, router]);

  React.useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null) return prev;
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  async function handleOtpSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!signupEmail) return;

    if (otp.length !== 6) {
      toast.error("Masukkan 6 digit OTP.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: signupEmail, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Verifikasi OTP gagal.");
        console.error("OTP verification failed:", data);
        return;
      }

      toast.success("Email berhasil diverifikasi. Akun kamu sudah aktif 🎉");
      router.push("/signin");
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan, coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResendOtp() {
    if (!signupEmail) return;

    setResendLoading(true);

    try {
      const res = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: signupEmail }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Gagal mengirim ulang OTP.");
        return;
      }

      setOtp("");
      setTimeLeft(600);

      toast.success("OTP baru telah dikirim ke email kamu.");
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan, coba lagi.");
    } finally {
      setResendLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <Toaster />
      <Card className="w-full max-w-md">
        <CardContent className="p-6 md:p-8">
          <form onSubmit={handleOtpSubmit}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center mb-4">
                <h1 className="text-2xl font-bold">Verify your email</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  We&apos;ve sent a 6-digit code to{" "}
                  <b>{signupEmail || "your email"}</b>. <br />
                  Enter it below to activate your account.
                </p>

                <div className="mt-2 text-xs text-muted-foreground">
                  {timeLeft !== null && !isExpired && (
                    <span>
                      Kode OTP akan kedaluwarsa dalam{" "}
                      <span className="font-semibold">
                        {formatTimeLeft(timeLeft)}
                      </span>
                    </span>
                  )}
                  {isExpired && (
                    <span className="text-red-500 font-medium">
                      OTP sudah kadaluarsa. Kirim ulang kode untuk mendapatkan
                      OTP baru.
                    </span>
                  )}
                </div>
              </div>

              <Field className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value.replace(/[^0-9]/g, ""))}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="w-14 h-14" />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={1} className="w-14 h-14" />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={2} className="w-14 h-14" />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={3} className="w-14 h-14" />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={4} className="w-14 h-14" />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={5} className="w-14 h-14" />
                  </InputOTPGroup>
                </InputOTP>
              </Field>

              <Field>
                <Button
                  type="submit"
                  disabled={loading || isExpired}
                  className="w-full cursor-pointer"
                >
                  {loading ? "Verifying..." : "Verify Email"}
                </Button>
              </Field>

              <FieldDescription className="text-center flex flex-col gap-1 mt-2">
                <span>Belum menerima kode?</span>
                <Button
                  type="button"
                  variant="link"
                  className="h-auto p-0 text-sm cursor-pointer"
                  disabled={resendLoading}
                  onClick={handleResendOtp}
                >
                  {resendLoading ? "Mengirim ulang..." : "Kirim ulang OTP"}
                </Button>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

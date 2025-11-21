"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const LogoutBtn = () => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      toast.info("Sedang logout...");

      await signOut({
        callbackUrl: "/", // redirect ke homepage setelah logout
        redirect: true,
      });

      // Catatan:
      // Setelah signOut redirect berjalan, kode di bawah ini
      // biasanya tidak dijalankan karena terjadi navigasi halaman.
      // Tapi tidak masalah kita taruh di sini sebagai fallback.
      toast.success("Logout berhasil!");
    } catch (err) {
      console.error(err);
      toast.error("Gagal logout, coba lagi.");
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      className="cursor-pointer"
      disabled={loading}
      onClick={handleLogout}
    >
      {loading ? "Logging out..." : "Logout"}
    </Button>
  );
};

export default LogoutBtn;

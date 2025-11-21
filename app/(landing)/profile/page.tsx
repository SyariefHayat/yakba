import { redirect } from "next/navigation";

import { auth } from "@/auth";
import LogoutBtn from "@/components/modules/auth/LogoutBtn";

const ProfilePage = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const displayName = session.user.name ?? "Pengguna Yakba";
  const email = session.user.email ?? "-";

  return (
    <div className="min-h-screen bg-linear-to-b from-sky-50 via-white to-pink-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl bg-white/90 border border-sky-100 shadow-sm p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-700 font-semibold text-lg">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">
              {displayName}
            </p>
            <p className="text-xs text-slate-500">{email}</p>
          </div>
        </div>

        <div className="h-px bg-linear-to-r from-transparent via-sky-100 to-transparent" />

        <div className="space-y-3 text-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-500">
            Akun Saya
          </p>

          <div className="rounded-2xl border border-sky-50 bg-sky-50/60 px-4 py-3 flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-xs text-slate-500">Email terdaftar</p>
              <p className="text-sm font-medium text-slate-800 break-all">
                {email}
              </p>
            </div>
            <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-sky-600 border border-sky-100">
              Verifikasi ✔
            </span>
          </div>

          <p className="text-[11px] text-slate-500">
            Gunakan akun ini untuk mengakses fitur khusus orang tua / admin di
            platform Yakba Kinder.
          </p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <p className="text-[11px] text-slate-500">
            Bukan kamu? Kamu bisa keluar dari akun ini.
          </p>
          <LogoutBtn />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

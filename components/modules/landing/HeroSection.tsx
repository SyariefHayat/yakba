import Image from "next/image";
import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const HeroSection = () => {
  const menuItems = [
    { label: "Beranda", href: "/" },
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Tentang Kami", href: "/about-us" },
    { label: "Gallery", href: "/gallery" },
    { label: "Artikel", href: "/article" },
    { label: "Bimbel", href: "/bimbel" },
    { label: "Fasilitas", href: "/facility" },
    { label: "Mitra", href: "/partner" },
    { label: "Produk", href: "/product" },
    { label: "Promo", href: "/promo" },
    { label: "Tentor", href: "/tentor" },
    { label: "Profil", href: "/profile" },
  ];

  return (
    <section className="relative w-full h-screen bg-sky-300 flex items-center justify-center overflow-hidden">
      <div className="absolute top-6 right-4 md:top-32 md:right-8 z-20">
        <Sheet>
          <SheetTrigger className="rounded-full bg-white/90 px-4 py-2 text-xs md:text-sm font-semibold text-sky-700 shadow-sm hover:bg-white transition">
            ☰ Menu
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-white/95 border-l border-sky-100"
          >
            <SheetHeader>
              <SheetTitle className="text-sky-900">
                Navigasi Yakba Kinder
              </SheetTitle>
              <SheetDescription className="text-xs text-slate-500">
                Pilih halaman yang ingin kamu kunjungi. Cocok untuk eksplor
                informasi tentang program, fasilitas, hingga peluang mitra.
              </SheetDescription>
            </SheetHeader>

            <nav className="mt-6 space-y-1.5">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-800 transition"
                >
                  <span>{item.label}</span>
                  <span className="text-[10px] text-sky-400">→</span>
                </Link>
              ))}
            </nav>

            <div className="mt-6 rounded-2xl bg-sky-50 border border-sky-100 px-3 py-3 text-[11px] text-slate-600">
              Butuh bantuan atau info lebih lanjut?
              <Link
                href="/kontak"
                className="font-semibold text-sky-600 hover:text-sky-700"
              >
                hubungi kami di sini.
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <h1 className="z-10 text-4xl md:text-7xl lg:text-8xl font-extrabold text-center text-white px-4 drop-shadow-sm">
        Welcome to <br /> Yakba
      </h1>

      <div
        className="
          absolute bottom-0 left-1/2 -translate-x-1/2
          flex items-end gap-2 md:gap-6
          px-4 pb-2 md:pb-4
        "
      >
        <div className="w-[90px] md:w-[150px] lg:w-[200px]">
          <Image
            src="/boy.png"
            alt="Boy"
            width={400}
            height={400}
            className="w-full h-auto"
          />
        </div>

        <div className="w-[100px] md:w-[170px] lg:w-[250px]">
          <Image
            src="/pink.png"
            alt="Girl Pink"
            width={400}
            height={400}
            className="w-full h-auto"
          />
        </div>

        <div className="w-[90px] md:w-[150px] lg:w-[200px]">
          <Image
            src="/girl.png"
            alt="Girl"
            width={400}
            height={400}
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

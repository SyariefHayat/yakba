"use client";

import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";

import { MENU_ITEMS } from "@/lib/constants";

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!navRef.current) return;

    gsap.set(navRef.current, { y: -100, opacity: 0 });

    gsap.to(navRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      delay: 2,
      ease: "power2.out",
    });
  }, []); // ← dependency array kosong agar hanya jalan sekali

  return (
    <nav
      ref={navRef} // ← ref dipasang di sini
      className="w-full flex items-center justify-between px-6 py-4 md:px-10 font-medium absolute z-20"
    >
      {/* Logo */}
      <Link href="/">
        <Image
          src="/logo.png"
          alt="Logo"
          width={100}
          height={100}
          className="w-16 h-16 md:w-20 md:h-20"
        />
      </Link>

      {/* Menu Desktop */}
      <ul className="hidden md:flex gap-10 text-[#1A3F26]">
        {MENU_ITEMS.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="relative text-lg font-semibold text-[#1A3F26] group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E85206] rounded-full transition-all duration-300 group-hover:w-full" />
            </Link>
          </li>
        ))}
      </ul>

      {/* CTA Button Desktop */}
      <Link href="/contact" className="hidden md:block">
        <span className="inline-flex items-center gap-2 bg-[#1A3F26] text-white text-base font-bold px-6 py-3 rounded-full">
          Hubungi Kami
        </span>
      </Link>
    </nav>
  );
};

export default Navbar;

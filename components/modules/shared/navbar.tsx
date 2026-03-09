"use client";

import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { MENU_ITEMS } from "@/lib/constants";

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

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
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className="w-full flex items-center justify-between px-6 py-4 md:px-10 font-medium absolute z-40"
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
        <ul className="hidden lg:flex gap-10 text-[#1A3F26]">
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
        <Link href="/contact" className="hidden lg:block">
          <span className="inline-flex items-center gap-2 bg-[#1A3F26] text-white text-base font-bold px-6 py-3 rounded-full">
            Hubungi Kami
          </span>
        </Link>

        {/* Hamburger Button Mobile */}
        <button
          className="lg:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10 z-30"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-[#1A3F26] rounded-full transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-[#1A3F26] rounded-full transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-[#1A3F26] rounded-full transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-30 bg-white flex flex-col items-center justify-center gap-8 transition-all duration-300 lg:hidden ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col items-center gap-8">
          {MENU_ITEMS.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-2xl font-semibold text-[#1A3F26] relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E85206] rounded-full transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/contact" onClick={() => setMenuOpen(false)}>
          <span className="inline-flex items-center gap-2 bg-[#1A3F26] text-white text-base font-bold px-8 py-4 rounded-full">
            Hubungi Kami
          </span>
        </Link>
      </div>
    </>
  );
};

export default Navbar;

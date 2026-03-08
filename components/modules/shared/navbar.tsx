"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

import { Button } from "@/components/ui/button";
import { MENU_ITEMS } from "@/lib/constants";

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuItemsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = menuItemsRef.current.filter(Boolean);

      const tl = gsap.timeline({
        delay: 1,
        defaults: {
          duration: 0.5,
          ease: "power4.out",
        },
      });

      tl.fromTo(logoRef.current, { y: -30, opacity: 0 }, { y: 0, opacity: 1 })
        .fromTo(
          items,
          { y: -30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
          },
        )
        .fromTo(
          buttonRef.current,
          { y: -30, opacity: 0 },
          { y: 0, opacity: 1 },
        );
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className="w-full flex items-center justify-between p-6 font-medium absolute z-20"
    >
      <Link ref={logoRef} href="/">
        <Image
          src="/logo.png"
          alt="Logo"
          width={100}
          height={100}
          className="w-16 h-16 md:w-20 md:h-20 will-change-transform"
        />
      </Link>

      <ul className="hidden md:flex gap-10 text-[#1A3F26]">
        {MENU_ITEMS.map((item, index) => (
          <li
            key={item.label}
            ref={(el) => {
              menuItemsRef.current[index] = el;
            }}
            className="text-lg will-change-transform"
          >
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>

      <Button
        ref={buttonRef}
        className="hidden md:block bg-[#1A3F26] text-white text-lg will-change-transform"
      >
        <Link href="/contact">Hubungi Kami</Link>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="md:hidden text-[#1A3F26]"
      >
        <Menu className="h-6 w-6" />
      </Button>
    </nav>
  );
};

export default Navbar;

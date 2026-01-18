"use client"

import { Button } from "@/components/ui/button"

import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"

import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ChevronLeft } from "lucide-react"
import { usePathname } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"

// Konstanta warna brand
const COLORS = {
    green: "#7CBF25",
    pink: "#EE2D70",
    blue: "#1B83C8",
    navy: "#1F3B5A",
} as const

// Huruf YAKBA dengan warnanya
const YAKBA_LETTERS = [
    { letter: "A", color: COLORS.green },
    { letter: "K", color: COLORS.pink },
    { letter: "B", color: COLORS.blue },
    { letter: "A", color: COLORS.green },
] as const

// Menu items untuk sidebar
const MENU_ITEMS = [
    { label: "Beranda", href: "/" },
    { label: "Artikel", href: "/article" },
    { label: "Galeri", href: "/gallery" },
    { label: "Fasilitas", href: "/facilities" },
    { label: "Product", href: "/product" },
    { label: "Tentor", href: "/tentor" },
    { label: "Peluang Usaha", href: "/mitra" },
    { label: "Event Promosi", href: "/event" },
    { label: "Hubungi Kami", href: "/contact" },
] as const

const HeroSection = () => {
    const pathname = usePathname()

    return (
        <section className="relative w-full h-[60vh] md:h-[70vh] lg:h-screen bg-sky-100">
            <Image
                src="/logo.png"
                alt="logo"
                width={100}
                height={100}
                className="absolute top-5 left-5 z-20 w-18 h-18 md:w-20 md:h-20"
            />

            {/* Sidebar Sheet */}
            <Sheet>
                <SheetTrigger asChild>
                    <button className="w-[30px] h-[40px] absolute top-8.5 md:top-10 right-0 bg-yellow-300 rounded-s-md flex items-center justify-center z-40 cursor-pointer hover:bg-yellow-400 transition-colors">
                        <ChevronLeft className="size-7" />
                    </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] sm:w-[250px] bg-white p-0">
                    <ScrollArea className="h-full">
                        <div className="flex flex-col gap-4 p-4">
                            {/* Header */}
                            <SheetHeader className="flex items-center justify-center">
                                <SheetTitle className="sr-only">Menu Navigasi</SheetTitle>
                                <Image
                                    src="/sidebar-img.png"
                                    alt="sidebar-img"
                                    width={200}
                                    height={200}
                                />
                            </SheetHeader>

                            {/* Navigation Menu */}
                            <nav className="flex flex-col gap-2">
                                {MENU_ITEMS.map((item) => {
                                    const isActive = pathname === item.href
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={cn(
                                                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group",
                                                isActive
                                                    ? "bg-gray-200"
                                                    : "hover:bg-gray-200"
                                            )}
                                        >
                                            <span className="uppercase font-poppins">
                                                {item.label}
                                            </span>
                                        </Link>
                                    )
                                })}
                            </nav>

                            {/* CTA Button di Sidebar */}
                            <div className="pt-4">
                                <Button className="w-full bg-yellow-300 text-black font-poppins hover:bg-yellow-400 cursor-pointer">
                                    Daftar Sekarang
                                </Button>
                            </div>
                        </div>
                    </ScrollArea>
                </SheetContent>
            </Sheet>

            {/* Hero Content */}
            <div className="absolute top-[41%] md:top-[35%] lg:top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center font-mochi-boom text-2xl md:text-4xl space-y-2 z-30">
                <p className="md:mb-4">Taman Kanak-Kanak Islami</p>

                {/* Title YAKBA KINDERGARTEN */}
                <h1 className="text-4xl md:text-7xl" style={{ color: COLORS.navy }}>
                    {YAKBA_LETTERS.map(({ letter, color }, index) => (
                        <span key={index} style={{ color }}>
                            {letter}
                        </span>
                    ))}
                    {" "}KINDERGARTEN
                </h1>

                {/* Tagline */}
                <p className="-mt-1 md:mt-0">
                    <span style={{ color: COLORS.green }}>Belajar, </span>
                    <span style={{ color: COLORS.pink }}>Bermain, </span>
                    <span style={{ color: COLORS.blue }}>Berakhlak</span>
                </p>

                {/* CTA Button */}
                <Button className="mt-3 text-xs md:text-base md:py-5 bg-yellow-300 text-black font-poppins hover:bg-yellow-400 cursor-pointer">
                    Mulai Sekarang
                </Button>
            </div>

            {/* Cloud Assets */}
            <Image
                src="/cloud-left.png"
                alt="Cloud decoration left"
                width={0}
                height={0}
                sizes="50vw"
                className="absolute bottom-16 md:bottom-35 lg:bottom-15 left-0 w-1/2 h-auto z-10"
            />
            <Image
                src="/cloud-right.png"
                alt="Cloud decoration right"
                width={0}
                height={0}
                sizes="50vw"
                className="absolute bottom-16.5 md:bottom-36 lg:bottom-16.5 right-0 w-1/2 h-auto z-10"
            />

            {/* Mascot */}
            <Image
                src="/maskot.png"
                alt="Yakba mascot"
                width={500}
                height={500}
                className="absolute bottom-5 md:bottom-10 lg:bottom-0 left-1/2 -translate-x-1/2 z-30 w-[300px] md:w-[600px] lg:w-[500px] h-auto"
            />

            {/* Land/Ground */}
            <Image
                src="/land.png"
                alt="Land decoration"
                width={0}
                height={0}
                sizes="100vw"
                className="absolute bottom-0 lg:-bottom-40 left-0 w-full h-auto z-20"
            />
        </section >
    )
}

export default HeroSection

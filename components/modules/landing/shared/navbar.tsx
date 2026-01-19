"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

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
import { MENU_ITEMS } from "@/lib/constants"

const Navbar = () => {
    const pathname = usePathname()
    const logoRef = useRef<HTMLImageElement>(null)
    const sheetTriggerRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        // Animasi dari atas
        const elementsFromTop = [
            { ref: logoRef.current, delay: 0.2 },
            { ref: sheetTriggerRef.current, delay: 0.2 },
        ]

        elementsFromTop.forEach(({ ref, delay }) => {
            if (ref) {
                gsap.set(ref, {
                    y: -100,
                    opacity: 0
                })

                gsap.to(ref, {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    delay
                })
            }
        })
    }, [])

    return (
        <>
            <Link href="/" className="absolute top-5 left-5 z-50">
                <Image
                    ref={logoRef}
                    src="/logo.png"
                    alt="Logo"
                    width={100}
                    height={100}
                    className="w-16 h-16 md:w-20 md:h-20"
                />
            </Link>

            {/* Sidebar Sheet */}
            <Sheet>
                <SheetTrigger asChild>
                    <button
                        ref={sheetTriggerRef}
                        className="w-[30px] h-[40px] absolute top-8.5 md:top-10 right-0 bg-yellow-300 rounded-s-md flex items-center justify-center z-40 cursor-pointer hover:bg-yellow-400 transition-colors"
                    >
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
        </>
    )
}

export default Navbar

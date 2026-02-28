"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import { COLORS } from "@/lib/constants"
import Link from "next/link"

// Data kata-kata dengan warna
const CTA_WORDS = [
    { text: "BELAJAR", color: COLORS.green },
    { text: "SERU", color: COLORS.pink },
    { text: "ANAK", color: COLORS.blue },
] as const

// Arrow colors matching brand
const ARROW_COLORS = [COLORS.green, COLORS.pink, COLORS.blue]

const CtaSection = () => {
    const arrowsRef = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        // Staggered bounce animation untuk setiap arrow
        arrowsRef.current.forEach((arrow, index) => {
            if (arrow) {
                gsap.to(arrow, {
                    y: 8,
                    duration: 0.4,
                    ease: "power1.inOut",
                    yoyo: true,
                    repeat: -1,
                    delay: index * 0.15, // Stagger effect
                })
            }
        })
    }, [])

    return (
        <section className="w-full my-10 md:my-20">
            <div className="relative w-[90%] h-60 md:h-80 lg:h-100 bg-sky-100 mx-auto rounded-xl overflow-hidden">
                {/* CTA Content */}
                <div className="absolute w-[90%] md:w-[70%] lg:w-1/2 left-5 md:left-25 lg:left-70 top-5 md:top-15 lg:top-20 text-center z-30">
                    {/* Title */}
                    <h3 className="text-2xl md:text-5xl font-mochi-boom">
                        {CTA_WORDS.map((word, index) => (
                            <span key={index}>
                                <span style={{ color: word.color }}>{word.text}</span>
                                {index < CTA_WORDS.length - 1 && " "}
                            </span>
                        ))}
                    </h3>

                    {/* Description */}
                    <p className="text-sm md:text-xl font-poppins mt-2">
                        Daftarkan Anak Anda Sekarang dan Mulai Perjalanan Belajarnya Bersama YAKBA!
                    </p>

                    {/* Animated Arrows - Triple colorful arrows */}
                    <div className="flex justify-center items-center gap-1 my-2">
                        {ARROW_COLORS.map((color, index) => (
                            <div
                                key={index}
                                ref={(el) => { arrowsRef.current[index] = el }}
                            >
                                <ChevronDown
                                    className="size-6 md:size-8 drop-shadow-md"
                                    style={{ color }}
                                    strokeWidth={3}
                                />
                            </div>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <Button className=" bg-yellow-300 text-black text-xs md:text-base font-bold font-poppins hover:bg-yellow-400 cursor-pointer shadow-lg" asChild>
                        <Link href="/login">Mulai Sekarang</Link>
                    </Button>
                </div>

                {/* Decorations */}
                <Image
                    src="/small-cloud.png"
                    alt="Cloud decoration"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="absolute w-full bottom-5 md:bottom-10 z-10"
                />
                <Image
                    src="/land-small.png"
                    alt="Land decoration"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="absolute w-full bottom-0 z-20"
                />
            </div>
        </section>
    )
}

export default CtaSection

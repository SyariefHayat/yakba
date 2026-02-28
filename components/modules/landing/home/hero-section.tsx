"use client"

import gsap from "gsap"
import { useEffect, useRef } from "react"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { COLORS, YAKBA_LETTERS } from "@/lib/constants"
import Navbar from "@/components/modules/landing/shared/navbar"
import Link from "next/link"

const HeroSection = () => {
    const heroContentRef = useRef<HTMLDivElement>(null)
    const cloudLeftRef = useRef<HTMLImageElement>(null)
    const cloudRightRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        // Animasi hero content dari atas
        if (heroContentRef.current) {
            gsap.set(heroContentRef.current, {
                y: -100,
                opacity: 0
            })

            gsap.to(heroContentRef.current, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                delay: 0.4
            })
        }

        // Animasi cloud dari kiri
        if (cloudLeftRef.current) {
            gsap.set(cloudLeftRef.current, {
                x: -200,
                opacity: 0
            })

            gsap.to(cloudLeftRef.current, {
                x: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power3.out",
                delay: 0.4
            })
        }

        // Animasi cloud dari kanan
        if (cloudRightRef.current) {
            gsap.set(cloudRightRef.current, {
                x: 200,
                opacity: 0
            })

            gsap.to(cloudRightRef.current, {
                x: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power3.out",
                delay: 0.4
            })
        }
    }, [])

    return (
        <section className="relative w-full h-[65vh] md:h-[70vh] lg:h-screen bg-sky-100 overflow-hidden">
            <Navbar />

            {/* Hero Content */}
            <div
                ref={heroContentRef}
                className="absolute top-[41%] md:top-[35%] lg:top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center font-mochi-boom text-2xl md:text-4xl space-y-2 z-30"
            >

                {/* Title YAKBA KINDERGARTEN */}
                <h1 className="font-bold text-[clamp(2.25rem,6vw,5rem)]"
                    style={{ color: COLORS.navy }}>
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
                <Button className="text-xs font-bold md:text-base md:py-5 bg-yellow-300 text-black font-poppins hover:bg-yellow-400 cursor-pointer" asChild>
                    <Link href="/signin">Mulai Sekarang</Link>
                </Button>
            </div>

            {/* Cloud Assets */}
            <Image
                ref={cloudLeftRef}
                src="/cloud-left.png"
                alt="Cloud decoration left"
                width={0}
                height={0}
                sizes="50vw"
                className="absolute bottom-16 md:bottom-35 lg:bottom-15 left-0 w-1/2 h-auto z-10"
            />
            <Image
                ref={cloudRightRef}
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
                className="absolute bottom-0 md:bottom-10 lg:bottom-0 left-1/2 -translate-x-1/2 z-30 w-[300px] md:w-[600px] lg:w-[500px] h-auto"
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

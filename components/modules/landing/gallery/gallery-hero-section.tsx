"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

import Image from "next/image"
import Navbar from "@/components/modules/landing/shared/navbar"
import { COLORS, YAKBA_LETTERS } from "@/lib/constants"

const GalleryHeroSection = () => {
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
        <section className="relative w-full h-[30vh] lg:h-[50vh] bg-sky-100 overflow-hidden">
            <Navbar />

            {/* Hero Content */}
            <div
                ref={heroContentRef}
                className="absolute top-[54%] md:top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center font-mochi-boom text-xl md:text-3xl space-y-2 z-30"
            >
                <p className="md:mb-2">Galeri</p>

                {/* Title YAKBA */}
                <h1 className="text-3xl md:text-5xl" style={{ color: COLORS.navy }}>
                    {YAKBA_LETTERS.map(({ letter, color }, index) => (
                        <span key={index} style={{ color }}>
                            {letter}
                        </span>
                    ))}
                    {" "}KINDERGARTEN
                </h1>

                {/* Tagline */}
                <p className="-mt-1 md:mt-0 text-lg md:text-2xl">
                    <span style={{ color: COLORS.green }}>Momen </span>
                    <span style={{ color: COLORS.pink }}>& </span>
                    <span style={{ color: COLORS.blue }}>Kenangan</span>
                </p>
            </div>

            {/* Cloud Assets */}
            <Image
                ref={cloudLeftRef}
                src="/cloud-left.png"
                alt="Cloud decoration left"
                width={0}
                height={0}
                sizes="50vw"
                className="absolute bottom-6 md:bottom-15 left-0 w-1/2 h-auto z-10"
            />
            <Image
                ref={cloudRightRef}
                src="/cloud-right.png"
                alt="Cloud decoration right"
                width={0}
                height={0}
                sizes="50vw"
                className="absolute bottom-[25px] md:bottom-16 right-0 w-1/2 h-auto z-10"
            />

            {/* Land/Ground */}
            <Image
                src="/land.png"
                alt="Land decoration"
                width={0}
                height={0}
                sizes="100vw"
                className="absolute -bottom-10 md:-bottom-20 lg:-bottom-40 left-0 w-full h-auto z-20"
            />
        </section>
    )
}

export default GalleryHeroSection

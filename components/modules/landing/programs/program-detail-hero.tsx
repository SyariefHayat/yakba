"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

import Image from "next/image"
import Navbar from "@/components/modules/landing/shared/navbar"
import { COLORS, YAKBA_LETTERS } from "@/lib/constants"
import { Palette, BookOpen, Languages, Music, Calculator, Users, LucideIcon } from "lucide-react"
import { ProgramDetailData } from "@/lib/programs-data"

// Icon map untuk resolve icon dari nama
const ICON_MAP: Record<string, LucideIcon> = {
    Palette,
    BookOpen,
    Languages,
    Music,
    Calculator,
    Users,
}

interface ProgramDetailHeroProps {
    program: ProgramDetailData
}

const ProgramDetailHero = ({ program }: ProgramDetailHeroProps) => {
    const heroContentRef = useRef<HTMLDivElement>(null)
    const cloudLeftRef = useRef<HTMLImageElement>(null)
    const cloudRightRef = useRef<HTMLImageElement>(null)
    const Icon = ICON_MAP[program.iconName] || Palette

    useEffect(() => {
        if (heroContentRef.current) {
            gsap.set(heroContentRef.current, { y: -100, opacity: 0 })
            gsap.to(heroContentRef.current, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                delay: 0.4
            })
        }

        if (cloudLeftRef.current) {
            gsap.set(cloudLeftRef.current, { x: -200, opacity: 0 })
            gsap.to(cloudLeftRef.current, {
                x: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power3.out",
                delay: 0.4
            })
        }

        if (cloudRightRef.current) {
            gsap.set(cloudRightRef.current, { x: 200, opacity: 0 })
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
        <section className="relative w-full h-[35vh] lg:h-[55vh] bg-sky-100 overflow-hidden">
            <Navbar />

            <div
                ref={heroContentRef}
                className="absolute top-[54%] md:top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-30 px-4"
            >
                {/* Icon */}
                <div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                    style={{ backgroundColor: program.bgColor }}
                >
                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>

                {/* Subtitle */}
                <span
                    className="text-sm md:text-base font-poppins font-medium px-4 py-1 rounded-full"
                    style={{ backgroundColor: program.accentColor, color: program.bgColor }}
                >
                    {program.subtitle}
                </span>

                {/* Title */}
                <h1
                    className="text-2xl md:text-4xl lg:text-5xl font-mochi-boom mt-3"
                    style={{ color: program.bgColor }}
                >
                    {program.title}
                </h1>
            </div>

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

export default ProgramDetailHero

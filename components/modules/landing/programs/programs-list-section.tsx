"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { COLORS } from "@/lib/constants"
import { Palette, BookOpen, Languages, Music, Calculator, Users, LucideIcon } from "lucide-react"
import { ProgramDetailData, PROGRAMS_DATA } from "@/lib/programs-data"

gsap.registerPlugin(ScrollTrigger)

// Icon map untuk resolve icon dari nama
const ICON_MAP: Record<string, LucideIcon> = {
    Palette,
    BookOpen,
    Languages,
    Music,
    Calculator,
    Users,
}

const ProgramsListSection = () => {
    const introRef = useRef<HTMLDivElement>(null)
    const programsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (introRef.current) {
            gsap.set(introRef.current, { y: 50, opacity: 0 })
            gsap.to(introRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: introRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            })
        }

        if (programsRef.current) {
            const cards = programsRef.current.querySelectorAll(".program-card")
            gsap.set(cards, { y: 60, opacity: 0 })
            gsap.to(cards, {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out",
                stagger: 0.1,
                scrollTrigger: {
                    trigger: programsRef.current,
                    start: "top 75%",
                    toggleActions: "play none none reverse",
                },
            })
        }
    }, [])

    return (
        <section className="w-full pt-16 md:pt-24 bg-white">
            <div className="max-w-6xl mx-auto px-4 md:px-8">
                {/* Intro Section */}
                <div ref={introRef} className="text-center mb-12 md:mb-16">
                    <h2 className="text-2xl md:text-4xl font-mochi-boom mb-4" style={{ color: COLORS.navy }}>
                        Program Unggulan YAKBA
                    </h2>
                    <p className="text-base md:text-lg font-poppins text-gray-600 max-w-3xl mx-auto">
                        Kami menyediakan berbagai program pembelajaran yang dirancang khusus untuk mengembangkan
                        potensi anak secara holistik, mencakup aspek kognitif, afektif, dan psikomotorik.
                    </p>
                </div>

                {/* Programs Grid */}
                <div ref={programsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {PROGRAMS_DATA.map((program) => (
                        <ProgramCard key={program.id} program={program} />
                    ))}
                </div>
            </div>
        </section>
    )
}

// Komponen untuk setiap program card
const ProgramCard = ({ program }: { program: ProgramDetailData }) => {
    const Icon = ICON_MAP[program.iconName] || Palette

    return (
        <Link href={`/programs/${program.id}`}>
            <div
                className="program-card group h-full bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
                {/* Image Header */}
                <div
                    className="relative w-full h-48 overflow-hidden"
                    style={{ backgroundColor: program.accentColor }}
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                        style={{ backgroundImage: `url('${program.image}')` }}
                    />
                    <div
                        className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center shadow-md"
                        style={{ backgroundColor: program.bgColor }}
                    >
                        <Icon className="w-5 h-5 text-white" />
                    </div>
                </div>

                {/* Content */}
                <div className="p-5">
                    <span
                        className="text-xs font-poppins font-medium px-2 py-1 rounded-full"
                        style={{ backgroundColor: program.accentColor, color: program.bgColor }}
                    >
                        {program.subtitle}
                    </span>

                    <h3
                        className="text-lg md:text-xl font-mochi-boom mt-3 mb-2 group-hover:underline"
                        style={{ color: program.bgColor }}
                    >
                        {program.title}
                    </h3>

                    <p className="font-poppins text-sm text-gray-600 line-clamp-2">
                        {program.description}
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-sm font-poppins" style={{ color: program.bgColor }}>
                        <span>Lihat Detail</span>
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProgramsListSection

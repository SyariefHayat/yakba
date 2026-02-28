"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import Link from "next/link"
import { COLORS } from "@/lib/constants"
import { CheckCircle, Clock, Users, ArrowLeft, Star, Palette, BookOpen, Languages, Music, Calculator, LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
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

interface ProgramDetailContentProps {
    program: ProgramDetailData
}

const ProgramDetailContent = ({ program }: ProgramDetailContentProps) => {
    const contentRef = useRef<HTMLDivElement>(null)
    const featuresRef = useRef<HTMLDivElement>(null)
    const benefitsRef = useRef<HTMLDivElement>(null)
    const otherProgramsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (contentRef.current) {
            gsap.set(contentRef.current, { y: 50, opacity: 0 })
            gsap.to(contentRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: contentRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            })
        }

        if (featuresRef.current) {
            gsap.set(featuresRef.current, { x: -50, opacity: 0 })
            gsap.to(featuresRef.current, {
                x: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: featuresRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            })
        }

        if (benefitsRef.current) {
            gsap.set(benefitsRef.current, { x: 50, opacity: 0 })
            gsap.to(benefitsRef.current, {
                x: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: benefitsRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            })
        }

        if (otherProgramsRef.current) {
            const cards = otherProgramsRef.current.querySelectorAll(".other-program-card")
            gsap.set(cards, { y: 30, opacity: 0 })
            gsap.to(cards, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power3.out",
                stagger: 0.1,
                scrollTrigger: {
                    trigger: otherProgramsRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            })
        }
    }, [])

    // Get other programs (exclude current)
    const otherPrograms = PROGRAMS_DATA.filter(p => p.id !== program.id).slice(0, 3)

    return (
        <section className="w-full pt-12 md:pt-20 bg-white">
            <div className="max-w-5xl mx-auto px-4 md:px-8">
                {/* Back Button */}
                <Link href="/programs" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-poppins mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali ke Daftar Program</span>
                </Link>

                {/* Main Content */}
                <div ref={contentRef} className="mb-12">
                    {/* Program Image */}
                    <div
                        className="w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8"
                        style={{ backgroundColor: program.accentColor }}
                    >
                        <Image
                            src={program.image}
                            alt={program.title}
                            width={1200}
                            height={600}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Description */}
                    <p className="font-poppins text-base md:text-lg text-gray-700 leading-relaxed mb-6">
                        {program.fullDescription}
                    </p>

                    {/* Schedule & Age Group */}
                    <div className="flex flex-wrap gap-4 p-4 rounded-xl" style={{ backgroundColor: program.accentColor }}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white">
                                <Clock className="w-5 h-5" style={{ color: program.bgColor }} />
                            </div>
                            <div>
                                <p className="text-xs font-poppins text-gray-600">Jadwal</p>
                                <p className="font-poppins font-medium" style={{ color: program.bgColor }}>{program.schedule}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white">
                                <Users className="w-5 h-5" style={{ color: program.bgColor }} />
                            </div>
                            <div>
                                <p className="text-xs font-poppins text-gray-600">Usia</p>
                                <p className="font-poppins font-medium" style={{ color: program.bgColor }}>{program.ageGroup}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features & Benefits Grid */}
                <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12">
                    {/* Features */}
                    <div
                        ref={featuresRef}
                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                    >
                        <h3 className="text-xl font-mochi-boom mb-4" style={{ color: program.bgColor }}>
                            Yang Akan Dipelajari
                        </h3>
                        <ul className="space-y-3">
                            {program.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-3 font-poppins text-gray-600">
                                    <CheckCircle className="w-5 h-5 mt-0.5 shrink-0" style={{ color: program.bgColor }} />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Benefits */}
                    <div
                        ref={benefitsRef}
                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                    >
                        <h3 className="text-xl font-mochi-boom mb-4" style={{ color: program.bgColor }}>
                            Manfaat Program
                        </h3>
                        <ul className="space-y-3">
                            {program.benefits.map((benefit, idx) => (
                                <li key={idx} className="flex items-start gap-3 font-poppins text-gray-600">
                                    <Star className="w-5 h-5 mt-0.5 shrink-0" style={{ color: program.bgColor }} />
                                    <span>{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* CTA */}
                <div
                    className="text-center p-8 rounded-2xl mb-12"
                    style={{ backgroundColor: program.accentColor }}
                >
                    <h3 className="text-xl md:text-2xl font-mochi-boom mb-2" style={{ color: program.bgColor }}>
                        Tertarik dengan Program ini?
                    </h3>
                    <p className="font-poppins text-gray-700 mb-4">
                        Daftarkan anak Anda sekarang dan mulai perjalanan belajarnya!
                    </p>
                    <Button className="bg-yellow-300 hover:bg-yellow-400 text-black font-poppins font-bold" asChild>
                        <Link href="/contact">Hubungi Kami</Link>
                    </Button>
                </div>

                {/* Other Programs */}
                <div ref={otherProgramsRef}>
                    <h3 className="text-xl md:text-2xl font-mochi-boom text-center mb-6" style={{ color: COLORS.navy }}>
                        Program Lainnya
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {otherPrograms.map((otherProgram) => {
                            const OtherIcon = ICON_MAP[otherProgram.iconName] || Palette
                            return (
                                <Link key={otherProgram.id} href={`/programs/${otherProgram.id}`}>
                                    <div className="other-program-card group bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-10 h-10 rounded-full flex items-center justify-center"
                                                style={{ backgroundColor: otherProgram.bgColor }}
                                            >
                                                <OtherIcon className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <h4
                                                    className="font-mochi-boom text-sm group-hover:underline"
                                                    style={{ color: otherProgram.bgColor }}
                                                >
                                                    {otherProgram.title}
                                                </h4>
                                                <p className="text-xs font-poppins text-gray-500">{otherProgram.subtitle}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProgramDetailContent

"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { COLORS } from "@/lib/constants"
import { Heart, BookOpen, Users, Star, Target, Award } from "lucide-react"

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

// Data untuk nilai-nilai YAKBA
const VALUES = [
    {
        icon: Heart,
        title: "Kasih Sayang",
        description: "Mendidik dengan penuh cinta dan perhatian untuk perkembangan optimal anak.",
        color: COLORS.pink,
    },
    {
        icon: BookOpen,
        title: "Islami",
        description: "Menanamkan nilai-nilai Islam dan akhlak mulia sejak dini.",
        color: COLORS.green,
    },
    {
        icon: Users,
        title: "Kolaboratif",
        description: "Kerjasama antara guru, orang tua, dan anak untuk hasil terbaik.",
        color: COLORS.blue,
    },
    {
        icon: Star,
        title: "Kreativitas",
        description: "Mengembangkan kreativitas dan imajinasi anak melalui pembelajaran yang menyenangkan.",
        color: COLORS.pink,
    },
    {
        icon: Target,
        title: "Fokus",
        description: "Pembelajaran yang terstruktur dan terarah sesuai kemampuan anak.",
        color: COLORS.green,
    },
    {
        icon: Award,
        title: "Prestasi",
        description: "Mendorong anak untuk meraih potensi terbaiknya dengan penghargaan positif.",
        color: COLORS.blue,
    },
]

// Data untuk timeline sejarah
const HISTORY_TIMELINE = [
    {
        year: "2018",
        title: "Awal Perjalanan",
        description: "YAKBA Kindergarten didirikan dengan visi untuk memberikan pendidikan berkualitas berbasis nilai Islam.",
    },
    {
        year: "2020",
        title: "Ekspansi Program",
        description: "Menambahkan program bahasa Arab dan kurikulum interaktif untuk meningkatkan kualitas pembelajaran.",
    },
    {
        year: "2022",
        title: "Digitalisasi",
        description: "Meluncurkan platform pembelajaran online untuk mendukung fleksibilitas belajar anak.",
    },
    {
        year: "2024",
        title: "Terus Berkembang",
        description: "Memperluas jangkauan dengan membuka cabang baru dan meningkatkan fasilitas pendidikan.",
    },
]

const AboutContentSection = () => {
    const visionRef = useRef<HTMLDivElement>(null)
    const missionRef = useRef<HTMLDivElement>(null)
    const valuesRef = useRef<HTMLDivElement>(null)
    const historyRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Animasi untuk Vision Section
        if (visionRef.current) {
            gsap.set(visionRef.current, { y: 50, opacity: 0 })
            gsap.to(visionRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: visionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            })
        }

        // Animasi untuk Mission Section
        if (missionRef.current) {
            gsap.set(missionRef.current, { y: 50, opacity: 0 })
            gsap.to(missionRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: missionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            })
        }

        // Animasi untuk Values Section
        if (valuesRef.current) {
            const valueCards = valuesRef.current.querySelectorAll(".value-card")
            gsap.set(valueCards, { y: 60, opacity: 0 })
            gsap.to(valueCards, {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out",
                stagger: 0.1,
                scrollTrigger: {
                    trigger: valuesRef.current,
                    start: "top 75%",
                    toggleActions: "play none none reverse",
                },
            })
        }

        // Animasi untuk History Timeline
        if (historyRef.current) {
            const timelineItems = historyRef.current.querySelectorAll(".timeline-item")
            gsap.set(timelineItems, { x: -50, opacity: 0 })
            gsap.to(timelineItems, {
                x: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out",
                stagger: 0.2,
                scrollTrigger: {
                    trigger: historyRef.current,
                    start: "top 75%",
                    toggleActions: "play none none reverse",
                },
            })
        }
    }, [])

    return (
        <section className="w-full py-16 md:py-24 bg-white">
            <div className="max-w-6xl mx-auto px-4 md:px-8">
                {/* Intro Section */}
                <div className="text-center mb-16 md:mb-24">
                    <h2 className="text-2xl md:text-4xl font-mochi-boom mb-4" style={{ color: COLORS.navy }}>
                        Selamat Datang di YAKBA
                    </h2>
                    <p className="text-base md:text-lg font-poppins text-gray-600 max-w-3xl mx-auto">
                        YAKBA Kindergarten adalah lembaga pendidikan anak usia dini yang berkomitmen untuk
                        memberikan pengalaman belajar terbaik dengan menggabungkan kurikulum modern dan nilai-nilai Islam.
                    </p>
                </div>

                {/* Vision & Mission Section */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-24">
                    {/* Vision */}
                    <div
                        ref={visionRef}
                        className="bg-linear-to-br from-green-50 to-green-100 rounded-2xl p-6 md:p-8 border-2 border-green-200"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: COLORS.green }}>
                                <Target className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-mochi-boom" style={{ color: COLORS.green }}>
                                Visi Kami
                            </h3>
                        </div>
                        <p className="font-poppins text-gray-700 leading-relaxed">
                            Menjadi lembaga pendidikan anak usia dini terdepan yang melahirkan generasi
                            cerdas, kreatif, dan berakhlak mulia, siap menghadapi tantangan masa depan
                            dengan landasan iman yang kuat.
                        </p>
                    </div>

                    {/* Mission */}
                    <div
                        ref={missionRef}
                        className="bg-linear-to-br from-blue-50 to-blue-100 rounded-2xl p-6 md:p-8 border-2 border-blue-200"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: COLORS.blue }}>
                                <Star className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-mochi-boom" style={{ color: COLORS.blue }}>
                                Misi Kami
                            </h3>
                        </div>
                        <ul className="font-poppins text-gray-700 space-y-2">
                            <li className="flex items-start gap-2">
                                <span className="text-blue-500 mt-1">•</span>
                                Menyelenggarakan pembelajaran yang menyenangkan dan bermakna
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-500 mt-1">•</span>
                                Menanamkan nilai-nilai Islam dan akhlak mulia
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-500 mt-1">•</span>
                                Mengembangkan potensi anak secara holistik
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-500 mt-1">•</span>
                                Membangun kemitraan yang kuat dengan orang tua
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Values Section */}
                <div ref={valuesRef} className="mb-16 md:mb-24">
                    <h2 className="text-2xl md:text-4xl font-mochi-boom text-center mb-8 md:mb-12" style={{ color: COLORS.navy }}>
                        Nilai-Nilai Kami
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                        {VALUES.map((value, index) => {
                            const Icon = value.icon
                            return (
                                <div
                                    key={index}
                                    className="value-card bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                                >
                                    <div
                                        className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-3 md:mb-4"
                                        style={{ backgroundColor: `${value.color}20` }}
                                    >
                                        <Icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: value.color }} />
                                    </div>
                                    <h4 className="font-mochi-boom text-base md:text-lg mb-1 md:mb-2" style={{ color: COLORS.navy }}>
                                        {value.title}
                                    </h4>
                                    <p className="font-poppins text-xs md:text-sm text-gray-600">
                                        {value.description}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* History Timeline Section */}
                <div ref={historyRef}>
                    <h2 className="text-2xl md:text-4xl font-mochi-boom text-center mb-8 md:mb-12" style={{ color: COLORS.navy }}>
                        Perjalanan Kami
                    </h2>
                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-green-400 via-pink-400 to-blue-400 md:-translate-x-1/2" />

                        {/* Timeline Items */}
                        <div className="space-y-8 md:space-y-12">
                            {HISTORY_TIMELINE.map((item, index) => (
                                <div
                                    key={index}
                                    className={`timeline-item relative flex items-center gap-4 md:gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                        }`}
                                >
                                    {/* Content Card */}
                                    <div className={`flex-1 ml-10 md:ml-0 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                                        <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-100">
                                            <span
                                                className="font-poppins text-lg md:text-xl"
                                                style={{ color: index % 3 === 0 ? COLORS.green : index % 3 === 1 ? COLORS.pink : COLORS.blue }}
                                            >
                                                {item.year}
                                            </span>
                                            <h4 className="font-mochi-boom text-base md:text-lg mt-1 mb-2" style={{ color: COLORS.navy }}>
                                                {item.title}
                                            </h4>
                                            <p className="font-poppins text-sm text-gray-600">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Timeline Dot */}
                                    <div
                                        className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full border-4 border-white shadow-md md:-translate-x-1/2"
                                        style={{
                                            backgroundColor: index % 3 === 0 ? COLORS.green : index % 3 === 1 ? COLORS.pink : COLORS.blue,
                                        }}
                                    />

                                    {/* Empty space for opposite side on desktop */}
                                    <div className="hidden md:block flex-1" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutContentSection

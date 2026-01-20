"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { COLORS } from "@/lib/constants"

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

// Data untuk tim
const TEAM_MEMBERS = [
    {
        name: "Ustadzah Sarah",
        role: "Kepala Sekolah",
        image: "/team-1.png",
        description: "Berpengalaman lebih dari 10 tahun dalam pendidikan anak usia dini.",
    },
    {
        name: "Ustadzah Fatimah",
        role: "Guru Aqidah & Akhlak",
        image: "/team-2.png",
        description: "Spesialis pengajaran nilai-nilai Islam dengan metode yang menyenangkan.",
    },
    {
        name: "Ustadz Ahmad",
        role: "Guru Bahasa Arab",
        image: "/team-3.png",
        description: "Lulusan pendidikan bahasa Arab dengan metodologi pengajaran modern.",
    },
    {
        name: "Ustadzah Khadijah",
        role: "Guru Kreatifitas",
        image: "/team-4.png",
        description: "Ahli dalam mengembangkan kreativitas dan seni pada anak-anak.",
    },
]

// Data statistik
const STATS = [
    { number: "500+", label: "Murid Terdaftar" },
    { number: "15+", label: "Tenaga Pengajar" },
    { number: "6", label: "Tahun Pengalaman" },
    { number: "98%", label: "Kepuasan Orang Tua" },
]

const AboutTeamSection = () => {
    const statsRef = useRef<HTMLDivElement>(null)
    const teamRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Animasi untuk Stats
        if (statsRef.current) {
            const statItems = statsRef.current.querySelectorAll(".stat-item")
            gsap.set(statItems, { y: 30, opacity: 0 })
            gsap.to(statItems, {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out",
                stagger: 0.1,
                scrollTrigger: {
                    trigger: statsRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            })
        }

        // Animasi untuk Team
        if (teamRef.current) {
            const teamCards = teamRef.current.querySelectorAll(".team-card")
            gsap.set(teamCards, { y: 50, opacity: 0 })
            gsap.to(teamCards, {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out",
                stagger: 0.15,
                scrollTrigger: {
                    trigger: teamRef.current,
                    start: "top 75%",
                    toggleActions: "play none none reverse",
                },
            })
        }
    }, [])

    return (
        <section className="w-full pt-16 md:pt-24 bg-linear-to-b from-sky-50 to-white">
            <div className="max-w-6xl mx-auto px-4 md:px-8">
                {/* Stats Section */}
                <div
                    ref={statsRef}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16 md:mb-24"
                >
                    {STATS.map((stat, index) => (
                        <div
                            key={index}
                            className="stat-item bg-white rounded-2xl p-4 md:p-6 text-center shadow-lg border border-gray-100"
                        >
                            <h3
                                className="text-2xl md:text-4xl font-poppins"
                                style={{
                                    color: index % 3 === 0 ? COLORS.green : index % 3 === 1 ? COLORS.pink : COLORS.blue,
                                }}
                            >
                                {stat.number}
                            </h3>
                            <p className="font-poppins text-sm md:text-base text-gray-600 mt-1">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Team Section */}
                <div ref={teamRef}>
                    <h2 className="text-2xl md:text-4xl font-mochi-boom text-center mb-4" style={{ color: COLORS.navy }}>
                        Tim Pengajar Kami
                    </h2>
                    <p className="text-center font-poppins text-gray-600 max-w-2xl mx-auto mb-8 md:mb-12">
                        Didukung oleh tenaga pengajar profesional yang berdedikasi tinggi dalam
                        mendidik dan membimbing anak-anak.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {TEAM_MEMBERS.map((member, index) => (
                            <div
                                key={index}
                                className="team-card bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                            >
                                {/* Image Placeholder */}
                                <div
                                    className="w-full aspect-square bg-linear-to-br from-sky-100 to-sky-200 flex items-center justify-center"
                                >
                                    <div
                                        className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-white text-2xl md:text-3xl font-mochi-boom"
                                        style={{
                                            backgroundColor: index % 3 === 0 ? COLORS.green : index % 3 === 1 ? COLORS.pink : COLORS.blue,
                                        }}
                                    >
                                        {member.name.charAt(0)}
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="p-3 md:p-4 text-center">
                                    <h4 className="font-mochi-boom text-sm md:text-base" style={{ color: COLORS.navy }}>
                                        {member.name}
                                    </h4>
                                    <p
                                        className="font-poppins text-xs md:text-sm font-medium"
                                        style={{
                                            color: index % 3 === 0 ? COLORS.green : index % 3 === 1 ? COLORS.pink : COLORS.blue,
                                        }}
                                    >
                                        {member.role}
                                    </p>
                                    <p className="font-poppins text-xs text-gray-500 mt-1 hidden md:block">
                                        {member.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutTeamSection

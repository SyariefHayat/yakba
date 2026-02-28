"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { COLORS } from "@/lib/constants"
import { GraduationCap, Award, Heart, BookOpen } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

// Interface untuk tentor item
interface TentorItem {
    id: number
    name: string
    role: string
    specialization: string
    image: string
    experience: string
    education: string
    quote: string
    accentColor: string
}

// Data tentor (dummy data - bisa diganti dengan data dari API)
const TENTORS: TentorItem[] = [
    {
        id: 1,
        name: "Ustadzah Fatimah, S.Pd",
        role: "Kepala Sekolah",
        specialization: "Pendidikan Anak Usia Dini",
        image: "/why-img-1.png",
        experience: "15 Tahun",
        education: "S1 PAUD - UNJ",
        quote: "Setiap anak adalah bintang yang bersinar dengan caranya sendiri.",
        accentColor: COLORS.blue,
    },
    {
        id: 2,
        name: "Ustadz Ahmad Fauzi, S.Ag",
        role: "Guru Mengaji",
        specialization: "Tahsin & Tahfidz",
        image: "/why-img-2.png",
        experience: "10 Tahun",
        education: "S1 PAI - UIN Jakarta",
        quote: "Mengajarkan Al-Quran dengan cinta agar anak mencintai Al-Quran.",
        accentColor: COLORS.green,
    },
    {
        id: 3,
        name: "Bunda Siti Aminah, S.Pd",
        role: "Guru Kelas A",
        specialization: "Kreativitas & Seni",
        image: "/why-img-3.png",
        experience: "8 Tahun",
        education: "S1 PAUD - UNESA",
        quote: "Bermain adalah cara terbaik anak belajar tentang dunia.",
        accentColor: COLORS.pink,
    },
    {
        id: 4,
        name: "Bunda Dewi Kartika, S.Pd",
        role: "Guru Kelas B",
        specialization: "Literasi & Numerasi",
        image: "/program-img-1.png",
        experience: "7 Tahun",
        education: "S1 PGPAUD - UPI",
        quote: "Membaca adalah jendela dunia, mari buka bersama.",
        accentColor: COLORS.blue,
    },
    {
        id: 5,
        name: "Ustadzah Nur Hidayah",
        role: "Guru Bahasa Arab",
        specialization: "Bahasa Arab Dasar",
        image: "/program-img-2.png",
        experience: "6 Tahun",
        education: "D3 Bahasa Arab - LIPIA",
        quote: "Bahasa Arab mudah dipelajari jika diajarkan dengan menyenangkan.",
        accentColor: COLORS.green,
    },
    {
        id: 6,
        name: "Bunda Ratna Sari, S.Pd",
        role: "Guru Seni",
        specialization: "Musik & Tari",
        image: "/program-img-3.png",
        experience: "5 Tahun",
        education: "S1 Seni Musik - ISI",
        quote: "Seni mengajarkan anak mengekspresikan diri dengan indah.",
        accentColor: COLORS.pink,
    },
]

// Stats highlight
const TENTOR_STATS = [
    { icon: <GraduationCap className="size-6" />, value: "100%", label: "Bersertifikat" },
    { icon: <Award className="size-6" />, value: "8+", label: "Rata-rata Pengalaman" },
    { icon: <Heart className="size-6" />, value: "500+", label: "Alumni Bangga" },
    { icon: <BookOpen className="size-6" />, value: "6", label: "Spesialisasi" },
]

const TentorListSection = () => {
    const titleRef = useRef<HTMLHeadingElement>(null)
    const statsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Animasi untuk title
        if (titleRef.current) {
            gsap.set(titleRef.current, {
                y: 100,
                opacity: 0,
            })

            gsap.to(titleRef.current, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 90%",
                    end: "top 20%",
                    toggleActions: "play none none none"
                }
            })
        }

        // Animasi untuk stats
        if (statsRef.current) {
            gsap.set(statsRef.current, {
                y: 50,
                opacity: 0,
            })

            gsap.to(statsRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: statsRef.current,
                    start: "top 90%",
                    end: "top 20%",
                    toggleActions: "play none none none"
                }
            })
        }
    }, [])

    return (
        <section className="w-full min-h-screen pt-10 md:pt-20 px-4 md:px-0 overflow-hidden bg-white">
            {/* Section Title */}
            <h2 ref={titleRef} className="text-3xl md:text-5xl font-mochi-boom text-[#1B83C8] text-center mb-6 md:mb-8">
                Tim Pengajar Kami
            </h2>

            {/* Stats Highlight */}
            <div
                ref={statsRef}
                className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10 md:mb-16 px-4"
            >
                {TENTOR_STATS.map((stat, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center px-4 py-3 md:px-8 md:py-4 bg-linear-to-br from-sky-50 to-sky-100 rounded-2xl min-w-[120px] md:min-w-[150px]"
                    >
                        <span className="text-[#1B83C8] mb-1">{stat.icon}</span>
                        <span className="font-poppins font-bold text-2xl md:text-3xl text-[#1F3B5A]">
                            {stat.value}
                        </span>
                        <span className="font-poppins text-xs md:text-sm text-gray-600 text-center">
                            {stat.label}
                        </span>
                    </div>
                ))}
            </div>

            {/* Tentors Grid */}
            <div className="w-[90%] md:w-[85%] lg:w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {TENTORS.map((tentor, index) => (
                    <TentorCard key={tentor.id} tentor={tentor} index={index} />
                ))}
            </div>
        </section>
    )
}

// Komponen untuk setiap tentor card
interface TentorCardProps {
    tentor: TentorItem
    index: number
}

const TentorCard = ({ tentor, index }: TentorCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (cardRef.current) {
            gsap.set(cardRef.current, {
                y: 80,
                opacity: 0
            })

            gsap.to(cardRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: (index % 3) * 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top 90%",
                    end: "top 20%",
                    toggleActions: "play none none none"
                }
            })
        }
    }, [index])

    return (
        <div
            ref={cardRef}
            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
        >
            {/* Image Container */}
            <div className="relative w-full h-56 md:h-64 overflow-hidden">
                <Image
                    src={tentor.image}
                    alt={tentor.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay gradient */}
                <div
                    className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"
                />

                {/* Role Badge */}
                <span
                    className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-white text-xs font-poppins font-semibold"
                    style={{ backgroundColor: tentor.accentColor }}
                >
                    {tentor.role}
                </span>

                {/* Name overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-mochi-boom text-xl md:text-2xl text-white mb-1">
                        {tentor.name}
                    </h3>
                    <p className="font-poppins text-sm text-white/80">
                        {tentor.specialization}
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 md:p-5">
                {/* Quote */}
                <p className="font-poppins text-sm text-gray-600 italic mb-4 line-clamp-2">
                    &ldquo;{tentor.quote}&rdquo;
                </p>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col">
                        <span className="font-poppins text-xs text-gray-500">Pengalaman</span>
                        <span
                            className="font-poppins font-bold text-lg"
                            style={{ color: tentor.accentColor }}
                        >
                            {tentor.experience}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-poppins text-xs text-gray-500">Pendidikan</span>
                        <span className="font-poppins text-sm text-[#1F3B5A] font-medium">
                            {tentor.education}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TentorListSection

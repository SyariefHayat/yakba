"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { COLORS } from "@/lib/constants"
import { Palette, BookOpen, Languages, Music, Calculator, Users, Clock, CheckCircle } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

// Interface untuk data program
interface ProgramDetail {
    id: string
    title: string
    subtitle: string
    description: string
    image: string
    bgColor: string
    accentColor: string
    icon: React.ElementType
    features: string[]
    schedule: string
    ageGroup: string
}

// Data program lengkap
const PROGRAMS_DATA: ProgramDetail[] = [
    {
        id: "kreativitas-seni",
        title: "Kreativitas Seni",
        subtitle: "Mengasah Bakat Seni Anak",
        description: "Program yang dirancang untuk mengembangkan kreativitas dan imajinasi anak melalui berbagai aktivitas seni seperti menggambar, melukis, membuat prakarya, dan kerajinan tangan. Anak-anak akan belajar mengekspresikan diri dan mengembangkan kemampuan motorik halus.",
        image: "/program-img-1.png",
        bgColor: "#D0995E",
        accentColor: "#F5D0A9",
        icon: Palette,
        features: [
            "Menggambar dan melukis dengan berbagai media",
            "Membuat prakarya dari bahan daur ulang",
            "Origami dan paper craft",
            "Kerajinan tangan dengan clay dan playdough",
            "Pameran karya seni bulanan"
        ],
        schedule: "Senin & Rabu, 09:00 - 10:30",
        ageGroup: "3 - 6 tahun"
    },
    {
        id: "belajar-mengaji",
        title: "Belajar Mengaji",
        subtitle: "Fondasi Keislaman Sejak Dini",
        description: "Program intensif mengaji dengan metode tahsin dan tajwid yang menyenangkan. Anak-anak akan belajar mengenal huruf hijaiyah, membaca Al-Quran dengan baik dan benar, serta menghafal surat-surat pendek dengan pendekatan yang sesuai usia.",
        image: "/program-img-2.png",
        bgColor: "#69B5D9",
        accentColor: "#B8E0F0",
        icon: BookOpen,
        features: [
            "Pengenalan huruf hijaiyah dengan metode interaktif",
            "Pembelajaran tajwid dasar",
            "Hafalan surat-surat pendek (Juz Amma)",
            "Doa-doa harian dan adab Islami",
            "Muroja'ah rutin dengan reward system"
        ],
        schedule: "Setiap hari, 08:00 - 09:00",
        ageGroup: "4 - 6 tahun"
    },
    {
        id: "kelas-bahasa",
        title: "Kelas Bahasa",
        subtitle: "Multilingual Learning",
        description: "Program pembelajaran bahasa asing dengan pendekatan permainan interaktif dan immersive learning. Fokus pada bahasa Arab dan bahasa Inggris untuk mempersiapkan anak menghadapi tantangan global dengan tetap berpegang pada nilai-nilai Islam.",
        image: "/program-img-3.png",
        bgColor: "#8B7A9E",
        accentColor: "#C9B8DB",
        icon: Languages,
        features: [
            "Bahasa Arab dasar dengan kosakata sehari-hari",
            "Bahasa Inggris melalui lagu dan cerita",
            "Flashcard dan games edukatif",
            "Role play dan conversation practice",
            "Pengenalan huruf dan angka dalam berbagai bahasa"
        ],
        schedule: "Selasa & Kamis, 09:00 - 10:30",
        ageGroup: "3 - 6 tahun"
    },
    {
        id: "musik-gerak",
        title: "Musik & Gerak",
        subtitle: "Ekspresi Melalui Ritme",
        description: "Program yang menggabungkan musik dan gerakan untuk mengembangkan koordinasi motorik, pendengaran, dan ekspresi diri anak. Melalui lagu-lagu Islami dan permainan musik, anak belajar rhythm, tempo, dan kreativitas.",
        image: "/program-img-1.png",
        bgColor: "#E88B8B",
        accentColor: "#F5C4C4",
        icon: Music,
        features: [
            "Pengenalan alat musik perkusi sederhana",
            "Lagu-lagu anak Islami",
            "Senam dan gerakan kreatif",
            "Permainan ritme dan tempo",
            "Penampilan musik di acara sekolah"
        ],
        schedule: "Jumat, 09:00 - 10:00",
        ageGroup: "3 - 6 tahun"
    },
    {
        id: "logika-matematika",
        title: "Logika & Matematika",
        subtitle: "Berhitung Sambil Bermain",
        description: "Program pembelajaran konsep matematika dasar melalui permainan dan manipulatif konkret. Anak-anak belajar mengenal angka, berhitung, mengenal bentuk geometri, dan konsep dasar matematika dengan cara yang menyenangkan.",
        image: "/program-img-2.png",
        bgColor: "#7CBF25",
        accentColor: "#C4E5A0",
        icon: Calculator,
        features: [
            "Pengenalan angka 1-100",
            "Operasi dasar penjumlahan dan pengurangan",
            "Pengenalan bentuk geometri",
            "Konsep ukuran dan perbandingan",
            "Puzzle dan permainan logika"
        ],
        schedule: "Senin - Jumat, 10:30 - 11:30",
        ageGroup: "4 - 6 tahun"
    },
    {
        id: "sosial-emosional",
        title: "Sosial Emosional",
        subtitle: "Tumbuh Bersama Teman",
        description: "Program pengembangan kecerdasan sosial dan emosional anak melalui berbagai aktivitas kelompok. Anak belajar berbagi, bekerja sama, mengelola emosi, dan membangun hubungan positif dengan teman sebaya.",
        image: "/program-img-3.png",
        bgColor: "#1B83C8",
        accentColor: "#8BC4E8",
        icon: Users,
        features: [
            "Circle time dan sharing session",
            "Permainan kelompok kooperatif",
            "Pengenalan dan pengelolaan emosi",
            "Roleplay situasi sosial",
            "Project bersama dan gotong royong"
        ],
        schedule: "Setiap hari, 11:30 - 12:00",
        ageGroup: "3 - 6 tahun"
    },
]

const ProgramsDetailSection = () => {
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
            const cards = programsRef.current.querySelectorAll(".program-detail-card")
            gsap.set(cards, { y: 60, opacity: 0 })
            gsap.to(cards, {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out",
                stagger: 0.15,
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
                <div ref={programsRef} className="space-y-8 md:space-y-12">
                    {PROGRAMS_DATA.map((program, index) => (
                        <ProgramDetailCard key={program.id} program={program} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}

// Komponen untuk setiap program detail card
const ProgramDetailCard = ({ program, index }: { program: ProgramDetail; index: number }) => {
    const Icon = program.icon
    const isEven = index % 2 === 0

    return (
        <div
            id={program.id}
            className={`program-detail-card flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-6 md:gap-8 bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100`}
        >
            {/* Image Section */}
            <div
                className="w-full md:w-2/5 h-60 md:h-auto min-h-[280px] relative"
                style={{ backgroundColor: program.accentColor }}
            >
                <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover"
                />
                <div
                    className="absolute top-4 left-4 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: program.bgColor }}
                >
                    <Icon className="w-6 h-6 text-white" />
                </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-6 md:p-8">
                <div className="mb-4">
                    <span
                        className="text-sm font-poppins font-medium px-3 py-1 rounded-full"
                        style={{ backgroundColor: program.accentColor, color: program.bgColor }}
                    >
                        {program.subtitle}
                    </span>
                </div>

                <h3
                    className="text-xl md:text-2xl font-mochi-boom mb-3"
                    style={{ color: program.bgColor }}
                >
                    {program.title}
                </h3>

                <p className="font-poppins text-gray-600 mb-4 text-sm md:text-base">
                    {program.description}
                </p>

                {/* Features List */}
                <div className="mb-4">
                    <h4 className="font-poppins font-semibold text-sm mb-2" style={{ color: COLORS.navy }}>
                        Yang Akan Dipelajari:
                    </h4>
                    <ul className="space-y-1.5">
                        {program.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm font-poppins text-gray-600">
                                <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: program.bgColor }} />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Schedule & Age Group */}
                <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" style={{ color: program.bgColor }} />
                        <span className="text-sm font-poppins text-gray-600">{program.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" style={{ color: program.bgColor }} />
                        <span className="text-sm font-poppins text-gray-600">Usia: {program.ageGroup}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProgramsDetailSection

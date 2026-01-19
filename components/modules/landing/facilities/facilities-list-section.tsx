"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { COLORS } from "@/lib/constants"
import {
    BookOpen,
    Utensils,
    Trees,
    GraduationCap,
    Music,
    Palette,
    ShieldCheck,
    Wifi,
    Car,
    Heart
} from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

// Interface untuk facility item
interface FacilityItem {
    id: number
    title: string
    description: string
    image: string
    icon: React.ReactNode
    features: string[]
    accentColor: string
}

// Data fasilitas (dummy data - bisa diganti dengan data dari API)
const FACILITIES: FacilityItem[] = [
    {
        id: 1,
        title: "Ruang Kelas Modern",
        description: "Ruang belajar yang nyaman dengan AC, pencahayaan optimal, dan peralatan multimedia untuk mendukung proses pembelajaran interaktif.",
        image: "/why-img-1.png",
        icon: <BookOpen className="size-6 md:size-8" />,
        features: ["AC & Ventilasi Baik", "Proyektor & Layar", "Meja & Kursi Ergonomis", "Papan Tulis Interaktif"],
        accentColor: COLORS.blue,
    },
    {
        id: 2,
        title: "Area Bermain Outdoor",
        description: "Playground aman dengan berbagai permainan edukatif yang dirancang untuk mengembangkan motorik kasar anak.",
        image: "/why-img-2.png",
        icon: <Trees className="size-6 md:size-8" />,
        features: ["Ayunan & Perosotan", "Area Pasir", "Rumput Sintetis", "Pengawasan CCTV"],
        accentColor: COLORS.green,
    },
    {
        id: 3,
        title: "Kantin Sehat",
        description: "Menyediakan makanan bergizi dengan menu yang bervariasi dan diawasi oleh ahli gizi untuk memenuhi kebutuhan nutrisi anak.",
        image: "/why-img-3.png",
        icon: <Utensils className="size-6 md:size-8" />,
        features: ["Menu Bergizi", "Kebersihan Terjamin", "Tanpa MSG", "Snack Sehat"],
        accentColor: COLORS.pink,
    },
    {
        id: 4,
        title: "Ruang Musik",
        description: "Dilengkapi berbagai alat musik untuk mengembangkan bakat dan kreativitas anak dalam bidang seni musik.",
        image: "/program-img-1.png",
        icon: <Music className="size-6 md:size-8" />,
        features: ["Piano & Keyboard", "Alat Perkusi", "Ruang Kedap Suara", "Audio System"],
        accentColor: COLORS.blue,
    },
    {
        id: 5,
        title: "Studio Seni",
        description: "Ruang kreativitas untuk melukis, menggambar, dan membuat prakarya dengan perlengkapan seni yang lengkap.",
        image: "/program-img-2.png",
        icon: <Palette className="size-6 md:size-8" />,
        features: ["Cat & Kuas Lengkap", "Meja Gambar", "Display Karya", "Perlengkapan Craft"],
        accentColor: COLORS.green,
    },
    {
        id: 6,
        title: "Perpustakaan Mini",
        description: "Koleksi buku cerita anak, ensiklopedia bergambar, dan buku islami untuk menumbuhkan minat baca sejak dini.",
        image: "/program-img-3.png",
        icon: <GraduationCap className="size-6 md:size-8" />,
        features: ["1000+ Buku Anak", "Area Baca Nyaman", "Buku Bergambar", "Koleksi Islami"],
        accentColor: COLORS.pink,
    },
]

// Keunggulan fasilitas
const FACILITY_HIGHLIGHTS = [
    { icon: <ShieldCheck className="size-6" />, label: "Keamanan 24 Jam" },
    { icon: <Wifi className="size-6" />, label: "WiFi Gratis" },
    { icon: <Car className="size-6" />, label: "Area Parkir Luas" },
    { icon: <Heart className="size-6" />, label: "UKS Lengkap" },
]

const FacilitiesListSection = () => {
    const titleRef = useRef<HTMLHeadingElement>(null)
    const highlightsRef = useRef<HTMLDivElement>(null)

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

        // Animasi untuk highlights
        if (highlightsRef.current) {
            gsap.set(highlightsRef.current, {
                y: 50,
                opacity: 0,
            })

            gsap.to(highlightsRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: highlightsRef.current,
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
                Fasilitas Kami
            </h2>

            {/* Facility Highlights */}
            <div
                ref={highlightsRef}
                className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10 md:mb-16 px-4"
            >
                {FACILITY_HIGHLIGHTS.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-yellow-100 rounded-full"
                    >
                        <span className="text-yellow-600">{item.icon}</span>
                        <span className="font-poppins text-sm md:text-base font-medium text-gray-700">
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>

            {/* Facilities List */}
            <div className="w-[90%] md:w-[85%] lg:w-[80%] mx-auto space-y-12 md:space-y-20">
                {FACILITIES.map((facility, index) => (
                    <FacilityCard
                        key={facility.id}
                        facility={facility}
                        index={index}
                        isReversed={index % 2 === 1}
                    />
                ))}
            </div>
        </section>
    )
}

// Komponen untuk setiap facility card
interface FacilityCardProps {
    facility: FacilityItem
    index: number
    isReversed: boolean
}

const FacilityCard = ({ facility, index, isReversed }: FacilityCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const imageDirection = isReversed ? 100 : -100
        const contentDirection = isReversed ? -100 : 100

        // Animasi untuk image
        if (imageRef.current) {
            gsap.set(imageRef.current, {
                x: imageDirection,
                opacity: 0
            })

            gsap.to(imageRef.current, {
                x: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top 80%",
                    end: "top 20%",
                    toggleActions: "play none none none"
                }
            })
        }

        // Animasi untuk content
        if (contentRef.current) {
            gsap.set(contentRef.current, {
                x: contentDirection,
                opacity: 0
            })

            gsap.to(contentRef.current, {
                x: 0,
                opacity: 1,
                duration: 0.8,
                delay: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top 80%",
                    end: "top 20%",
                    toggleActions: "play none none none"
                }
            })
        }
    }, [index, isReversed])

    return (
        <div
            ref={cardRef}
            className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-6 md:gap-10 lg:gap-16`}
        >
            {/* Image */}
            <div
                ref={imageRef}
                className="w-full md:w-1/2 relative"
            >
                <div
                    className="relative h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-xl"
                    style={{
                        border: `4px solid ${facility.accentColor}`,
                    }}
                >
                    <Image
                        src={facility.image}
                        alt={facility.title}
                        fill
                        className="object-cover"
                    />
                    {/* Icon Badge */}
                    <div
                        className="absolute top-4 left-4 p-3 rounded-full text-white shadow-lg"
                        style={{ backgroundColor: facility.accentColor }}
                    >
                        {facility.icon}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div
                ref={contentRef}
                className="w-full md:w-1/2 text-center md:text-left"
            >
                <h3
                    className="font-mochi-boom text-2xl md:text-3xl lg:text-4xl mb-3 md:mb-4"
                    style={{ color: facility.accentColor }}
                >
                    {facility.title}
                </h3>
                <p className="font-poppins text-gray-600 text-base md:text-lg mb-4 md:mb-6">
                    {facility.description}
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-2 md:gap-3">
                    {facility.features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg"
                        >
                            <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: facility.accentColor }}
                            />
                            <span className="font-poppins text-sm text-gray-700">
                                {feature}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FacilitiesListSection

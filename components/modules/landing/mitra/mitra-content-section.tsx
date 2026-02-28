"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { COLORS } from "@/lib/constants"
import {
    Handshake,
    TrendingUp,
    Users,
    BookOpen,
    HeadphonesIcon,
    BadgeCheck,
    CheckCircle2,
    ArrowRight,
    Phone
} from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

// Keuntungan menjadi mitra
const BENEFITS = [
    {
        icon: <Handshake className="size-8 md:size-10" />,
        title: "Brand Terpercaya",
        description: "Gunakan brand YAKBA yang sudah dikenal dan dipercaya masyarakat.",
        color: COLORS.blue,
    },
    {
        icon: <BookOpen className="size-8 md:size-10" />,
        title: "Kurikulum Siap Pakai",
        description: "Dapatkan kurikulum lengkap yang sudah teruji dan terstandar.",
        color: COLORS.green,
    },
    {
        icon: <HeadphonesIcon className="size-8 md:size-10" />,
        title: "Support Penuh",
        description: "Tim support yang siap membantu operasional sekolah Anda.",
        color: COLORS.pink,
    },
    {
        icon: <Users className="size-8 md:size-10" />,
        title: "Training Guru",
        description: "Pelatihan guru secara berkala untuk menjaga kualitas pengajaran.",
        color: COLORS.blue,
    },
    {
        icon: <TrendingUp className="size-8 md:size-10" />,
        title: "Potensi Profit Tinggi",
        description: "Bisnis pendidikan dengan demand tinggi dan profit menjanjikan.",
        color: COLORS.green,
    },
    {
        icon: <BadgeCheck className="size-8 md:size-10" />,
        title: "Izin & Legalitas",
        description: "Bantuan pengurusan izin dan legalitas sekolah.",
        color: COLORS.pink,
    },
]

// Paket kemitraan
interface PartnershipPackage {
    name: string
    price: string
    description: string
    features: string[]
    isPopular?: boolean
    color: string
}

const PACKAGES: PartnershipPackage[] = [
    {
        name: "Paket Starter",
        price: "75 Juta",
        description: "Cocok untuk memulai bisnis pendidikan anak usia dini.",
        features: [
            "Lisensi brand YAKBA 3 tahun",
            "Kurikulum dasar",
            "Training guru 2 orang",
            "Marketing kit standar",
            "Support via WhatsApp",
        ],
        color: COLORS.blue,
    },
    {
        name: "Paket Business",
        price: "150 Juta",
        description: "Paket lengkap untuk bisnis yang lebih besar.",
        features: [
            "Lisensi brand YAKBA 5 tahun",
            "Kurikulum lengkap + update",
            "Training guru 5 orang",
            "Marketing kit premium",
            "Support prioritas 24/7",
            "Konsultasi lokasi",
            "Desain interior ruangan",
        ],
        isPopular: true,
        color: COLORS.green,
    },
    {
        name: "Paket Premium",
        price: "250 Juta",
        description: "Solusi turnkey untuk investor serius.",
        features: [
            "Lisensi brand YAKBA lifetime",
            "Kurikulum premium + custom",
            "Training unlimited guru",
            "Full marketing support",
            "Dedicated account manager",
            "Setup lokasi lengkap",
            "Rekrutmen guru",
            "Grand opening support",
        ],
        color: COLORS.pink,
    },
]

// Langkah bergabung
const STEPS = [
    { step: 1, title: "Hubungi Kami", description: "Konsultasi awal tentang kemitraan" },
    { step: 2, title: "Presentasi", description: "Penjelasan detail program mitra" },
    { step: 3, title: "Survey Lokasi", description: "Tim kami survey lokasi Anda" },
    { step: 4, title: "Penandatanganan", description: "MoU dan kontrak kerjasama" },
    { step: 5, title: "Persiapan", description: "Setup lokasi dan training" },
    { step: 6, title: "Grand Opening", description: "Pembukaan sekolah baru!" },
]

const MitraContentSection = () => {
    const titleRef = useRef<HTMLHeadingElement>(null)
    const benefitsRef = useRef<HTMLDivElement>(null)
    const packagesRef = useRef<HTMLDivElement>(null)
    const stepsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Animasi untuk title
        if (titleRef.current) {
            gsap.set(titleRef.current, { y: 100, opacity: 0 })
            gsap.to(titleRef.current, {
                y: 0, opacity: 1, duration: 1, ease: "power3.out",
                scrollTrigger: { trigger: titleRef.current, start: "top 90%", toggleActions: "play none none none" }
            })
        }
    }, [])

    return (
        <section className="w-full min-h-screen pt-10 md:pt-20 px-4 md:px-0 overflow-hidden bg-white">
            {/* Section Title */}
            <h2 ref={titleRef} className="text-3xl md:text-5xl font-mochi-boom text-[#1B83C8] text-center mb-4 md:mb-6">
                Jadilah Mitra YAKBA
            </h2>
            <p className="font-poppins text-gray-600 text-center max-w-2xl mx-auto mb-10 md:mb-16 px-4">
                Wujudkan mimpi Anda memiliki bisnis pendidikan anak usia dini dengan bergabung menjadi mitra YAKBA Kindergarten.
            </p>

            {/* Benefits Grid */}
            <div ref={benefitsRef} className="w-[90%] md:w-[85%] lg:w-[80%] mx-auto mb-16 md:mb-24">
                <h3 className="text-2xl md:text-3xl font-mochi-boom text-[#1F3B5A] text-center mb-8">
                    Keuntungan Menjadi Mitra
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {BENEFITS.map((benefit, index) => (
                        <BenefitCard key={index} benefit={benefit} index={index} />
                    ))}
                </div>
            </div>

            {/* Partnership Packages */}
            <div ref={packagesRef} className="w-full bg-linear-to-br from-sky-50 to-sky-100 py-12 md:py-20 mb-16 md:mb-24">
                <h3 className="text-2xl md:text-3xl font-mochi-boom text-[#1F3B5A] text-center mb-8 md:mb-12">
                    Pilihan Paket Kemitraan
                </h3>
                <div className="w-[90%] md:w-[85%] lg:w-[80%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {PACKAGES.map((pkg, index) => (
                        <PackageCard key={index} package={pkg} index={index} />
                    ))}
                </div>
            </div>

            {/* Steps to Join */}
            <div ref={stepsRef} className="w-[90%] md:w-[85%] lg:w-[80%] mx-auto mb-16 md:mb-24">
                <h3 className="text-2xl md:text-3xl font-mochi-boom text-[#1F3B5A] text-center mb-8 md:mb-12">
                    Langkah Bergabung
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                    {STEPS.map((step, index) => (
                        <StepCard key={index} step={step} index={index} />
                    ))}
                </div>
            </div>

            {/* CTA Contact */}
            <div className="w-[90%] md:w-[70%] lg:w-[60%] mx-auto text-center bg-[#1F3B5A] rounded-3xl p-8 md:p-12 mb-10">
                <h3 className="text-2xl md:text-3xl font-mochi-boom text-white mb-4">
                    Tertarik Menjadi Mitra?
                </h3>
                <p className="font-poppins text-white/80 mb-6">
                    Hubungi tim kami sekarang untuk konsultasi gratis!
                </p>
                <Button className="bg-yellow-300 hover:bg-yellow-400 text-black font-poppins font-semibold px-8 py-6 text-base cursor-pointer">
                    <Phone className="size-5 mr-2" />
                    Hubungi Kami
                </Button>
            </div>
        </section>
    )
}

// Benefit Card Component
interface BenefitCardProps {
    benefit: typeof BENEFITS[0]
    index: number
}

const BenefitCard = ({ benefit, index }: BenefitCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (cardRef.current) {
            gsap.set(cardRef.current, { y: 50, opacity: 0 })
            gsap.to(cardRef.current, {
                y: 0, opacity: 1, duration: 0.6, delay: (index % 3) * 0.1, ease: "power3.out",
                scrollTrigger: { trigger: cardRef.current, start: "top 90%", toggleActions: "play none none none" }
            })
        }
    }, [index])

    return (
        <div
            ref={cardRef}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
        >
            <div
                className="w-16 h-16 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${benefit.color}20`, color: benefit.color }}
            >
                {benefit.icon}
            </div>
            <h4 className="font-mochi-boom text-xl text-[#1F3B5A] mb-2">
                {benefit.title}
            </h4>
            <p className="font-poppins text-sm text-gray-600">
                {benefit.description}
            </p>
        </div>
    )
}

// Package Card Component
interface PackageCardProps {
    package: PartnershipPackage
    index: number
}

const PackageCard = ({ package: pkg, index }: PackageCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (cardRef.current) {
            gsap.set(cardRef.current, { y: 80, opacity: 0 })
            gsap.to(cardRef.current, {
                y: 0, opacity: 1, duration: 0.8, delay: index * 0.15, ease: "power3.out",
                scrollTrigger: { trigger: cardRef.current, start: "top 90%", toggleActions: "play none none none" }
            })
        }
    }, [index])

    return (
        <div
            ref={cardRef}
            className={`relative bg-white p-6 md:p-8 rounded-2xl shadow-xl ${pkg.isPopular ? 'ring-4 ring-yellow-300 scale-105' : ''}`}
        >
            {pkg.isPopular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-300 text-black font-poppins font-semibold text-sm px-4 py-1 rounded-full">
                    Paling Populer
                </span>
            )}
            <h4
                className="font-mochi-boom text-xl md:text-2xl mb-2"
                style={{ color: pkg.color }}
            >
                {pkg.name}
            </h4>
            <div className="mb-4">
                <span className="font-poppins font-bold text-3xl md:text-4xl text-[#1F3B5A]">Rp {pkg.price}</span>
            </div>
            <p className="font-poppins text-sm text-gray-600 mb-6">
                {pkg.description}
            </p>
            <ul className="space-y-3 mb-6">
                {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 font-poppins text-sm">
                        <CheckCircle2 className="size-5 text-green-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
            <Button
                className="w-full bg-yellow-300 hover:bg-yellow-400 text-black font-poppins font-semibold cursor-pointer"
            >
                Pilih Paket
                <ArrowRight className="size-4 ml-1" />
            </Button>
        </div>
    )
}

// Step Card Component
interface StepCardProps {
    step: typeof STEPS[0]
    index: number
}

const StepCard = ({ step, index }: StepCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (cardRef.current) {
            gsap.set(cardRef.current, { scale: 0.8, opacity: 0 })
            gsap.to(cardRef.current, {
                scale: 1, opacity: 1, duration: 0.5, delay: index * 0.1, ease: "back.out(1.7)",
                scrollTrigger: { trigger: cardRef.current, start: "top 90%", toggleActions: "play none none none" }
            })
        }
    }, [index])

    return (
        <div ref={cardRef} className="text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 rounded-full bg-yellow-300 flex items-center justify-center">
                <span className="font-poppins font-bold text-xl md:text-2xl text-[#1F3B5A]">{step.step}</span>
            </div>
            <h4 className="font-mochi-boom text-sm md:text-base text-[#1F3B5A] mb-1">
                {step.title}
            </h4>
            <p className="font-poppins text-xs text-gray-600">
                {step.description}
            </p>
        </div>
    )
}

export default MitraContentSection

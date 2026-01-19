"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { COLORS } from "@/lib/constants"
import {
    Calendar,
    MapPin,
    Clock,
    Gift,
    Sparkles,
    Percent,
    ArrowRight,
    Tag
} from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

// Interface untuk event item
interface EventItem {
    id: number
    title: string
    description: string
    image: string
    date: string
    time: string
    location: string
    category: "promo" | "event" | "workshop"
    discount?: string
    isUpcoming: boolean
    accentColor: string
}

// Data event (dummy data - bisa diganti dengan data dari API)
const EVENTS: EventItem[] = [
    {
        id: 1,
        title: "Diskon Pendaftaran 50%",
        description: "Promo spesial awal tahun! Dapatkan potongan 50% untuk biaya pendaftaran siswa baru. Berlaku untuk pendaftaran program TK A dan TK B.",
        image: "/program-img-1.png",
        date: "1 - 31 Januari 2026",
        time: "08:00 - 16:00 WIB",
        location: "Semua Cabang YAKBA",
        category: "promo",
        discount: "50%",
        isUpcoming: true,
        accentColor: COLORS.pink,
    },
    {
        id: 2,
        title: "Open House YAKBA",
        description: "Kunjungi sekolah kami dan lihat langsung fasilitas serta metode pembelajaran yang kami terapkan. Gratis konsultasi dengan tim pengajar!",
        image: "/program-img-2.png",
        date: "15 Februari 2026",
        time: "09:00 - 12:00 WIB",
        location: "YAKBA Pusat Jakarta",
        category: "event",
        isUpcoming: true,
        accentColor: COLORS.blue,
    },
    {
        id: 3,
        title: "Workshop Parenting Islami",
        description: "Seminar dan workshop tentang mendidik anak sesuai nilai-nilai Islam. Pembicara: Ustadz Dr. Abdullah Ahmad.",
        image: "/program-img-3.png",
        date: "22 Februari 2026",
        time: "10:00 - 15:00 WIB",
        location: "Aula YAKBA Jakarta",
        category: "workshop",
        isUpcoming: true,
        accentColor: COLORS.green,
    },
    {
        id: 4,
        title: "Gratis Seragam untuk 50 Pendaftar Pertama",
        description: "Daftarkan anak Anda sekarang dan dapatkan 1 set seragam gratis! Promo terbatas untuk 50 pendaftar pertama.",
        image: "/why-img-1.png",
        date: "1 - 15 Maret 2026",
        time: "08:00 - 16:00 WIB",
        location: "Semua Cabang YAKBA",
        category: "promo",
        isUpcoming: true,
        accentColor: COLORS.pink,
    },
    {
        id: 5,
        title: "Festival Anak Sholeh",
        description: "Lomba mewarnai, hafalan surat pendek, dan fashion show busana muslim untuk anak usia 3-6 tahun.",
        image: "/why-img-2.png",
        date: "10 Maret 2026",
        time: "08:00 - 14:00 WIB",
        location: "Lapangan YAKBA",
        category: "event",
        isUpcoming: true,
        accentColor: COLORS.blue,
    },
    {
        id: 6,
        title: "Kelas Trial Gratis",
        description: "Coba pengalaman belajar di YAKBA selama 1 hari penuh. Gratis dan tanpa komitmen pendaftaran!",
        image: "/why-img-3.png",
        date: "Setiap Sabtu",
        time: "08:00 - 11:00 WIB",
        location: "Semua Cabang YAKBA",
        category: "promo",
        isUpcoming: true,
        accentColor: COLORS.green,
    },
]

// Category filter
const CATEGORIES = [
    { label: "Semua", value: "all", icon: <Sparkles className="size-4" /> },
    { label: "Promo", value: "promo", icon: <Percent className="size-4" /> },
    { label: "Event", value: "event", icon: <Calendar className="size-4" /> },
    { label: "Workshop", value: "workshop", icon: <Gift className="size-4" /> },
]

const EventListSection = () => {
    const titleRef = useRef<HTMLHeadingElement>(null)
    const [selectedCategory, setSelectedCategory] = useState("all")

    const filteredEvents = selectedCategory === "all"
        ? EVENTS
        : EVENTS.filter(event => event.category === selectedCategory)

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
    }, [])

    return (
        <section className="w-full min-h-screen pt-10 md:pt-20 px-4 md:px-0 overflow-hidden bg-white">
            {/* Section Title */}
            <h2 ref={titleRef} className="text-3xl md:text-5xl font-mochi-boom text-[#1B83C8] text-center mb-4 md:mb-6">
                Event & Promo
            </h2>
            <p className="font-poppins text-gray-600 text-center max-w-2xl mx-auto mb-8 md:mb-12 px-4">
                Jangan lewatkan berbagai promo menarik dan acara spesial dari YAKBA Kindergarten!
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12 px-4">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat.value}
                        onClick={() => setSelectedCategory(cat.value)}
                        className={`
                            flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full font-poppins text-sm md:text-base font-medium 
                            transition-all duration-300 cursor-pointer
                            ${selectedCategory === cat.value
                                ? "bg-yellow-300 text-black shadow-lg scale-105"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }
                        `}
                    >
                        {cat.icon}
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Events Grid */}
            <div className="w-[90%] md:w-[85%] lg:w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredEvents.map((event, index) => (
                    <EventCard key={event.id} event={event} index={index} />
                ))}
            </div>

            {/* Empty State */}
            {filteredEvents.length === 0 && (
                <div className="text-center py-20">
                    <p className="font-poppins text-gray-500 text-lg">
                        Tidak ada event untuk kategori ini
                    </p>
                </div>
            )}
        </section>
    )
}

// Komponen untuk setiap event card
interface EventCardProps {
    event: EventItem
    index: number
}

const EventCard = ({ event, index }: EventCardProps) => {
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

    const getCategoryIcon = () => {
        switch (event.category) {
            case "promo": return <Percent className="size-4" />
            case "event": return <Calendar className="size-4" />
            case "workshop": return <Gift className="size-4" />
        }
    }

    const getCategoryLabel = () => {
        switch (event.category) {
            case "promo": return "Promo"
            case "event": return "Event"
            case "workshop": return "Workshop"
        }
    }

    return (
        <div
            ref={cardRef}
            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
        >
            {/* Image Container */}
            <div className="relative w-full h-48 md:h-56 overflow-hidden">
                <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Category Badge */}
                <span
                    className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-poppins font-semibold"
                    style={{ backgroundColor: event.accentColor }}
                >
                    {getCategoryIcon()}
                    {getCategoryLabel()}
                </span>

                {/* Discount Badge */}
                {event.discount && (
                    <span className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-full bg-yellow-300 text-black text-sm font-poppins font-bold">
                        <Tag className="size-4" />
                        {event.discount}
                    </span>
                )}

                {/* Upcoming Badge */}
                {event.isUpcoming && (
                    <div className="absolute bottom-4 left-4 right-4">
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500 text-white text-xs font-poppins rounded">
                            <Sparkles className="size-3" />
                            Akan Datang
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5 md:p-6">
                {/* Title */}
                <h3 className="font-poppins font-bold text-lg md:text-xl text-[#1F3B5A] mb-2 group-hover:text-[#1B83C8] transition-colors line-clamp-2">
                    {event.title}
                </h3>

                {/* Description */}
                <p className="font-poppins text-sm text-gray-600 line-clamp-2 mb-4">
                    {event.description}
                </p>

                {/* Event Details */}
                <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="size-4" style={{ color: event.accentColor }} />
                        <span className="font-poppins">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="size-4" style={{ color: event.accentColor }} />
                        <span className="font-poppins">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin className="size-4" style={{ color: event.accentColor }} />
                        <span className="font-poppins">{event.location}</span>
                    </div>
                </div>

                {/* CTA Button */}
                <Button
                    className="w-full bg-yellow-300 hover:bg-yellow-400 text-black font-poppins font-semibold cursor-pointer"
                >
                    Selengkapnya
                    <ArrowRight className="size-4 ml-1" />
                </Button>
            </div>
        </div>
    )
}

export default EventListSection

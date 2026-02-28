"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { COLORS } from "@/lib/constants"

gsap.registerPlugin(ScrollTrigger)

// Interface untuk gallery item
interface GalleryItem {
    id: number
    image: string
    title: string
    category: string
    categoryColor: string
}

// Data gallery items (dummy data - bisa diganti dengan data dari API)
const GALLERY_ITEMS: GalleryItem[] = [
    {
        id: 1,
        image: "/gallery-1.png",
        title: "Kegiatan Belajar Mengaji",
        category: "Pendidikan",
        categoryColor: COLORS.green,
    },
    {
        id: 2,
        image: "/gallery-2.png",
        title: "Bermain Bersama Teman",
        category: "Aktivitas",
        categoryColor: COLORS.pink,
    },
    {
        id: 3,
        image: "/gallery-3.png",
        title: "Kelas Kreativitas Seni",
        category: "Seni",
        categoryColor: COLORS.blue,
    },
    {
        id: 4,
        image: "/gallery-4.png",
        title: "Olahraga Pagi",
        category: "Olahraga",
        categoryColor: COLORS.green,
    },
    {
        id: 5,
        image: "/why-img-1.png",
        title: "Belajar Bahasa Arab",
        category: "Pendidikan",
        categoryColor: COLORS.pink,
    },
    {
        id: 6,
        image: "/why-img-2.png",
        title: "Kegiatan Outdoor",
        category: "Aktivitas",
        categoryColor: COLORS.blue,
    },
    {
        id: 7,
        image: "/why-img-3.png",
        title: "Praktik Sholat",
        category: "Pendidikan",
        categoryColor: COLORS.green,
    },
    {
        id: 8,
        image: "/program-img-1.png",
        title: "Membuat Prakarya",
        category: "Seni",
        categoryColor: COLORS.pink,
    },
    {
        id: 9,
        image: "/program-img-2.png",
        title: "Lomba Mewarnai",
        category: "Event",
        categoryColor: COLORS.blue,
    },
    {
        id: 10,
        image: "/program-img-3.png",
        title: "Wisuda Santri",
        category: "Event",
        categoryColor: COLORS.green,
    },
    {
        id: 11,
        image: "/gallery-1.png",
        title: "Kegiatan Ramadhan",
        category: "Event",
        categoryColor: COLORS.pink,
    },
    {
        id: 12,
        image: "/gallery-3.png",
        title: "Field Trip",
        category: "Aktivitas",
        categoryColor: COLORS.blue,
    },
]

// Category filter buttons
const CATEGORIES = [
    { label: "Semua", value: "all" },
    { label: "Pendidikan", value: "Pendidikan" },
    { label: "Aktivitas", value: "Aktivitas" },
    { label: "Seni", value: "Seni" },
    { label: "Event", value: "Event" },
    { label: "Olahraga", value: "Olahraga" },
]

const GalleryGridSection = () => {
    const titleRef = useRef<HTMLHeadingElement>(null)
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)
    const [currentIndex, setCurrentIndex] = useState(0)

    const filteredItems = selectedCategory === "all"
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter(item => item.category === selectedCategory)

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

    // Handle lightbox navigation
    const openLightbox = (item: GalleryItem, index: number) => {
        setSelectedImage(item)
        setCurrentIndex(index)
    }

    const closeLightbox = () => {
        setSelectedImage(null)
    }

    const goToPrevious = () => {
        const newIndex = currentIndex === 0 ? filteredItems.length - 1 : currentIndex - 1
        setCurrentIndex(newIndex)
        setSelectedImage(filteredItems[newIndex])
    }

    const goToNext = () => {
        const newIndex = currentIndex === filteredItems.length - 1 ? 0 : currentIndex + 1
        setCurrentIndex(newIndex)
        setSelectedImage(filteredItems[newIndex])
    }

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!selectedImage) return
            if (e.key === "Escape") closeLightbox()
            if (e.key === "ArrowLeft") goToPrevious()
            if (e.key === "ArrowRight") goToNext()
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [selectedImage, currentIndex])

    return (
        <>
            <section className="w-full min-h-screen pt-10 md:pt-20 px-4 md:px-0 overflow-hidden bg-white">
                {/* Section Title */}
                <h2 ref={titleRef} className="text-3xl md:text-5xl font-mochi-boom text-[#1B83C8] text-center mb-6 md:mb-10">
                    Galeri Aktivitas
                </h2>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12 px-4">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.value}
                            onClick={() => setSelectedCategory(cat.value)}
                            className={`
                                px-4 py-2 md:px-6 md:py-3 rounded-full font-poppins text-sm md:text-base font-medium 
                                transition-all duration-300 cursor-pointer
                                ${selectedCategory === cat.value
                                    ? "bg-yellow-300 text-black shadow-lg scale-105"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }
                            `}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Gallery Grid - Masonry Style */}
                <div className="w-[90%] md:w-[85%] lg:w-[80%] mx-auto columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6">
                    {filteredItems.map((item, index) => (
                        <GalleryCard
                            key={item.id}
                            item={item}
                            index={index}
                            onClick={() => openLightbox(item, index)}
                        />
                    ))}
                </div>

                {/* Empty State */}
                {filteredItems.length === 0 && (
                    <div className="text-center py-20">
                        <p className="font-poppins text-gray-500 text-lg">
                            Tidak ada foto untuk kategori ini
                        </p>
                    </div>
                )}
            </section>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
                    onClick={closeLightbox}
                >
                    {/* Close Button */}
                    <button
                        className="absolute top-4 right-4 p-2 text-white hover:bg-white/20 rounded-full transition-colors cursor-pointer"
                        onClick={closeLightbox}
                    >
                        <X className="size-8" />
                    </button>

                    {/* Previous Button */}
                    <button
                        className="absolute left-4 p-2 text-white hover:bg-white/20 rounded-full transition-colors cursor-pointer"
                        onClick={(e) => { e.stopPropagation(); goToPrevious() }}
                    >
                        <ChevronLeft className="size-10" />
                    </button>

                    {/* Image */}
                    <div
                        className="relative max-w-[90vw] max-h-[80vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={selectedImage.image}
                            alt={selectedImage.title}
                            width={1200}
                            height={800}
                            className="max-h-[80vh] w-auto object-contain rounded-lg"
                        />
                        {/* Caption */}
                        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-4 md:p-6 rounded-b-lg">
                            <span
                                className="inline-block px-3 py-1 rounded-full text-white text-xs font-poppins font-semibold mb-2"
                                style={{ backgroundColor: selectedImage.categoryColor }}
                            >
                                {selectedImage.category}
                            </span>
                            <h3 className="font-mochi-boom text-white text-lg md:text-2xl">
                                {selectedImage.title}
                            </h3>
                        </div>
                    </div>

                    {/* Next Button */}
                    <button
                        className="absolute right-4 p-2 text-white hover:bg-white/20 rounded-full transition-colors cursor-pointer"
                        onClick={(e) => { e.stopPropagation(); goToNext() }}
                    >
                        <ChevronRight className="size-10" />
                    </button>

                    {/* Counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white font-poppins text-sm">
                        {currentIndex + 1} / {filteredItems.length}
                    </div>
                </div>
            )}
        </>
    )
}

// Komponen untuk setiap gallery card
interface GalleryCardProps {
    item: GalleryItem
    index: number
    onClick: () => void
}

const GalleryCard = ({ item, index, onClick }: GalleryCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (cardRef.current) {
            gsap.set(cardRef.current, {
                y: 50,
                opacity: 0
            })

            gsap.to(cardRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.6,
                delay: (index % 4) * 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top 95%",
                    end: "top 20%",
                    toggleActions: "play none none none"
                }
            })
        }
    }, [index])

    // Vary heights for masonry effect
    const heightClass = index % 3 === 0 ? "h-64 md:h-80" : index % 3 === 1 ? "h-48 md:h-64" : "h-56 md:h-72"

    return (
        <div
            ref={cardRef}
            className={`relative ${heightClass} mb-4 md:mb-6 break-inside-avoid group cursor-pointer overflow-hidden rounded-xl`}
            onClick={onClick}
        >
            <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Category Badge */}
            <span
                className="absolute top-3 left-3 px-2 py-1 rounded-full text-white text-xs font-poppins font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: item.categoryColor }}
            >
                {item.category}
            </span>

            {/* Title */}
            <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-mochi-boom text-white text-sm md:text-base">
                    {item.title}
                </h3>
            </div>
        </div>
    )
}

export default GalleryGridSection

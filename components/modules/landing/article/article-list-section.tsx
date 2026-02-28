"use client"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"
import { Calendar, ArrowRight, User } from "lucide-react"
import { COLORS } from "@/lib/constants"

gsap.registerPlugin(ScrollTrigger)

// Interface untuk data artikel
interface ArticleItem {
    id: number
    title: string
    excerpt: string
    image: string
    category: string
    categoryColor: string
    author: string
    date: string
    slug: string
}

// Data artikel (dummy data - bisa diganti dengan data dari API)
const ARTICLES: ArticleItem[] = [
    {
        id: 1,
        title: "Tips Mengajarkan Anak Mengaji Sejak Dini",
        excerpt: "Panduan lengkap bagaimana cara mengajarkan anak mengaji dengan metode yang menyenangkan dan efektif untuk usia dini.",
        image: "/why-img-1.png",
        category: "Pendidikan Islam",
        categoryColor: COLORS.green,
        author: "Ustadz Ahmad",
        date: "15 Januari 2026",
        slug: "tips-mengajarkan-anak-mengaji",
    },
    {
        id: 2,
        title: "Pentingnya Bermain untuk Perkembangan Anak",
        excerpt: "Bermain bukan hanya kegiatan menyenangkan, tapi juga penting untuk perkembangan motorik dan kognitif anak.",
        image: "/why-img-2.png",
        category: "Perkembangan Anak",
        categoryColor: COLORS.pink,
        author: "Dr. Siti Nurhaliza",
        date: "12 Januari 2026",
        slug: "pentingnya-bermain-untuk-anak",
    },
    {
        id: 3,
        title: "Mengenal Huruf Arab dengan Cara Menyenangkan",
        excerpt: "Metode interaktif untuk memperkenalkan huruf hijaiyah kepada anak-anak dengan permainan edukatif.",
        image: "/why-img-3.png",
        category: "Bahasa Arab",
        categoryColor: COLORS.blue,
        author: "Ustadzah Fatimah",
        date: "10 Januari 2026",
        slug: "mengenal-huruf-arab-menyenangkan",
    },
    {
        id: 4,
        title: "Membangun Karakter Anak Sejak Usia Dini",
        excerpt: "Strategi dan tips untuk menanamkan nilai-nilai positif dan membentuk karakter baik pada anak.",
        image: "/program-img-1.png",
        category: "Pendidikan Karakter",
        categoryColor: COLORS.green,
        author: "Bunda Aminah",
        date: "8 Januari 2026",
        slug: "membangun-karakter-anak",
    },
    {
        id: 5,
        title: "Aktivitas Kreatif untuk Anak di Rumah",
        excerpt: "Ide-ide kegiatan seni dan prakarya yang bisa dilakukan bersama anak di rumah untuk mengembangkan kreativitas.",
        image: "/program-img-2.png",
        category: "Kreativitas",
        categoryColor: COLORS.pink,
        author: "Ibu Ratna",
        date: "5 Januari 2026",
        slug: "aktivitas-kreatif-anak-rumah",
    },
    {
        id: 6,
        title: "Makanan Sehat untuk Tumbuh Kembang Anak",
        excerpt: "Panduan nutrisi dan rekomendasi makanan bergizi untuk mendukung pertumbuhan optimal anak usia dini.",
        image: "/program-img-3.png",
        category: "Kesehatan",
        categoryColor: COLORS.blue,
        author: "Dr. Hasan",
        date: "2 Januari 2026",
        slug: "makanan-sehat-tumbuh-kembang",
    },
]

// Interface props untuk ArticleCard dengan index
interface ArticleCardProps extends ArticleItem {
    index: number
}

const ArticleListSection = () => {
    const titleRef = useRef<HTMLHeadingElement>(null)

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
            <h2 ref={titleRef} className="text-3xl md:text-5xl font-mochi-boom text-[#1B83C8] text-center mb-8 md:mb-14">
                Artikel Terbaru
            </h2>

            {/* Articles Grid */}
            <div className="w-[90%] md:w-[85%] lg:w-[80%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mx-auto">
                {ARTICLES.map((article, index) => (
                    <ArticleCard key={article.id} {...article} index={index} />
                ))}
            </div>

            {/* Load More Button */}
            <div className="flex justify-center mt-10 md:mt-14">
                <Button className="bg-yellow-300 hover:bg-yellow-400 text-black font-poppins font-semibold px-8 py-6 text-base cursor-pointer">
                    Lihat Semua Artikel
                    <ArrowRight className="ml-2 size-5" />
                </Button>
            </div>
        </section>
    )
}

// Komponen untuk setiap article card
const ArticleCard = ({ title, excerpt, image, category, categoryColor, author, date, slug, index }: ArticleCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (cardRef.current) {
            // Set initial state - card tersembunyi di bawah
            gsap.set(cardRef.current, {
                y: 80,
                opacity: 0
            })

            // Animate dengan delay berdasarkan index (stagger effect)
            gsap.to(cardRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: (index % 3) * 0.15, // Delay bergantian per row
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
        <Link href={`/article/${slug}`}>
            <div
                ref={cardRef}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-gray-100"
            >
                {/* Image Container */}
                <div className="relative w-full h-48 md:h-56 overflow-hidden">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Category Badge */}
                    <span
                        className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-white text-xs font-poppins font-semibold"
                        style={{ backgroundColor: categoryColor }}
                    >
                        {category}
                    </span>
                </div>

                {/* Content */}
                <div className="p-5 md:p-6">
                    {/* Title */}
                    <h3 className="font-mochi-boom text-lg md:text-xl text-[#1F3B5A] group-hover:text-[#1B83C8] transition-colors line-clamp-2 mb-2">
                        {title}
                    </h3>

                    {/* Excerpt */}
                    <p className="font-poppins text-sm md:text-base text-gray-600 line-clamp-3 mb-4">
                        {excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-xs md:text-sm font-poppins text-gray-500 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-1.5">
                            <User className="size-4" />
                            <span>{author}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Calendar className="size-4" />
                            <span>{date}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ArticleListSection

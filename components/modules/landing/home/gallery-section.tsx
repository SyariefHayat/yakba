"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// Type untuk ukuran gallery item
type GallerySize = "small" | "large"

// Interface untuk gallery item
interface GalleryItem {
    image: string
    size: GallerySize
    isDashed?: boolean
}

// Interface untuk gallery column
interface GalleryColumn {
    items: GalleryItem[]
    columnClass?: string  // Class tambahan untuk column
}

// Data gallery columns
const GALLERY_COLUMNS: GalleryColumn[] = [
    {
        items: [
            { image: "/gallery-1.png", size: "small", isDashed: false },
            { image: "/gallery-2.png", size: "large", isDashed: true },
        ],
        columnClass: "items-end py-5 md:py-10",
    },
    {
        items: [
            { image: "/gallery-3.png", size: "large", isDashed: false },
            { image: "/gallery-4.png", size: "small", isDashed: true },
        ],
    },
    {
        items: [
            { image: "/gallery-2.png", size: "large", isDashed: true },
            { image: "/gallery-1.png", size: "small", isDashed: false },
        ],
        columnClass: "items-end py-5 md:py-10",
    },
    {
        items: [
            { image: "/gallery-2.png", size: "small", isDashed: false },
            { image: "/gallery-3.png", size: "large", isDashed: true },
        ],
        columnClass: "items-end pb-10 md:pb-20",
    },
]

// Size mapping untuk class - responsive
const SIZE_CLASSES: Record<GallerySize, string> = {
    small: "w-full h-32 md:h-40",
    large: "w-full h-full",
}

const GallerySection = () => {
    const titleRef = useRef<HTMLHeadingElement>(null)
    const pathRef = useRef<SVGPathElement>(null)
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        // Animasi untuk title (dari bawah ke atas)
        if (titleRef.current) {
            gsap.set(titleRef.current, {
                y: 100,
                opacity: 0
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
                    toggleActions: "play none none reverse"
                }
            })
        }

        // Animasi draw on scroll untuk SVG path (dari kiri ke kanan)
        if (pathRef.current && sectionRef.current) {
            const pathLength = pathRef.current.getTotalLength()

            // Set initial state - path tersembunyi
            gsap.set(pathRef.current, {
                strokeDasharray: pathLength,
                strokeDashoffset: pathLength  // Positif untuk dari kiri ke kanan
            })

            // Animate strokeDashoffset berdasarkan scroll
            gsap.to(pathRef.current, {
                strokeDashoffset: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",      // Mulai lebih cepat
                    end: "center center",   // Selesai saat section di tengah viewport
                    scrub: 0.5              // Lebih responsif
                }
            })
        }
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-screen bg-[url('/gallery-bg.png')] bg-cover py-20 md:py-40 pb-30 md:pb-50 md:mb-10 px-4 md:px-0 overflow-hidden"
        >
            {/* Section Title */}
            <h2
                ref={titleRef}
                className="text-3xl md:text-6xl font-mochi-boom text-white text-center"
            >
                Galeri Aktivitas Kami
            </h2>

            {/* SVG Line dengan animasi draw on scroll */}
            <div className="hidden md:block md:rotate-50 lg:rotate-0 absolute w-[1450px] md:top-170 md:-left-70 lg:top-80 lg:-left-10 z-10">
                <svg
                    width="1533"
                    height="538"
                    viewBox="0 0 1533 538"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto"
                >
                    <path
                        ref={pathRef}
                        d="M20.1672 357.008C20.1672 357.008 264.667 23.0089 356.667 25.0089C448.667 27.0089 56.6672 455.25 163.167 508.5C269.667 561.75 660.167 -10.5 743.667 36.5C827.167 83.5 461.667 429.5 602.667 498C743.667 566.5 1523.67 261 1523.67 261"
                        stroke="#FECACA"
                        strokeWidth="50"
                        strokeLinecap="round"
                    />
                </svg>
            </div>

            {/* Gallery Grid */}
            <div className="relative z-20 w-full md:w-[80%] grid grid-cols-2 lg:flex lg:flex-row items-center justify-between gap-4 md:gap-10 mx-auto mt-8 md:mt-14">
                {GALLERY_COLUMNS.map((column, columnIndex) => (
                    <GalleryColumnComponent
                        key={columnIndex}
                        {...column}
                        index={columnIndex}
                        sectionRef={sectionRef}
                        totalColumns={GALLERY_COLUMNS.length}
                    />
                ))}
            </div>
        </section>
    )
}

// Interface untuk props GalleryColumnComponent dengan index
interface GalleryColumnProps extends GalleryColumn {
    index: number
    sectionRef: React.RefObject<HTMLElement | null>
    totalColumns: number
}

// Komponen untuk setiap column
const GalleryColumnComponent = ({ items, columnClass = "", index, sectionRef, totalColumns }: GalleryColumnProps) => {
    const columnRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (columnRef.current && sectionRef.current) {
            // Set initial state - scale kecil dan transparan
            gsap.set(columnRef.current, {
                scale: 0.8,
                opacity: 0
            })

            // Animate berdasarkan scroll progress yang sama dengan line
            gsap.to(columnRef.current, {
                scale: 1,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: `top 70%`,   // Mulai saat masuk viewport
                    end: `center center`,       // Selesai lebih ke tengah
                    scrub: 1,
                }
            })
        }
    }, [index, sectionRef, totalColumns])

    return (
        <div
            ref={columnRef}
            className={`w-full h-80 md:h-150 flex flex-col gap-4 md:gap-10 ${columnClass}`}
        >
            {items.map((item, itemIndex) => (
                <GalleryItemComponent key={itemIndex} {...item} />
            ))}
        </div>
    )
}

// Komponen untuk setiap gallery item
const GalleryItemComponent = ({ image, size, isDashed = false }: GalleryItem) => {
    const sizeClass = SIZE_CLASSES[size]
    const outlineClass = isDashed ? "outline-dashed" : ""

    return (
        <div
            className={`
                ${sizeClass}
                bg-white rounded-lg md:rounded-xl bg-cover bg-center 
                outline-2 md:outline-4 outline-white ${outlineClass}
            `}
            style={{ backgroundImage: `url('${image}')` }}
        />
    )
}

export default GallerySection

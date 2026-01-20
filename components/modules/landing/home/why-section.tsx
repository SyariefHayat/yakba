"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { Button } from "@/components/ui/button"
import Link from "next/link"

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

// Type untuk posisi image
type ImagePosition = "left" | "right"

// Interface untuk data Why Item
interface WhyItem {
    title: string
    description: string
    image: string
    imagePosition: ImagePosition
}

// Data untuk setiap item "Why"
const WHY_ITEMS: WhyItem[] = [
    {
        title: "Belajar interaktif",
        description: "Belajar aktif yang menumbuhkan rasa ingin tahu dan percaya diri",
        image: "/why-img-1.png",
        imagePosition: "right",
    },
    {
        title: "Kurikulum islami & bahasa arab",
        description: "Pembelajaran nilai islam dan bahasa arab sejak dini untuk membentuk akhlak dan dasar berbahasa anak.",
        image: "/why-img-2.png",
        imagePosition: "left",
    },
    {
        title: "Fleksibel & terukur",
        description: "Pilihan kelas online dan offline dengan perkembangan anak yang nyata dan terpantau.",
        image: "/why-img-3.png",
        imagePosition: "right",
    },
]

const WhySection = () => {
    const titleRef = useRef<HTMLHeadingElement>(null)
    const pathRef = useRef<SVGPathElement>(null)
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        // Animasi untuk title
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

        // Animasi draw on scroll untuk SVG path
        if (pathRef.current && sectionRef.current) {
            const pathLength = pathRef.current.getTotalLength()

            // Set initial state - path tersembunyi (dari arah atas)
            gsap.set(pathRef.current, {
                strokeDasharray: pathLength,
                strokeDashoffset: -pathLength  // Negatif agar mulai dari atas
            })

            // Animate strokeDashoffset berdasarkan scroll (dari atas ke bawah)
            gsap.to(pathRef.current, {
                strokeDashoffset: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                    end: "bottom bottom",
                    scrub: 1 // Smooth scrubbing effect
                }
            })
        }
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-screen bg-[url('/bg.png')] bg-cover py-10 md:pb-30 z-20 overflow-hidden"
        >
            {/* Section Title */}
            <h2
                ref={titleRef}
                className="relative z-20 text-3xl md:text-6xl font-mochi-boom text-white text-center px-4"
            >
                Kenapa Memilih Kami ?
            </h2>

            {/* SVG Line dengan animasi draw on scroll */}
            <div className="hidden md:block md:w-[1120px] lg:w-[1160px] absolute md:top-15 lg:top-10 -right-20 z-10">
                <svg
                    width="1140"
                    height="1565"
                    viewBox="0 0 1140 1565"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto"
                >
                    <path
                        ref={pathRef}
                        d="M1115 1534.29C1096.66 1534.85 642.475 1578.2 723.15 1417.2C803.825 1256.2 874.305 1219.39 743.097 1168.39C611.889 1117.38 24.9999 1060.17 25 751.483C25.0001 442.797 788.686 617.098 790.083 442.797C791.481 268.495 466.053 163.382 1107.46 25.0054"
                        stroke="#DCFCE7"
                        strokeWidth="50"
                        strokeLinecap="round"
                    />
                </svg>
            </div>

            {/* Why Items Container */}
            <div className="w-[80%] relative z-20 flex flex-col gap-14 mx-auto md:gap-30 mt-14 px-4 md:px-0">
                {WHY_ITEMS.map((item, index) => (
                    <WhyCard key={index} {...item} />
                ))}
            </div>
        </section>
    )
}

// Komponen untuk setiap card
const WhyCard = ({ title, description, image, imagePosition }: WhyItem) => {
    const imageRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Arah animasi berdasarkan imagePosition
        // Jika imagePosition = "left": image dari kiri, text dari kanan
        // Jika imagePosition = "right": image dari kanan, text dari kiri
        const imageXStart = imagePosition === "left" ? -150 : 150
        const textXStart = imagePosition === "left" ? 150 : -150

        // Animasi untuk image
        if (imageRef.current) {
            gsap.set(imageRef.current, {
                x: imageXStart,
                opacity: 0
            })

            gsap.to(imageRef.current, {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: imageRef.current,
                    start: "top 70%",
                    end: "top 20%",
                    toggleActions: "play none none reverse"
                }
            })
        }

        // Animasi untuk text
        if (textRef.current) {
            gsap.set(textRef.current, {
                x: textXStart,
                opacity: 0
            })

            gsap.to(textRef.current, {
                x: 0,
                opacity: 1,
                duration: 1,
                delay: 0.2, // Sedikit delay agar terlihat berurutan
                ease: "power3.out",
                scrollTrigger: {
                    trigger: textRef.current,
                    start: "top 85%",
                    end: "top 20%",
                    toggleActions: "play none none reverse"
                }
            })
        }
    }, [imagePosition])

    // Komponen teks
    const TextContent = (
        <div
            ref={textRef}
            className="w-full md:w-95 space-y-2 text-center md:text-left"
        >
            <h3 className="font-mochi-boom text-2xl md:text-4xl text-white">
                {title}
            </h3>
            <p className="font-poppins text-base md:text-lg text-white">
                {description}
            </p>
            <Button className="mt-2 bg-yellow-300 hover:bg-yellow-400 text-black cursor-pointer" asChild>
                <Link href="/about">Lihat lebih detail</Link>
            </Button>
        </div>
    )

    // Komponen gambar
    const ImageContent = (
        <div
            ref={imageRef}
            className="w-full h-60 md:w-150 md:h-96 rounded-2xl bg-cover bg-center border-4 md:border-8 border-white"
            style={{ backgroundImage: `url('${image}')` }}
        />
    )

    // Di mobile: selalu gambar di atas, teks di bawah (flex-col)
    // Di desktop: sesuai imagePosition (flex-row / flex-row-reverse)
    const desktopOrder = imagePosition === "left" ? "md:flex-row" : "md:flex-row-reverse"

    return (
        <div className={`w-full flex flex-col ${desktopOrder} items-center justify-center gap-6 md:gap-10`}>
            {ImageContent}
            {TextContent}
        </div>
    )
}

export default WhySection
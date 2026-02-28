"use client"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"

gsap.registerPlugin(ScrollTrigger)

// Interface untuk data program
interface ProgramItem {
    title: string
    description: string
    image: string
    bgColor: string      // Warna background card
    headerBgColor: string // Warna background header/image area
    slug: string         // Slug untuk link ke detail
}

// Interface untuk props ProgramCard dengan index
interface ProgramCardProps extends ProgramItem {
    index: number
}

// Data program unggulan
const PROGRAMS: ProgramItem[] = [
    {
        title: "Kreativitas Seni",
        description: "Menggambar, melukis, membuat prakarya untuk mengasah kreativitas anak.",
        image: "/program-img-1.png",
        bgColor: "#D0995E",
        headerBgColor: "bg-orange-300",
        slug: "kreativitas-seni",
    },
    {
        title: "Belajar Mengaji",
        description: "Program intensif mengaji dengan metode tahsin dan tajwid.",
        image: "/program-img-2.png",
        bgColor: "#69B5D9",
        headerBgColor: "bg-sky-300",
        slug: "belajar-mengaji",
    },
    {
        title: "Kelas Bahasa",
        description: "Belajar bahasa asing dengan pendekatan permainan interaktif.",
        image: "/program-img-3.png",
        bgColor: "#8B7A9E",
        headerBgColor: "bg-[#AA8FC7]",
        slug: "kelas-bahasa",
    },
]

const ProgramSection = () => {
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
                    toggleActions: "play none none reverse"
                }
            })
        }
    }, [])

    return (
        <section className="w-full min-h-screen py-10 mb-10 px-4 md:px-0 overflow-hidden">
            {/* Section Title */}
            <h2 ref={titleRef} className="text-3xl md:text-6xl font-mochi-boom text-[#1B83C8] text-center">
                Program Unggulan Kami
            </h2>

            {/* Program Cards Container */}
            <div className="w-[70%] md:w-[80%] flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 items-center justify-between gap-6 md:gap-10 mx-auto mt-10 md:mt-14">
                {PROGRAMS.map((program, index) => (
                    <ProgramCard key={index} {...program} index={index} />
                ))}
            </div>
        </section>
    )
}

// Komponen untuk setiap program card
const ProgramCard = ({ title, description, image, bgColor, headerBgColor, slug, index }: ProgramCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (cardRef.current) {
            // Set initial state - card tersembunyi di kanan
            gsap.set(cardRef.current, {
                x: 150,
                opacity: 0
            })

            // Animate dengan delay berdasarkan index (stagger effect)
            gsap.to(cardRef.current, {
                x: 0,
                opacity: 1,
                duration: 1,
                delay: index * 0.2, // Delay bergantian: 0s, 0.2s, 0.4s
                ease: "power3.out",
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top 85%",
                    end: "top 20%",
                    toggleActions: "play none none reverse"
                }
            })
        }
    }, [index])

    return (
        <div
            ref={cardRef}
            className="w-full md:w-auto md:flex-1 flex flex-col items-center md:gap-5 rounded-md"
            style={{ backgroundColor: bgColor }}
        >
            {/* Image Header */}
            <div className={`w-full h-48 md:h-60 lg:h-72 p-4 md:p-5 ${headerBgColor} rounded-b-3xl md:rounded-b-4xl rounded-t-md`}>
                <Image
                    src={image}
                    alt={title}
                    width={0}
                    height={0}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="w-full h-full rounded-md border-4 border-white object-cover"
                />
            </div>

            {/* Content */}
            <div className="p-4 pb-5 md:pb-12 md:px-5 text-center md:text-left">
                <h3 className="font-mochi-boom text-xl md:text-2xl lg:text-3xl text-white">
                    {title}
                </h3>
                <p className="font-poppins text-base md:text-lg text-white mt-1">
                    {description}
                </p>
                <Button className="mt-3 bg-yellow-300 hover:bg-yellow-400 text-black cursor-pointer" asChild>
                    <Link href={`/programs/${slug}`}>Lihat lebih detail</Link>
                </Button>
            </div>
        </div>
    )
}

export default ProgramSection

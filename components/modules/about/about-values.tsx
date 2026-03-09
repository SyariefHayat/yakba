"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const values = [
    {
        title: "Guru Berpengalaman",
        description:
            "Tim pengajar kami terlatih dalam metode pembelajaran kreatif dan memahami kebutuhan setiap anak.",
        icon: (
            <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
                <circle cx="24" cy="16" r="8" stroke="#E85206" strokeWidth="2.5" />
                <path d="M8 42c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="#E85206" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M30 10l4-6M18 10l-4-6" stroke="#E85206" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
        accentColor: "#E85206",
    },
    {
        title: "Kurikulum Terstruktur",
        description:
            "Program belajar dirancang sistematis sesuai tahap perkembangan anak dengan hasil belajar yang terukur.",
        icon: (
            <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
                <rect x="8" y="6" width="32" height="36" rx="4" stroke="#0474BE" strokeWidth="2.5" />
                <path d="M16 16h16M16 24h12M16 32h8" stroke="#0474BE" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M32 30l4 4 6-8" stroke="#0474BE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        accentColor: "#0474BE",
    },
    {
        title: "Lingkungan Aman",
        description:
            "Suasana belajar yang nyaman, aman, dan mendukung agar anak merasa percaya diri untuk bereksplorasi.",
        icon: (
            <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
                <path d="M24 4L6 14v12c0 10 8 16.5 18 20 10-3.5 18-10 18-20V14L24 4z" stroke="#1A3F26" strokeWidth="2.5" strokeLinejoin="round" />
                <path d="M17 24l5 5 10-10" stroke="#1A3F26" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        accentColor: "#1A3F26",
    },
    {
        title: "Produk Edukasi",
        description:
            "Koleksi produk digital dan fisik seperti video doa, materi edukasi, dan buku mewarnai untuk mendukung belajar di rumah.",
        icon: (
            <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
                <rect x="6" y="10" width="20" height="28" rx="3" stroke="#E85206" strokeWidth="2.5" />
                <rect x="22" y="14" width="20" height="28" rx="3" stroke="#0474BE" strokeWidth="2.5" fill="white" />
                <path d="M28 24h8M28 30h6" stroke="#0474BE" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
        accentColor: "#E85206",
    },
    {
        title: "Program Kemitraan",
        description:
            "Peluang bagi guru dan individu untuk membuka pusat bimbingan belajar bermerek Yakba di wilayah mereka.",
        icon: (
            <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
                <circle cx="16" cy="16" r="6" stroke="#1A3F26" strokeWidth="2.5" />
                <circle cx="32" cy="16" r="6" stroke="#0474BE" strokeWidth="2.5" />
                <path d="M4 38c0-6.627 5.373-12 12-12h2" stroke="#1A3F26" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M44 38c0-6.627-5.373-12-12-12h-2" stroke="#0474BE" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M20 34h8" stroke="#E85206" strokeWidth="3" strokeLinecap="round" />
            </svg>
        ),
        accentColor: "#0474BE",
    },
    {
        title: "Harga Terjangkau",
        description:
            "Akses pendidikan berkualitas dengan biaya yang ramah di kantong keluarga Indonesia.",
        icon: (
            <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
                <circle cx="24" cy="24" r="18" stroke="#1A3F26" strokeWidth="2.5" />
                <path d="M24 12v24M18 18c0-3.5 3-5 6-5s6 1.5 6 5-3 4.5-6 5-6 1.5-6 5 3 5 6 5 6-1.5 6-5" stroke="#1A3F26" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
        ),
        accentColor: "#1A3F26",
    },
];

const AboutValues = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (!sectionRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                toggleActions: "play none none none",
            },
        });

        if (headingRef.current) {
            tl.fromTo(
                headingRef.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
            );
        }

        cardRefs.current.forEach((el) => {
            if (el) {
                tl.fromTo(
                    el,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
                    "-=0.15"
                );
            }
        });

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="w-full bg-white py-20 md:py-28 lg:py-32 px-6 md:px-12 lg:px-20 overflow-hidden"
        >
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div ref={headingRef} className="text-center mb-16" style={{ opacity: 0 }}>
                    <h2 className="font-mochi text-3xl md:text-4xl lg:text-5xl text-[#1A3F26] mb-4">
                        Mengapa Yakba?
                    </h2>
                    <p className="font-poppins text-base md:text-lg text-[#1A3F26]/70 max-w-2xl mx-auto">
                        Alasan orang tua mempercayakan pendidikan anak mereka kepada kami
                    </p>
                    <div className="w-20 h-1.5 bg-[#E85206] rounded-full mx-auto mt-6" />
                </div>

                {/* Values Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {values.map((value, index) => (
                        <div
                            key={index}
                            ref={(el) => { cardRefs.current[index] = el; }}
                            className="group relative bg-white border-2 border-gray-100 hover:border-transparent rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-default"
                            style={{ opacity: 0 }}
                        >
                            {/* Hover background gradient */}
                            <div
                                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{
                                    background: `linear-gradient(135deg, ${value.accentColor}08, ${value.accentColor}15)`,
                                }}
                            />

                            <div className="relative z-10">
                                {/* Icon */}
                                <div
                                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                                    style={{ backgroundColor: `${value.accentColor}12` }}
                                >
                                    {value.icon}
                                </div>

                                {/* Content */}
                                <h3 className="font-poppins text-lg font-bold text-[#1A3F26] mb-2">
                                    {value.title}
                                </h3>
                                <p className="font-poppins text-sm text-[#1A3F26]/65 leading-relaxed">
                                    {value.description}
                                </p>
                            </div>

                            {/* Accent line */}
                            <div
                                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 rounded-full group-hover:w-16 transition-all duration-500"
                                style={{ backgroundColor: value.accentColor }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutValues;

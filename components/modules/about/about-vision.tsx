"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Star from "../elements/star";

gsap.registerPlugin(ScrollTrigger);

const visionItems = [
    {
        title: "Visi",
        description:
            "Menjadi learning center terdepan yang menginspirasi anak-anak Indonesia untuk mencintai proses belajar melalui pendekatan kreatif dan menyenangkan.",
        icon: (
            <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
                <circle cx="24" cy="24" r="18" stroke="white" strokeWidth="2.5" opacity="0.3" />
                <circle cx="24" cy="24" r="10" stroke="white" strokeWidth="2.5" opacity="0.5" />
                <circle cx="24" cy="24" r="4" fill="#FFD502" />
            </svg>
        ),
    },
];

const missionItems = [
    {
        title: "Metode Menyenangkan",
        description:
            "Menghadirkan metode belajar bercerita, bermain, dan bernyanyi yang membuat anak-anak antusias dalam setiap sesi pembelajaran.",
        icon: "🎨",
    },
    {
        title: "Pemberdayaan Guru",
        description:
            "Membuka kesempatan bagi para guru untuk bergabung sebagai mitra dan membangun pusat bimbingan belajar mereka sendiri.",
        icon: "👩‍🏫",
    },
    {
        title: "Produk Edukasi Berkualitas",
        description:
            "Menyediakan produk edukasi digital dan fisik yang dirancang khusus untuk mendukung tumbuh kembang anak.",
        icon: "📚",
    },
    {
        title: "Membangun Kepercayaan",
        description:
            "Menjadi partner terpercaya bagi orang tua dalam mendampingi proses belajar anak-anak mereka.",
        icon: "🤝",
    },
];

const AboutVision = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const visionCardRef = useRef<HTMLDivElement>(null);
    const missionCardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (!sectionRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                toggleActions: "play none none none",
            },
        });

        if (visionCardRef.current) {
            tl.fromTo(
                visionCardRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
            );
        }

        missionCardsRef.current.forEach((el) => {
            if (el) {
                tl.fromTo(
                    el,
                    { y: 40, opacity: 0, scale: 0.95 },
                    { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.2)" },
                    "-=0.25"
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
            className="w-full bg-[#1A3F26] py-20 md:py-28 lg:py-32 px-6 md:px-12 lg:px-20 overflow-hidden relative"
        >
            {/* Decorative stars */}
            <Star delay={0.5} className="top-[10%] left-[5%] md:left-[10%]" />
            <Star delay={1.2} className="top-[15%] right-[8%] md:right-[12%]" />
            <Star delay={1.8} className="bottom-[15%] left-[8%]" />
            <Star delay={2.4} className="bottom-[10%] right-[5%]" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="font-mochi text-3xl md:text-4xl lg:text-5xl text-white mb-4">
                        Visi & Misi
                    </h2>
                    <div className="w-20 h-1.5 bg-[#FFD502] rounded-full mx-auto" />
                </div>

                {/* Vision Card */}
                {visionItems.map((item, index) => (
                    <div
                        key={index}
                        ref={visionCardRef}
                        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 md:p-10 mb-12 text-center max-w-3xl mx-auto"
                        style={{ opacity: 0 }}
                    >
                        <div className="flex justify-center mb-5">{item.icon}</div>
                        <h3 className="font-mochi text-2xl md:text-3xl text-[#FFD502] mb-4">
                            {item.title}
                        </h3>
                        <p className="font-poppins text-base md:text-lg text-white/85 leading-relaxed">
                            {item.description}
                        </p>
                    </div>
                ))}

                {/* Mission Cards */}
                <div className="text-center mb-10">
                    <h3 className="font-mochi text-2xl md:text-3xl text-[#FFD502]">
                        Misi Kami
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {missionItems.map((item, index) => (
                        <div
                            key={index}
                            ref={(el) => { missionCardsRef.current[index] = el; }}
                            className="group bg-white/5 hover:bg-white/15 border border-white/10 hover:border-[#FFD502]/30 rounded-2xl p-6 md:p-8 transition-all duration-300 cursor-default"
                            style={{ opacity: 0 }}
                        >
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                {item.icon}
                            </div>
                            <h4 className="font-poppins text-lg md:text-xl font-bold text-white mb-3">
                                {item.title}
                            </h4>
                            <p className="font-poppins text-sm md:text-base text-white/70 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Decorative wave top */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
                <svg
                    viewBox="0 0 1440 80"
                    className="w-full h-10 md:h-14 lg:h-16"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,20 C240,60 480,0 720,40 C960,80 1200,20 1440,50 L1440,80 L0,80 Z"
                        fill="white"
                    />
                </svg>
            </div>

            {/* Decorative wave bottom */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                <svg
                    viewBox="0 0 1440 80"
                    className="w-full h-10 md:h-14 lg:h-16"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,40 C360,80 720,10 1080,50 C1260,70 1380,30 1440,45 L1440,80 L0,80 Z"
                        fill="#FFD502"
                    />
                </svg>
            </div>
        </section>
    );
};

export default AboutVision;

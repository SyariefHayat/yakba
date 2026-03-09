"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Star from "../elements/star";

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        number: "01",
        title: "Hubungi Kami",
        description: "Kirim pesan via WhatsApp untuk menyatakan minat menjadi mitra Yakba.",
        color: "#E85206",
    },
    {
        number: "02",
        title: "Interview & Seleksi",
        description: "Tim Yakba akan melakukan wawancara singkat untuk mengenal Anda lebih baik.",
        color: "#0474BE",
    },
    {
        number: "03",
        title: "Pelatihan Metode",
        description: "Ikuti pelatihan metode pengajaran Yakba: bercerita, bermain, dan bernyanyi.",
        color: "#1A3F26",
    },
    {
        number: "04",
        title: "Mulai Mengajar",
        description: "Buka kelompok bimbingan belajar Yakba di daerahmu dan mulai memberanikan anak-anak belajar!",
        color: "#E85206",
    },
];

const MitraSteps = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const stepsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current || !headingRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
            },
        });

        tl.fromTo(
            headingRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
        );

        if (stepsRef.current) {
            const items = stepsRef.current.querySelectorAll("[data-step]");
            tl.fromTo(
                items,
                { x: -40, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.5, stagger: 0.15, ease: "power3.out" },
                "-=0.2"
            );
        }

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <section ref={sectionRef} className="w-full bg-[#1A3F26] py-16 md:py-24 lg:py-28 px-6 md:px-12 lg:px-20 relative overflow-hidden">
            <Star delay={0.8} className="top-[15%] right-[8%]" />
            <Star delay={1.5} className="bottom-[20%] left-[5%]" />

            {/* Top wave */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
                <svg viewBox="0 0 1440 120" className="w-full h-12 md:h-16" preserveAspectRatio="none">
                    <path d="M0,32 C360,96 720,0 1080,64 C1260,96 1380,80 1440,72 L1440,120 L0,120 Z" fill="white" />
                </svg>
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                <div ref={headingRef} className="text-center mb-14" style={{ opacity: 0 }}>
                    <h2 className="font-mochi text-3xl md:text-4xl text-white mb-3">
                        Cara Bergabung
                    </h2>
                    <p className="font-poppins text-base md:text-lg text-white/60 max-w-xl mx-auto">
                        Empat langkah mudah untuk memulai perjalananmu sebagai mitra Yakba
                    </p>
                    <div className="w-16 h-1.5 bg-[#FFD502] rounded-full mx-auto mt-6" />
                </div>

                <div ref={stepsRef} className="space-y-6 md:space-y-0 md:grid md:grid-cols-4 md:gap-6">
                    {steps.map((step, i) => (
                        <div key={i} data-step className="relative">
                            {/* Connector line (desktop) */}
                            {i < steps.length - 1 && (
                                <div className="hidden md:block absolute top-10 left-[calc(50%+28px)] w-[calc(100%-56px)] h-0.5 bg-white/20 z-0" />
                            )}

                            <div className="relative z-10 flex flex-col items-center text-center">
                                {/* Number circle */}
                                <div
                                    className="w-14 h-14 rounded-full flex items-center justify-center mb-4 text-white font-bold text-lg"
                                    style={{ backgroundColor: step.color }}
                                >
                                    {step.number}
                                </div>

                                <h3 className="font-poppins text-base md:text-lg font-bold text-white mb-2">
                                    {step.title}
                                </h3>
                                <p className="font-poppins text-sm text-white/60 leading-relaxed max-w-[200px]">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom wave */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                <svg viewBox="0 0 1440 120" className="w-full h-12 md:h-16" preserveAspectRatio="none">
                    <path d="M0,32 C360,96 720,0 1080,64 C1260,96 1380,80 1440,72 L1440,120 L0,120 Z" fill="white" />
                </svg>
            </div>
        </section>
    );
};

export default MitraSteps;

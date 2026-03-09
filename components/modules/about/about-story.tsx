"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const AboutStory = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);
    const illustrationRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                toggleActions: "play none none none",
            },
        });

        if (headingRef.current) {
            tl.fromTo(
                headingRef.current,
                { x: -60, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
            );
        }

        textRefs.current.forEach((el) => {
            if (el) {
                tl.fromTo(
                    el,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
                    "-=0.2"
                );
            }
        });

        if (illustrationRef.current) {
            tl.fromTo(
                illustrationRef.current,
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.4)" },
                "-=0.6"
            );
        }

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="w-full bg-white py-20 md:py-28 lg:py-32 px-6 md:px-12 lg:px-20 overflow-hidden"
        >
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Text Column */}
                <div className="order-2 lg:order-1">
                    <h2
                        ref={headingRef}
                        className="font-mochi text-3xl md:text-4xl lg:text-5xl text-[#1A3F26] mb-8 leading-tight"
                        style={{ opacity: 0 }}
                    >
                        Cerita di Balik{" "}
                        <span className="text-[#E85206]">Yakba</span>
                    </h2>

                    <div className="space-y-5">
                        <p
                            ref={(el) => { textRefs.current[0] = el; }}
                            className="font-poppins text-base md:text-lg text-[#1A3F26]/75 leading-relaxed"
                            style={{ opacity: 0 }}
                        >
                            Yakba lahir dari satu keyakinan sederhana:{" "}
                            <strong className="text-[#1A3F26]">
                                setiap anak berhak belajar dengan cara yang menyenangkan.
                            </strong>{" "}
                            Kami percaya bahwa proses belajar tidak seharusnya terasa berat
                            atau membosankan.
                        </p>

                        <p
                            ref={(el) => { textRefs.current[1] = el; }}
                            className="font-poppins text-base md:text-lg text-[#1A3F26]/75 leading-relaxed"
                            style={{ opacity: 0 }}
                        >
                            Sebagai learning center yang berfokus pada anak-anak, kami
                            mengembangkan metode belajar unik yang menggabungkan{" "}
                            <span className="font-semibold text-[#E85206]">bercerita</span>,{" "}
                            <span className="font-semibold text-[#0474BE]">bermain</span>,
                            dan{" "}
                            <span className="font-semibold text-[#1A3F26]">bernyanyi</span>{" "}
                            sebagai fondasi utama pembelajaran.
                        </p>

                        <p
                            ref={(el) => { textRefs.current[2] = el; }}
                            className="font-poppins text-base md:text-lg text-[#1A3F26]/75 leading-relaxed"
                            style={{ opacity: 0 }}
                        >
                            Lebih dari sekadar bimbingan belajar, Yakba juga hadir sebagai
                            wadah bagi para guru untuk memberdayakan diri dan membuka
                            kesempatan kemitraan di bidang edukasi anak.
                        </p>
                    </div>
                </div>

                {/* Illustration Column */}
                <div className="order-1 lg:order-2 flex items-center justify-center">
                    <div
                        ref={illustrationRef}
                        className="relative w-full max-w-md aspect-square"
                        style={{ opacity: 0 }}
                    >
                        {/* Decorative background shape */}
                        <div className="absolute inset-0 bg-[#FFD502] rounded-[2rem] rotate-3 scale-95" />
                        <div className="absolute inset-0 bg-[#E85206]/10 rounded-[2rem] -rotate-2 scale-[0.92]" />

                        {/* Main card */}
                        <div className="relative bg-white rounded-[2rem] p-8 md:p-10 shadow-xl border-4 border-[#1A3F26]/10 h-full flex flex-col items-center justify-center gap-6">
                            {/* Playful icon grid */}
                            <div className="grid grid-cols-3 gap-4 md:gap-6">
                                {/* Bercerita */}
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-16 h-16 md:w-20 md:h-20 bg-[#E85206]/10 rounded-2xl flex items-center justify-center">
                                        <svg viewBox="0 0 48 48" className="w-10 h-10 md:w-12 md:h-12" fill="none">
                                            <path d="M8 8h24a4 4 0 014 4v20a4 4 0 01-4 4H16l-8 8V12a4 4 0 014-4z" fill="#E85206" opacity="0.2" stroke="#E85206" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M16 20h8M16 26h12" stroke="#E85206" strokeWidth="2.5" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                    <span className="font-poppins text-xs md:text-sm font-semibold text-[#E85206]">
                                        Cerita
                                    </span>
                                </div>

                                {/* Bermain */}
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-16 h-16 md:w-20 md:h-20 bg-[#0474BE]/10 rounded-2xl flex items-center justify-center">
                                        <svg viewBox="0 0 48 48" className="w-10 h-10 md:w-12 md:h-12" fill="none">
                                            <circle cx="24" cy="24" r="16" fill="#0474BE" opacity="0.2" stroke="#0474BE" strokeWidth="2.5" />
                                            <path d="M20 18l10 6-10 6V18z" fill="#0474BE" stroke="#0474BE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <span className="font-poppins text-xs md:text-sm font-semibold text-[#0474BE]">
                                        Main
                                    </span>
                                </div>

                                {/* Bernyanyi */}
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-16 h-16 md:w-20 md:h-20 bg-[#1A3F26]/10 rounded-2xl flex items-center justify-center">
                                        <svg viewBox="0 0 48 48" className="w-10 h-10 md:w-12 md:h-12" fill="none">
                                            <path d="M20 8v24" stroke="#1A3F26" strokeWidth="2.5" strokeLinecap="round" />
                                            <path d="M20 14c0 0 8-4 12-2v10c-4-2-12 2-12 2" fill="#1A3F26" opacity="0.2" stroke="#1A3F26" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <circle cx="14" cy="34" r="6" fill="#1A3F26" opacity="0.2" stroke="#1A3F26" strokeWidth="2.5" />
                                        </svg>
                                    </div>
                                    <span className="font-poppins text-xs md:text-sm font-semibold text-[#1A3F26]">
                                        Nyanyi
                                    </span>
                                </div>
                            </div>

                            <div className="text-center">
                                <p className="font-mochi text-xl md:text-2xl text-[#1A3F26]">
                                    3 Pilar Belajar
                                </p>
                                <p className="font-poppins text-sm text-[#1A3F26]/60 mt-1">
                                    Metode unik Yakba
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutStory;

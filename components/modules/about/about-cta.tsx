"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Star from "../elements/star";

gsap.registerPlugin(ScrollTrigger);

const AboutCTA = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                toggleActions: "play none none none",
            },
        });

        if (contentRef.current) {
            tl.fromTo(
                contentRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
            );
        }

        if (buttonRef.current) {
            tl.fromTo(
                buttonRef.current,
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
                "-=0.2"
            );
        }

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
            <Star delay={0.3} className="top-[15%] left-[8%]" />
            <Star delay={0.9} className="top-[20%] right-[10%]" />
            <Star delay={1.5} className="bottom-[20%] left-[15%]" />
            <Star delay={2.1} className="bottom-[15%] right-[8%]" />

            {/* Decorative circles */}
            <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-[#FFD502]/5" />
            <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-[#E85206]/5" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/[0.02]" />

            <div className="max-w-3xl mx-auto relative z-10">
                <div
                    ref={contentRef}
                    className="text-center"
                    style={{ opacity: 0 }}
                >
                    <h2 className="font-mochi text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight">
                        Siap Bergabung dengan{" "}
                        <span className="text-[#FFD502]">Yakba</span>?
                    </h2>
                    <p className="font-poppins text-base md:text-lg text-white/75 max-w-xl mx-auto mb-10 leading-relaxed">
                        Temukan program belajar terbaik untuk anak Anda, atau jelajahi
                        peluang kemitraan bersama kami. Hubungi kami sekarang melalui
                        WhatsApp!
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        ref={buttonRef}
                        href="/contact"
                        className="inline-flex items-center gap-3 bg-[#FFD502] hover:bg-[#FFD502]/90 text-[#1A3F26] font-bold text-base md:text-lg px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD502]/20 hover:-translate-y-0.5 active:translate-y-0"
                        style={{ opacity: 0 }}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            className="w-5 h-5"
                            fill="currentColor"
                        >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Hubungi via WhatsApp
                    </Link>

                    <Link
                        href="/program"
                        className="inline-flex items-center gap-2 text-white/80 hover:text-white font-poppins font-semibold text-base md:text-lg px-6 py-4 rounded-full border-2 border-white/20 hover:border-white/40 transition-all duration-300 hover:-translate-y-0.5"
                    >
                        Lihat Program
                        <svg
                            viewBox="0 0 24 24"
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
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
                        d="M0,30 C360,70 720,0 1080,40 C1260,60 1380,30 1440,45 L1440,80 L0,80 Z"
                        fill="white"
                    />
                </svg>
            </div>
        </section>
    );
};

export default AboutCTA;

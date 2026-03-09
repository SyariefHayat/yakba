"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Star from "../elements/star";

gsap.registerPlugin(ScrollTrigger);

const MitraCTA = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current || !contentRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
            },
        });

        tl.fromTo(
            contentRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
        );

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <section ref={sectionRef} className="w-full bg-[#FFF9E0] py-16 md:py-24 lg:py-28 px-6 md:px-12 lg:px-20 relative overflow-hidden">
            <Star delay={0.6} className="top-[15%] left-[8%]" />
            <Star delay={1.3} className="bottom-[18%] right-[10%]" />

            <div ref={contentRef} className="max-w-3xl mx-auto text-center relative z-10" style={{ opacity: 0 }}>
                {/* Decorative icon */}
                <div className="inline-flex items-center justify-center w-20 h-20 bg-[#1A3F26] rounded-full mb-8">
                    <svg viewBox="0 0 48 48" className="w-10 h-10 text-[#FFD502]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4z" />
                        <path d="M16 24c0-4.418 3.582-8 8-8s8 3.582 8 8" />
                        <circle cx="24" cy="24" r="3" fill="currentColor" />
                        <path d="M24 27v8" />
                    </svg>
                </div>

                <h2 className="font-mochi text-3xl md:text-4xl lg:text-5xl text-[#1A3F26] mb-5 leading-tight">
                    Siap Bergabung?
                </h2>

                <p className="font-poppins text-base md:text-lg text-[#1A3F26]/70 mb-10 max-w-xl mx-auto leading-relaxed">
                    Hubungi kami sekarang melalui WhatsApp untuk memulai perjalanan Anda
                    sebagai mitra guru Yakba. Tim kami siap membantu menjawab setiap pertanyaan.
                </p>

                {/* WhatsApp CTA */}
                <a
                    href="https://wa.me/?text=Halo%20Yakba%2C%20saya%20tertarik%20menjadi%20mitra%20guru%20Yakba.%20Bisa%20info%20lebih%20lanjut%3F"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-[#1A3F26] hover:bg-[#1A3F26]/90 text-white font-bold text-base md:text-lg px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#1A3F26]/20 hover:-translate-y-0.5 active:translate-y-0"
                >
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Hubungi via WhatsApp
                </a>

                {/* Additional info */}
                <p className="font-poppins text-sm text-[#1A3F26]/40 mt-6">
                    Respon dalam 1×24 jam di hari kerja
                </p>
            </div>
        </section>
    );
};

export default MitraCTA;

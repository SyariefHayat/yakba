"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Star from "../elements/star";

gsap.registerPlugin(ScrollTrigger);

const ContactInfo = () => {
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

        return () => { tl.kill(); };
    }, []);

    return (
        <section ref={sectionRef} className="w-full bg-[#1A3F26] py-16 md:py-24 lg:py-28 px-6 md:px-12 lg:px-20 relative overflow-hidden">
            <Star delay={0.6} className="top-[15%] right-[8%]" />
            <Star delay={1.4} className="bottom-[20%] left-[5%]" />

            {/* Top wave */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
                <svg viewBox="0 0 1440 120" className="w-full h-12 md:h-16" preserveAspectRatio="none">
                    <path d="M0,32 C360,96 720,0 1080,64 C1260,96 1380,80 1440,72 L1440,120 L0,120 Z" fill="#FFF9E0" />
                </svg>
            </div>

            <div ref={contentRef} className="max-w-4xl mx-auto relative z-10" style={{ opacity: 0 }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    {/* Left — Text */}
                    <div>
                        <h2 className="font-mochi text-3xl md:text-4xl text-white mb-5">
                            Mari Terhubung
                        </h2>
                        <p className="font-poppins text-base md:text-lg text-white/60 leading-relaxed mb-8">
                            Yakba Learning Center berkomitmen untuk memberikan pengalaman
                            belajar terbaik bagi anak-anak Indonesia. Kami selalu terbuka untuk
                            saran, masukan, dan kolaborasi.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                                    <svg viewBox="0 0 20 20" className="w-5 h-5 text-[#FFD502]" fill="currentColor">
                                        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 2a6 6 0 110 12 6 6 0 010-12zm-.5 2v4.5l3 1.8.5-.87-2.5-1.49V6h-1z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-poppins text-xs text-white/40 uppercase tracking-wide">Jam Operasional</p>
                                    <p className="font-poppins text-sm text-white/80 font-medium">Senin — Jumat, 08:00 — 17:00 WIB</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                                    <svg viewBox="0 0 20 20" className="w-5 h-5 text-[#FFD502]" fill="currentColor">
                                        <path d="M10 2C6.686 2 4 4.686 4 8c0 4.5 6 10 6 10s6-5.5 6-10c0-3.314-2.686-6-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-poppins text-xs text-white/40 uppercase tracking-wide">Lokasi</p>
                                    <p className="font-poppins text-sm text-white/80 font-medium">Indonesia</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right — Decorative card */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FFD502] rounded-full mb-5">
                                <svg viewBox="0 0 48 48" className="w-8 h-8 text-[#1A3F26]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M8 12l16 10 16-10M8 12v24l16 10 16-10V12M8 12L24 2l16 10" />
                                </svg>
                            </div>
                            <h3 className="font-mochi text-xl text-white mb-3">
                                Butuh Bantuan?
                            </h3>
                            <p className="font-poppins text-sm text-white/50 mb-6 leading-relaxed">
                                Tim kami siap membantu menjawab pertanyaan Anda seputar program, produk, dan kemitraan.
                            </p>
                            <a
                                href="https://wa.me/?text=Halo%20Yakba%2C%20saya%20butuh%20bantuan."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-[#FFD502] hover:bg-[#FFD502]/90 text-[#1A3F26] font-bold text-sm px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                            >
                                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Chat Sekarang
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactInfo;

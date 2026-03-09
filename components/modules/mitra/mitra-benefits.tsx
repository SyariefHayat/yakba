"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
    {
        icon: (
            <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M24 4L6 14v20l18 10 18-10V14L24 4z" />
                <path d="M24 24V44M6 14l18 10 18-10" />
            </svg>
        ),
        title: "Kurikulum Siap Pakai",
        description: "Dapatkan kurikulum dan modul ajar yang sudah dirancang oleh tim Yakba, siap langsung digunakan.",
        accent: "#E85206",
    },
    {
        icon: (
            <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="24" cy="16" r="8" />
                <path d="M8 42c0-8.837 7.163-16 16-16s16 7.163 16 16" />
                <path d="M34 20l4-4M38 20l-4-4" />
            </svg>
        ),
        title: "Pelatihan Guru",
        description: "Ikuti pelatihan intensif untuk memahami metode Yakba: bercerita, bermain, dan bernyanyi.",
        accent: "#0474BE",
    },
    {
        icon: (
            <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="6" y="10" width="36" height="28" rx="4" />
                <path d="M6 18h36M16 26h6M16 32h16" />
            </svg>
        ),
        title: "Brand & Pemasaran",
        description: "Gunakan brand Yakba yang sudah dikenal dan dapatkan dukungan materi pemasaran digital.",
        accent: "#1A3F26",
    },
    {
        icon: (
            <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="24" cy="24" r="18" />
                <path d="M24 14v10l7 7" />
            </svg>
        ),
        title: "Jadwal Fleksibel",
        description: "Atur jadwal bimbingan sesuai kemampuan dan kebutuhan di daerahmu sendiri.",
        accent: "#E85206",
    },
    {
        icon: (
            <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M24 4l6 12 14 2-10 10 2 14-12-6-12 6 2-14L4 18l14-2z" />
            </svg>
        ),
        title: "Penghasilan Tambahan",
        description: "Dapatkan penghasilan dari kegiatan mengajar yang bermakna dan berdampak positif.",
        accent: "#0474BE",
    },
    {
        icon: (
            <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 24c0-6.627 5.373-12 12-12s12 5.373 12 12" />
                <path d="M18 24c0-3.314 2.686-6 6-6s6 2.686 6 6" />
                <circle cx="24" cy="24" r="2" fill="currentColor" />
                <path d="M24 26v12M18 38h12" />
            </svg>
        ),
        title: "Komunitas Guru",
        description: "Bergabung dengan komunitas guru Yakba se-Indonesia untuk berbagi pengalaman dan ilmu.",
        accent: "#1A3F26",
    },
];

const MitraBenefits = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

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

        if (gridRef.current) {
            const cards = gridRef.current.querySelectorAll("[data-benefit-card]");
            tl.fromTo(
                cards,
                { y: 40, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: "back.out(1.2)",
                },
                "-=0.2"
            );
        }

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <section ref={sectionRef} className="w-full bg-white py-16 md:py-24 lg:py-28 px-6 md:px-12 lg:px-20">
            <div className="max-w-6xl mx-auto">
                <div ref={headingRef} className="text-center mb-14" style={{ opacity: 0 }}>
                    <h2 className="font-mochi text-3xl md:text-4xl text-[#1A3F26] mb-3">
                        Keuntungan Menjadi Mitra
                    </h2>
                    <p className="font-poppins text-base md:text-lg text-[#1A3F26]/60 max-w-2xl mx-auto">
                        Bergabung dengan Yakba berarti mendapat dukungan penuh untuk sukses mengajar
                    </p>
                    <div className="w-16 h-1.5 bg-[#E85206] rounded-full mx-auto mt-6" />
                </div>

                <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {benefits.map((benefit, i) => (
                        <div
                            key={i}
                            data-benefit-card
                            className="group bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-[#FFD502] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                        >
                            <div
                                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                                style={{ backgroundColor: `${benefit.accent}15`, color: benefit.accent }}
                            >
                                {benefit.icon}
                            </div>
                            <h3 className="font-poppins text-lg font-bold text-[#1A3F26] mb-2">
                                {benefit.title}
                            </h3>
                            <p className="font-poppins text-sm text-[#1A3F26]/60 leading-relaxed">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MitraBenefits;

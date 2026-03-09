"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const requirements = [
    "Memiliki passion di bidang pendidikan anak",
    "Minimal lulusan SMA/sederajat",
    "Bersedia mengikuti pelatihan metode Yakba",
    "Memiliki ruang atau akses tempat untuk kegiatan belajar",
    "Berkomitmen untuk jadwal mengajar yang konsisten",
    "Mampu berkomunikasi dengan baik kepada anak dan orang tua",
];

const MitraRequirements = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current || !contentRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
            },
        });

        tl.fromTo(
            contentRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
        );

        const items = contentRef.current.querySelectorAll("[data-req]");
        tl.fromTo(
            items,
            { x: -20, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: "power2.out" },
            "-=0.2"
        );

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <section ref={sectionRef} className="w-full bg-white py-16 md:py-24 lg:py-28 px-6 md:px-12 lg:px-20">
            <div className="max-w-4xl mx-auto">
                <div ref={contentRef} style={{ opacity: 0 }}>
                    <div className="text-center mb-12">
                        <h2 className="font-mochi text-3xl md:text-4xl text-[#1A3F26] mb-3">
                            Syarat Menjadi Mitra
                        </h2>
                        <p className="font-poppins text-base md:text-lg text-[#1A3F26]/60 max-w-xl mx-auto">
                            Pastikan Anda memenuhi persyaratan berikut untuk bergabung
                        </p>
                        <div className="w-16 h-1.5 bg-[#E85206] rounded-full mx-auto mt-6" />
                    </div>

                    <div className="bg-[#FFF9E0] rounded-3xl p-8 md:p-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {requirements.map((req, i) => (
                                <div key={i} data-req className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-[#1A3F26] flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-[#FFD502]" fill="currentColor">
                                            <path d="M13.354 4.354l-6 6a.5.5 0 01-.708 0l-3-3a.5.5 0 01.708-.708L7 9.293l5.646-5.647a.5.5 0 01.708.708z" />
                                        </svg>
                                    </div>
                                    <span className="font-poppins text-sm md:text-base text-[#1A3F26]/80 leading-relaxed">
                                        {req}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MitraRequirements;

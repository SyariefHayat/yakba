"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import type { Program } from "@/lib/types";
import ProgramCard from "./program-card";

gsap.registerPlugin(ScrollTrigger);

interface ProgramListProps {
    programs: Program[];
}

const ProgramList = ({ programs }: ProgramListProps) => {
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
            const cards = gridRef.current.querySelectorAll("[data-program-card]");
            tl.fromTo(
                cards,
                { y: 40, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    stagger: 0.12,
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
        <section
            ref={sectionRef}
            className="w-full bg-white py-16 md:py-24 lg:py-28 px-6 md:px-12 lg:px-20"
        >
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div ref={headingRef} className="text-center mb-14" style={{ opacity: 0 }}>
                    <h2 className="font-mochi text-3xl md:text-4xl text-[#1A3F26] mb-3">
                        Pilih Program
                    </h2>
                    <p className="font-poppins text-base md:text-lg text-[#1A3F26]/60 max-w-2xl mx-auto">
                        Temukan program yang sesuai dengan usia dan kebutuhan belajar anak Anda
                    </p>
                    <div className="w-16 h-1.5 bg-[#E85206] rounded-full mx-auto mt-6" />
                </div>

                {/* Program Grid */}
                <div ref={gridRef}>
                    {programs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {programs.map((program, index) => (
                                <div key={program._id} data-program-card>
                                    <ProgramCard program={program} index={index} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#FFD502]/20 rounded-full mb-6">
                                <svg
                                    viewBox="0 0 48 48"
                                    className="w-10 h-10 text-[#1A3F26]/30"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                >
                                    <path d="M24 8L8 18v12l16 10 16-10V18L24 8z" strokeLinejoin="round" />
                                    <path d="M24 28v10M8 18l16 10 16-10" strokeLinecap="round" />
                                </svg>
                            </div>
                            <h3 className="font-poppins text-xl font-bold text-[#1A3F26]/50 mb-2">
                                Belum Ada Program
                            </h3>
                            <p className="font-poppins text-sm text-[#1A3F26]/40">
                                Program bimbingan akan segera tersedia.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProgramList;

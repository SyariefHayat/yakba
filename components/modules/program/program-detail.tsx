"use client";

import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { urlFor } from "@/sanity/lib/image";
import type { Program } from "@/lib/types";
import { PortableText } from "next-sanity";
import Star from "../elements/star";

interface ProgramDetailProps {
    program: Program;
}

function buildWhatsAppUrl(program: Program): string {
    const cta = program.whatsappCta;
    if (!cta?.enabled) return "/contact";

    const message = (cta.messageTemplate || "")
        .replace("{{itemName}}", program.name)
        .replace("{{intent}}", cta.intent === "beli" ? "mendaftar" : "bertanya tentang");

    return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

const ProgramDetail = ({ program }: ProgramDetailProps) => {
    const heroRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const outcomesRef = useRef<HTMLDivElement>(null);

    const imageUrl = program.heroImage
        ? urlFor(program.heroImage).width(1200).height(600).url()
        : null;

    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.2 });

        if (heroRef.current) {
            tl.fromTo(
                heroRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
            );
        }

        if (contentRef.current) {
            tl.fromTo(
                contentRef.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
                "-=0.3"
            );
        }

        if (outcomesRef.current) {
            const items = outcomesRef.current.querySelectorAll("[data-outcome]");
            tl.fromTo(
                items,
                { x: -20, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: "power2.out" },
                "-=0.2"
            );
        }

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <section className="w-full bg-white pt-24 md:pt-28 pb-20 md:pb-28 relative overflow-hidden">
            {/* Decorative stars */}
            <Star delay={0.5} className="top-[6%] right-[5%] hidden lg:block" />
            <Star delay={1.2} className="top-[12%] left-[3%] hidden lg:block" />

            {/* Breadcrumb */}
            <div className="px-6 md:px-12 lg:px-20 max-w-6xl mx-auto mb-8">
                <nav>
                    <ol className="flex items-center gap-2 font-poppins text-sm text-[#1A3F26]/50">
                        <li>
                            <Link href="/" className="hover:text-[#1A3F26] transition-colors">
                                Beranda
                            </Link>
                        </li>
                        <li>/</li>
                        <li>
                            <Link href="/program" className="hover:text-[#1A3F26] transition-colors">
                                Program
                            </Link>
                        </li>
                        <li>/</li>
                        <li className="text-[#1A3F26] font-medium truncate max-w-[200px]">
                            {program.name}
                        </li>
                    </ol>
                </nav>
            </div>

            {/* Hero Image */}
            <div ref={heroRef} className="px-6 md:px-12 lg:px-20 max-w-6xl mx-auto mb-10" style={{ opacity: 0 }}>
                <div className="relative w-full h-56 md:h-72 lg:h-96 rounded-3xl overflow-hidden bg-[#FFF9E0]">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={program.name}
                            fill
                            className="object-cover"
                            sizes="100vw"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FFD502]/40 to-[#E85206]/10">
                            <svg
                                viewBox="0 0 64 64"
                                className="w-20 h-20 text-[#1A3F26]/15"
                                fill="currentColor"
                            >
                                <path d="M32 8L8 24v16l24 16 24-16V24L32 8z" />
                            </svg>
                        </div>
                    )}

                    {/* Age badge overlay */}
                    <div className="absolute bottom-4 left-4">
                        <span className="inline-flex items-center gap-2 bg-[#1A3F26] text-white text-sm font-bold px-4 py-2 rounded-full">
                            <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor">
                                <path d="M8 1a3 3 0 100 6 3 3 0 000-6zM3 14s-1 0-1-1 1-5 6-5 6 4 6 5-1 1-1 1H3z" />
                            </svg>
                            Usia {program.targetAgeRange}
                        </span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div ref={contentRef} className="px-6 md:px-12 lg:px-20 max-w-6xl mx-auto" style={{ opacity: 0 }}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <h1 className="font-mochi text-3xl md:text-4xl lg:text-5xl text-[#1A3F26] mb-6 leading-tight">
                            {program.name}
                        </h1>

                        {/* Schedule */}
                        <div className="bg-[#FFF9E0] rounded-2xl p-5 mb-8">
                            <div className="flex items-center gap-2 mb-2">
                                <svg viewBox="0 0 20 20" className="w-5 h-5 text-[#E85206]" fill="currentColor">
                                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 2a6 6 0 110 12 6 6 0 010-12zm-.5 2v4.5l3 1.8.5-.87-2.5-1.49V6h-1z" />
                                </svg>
                                <h3 className="font-poppins text-sm font-bold text-[#1A3F26] uppercase tracking-wide">
                                    Jadwal
                                </h3>
                            </div>
                            <p className="font-poppins text-base text-[#1A3F26]/70 leading-relaxed">
                                {program.scheduleModel}
                            </p>
                        </div>

                        {/* Curriculum Summary */}
                        {program.curriculumSummary && program.curriculumSummary.length > 0 && (
                            <div className="mb-8">
                                <h2 className="font-mochi text-2xl text-[#1A3F26] mb-4">
                                    Kurikulum
                                </h2>
                                <div className="font-poppins text-base text-[#1A3F26]/75 leading-relaxed prose prose-headings:text-[#1A3F26] prose-headings:font-poppins prose-strong:text-[#1A3F26] prose-a:text-[#0474BE] max-w-none">
                                    <PortableText value={program.curriculumSummary} />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div>
                        {/* Learning Outcomes */}
                        <div ref={outcomesRef} className="bg-white border-2 border-gray-100 rounded-2xl p-6 mb-6 sticky top-28">
                            <h3 className="font-mochi text-xl text-[#1A3F26] mb-4">
                                Hasil Belajar
                            </h3>
                            {program.learningOutcomes && program.learningOutcomes.length > 0 && (
                                <div className="space-y-3">
                                    {program.learningOutcomes.map((outcome, i) => (
                                        <div key={i} data-outcome className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-[#E85206]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-[#E85206]" fill="currentColor">
                                                    <path d="M13.354 4.354l-6 6a.5.5 0 01-.708 0l-3-3a.5.5 0 01.708-.708L7 9.293l5.646-5.647a.5.5 0 01.708.708z" />
                                                </svg>
                                            </div>
                                            <span className="font-poppins text-sm text-[#1A3F26]/70 leading-relaxed">
                                                {outcome}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* WhatsApp CTA */}
                            {program.whatsappCta?.enabled && (
                                <a
                                    href={buildWhatsAppUrl(program)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 w-full justify-center bg-[#1A3F26] hover:bg-[#1A3F26]/90 text-white font-bold text-base px-6 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#1A3F26]/20 hover:-translate-y-0.5 active:translate-y-0 mt-6"
                                >
                                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    {program.whatsappCta.buttonLabel || "Tanya via WhatsApp"}
                                </a>
                            )}
                        </div>

                        {/* Back link */}
                        <Link
                            href="/program"
                            className="inline-flex items-center gap-2 font-poppins text-sm font-semibold text-[#1A3F26]/50 hover:text-[#1A3F26] transition-colors"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                            Kembali ke Program
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProgramDetail;

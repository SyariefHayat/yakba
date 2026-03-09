"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import type { Program } from "@/lib/types";

interface ProgramCardProps {
    program: Program;
    index: number;
}

const ProgramCard = ({ program, index }: ProgramCardProps) => {
    const imageUrl = program.heroImage
        ? urlFor(program.heroImage).width(600).height(400).url()
        : null;

    const accentColors = ["#E85206", "#0474BE", "#1A3F26", "#E85206"];
    const accent = accentColors[index % accentColors.length];

    return (
        <Link
            href={`/program/${program.slug.current}`}
            className="group block bg-white rounded-3xl overflow-hidden border-2 border-gray-100 hover:border-[#FFD502] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
            {/* Image */}
            <div className="relative h-48 md:h-56 overflow-hidden bg-[#FFF9E0]">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={program.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FFD502]/30 to-[#FFD502]/10">
                        <svg
                            viewBox="0 0 64 64"
                            className="w-16 h-16 text-[#1A3F26]/15"
                            fill="currentColor"
                        >
                            <path d="M32 8L8 24v16l24 16 24-16V24L32 8zm0 8l16 10.67V37.33L32 48 16 37.33V26.67L32 16z" />
                        </svg>
                    </div>
                )}

                {/* Age Badge */}
                <div className="absolute top-4 left-4">
                    <span
                        className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full text-white"
                        style={{ backgroundColor: accent }}
                    >
                        <svg viewBox="0 0 16 16" className="w-3 h-3" fill="currentColor">
                            <path d="M8 1a3 3 0 100 6 3 3 0 000-6zM3 14s-1 0-1-1 1-5 6-5 6 4 6 5-1 1-1 1H3z" />
                        </svg>
                        {program.targetAgeRange}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Name */}
                <h3 className="font-mochi text-xl md:text-2xl text-[#1A3F26] mb-3 group-hover:text-[#E85206] transition-colors duration-300">
                    {program.name}
                </h3>

                {/* Schedule */}
                <div className="flex items-center gap-2 mb-4">
                    <svg viewBox="0 0 16 16" className="w-4 h-4 text-[#1A3F26]/40" fill="currentColor">
                        <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 2a5 5 0 110 10A5 5 0 018 3zm-.5 2v3.5l2.5 1.5.5-.87-2-1.19V5h-1z" />
                    </svg>
                    <span className="font-poppins text-sm text-[#1A3F26]/60 line-clamp-1">
                        {program.scheduleModel}
                    </span>
                </div>

                {/* Learning Outcomes Preview */}
                {program.learningOutcomes && program.learningOutcomes.length > 0 && (
                    <div className="space-y-1.5 mb-4">
                        {program.learningOutcomes.slice(0, 3).map((outcome, i) => (
                            <div key={i} className="flex items-start gap-2">
                                <svg
                                    viewBox="0 0 16 16"
                                    className="w-4 h-4 mt-0.5 flex-shrink-0"
                                    fill={accent}
                                >
                                    <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm3.354 5.354l-4 4a.5.5 0 01-.708 0l-2-2a.5.5 0 01.708-.708L7 9.293l3.646-3.647a.5.5 0 01.708.708z" />
                                </svg>
                                <span className="font-poppins text-xs text-[#1A3F26]/60 line-clamp-1">
                                    {outcome}
                                </span>
                            </div>
                        ))}
                        {program.learningOutcomes.length > 3 && (
                            <span className="font-poppins text-xs text-[#1A3F26]/40 pl-6">
                                +{program.learningOutcomes.length - 3} lainnya
                            </span>
                        )}
                    </div>
                )}

                {/* CTA hint */}
                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                    <span className="font-poppins text-sm font-semibold text-[#1A3F26] group-hover:text-[#E85206] transition-colors">
                        Lihat Detail
                    </span>
                    <svg
                        viewBox="0 0 24 24"
                        className="w-4 h-4 text-[#1A3F26] group-hover:text-[#E85206] group-hover:translate-x-1 transition-all duration-300"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </Link>
    );
};

export default ProgramCard;

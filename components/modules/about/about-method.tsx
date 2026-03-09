"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const methods = [
    {
        title: "Bercerita",
        subtitle: "Storytelling",
        description:
            "Melalui cerita, anak-anak belajar memahami dunia, mengembangkan imajinasi, dan membangun empati. Setiap sesi belajar dimulai dengan kisah yang menarik dan relevan.",
        color: "#E85206",
        bgColor: "#E85206",
        icon: (
            <svg viewBox="0 0 64 64" className="w-14 h-14 md:w-16 md:h-16" fill="none">
                <rect x="10" y="12" width="34" height="40" rx="4" fill="white" opacity="0.3" stroke="white" strokeWidth="2.5" />
                <path d="M18 24h18M18 32h14M18 40h10" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M40 20c4-2 10-2 14 2v22c-4-4-10-4-14-2" fill="white" opacity="0.2" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        title: "Bermain",
        subtitle: "Play-based Learning",
        description:
            "Bermain adalah cara alami anak belajar. Kami merancang permainan edukatif yang merangsang kreativitas, kemampuan problem-solving, dan kerja sama tim.",
        color: "#0474BE",
        bgColor: "#0474BE",
        icon: (
            <svg viewBox="0 0 64 64" className="w-14 h-14 md:w-16 md:h-16" fill="none">
                <circle cx="32" cy="32" r="22" fill="white" opacity="0.3" stroke="white" strokeWidth="2.5" />
                <path d="M24 20l20 12-20 12V20z" fill="white" opacity="0.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        title: "Bernyanyi",
        subtitle: "Music & Rhythm",
        description:
            "Musik dan nyanyian memperkuat daya ingat dan membuat pembelajaran lebih berkesan. Lagu-lagu edukatif kami dirancang untuk membantu anak menghafal dan memahami konsep.",
        color: "#1A3F26",
        bgColor: "#1A3F26",
        icon: (
            <svg viewBox="0 0 64 64" className="w-14 h-14 md:w-16 md:h-16" fill="none">
                <path d="M28 12v32" stroke="white" strokeWidth="3" strokeLinecap="round" />
                <path d="M28 20c0 0 12-6 18-3v14c-6-3-18 3-18 3" fill="white" opacity="0.3" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <ellipse cx="20" cy="46" rx="8" ry="6" fill="white" opacity="0.4" stroke="white" strokeWidth="2.5" />
            </svg>
        ),
    },
];

const AboutMethod = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (!sectionRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                toggleActions: "play none none none",
            },
        });

        if (headingRef.current) {
            tl.fromTo(
                headingRef.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
            );
        }

        cardRefs.current.forEach((el) => {
            if (el) {
                tl.fromTo(
                    el,
                    { y: 60, opacity: 0, rotateY: 15 },
                    {
                        y: 0,
                        opacity: 1,
                        rotateY: 0,
                        duration: 0.6,
                        ease: "back.out(1.2)",
                    },
                    "-=0.3"
                );
            }
        });

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="w-full bg-[#FFD502] py-20 md:py-28 lg:py-32 px-6 md:px-12 lg:px-20 overflow-hidden relative"
        >
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div ref={headingRef} className="text-center mb-16" style={{ opacity: 0 }}>
                    <h2 className="font-mochi text-3xl md:text-4xl lg:text-5xl text-[#1A3F26] mb-4">
                        Metode Belajar Kami
                    </h2>
                    <p className="font-poppins text-base md:text-lg text-[#1A3F26]/70 max-w-2xl mx-auto">
                        Tiga pilar utama yang menjadi fondasi setiap program pembelajaran di
                        Yakba
                    </p>
                    <div className="w-20 h-1.5 bg-[#1A3F26] rounded-full mx-auto mt-6" />
                </div>

                {/* Method Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {methods.map((method, index) => (
                        <div
                            key={index}
                            ref={(el) => { cardRefs.current[index] = el; }}
                            className="group relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-default"
                            style={{
                                backgroundColor: method.bgColor,
                                opacity: 0,
                            }}
                        >
                            {/* Card content */}
                            <div className="relative z-10 p-8 md:p-8 lg:p-10 flex flex-col items-center text-center min-h-[340px]">
                                {/* Icon */}
                                <div className="mb-6 group-hover:scale-110 transition-transform duration-500">
                                    {method.icon}
                                </div>

                                {/* Title */}
                                <h3 className="font-mochi text-2xl md:text-3xl text-white mb-1">
                                    {method.title}
                                </h3>
                                <span className="font-poppins text-xs md:text-sm text-white/50 uppercase tracking-widest mb-4">
                                    {method.subtitle}
                                </span>

                                {/* Description */}
                                <p className="font-poppins text-sm md:text-base text-white/80 leading-relaxed">
                                    {method.description}
                                </p>
                            </div>

                            {/* Decorative circle */}
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-white/10 group-hover:scale-125 transition-transform duration-700" />
                            <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full bg-white/5 group-hover:scale-150 transition-transform duration-700" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Decorative wave bottom */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                <svg
                    viewBox="0 0 1440 80"
                    className="w-full h-10 md:h-14 lg:h-16"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,30 C480,70 960,10 1440,50 L1440,80 L0,80 Z"
                        fill="white"
                    />
                </svg>
            </div>
        </section>
    );
};

export default AboutMethod;

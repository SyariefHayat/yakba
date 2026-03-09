"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const channels = [
    {
        icon: (
            <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
        ),
        title: "WhatsApp",
        description: "Jalur utama untuk bertanya, mendaftar program, atau memesan produk.",
        detail: "Respon dalam 1×24 jam",
        href: "https://wa.me/?text=Halo%20Yakba%2C%20saya%20ingin%20bertanya.",
        buttonLabel: "Chat WhatsApp",
        accent: "#25D366",
        bg: "#25D366",
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
        ),
        title: "Email",
        description: "Untuk kerjasama, proposal, atau pertanyaan yang lebih formal.",
        detail: "info@yakba.id",
        href: "mailto:info@yakba.id",
        buttonLabel: "Kirim Email",
        accent: "#0474BE",
        bg: "#0474BE",
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
        ),
        title: "Instagram",
        description: "Ikuti kami untuk update kegiatan, tips pendidikan, dan info produk terbaru.",
        detail: "@yakba.id",
        href: "https://instagram.com/yakba.id",
        buttonLabel: "Follow Instagram",
        accent: "#E4405F",
        bg: "#E4405F",
    },
];

const ContactChannels = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

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

        if (cardsRef.current) {
            const cards = cardsRef.current.querySelectorAll("[data-channel]");
            tl.fromTo(
                cards,
                { y: 40, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.12, ease: "back.out(1.2)" },
                "-=0.2"
            );
        }

        return () => { tl.kill(); };
    }, []);

    return (
        <section ref={sectionRef} className="w-full bg-white py-16 md:py-24 lg:py-28 px-6 md:px-12 lg:px-20">
            <div className="max-w-5xl mx-auto">
                <div ref={headingRef} className="text-center mb-14" style={{ opacity: 0 }}>
                    <h2 className="font-mochi text-3xl md:text-4xl text-[#1A3F26] mb-3">
                        Jalur Komunikasi
                    </h2>
                    <p className="font-poppins text-base md:text-lg text-[#1A3F26]/60 max-w-xl mx-auto">
                        Pilih channel yang paling nyaman untuk Anda
                    </p>
                    <div className="w-16 h-1.5 bg-[#E85206] rounded-full mx-auto mt-6" />
                </div>

                <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {channels.map((channel, i) => (
                        <div
                            key={i}
                            data-channel
                            className="group bg-white rounded-3xl border-2 border-gray-100 hover:border-[#FFD502] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                        >
                            {/* Color top bar */}
                            <div className="h-1.5" style={{ backgroundColor: channel.bg }} />

                            <div className="p-7">
                                {/* Icon */}
                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-white transition-transform duration-300 group-hover:scale-110"
                                    style={{ backgroundColor: channel.bg }}
                                >
                                    {channel.icon}
                                </div>

                                <h3 className="font-poppins text-xl font-bold text-[#1A3F26] mb-2">
                                    {channel.title}
                                </h3>

                                <p className="font-poppins text-sm text-[#1A3F26]/60 mb-4 leading-relaxed">
                                    {channel.description}
                                </p>

                                <p className="font-poppins text-xs font-semibold text-[#1A3F26]/40 uppercase tracking-wide mb-5">
                                    {channel.detail}
                                </p>

                                <a
                                    href={channel.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 font-poppins text-sm font-bold px-5 py-2.5 rounded-full text-white transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                                    style={{ backgroundColor: channel.bg }}
                                >
                                    {channel.buttonLabel}
                                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ContactChannels;

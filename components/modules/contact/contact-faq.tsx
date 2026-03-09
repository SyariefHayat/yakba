"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
    {
        question: "Bagaimana cara mendaftar program bimbingan?",
        answer: "Anda bisa menghubungi kami melalui WhatsApp dan menyebutkan program yang diminati. Tim kami akan membantu proses pendaftaran.",
    },
    {
        question: "Apakah Yakba menerima siswa dari luar kota?",
        answer: "Saat ini program bimbingan dilaksanakan secara langsung (offline). Namun, kami terus mengembangkan opsi pembelajaran jarak jauh untuk masa depan.",
    },
    {
        question: "Bagaimana cara memesan produk?",
        answer: "Pilih produk yang diinginkan di halaman Produk, lalu klik tombol WhatsApp untuk melakukan pemesanan. Proses pemesanan dilakukan melalui chat WhatsApp.",
    },
    {
        question: "Apakah ada trial class gratis?",
        answer: "Silakan hubungi kami via WhatsApp untuk informasi mengenai trial class dan promo yang sedang berlangsung.",
    },
    {
        question: "Bagaimana cara menjadi mitra Yakba?",
        answer: "Kunjungi halaman Kemitraan untuk informasi lengkap, atau langsung hubungi kami via WhatsApp untuk memulai proses pendaftaran mitra.",
    },
];

const ContactFAQ = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

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

        return () => { tl.kill(); };
    }, []);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section ref={sectionRef} className="w-full bg-[#FFF9E0] py-16 md:py-24 lg:py-28 px-6 md:px-12 lg:px-20">
            <div className="max-w-3xl mx-auto">
                <div ref={contentRef} style={{ opacity: 0 }}>
                    <div className="text-center mb-12">
                        <h2 className="font-mochi text-3xl md:text-4xl text-[#1A3F26] mb-3">
                            Pertanyaan Umum
                        </h2>
                        <p className="font-poppins text-base md:text-lg text-[#1A3F26]/60 max-w-xl mx-auto">
                            Temukan jawaban untuk pertanyaan yang sering ditanyakan
                        </p>
                        <div className="w-16 h-1.5 bg-[#E85206] rounded-full mx-auto mt-6" />
                    </div>

                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <div
                                key={i}
                                className={`bg-white rounded-2xl overflow-hidden border-2 transition-all duration-300 ${openIndex === i ? "border-[#FFD502] shadow-lg" : "border-transparent"}`}
                            >
                                <button
                                    onClick={() => toggleFAQ(i)}
                                    className="w-full flex items-center justify-between p-5 md:p-6 text-left"
                                >
                                    <span className="font-poppins text-base md:text-lg font-semibold text-[#1A3F26] pr-4">
                                        {faq.question}
                                    </span>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${openIndex === i ? "bg-[#E85206] rotate-45" : "bg-[#1A3F26]/5"}`}>
                                        <svg viewBox="0 0 24 24" className={`w-5 h-5 transition-colors ${openIndex === i ? "text-white" : "text-[#1A3F26]"}`} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                            <path d="M12 5v14M5 12h14" />
                                        </svg>
                                    </div>
                                </button>

                                <div
                                    className="overflow-hidden transition-all duration-300"
                                    style={{
                                        maxHeight: openIndex === i ? "200px" : "0px",
                                        opacity: openIndex === i ? 1 : 0,
                                    }}
                                >
                                    <div className="px-5 md:px-6 pb-5 md:pb-6">
                                        <p className="font-poppins text-sm md:text-base text-[#1A3F26]/65 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactFAQ;

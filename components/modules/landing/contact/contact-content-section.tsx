"use client"

import gsap from "gsap"

import { useEffect, useRef, useState } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { COLORS } from "@/lib/constants"

import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Send,
    MessageCircle,
    Instagram,
    Facebook
} from "lucide-react"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

// Contact info data
const CONTACT_INFO = [
    {
        icon: <MapPin className="size-6" />,
        title: "Alamat",
        details: ["Jl. Pendidikan No. 123", "Kelurahan Ceria, Kec. Bahagia", "Jakarta Selatan, 12345"],
        color: COLORS.blue,
    },
    {
        icon: <Phone className="size-6" />,
        title: "Telepon",
        details: ["+62 21 1234 5678", "+62 812 3456 7890 (WhatsApp)"],
        color: COLORS.green,
    },
    {
        icon: <Mail className="size-6" />,
        title: "Email",
        details: ["info@yakba.sch.id", "pendaftaran@yakba.sch.id"],
        color: COLORS.pink,
    },
    {
        icon: <Clock className="size-6" />,
        title: "Jam Operasional",
        details: ["Senin - Jumat: 07:00 - 16:00", "Sabtu: 08:00 - 12:00", "Minggu & Libur: Tutup"],
        color: COLORS.blue,
    },
]

// Social media links
const SOCIAL_LINKS = [
    { label: "WhatsApp", href: "#", icon: "/wa-icon.png" },
    { label: "TikTok", href: "#", icon: "/tiktok-icon.png" },
    { label: "Instagram", href: "#", icon: "/ig-icon.png" },
    { label: "YouTube", href: "#", icon: "/yt-icon.png" },
    { label: "Facebook", href: "#", icon: "/fb-icon.png" },
    { label: "Lemon8", href: "#", icon: "/lemon8-icon.png" },
]

const ContactContentSection = () => {
    const titleRef = useRef<HTMLHeadingElement>(null)
    const formRef = useRef<HTMLFormElement>(null)
    const infoRef = useRef<HTMLDivElement>(null)

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission
        console.log("Form submitted:", formData)
        alert("Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.")
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    }

    useEffect(() => {
        // Animasi untuk title
        if (titleRef.current) {
            gsap.set(titleRef.current, { y: 100, opacity: 0 })
            gsap.to(titleRef.current, {
                y: 0, opacity: 1, duration: 1, ease: "power3.out",
                scrollTrigger: { trigger: titleRef.current, start: "top 90%", toggleActions: "play none none none" }
            })
        }

        // Animasi untuk form
        if (formRef.current) {
            gsap.set(formRef.current, { x: -100, opacity: 0 })
            gsap.to(formRef.current, {
                x: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out",
                scrollTrigger: { trigger: formRef.current, start: "top 90%", toggleActions: "play none none none" }
            })
        }

        // Animasi untuk info
        if (infoRef.current) {
            gsap.set(infoRef.current, { x: 100, opacity: 0 })
            gsap.to(infoRef.current, {
                x: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out",
                scrollTrigger: { trigger: infoRef.current, start: "top 90%", toggleActions: "play none none none" }
            })
        }
    }, [])

    return (
        <section className="w-full min-h-screen pt-10 md:pt-20 px-4 md:px-0 overflow-hidden bg-white">
            {/* Section Title */}
            <h2 ref={titleRef} className="text-3xl md:text-5xl font-mochi-boom text-[#1B83C8] text-center mb-4 md:mb-6">
                Hubungi Kami
            </h2>
            <p className="font-poppins text-gray-600 text-center max-w-2xl mx-auto mb-10 md:mb-16 px-4">
                Ada pertanyaan tentang YAKBA Kindergarten? Silakan hubungi kami atau isi formulir di bawah ini.
            </p>

            {/* Contact Content */}
            <div className="w-[90%] md:w-[85%] lg:w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">

                {/* Contact Form */}
                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100"
                >
                    <h3 className="font-mochi-boom text-2xl text-[#1F3B5A] mb-6">
                        Kirim Pesan
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block font-poppins text-sm text-gray-600 mb-1">
                                Nama Lengkap *
                            </label>
                            <Input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Masukkan nama Anda"
                                required
                                className="font-poppins"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-poppins text-sm text-gray-600 mb-1">
                                    Email *
                                </label>
                                <Input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="email@contoh.com"
                                    required
                                    className="font-poppins"
                                />
                            </div>
                            <div>
                                <label className="block font-poppins text-sm text-gray-600 mb-1">
                                    No. Telepon
                                </label>
                                <Input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="08xx xxxx xxxx"
                                    className="font-poppins"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block font-poppins text-sm text-gray-600 mb-1">
                                Subjek *
                            </label>
                            <Input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="Tentang apa pesan Anda?"
                                required
                                className="font-poppins"
                            />
                        </div>

                        <div>
                            <label className="block font-poppins text-sm text-gray-600 mb-1">
                                Pesan *
                            </label>
                            <Textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tulis pesan Anda di sini..."
                                required
                                rows={5}
                                className="font-poppins resize-none"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-yellow-300 hover:bg-yellow-400 text-black font-poppins font-semibold py-6 cursor-pointer"
                        >
                            <Send className="size-5 mr-2" />
                            Kirim Pesan
                        </Button>
                    </div>
                </form>

                {/* Contact Info */}
                <div ref={infoRef} className="space-y-6">
                    {/* Info Cards */}
                    {CONTACT_INFO.map((info, index) => (
                        <div
                            key={index}
                            className="flex gap-4 p-5 bg-white rounded-xl shadow-lg border border-gray-100"
                        >
                            <div
                                className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                                style={{ backgroundColor: `${info.color}20`, color: info.color }}
                            >
                                {info.icon}
                            </div>
                            <div>
                                <h4 className="font-mochi-boom text-lg text-[#1F3B5A] mb-1">
                                    {info.title}
                                </h4>
                                {info.details.map((detail, idx) => (
                                    <p key={idx} className="font-poppins text-sm text-gray-600">
                                        {detail}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Social Media */}
                    <div className="p-5 bg-[#1F3B5A] rounded-xl">
                        <h4 className="font-mochi-boom text-lg text-white mb-4">
                            Ikuti Kami
                        </h4>
                        <div className="flex gap-3">
                            {SOCIAL_LINKS.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-transform hover:scale-110 bg-white"
                                    title={social.label}
                                >
                                    <Image src={social.icon} alt={social.label} width={24} height={24} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <div className="w-[90%] md:w-[85%] lg:w-[80%] mx-auto my-12 md:my-16">
                <h3 className="font-mochi-boom text-2xl text-[#1F3B5A] text-center mb-6">
                    Lokasi Kami
                </h3>
                <div className="w-full h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl border-4 border-yellow-300">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.9182089533047!2d112.4968332!3d-7.0189002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e77e4c1c50fc7b5%3A0xc8a8ee7941a2839c!2sTeknosa%20Corp!5e0!3m2!1sen!2sid!4v1768807492516!5m2!1sen!2sid"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Lokasi YAKBA Kindergarten"
                    />
                </div>
            </div>
        </section>
    )
}

export default ContactContentSection

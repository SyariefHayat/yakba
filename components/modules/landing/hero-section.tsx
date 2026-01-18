import { Button } from "@/components/ui/button"
import Image from "next/image"

// Konstanta warna brand
const COLORS = {
    green: "#7CBF25",
    pink: "#EE2D70",
    blue: "#1B83C8",
    navy: "#1F3B5A",
} as const

// Huruf YAKBA dengan warnanya
const YAKBA_LETTERS = [
    { letter: "A", color: COLORS.green },
    { letter: "K", color: COLORS.pink },
    { letter: "B", color: COLORS.blue },
    { letter: "A", color: COLORS.green },
] as const

const HeroSection = () => {
    return (
        <section className="relative w-full h-[65vh] md:h-[70vh] lg:h-screen bg-sky-100">
            {/* Hero Content */}
            <div className="absolute top-[38%] md:top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] text-center font-mochi-boom text-2xl md:text-4xl space-y-2 z-30">
                <p className="mb-4">Taman Kanak-Kanak Islami</p>

                {/* Title YAKBA KINDERGARTEN */}
                <h1 className="text-4xl md:text-7xl" style={{ color: COLORS.navy }}>
                    {YAKBA_LETTERS.map(({ letter, color }, index) => (
                        <span key={index} style={{ color }}>
                            {letter}
                        </span>
                    ))}
                    {" "}KINDERGARTEN
                </h1>

                {/* Tagline */}
                <p>
                    <span style={{ color: COLORS.green }}>Belajar, </span>
                    <span style={{ color: COLORS.pink }}>Bermain, </span>
                    <span style={{ color: COLORS.blue }}>Berakhlak</span>
                </p>

                {/* CTA Button */}
                <Button className="mt-3 text-xl md:text-2xl md:py-6 bg-yellow-300 text-black font-poppins hover:bg-yellow-400 cursor-pointer">
                    Mulai Sekarang
                </Button>
            </div>

            {/* Cloud Assets */}
            <Image
                src="/cloud-left.png"
                alt="Cloud decoration left"
                width={0}
                height={0}
                sizes="50vw"
                className="absolute bottom-18 md:bottom-35 lg:bottom-15 left-0 w-1/2 h-auto z-10"
            />
            <Image
                src="/cloud-right.png"
                alt="Cloud decoration right"
                width={0}
                height={0}
                sizes="50vw"
                className="absolute bottom-18.5 md:bottom-36 lg:bottom-16.5 right-0 w-1/2 h-auto z-10"
            />

            {/* Mascot */}
            <Image
                src="/maskot.png"
                alt="Yakba mascot"
                width={500}
                height={500}
                className="absolute bottom-5 md:bottom-10 lg:bottom-0 left-1/2 -translate-x-1/2 z-30 w-[300px] md:w-[600px] lg:w-[500px] h-auto"
            />

            {/* Land/Ground */}
            <Image
                src="/land.png"
                alt="Land decoration"
                width={0}
                height={0}
                sizes="100vw"
                className="absolute bottom-0 lg:-bottom-40 left-0 w-full h-auto z-20"
            />
        </section>
    )
}

export default HeroSection

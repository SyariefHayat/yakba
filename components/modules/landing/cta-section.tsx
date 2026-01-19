import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import Image from "next/image"

// Konstanta warna brand (sama dengan hero-section)
const COLORS = {
    green: "#7CBF25",
    pink: "#EE2D70",
    blue: "#1B83C8",
} as const

// Data kata-kata dengan warna
const CTA_WORDS = [
    { text: "BELAJAR", color: COLORS.green },
    { text: "SERU", color: COLORS.pink },
    { text: "ANAK", color: COLORS.blue },
] as const

const CtaSection = () => {
    return (
        <section className="w-full my-10 md:my-20">
            <div className="relative w-[90%] h-50 md:h-70 lg:h-100 bg-sky-100 mx-auto rounded-xl overflow-hidden">
                {/* CTA Content */}
                <div className="absolute w-[90%] md:w-[70%] lg:w-1/2 left-5 md:left-25 lg:left-70 top-5 md:top-15 lg:top-20 text-center z-30">
                    {/* Title */}
                    <h3 className="text-2xl md:text-5xl font-mochi-boom">
                        {CTA_WORDS.map((word, index) => (
                            <span key={index}>
                                <span style={{ color: word.color }}>{word.text}</span>
                                {index < CTA_WORDS.length - 1 && " "}
                            </span>
                        ))}
                    </h3>

                    {/* Description */}
                    <p className="text-sm md:text-xl font-poppins mt-2">
                        Daftarkan Anak Anda Sekarang dan Mulai Perjalanan Belajarnya Bersama YAKBA!
                    </p>

                    {/* CTA Button */}
                    <Button className="mt-3 bg-yellow-300 text-black text-xs font-bold font-poppins hover:bg-yellow-400 cursor-pointer">
                        Mulai Sekarang <ArrowDown className="text-red-500" />
                    </Button>
                </div>

                {/* Decorations */}
                <Image
                    src="/small-cloud.png"
                    alt="Cloud decoration"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="absolute w-full bottom-5 md:bottom-10 z-10"
                />
                <Image
                    src="/land-small.png"
                    alt="Land decoration"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="absolute w-full bottom-0 z-20"
                />
            </div>
        </section>
    )
}

export default CtaSection

import { Button } from "@/components/ui/button"
import Image from "next/image"

// Interface untuk data program
interface ProgramItem {
    title: string
    description: string
    image: string
    bgColor: string      // Warna background card
    headerBgColor: string // Warna background header/image area
}

// Data program unggulan
const PROGRAMS: ProgramItem[] = [
    {
        title: "Kreativitas Seni",
        description: "Menggambar, melukis, membuat prakarya untuk mengasah kreativitas anak.",
        image: "/program-img-1.png",
        bgColor: "#D0995E",
        headerBgColor: "bg-orange-300",
    },
    {
        title: "Belajar Mengaji",
        description: "Program intensif mengaji dengan metode tahsin dan tajwid.",
        image: "/program-img-2.png",
        bgColor: "#69B5D9",
        headerBgColor: "bg-sky-300",
    },
    {
        title: "Kelas Bahasa",
        description: "Belajar bahasa asing dengan pendekatan permainan interaktif.",
        image: "/program-img-3.png",
        bgColor: "#8B7A9E",
        headerBgColor: "bg-[#AA8FC7]",
    },
]

const ProgramSection = () => {
    return (
        <section className="w-full min-h-screen py-10 mb-10 px-4 md:px-0">
            {/* Section Title */}
            <h2 className="text-3xl md:text-6xl font-mochi-boom text-[#1B83C8] text-center">
                Program Unggulan Kami
            </h2>

            {/* Program Cards Container */}
            <div className="w-[70%] md:w-[80%] flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 items-center justify-between gap-6 md:gap-10 mx-auto mt-10 md:mt-14">
                {PROGRAMS.map((program, index) => (
                    <ProgramCard key={index} {...program} />
                ))}
            </div>
        </section>
    )
}

// Komponen untuk setiap program card
const ProgramCard = ({ title, description, image, bgColor, headerBgColor }: ProgramItem) => {
    return (
        <div
            className="w-full md:w-auto md:flex-1 flex flex-col items-center md:gap-5 rounded-md"
            style={{ backgroundColor: bgColor }}
        >
            {/* Image Header */}
            <div className={`w-full h-48 md:h-60 lg:h-72 p-4 md:p-5 ${headerBgColor} rounded-b-3xl md:rounded-b-4xl rounded-t-md`}>
                <Image
                    src={image}
                    alt={title}
                    width={0}
                    height={0}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="w-full h-full rounded-md border-4 border-white object-cover"
                />
            </div>

            {/* Content */}
            <div className="p-4 pb-5 md:pb-12 md:px-5 text-center md:text-left">
                <h3 className="font-mochi-boom text-xl md:text-2xl lg:text-3xl text-white">
                    {title}
                </h3>
                <p className="font-poppins text-base md:text-lg text-white mt-1">
                    {description}
                </p>
                <Button className="mt-3 bg-yellow-300 hover:bg-yellow-400 text-black cursor-pointer">
                    Lihat lebih detail
                </Button>
            </div>
        </div>
    )
}

export default ProgramSection

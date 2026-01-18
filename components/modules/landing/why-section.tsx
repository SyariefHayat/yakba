import { Button } from "@/components/ui/button"
import Image from "next/image"

// Type untuk posisi image
type ImagePosition = "left" | "right"

// Interface untuk data Why Item
interface WhyItem {
    title: string
    description: string
    image: string
    imagePosition: ImagePosition
}

// Data untuk setiap item "Why"
const WHY_ITEMS: WhyItem[] = [
    {
        title: "Belajar interaktif",
        description: "Belajar aktif yang menumbuhkan rasa ingin tahu dan percaya diri",
        image: "/why-img-1.png",
        imagePosition: "right",
    },
    {
        title: "Kurikulum islami & bahasa arab",
        description: "Pembelajaran nilai islam dan bahasa arab sejak dini untuk membentuk akhlak dan dasar berbahasa anak.",
        image: "/why-img-2.png",
        imagePosition: "left",
    },
    {
        title: "Fleksibel & terukur",
        description: "Pilihan kelas online dan offline dengan perkembangan anak yang nyata dan terpantau.",
        image: "/why-img-3.png",
        imagePosition: "right",
    },
]

const WhySection = () => {
    return (
        <section className="relative w-full min-h-screen bg-[url('/bg.png')] bg-cover lg:mt-20 py-10 md:pb-30 z-20 overflow-hidden">
            {/* Section Title */}
            <h2 className="relative z-20 text-3xl md:text-6xl font-mochi-boom text-white text-center px-4">
                Kenapa Memilih Kami ?
            </h2>

            <div className="hidden md:block md:w-[1120px] lg:w-[1160px] absolute md:top-15 lg:top-10 -right-20 z-10">
                <img src="/why-line.svg" alt="Why Line" className="w-full" />
            </div>

            {/* Why Items Container */}
            <div className="w-[80%] relative z-20 flex flex-col gap-14 mx-auto md:gap-30 mt-14 px-4 md:px-0">
                {WHY_ITEMS.map((item, index) => (
                    <WhyCard key={index} {...item} />
                ))}
            </div>
        </section>
    )
}

// Komponen untuk setiap card
const WhyCard = ({ title, description, image, imagePosition }: WhyItem) => {
    // Komponen teks
    const TextContent = (
        <div className="w-full md:w-95 space-y-2 text-center md:text-left">
            <h3 className="font-mochi-boom text-2xl md:text-4xl text-white">
                {title}
            </h3>
            <p className="font-poppins text-base md:text-lg text-white">
                {description}
            </p>
            <Button className="mt-2 bg-yellow-300 hover:bg-yellow-400 text-black cursor-pointer">
                Lihat lebih detail
            </Button>
        </div>
    )

    // Komponen gambar
    const ImageContent = (
        <div
            className="w-full h-60 md:w-150 md:h-96 rounded-2xl bg-cover bg-center border-4 md:border-8 border-white"
            style={{ backgroundImage: `url('${image}')` }}
        />
    )

    // Di mobile: selalu gambar di atas, teks di bawah (flex-col)
    // Di desktop: sesuai imagePosition (flex-row / flex-row-reverse)
    const desktopOrder = imagePosition === "left" ? "md:flex-row" : "md:flex-row-reverse"

    return (
        <div className={`w-full flex flex-col ${desktopOrder} items-center justify-center gap-6 md:gap-10`}>
            {ImageContent}
            {TextContent}
        </div>
    )
}

export default WhySection
import { Button } from "@/components/ui/button"

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
        <section className="relative w-full min-h-screen bg-[url('/bg.png')] bg-cover lg:mt-20 py-10 md:pb-30 z-20">
            {/* Section Title */}
            <h2 className="text-3xl md:text-6xl font-mochi-boom text-white text-center px-4">
                Kenapa Memilih Kami ?
            </h2>

            {/* Why Items Container */}
            <div className="w-[80%] flex flex-col gap-14 mx-auto md:gap-30 mt-14 px-4 md:px-0">
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
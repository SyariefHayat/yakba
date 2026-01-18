// Type untuk ukuran gallery item
type GallerySize = "small" | "large"

// Interface untuk gallery item
interface GalleryItem {
    image: string
    size: GallerySize
    isDashed?: boolean
}

// Interface untuk gallery column
interface GalleryColumn {
    items: GalleryItem[]
    columnClass?: string  // Class tambahan untuk column
}

// Data gallery columns
const GALLERY_COLUMNS: GalleryColumn[] = [
    {
        items: [
            { image: "/gallery-1.png", size: "small", isDashed: false },
            { image: "/gallery-2.png", size: "large", isDashed: true },
        ],
        columnClass: "items-end py-5 md:py-10",
    },
    {
        items: [
            { image: "/gallery-3.png", size: "large", isDashed: false },
            { image: "/gallery-4.png", size: "small", isDashed: true },
        ],
    },
    {
        items: [
            { image: "/gallery-2.png", size: "large", isDashed: true },
            { image: "/gallery-1.png", size: "small", isDashed: false },
        ],
        columnClass: "items-end py-5 md:py-10",
    },
    {
        items: [
            { image: "/gallery-2.png", size: "small", isDashed: false },
            { image: "/gallery-3.png", size: "large", isDashed: true },
        ],
        columnClass: "items-end pb-10 md:pb-20",
    },
]

// Size mapping untuk class - responsive
const SIZE_CLASSES: Record<GallerySize, string> = {
    small: "w-full h-32 md:h-40",
    large: "w-full h-full",
}

const GallerySection = () => {
    return (
        <section className="w-full min-h-screen bg-[url('/gallery-bg.png')] bg-cover py-20 md:py-40 pb-30 md:pb-50 md:mb-10 px-4 md:px-0">
            {/* Section Title */}
            <h2 className="text-3xl md:text-6xl font-mochi-boom text-white text-center">
                Galeri Aktivitas Kami
            </h2>

            {/* Gallery Grid */}
            <div className="
                w-full md:w-[80%] 
                grid grid-cols-2 lg:flex lg:flex-row 
                items-center justify-between 
                gap-4 md:gap-10 
                mx-auto mt-8 md:mt-14
            ">
                {GALLERY_COLUMNS.map((column, columnIndex) => (
                    <GalleryColumnComponent key={columnIndex} {...column} />
                ))}
            </div>
        </section>
    )
}

// Komponen untuk setiap column
const GalleryColumnComponent = ({ items, columnClass = "" }: GalleryColumn) => {
    return (
        <div className={`w-full h-80 md:h-150 flex flex-col gap-4 md:gap-10 ${columnClass}`}>
            {items.map((item, index) => (
                <GalleryItemComponent key={index} {...item} />
            ))}
        </div>
    )
}

// Komponen untuk setiap gallery item
const GalleryItemComponent = ({ image, size, isDashed = false }: GalleryItem) => {
    const sizeClass = SIZE_CLASSES[size]
    const outlineClass = isDashed ? "outline-dashed" : ""

    return (
        <div
            className={`
                ${sizeClass}
                bg-white rounded-lg md:rounded-xl bg-cover bg-center 
                outline-2 md:outline-4 outline-white ${outlineClass}
            `}
            style={{ backgroundImage: `url('${image}')` }}
        />
    )
}

export default GallerySection

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

// Interface untuk FAQ item
interface FaqItem {
    question: string
    answer: string[]
    bgColor: string
}

// Data FAQ dengan warna berbeda untuk setiap item
const FAQ_ITEMS: FaqItem[] = [
    {
        question: "Berapa usia minimal anak yang bisa ikut program Yakba?",
        answer: [
            "Program Yakba dirancang untuk anak usia 3-6 tahun. Kami menyesuaikan kurikulum dan aktivitas berdasarkan tahapan perkembangan anak.",
            "Untuk anak di bawah 3 tahun, kami menyediakan program parent-child yang melibatkan orang tua dalam proses belajar.",
        ],
        bgColor: "bg-orange-100",
    },
    {
        question: "Apakah bisa belajar secara online saja?",
        answer: [
            "Ya, kami menyediakan program hybrid yang menggabungkan pembelajaran online dan offline. Orang tua dapat memilih sesuai kebutuhan.",
            "Kelas online dilengkapi dengan materi interaktif dan sesi live bersama guru untuk memastikan kualitas pembelajaran tetap optimal.",
        ],
        bgColor: "bg-blue-100",
    },
    {
        question: "Bagaimana keamanan dan lingkungan belajar anak?",
        answer: [
            "Keamanan adalah prioritas utama kami. Seluruh area dilengkapi CCTV, akses terbatas, dan tenaga pengajar yang tersertifikasi.",
            "Lingkungan belajar dirancang ramah anak dengan peralatan yang aman dan steril untuk mendukung eksplorasi yang menyenangkan.",
        ],
        bgColor: "bg-green-100",
    },
    {
        question: "Apakah ada kelas percobaan atau trial?",
        answer: [
            "Tentu! Kami menyediakan satu sesi kelas trial gratis agar anak dan orang tua dapat merasakan suasana belajar di Yakba.",
            "Hubungi kami untuk menjadwalkan kelas trial sesuai waktu yang Anda inginkan.",
        ],
        bgColor: "bg-purple-100",
    },
    {
        question: "Di mana lokasi Yakba Learning Center?",
        answer: [
            "Yakba Learning Center berlokasi di [Alamat Lengkap]. Kami mudah dijangkau dengan transportasi umum maupun kendaraan pribadi.",
            "Tersedia area parkir yang luas dan nyaman untuk orang tua yang mengantar putra-putrinya.",
        ],
        bgColor: "bg-yellow-100",
    },
]

const FaqSection = () => {
    return (
        <section className="w-full">
            {/* Section Title */}
            <h2 className="text-4xl md:text-6xl font-mochi-boom text-[#22C55E] text-center">
                Tanya Jawab Umum
            </h2>

            {/* FAQ Container */}
            <div className="w-[80%] flex flex-1 items-center justify-between gap-10 mx-auto mt-14">
                <Accordion
                    type="single"
                    collapsible
                    className="w-full flex flex-col gap-4"
                    defaultValue="item-0"
                >
                    {FAQ_ITEMS.map((item, index) => (
                        <AccordionItem
                            key={index}
                            value={`item-${index}`}
                            className={`${item.bgColor} rounded-xl px-6 border-none`}
                        >
                            <AccordionTrigger className="font-poppins text-xl md:text-2xl font-semibold hover:no-underline cursor-pointer">
                                {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-lg font-poppins">
                                {item.answer.map((paragraph, pIndex) => (
                                    <p key={pIndex}>{paragraph}</p>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    )
}

export default FaqSection

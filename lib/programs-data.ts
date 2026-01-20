// Interface untuk data program (tanpa icon component untuk serialization)
export interface ProgramDetailData {
    id: string
    title: string
    subtitle: string
    description: string
    fullDescription: string
    image: string
    bgColor: string
    accentColor: string
    iconName: string // Nama icon sebagai string
    features: string[]
    schedule: string
    ageGroup: string
    benefits: string[]
}

// Data program lengkap
export const PROGRAMS_DATA: ProgramDetailData[] = [
    {
        id: "kreativitas-seni",
        title: "Kreativitas Seni",
        subtitle: "Mengasah Bakat Seni Anak",
        description: "Menggambar, melukis, membuat prakarya untuk mengasah kreativitas anak.",
        fullDescription: "Program yang dirancang untuk mengembangkan kreativitas dan imajinasi anak melalui berbagai aktivitas seni seperti menggambar, melukis, membuat prakarya, dan kerajinan tangan. Anak-anak akan belajar mengekspresikan diri dan mengembangkan kemampuan motorik halus mereka dengan bimbingan tenaga pengajar yang berpengalaman.",
        image: "/program-img-1.png",
        bgColor: "#D0995E",
        accentColor: "#F5D0A9",
        iconName: "Palette",
        features: [
            "Menggambar dan melukis dengan berbagai media",
            "Membuat prakarya dari bahan daur ulang",
            "Origami dan paper craft",
            "Kerajinan tangan dengan clay dan playdough",
            "Pameran karya seni bulanan"
        ],
        benefits: [
            "Mengembangkan kreativitas dan imajinasi",
            "Meningkatkan kemampuan motorik halus",
            "Melatih fokus dan kesabaran",
            "Membangun kepercayaan diri melalui karya"
        ],
        schedule: "Senin & Rabu, 09:00 - 10:30",
        ageGroup: "3 - 6 tahun"
    },
    {
        id: "belajar-mengaji",
        title: "Belajar Mengaji",
        subtitle: "Fondasi Keislaman Sejak Dini",
        description: "Program intensif mengaji dengan metode tahsin dan tajwid.",
        fullDescription: "Program intensif mengaji dengan metode tahsin dan tajwid yang menyenangkan. Anak-anak akan belajar mengenal huruf hijaiyah, membaca Al-Quran dengan baik dan benar, serta menghafal surat-surat pendek dengan pendekatan yang sesuai usia dan penuh kasih sayang.",
        image: "/program-img-2.png",
        bgColor: "#69B5D9",
        accentColor: "#B8E0F0",
        iconName: "BookOpen",
        features: [
            "Pengenalan huruf hijaiyah dengan metode interaktif",
            "Pembelajaran tajwid dasar",
            "Hafalan surat-surat pendek (Juz Amma)",
            "Doa-doa harian dan adab Islami",
            "Muroja'ah rutin dengan reward system"
        ],
        benefits: [
            "Menanamkan cinta Al-Quran sejak dini",
            "Membangun fondasi keimanan yang kuat",
            "Melatih kedisiplinan dan konsistensi",
            "Membentuk akhlak Islami"
        ],
        schedule: "Setiap hari, 08:00 - 09:00",
        ageGroup: "4 - 6 tahun"
    },
    {
        id: "kelas-bahasa",
        title: "Kelas Bahasa",
        subtitle: "Multilingual Learning",
        description: "Belajar bahasa asing dengan pendekatan permainan interaktif.",
        fullDescription: "Program pembelajaran bahasa asing dengan pendekatan permainan interaktif dan immersive learning. Fokus pada bahasa Arab dan bahasa Inggris untuk mempersiapkan anak menghadapi tantangan global dengan tetap berpegang pada nilai-nilai Islam.",
        image: "/program-img-3.png",
        bgColor: "#8B7A9E",
        accentColor: "#C9B8DB",
        iconName: "Languages",
        features: [
            "Bahasa Arab dasar dengan kosakata sehari-hari",
            "Bahasa Inggris melalui lagu dan cerita",
            "Flashcard dan games edukatif",
            "Role play dan conversation practice",
            "Pengenalan huruf dan angka dalam berbagai bahasa"
        ],
        benefits: [
            "Membuka wawasan global",
            "Meningkatkan kemampuan kognitif",
            "Mempersiapkan anak untuk pendidikan lanjutan",
            "Menumbuhkan rasa percaya diri berkomunikasi"
        ],
        schedule: "Selasa & Kamis, 09:00 - 10:30",
        ageGroup: "3 - 6 tahun"
    },
    {
        id: "musik-gerak",
        title: "Musik & Gerak",
        subtitle: "Ekspresi Melalui Ritme",
        description: "Mengembangkan koordinasi motorik melalui musik dan gerakan.",
        fullDescription: "Program yang menggabungkan musik dan gerakan untuk mengembangkan koordinasi motorik, pendengaran, dan ekspresi diri anak. Melalui lagu-lagu Islami dan permainan musik, anak belajar rhythm, tempo, dan kreativitas.",
        image: "/program-img-1.png",
        bgColor: "#E88B8B",
        accentColor: "#F5C4C4",
        iconName: "Music",
        features: [
            "Pengenalan alat musik perkusi sederhana",
            "Lagu-lagu anak Islami",
            "Senam dan gerakan kreatif",
            "Permainan ritme dan tempo",
            "Penampilan musik di acara sekolah"
        ],
        benefits: [
            "Mengembangkan koordinasi motorik",
            "Meningkatkan kemampuan pendengaran",
            "Melatih ekspresi diri",
            "Membangun kepercayaan diri tampil"
        ],
        schedule: "Jumat, 09:00 - 10:00",
        ageGroup: "3 - 6 tahun"
    },
    {
        id: "logika-matematika",
        title: "Logika & Matematika",
        subtitle: "Berhitung Sambil Bermain",
        description: "Pembelajaran konsep matematika dasar melalui permainan.",
        fullDescription: "Program pembelajaran konsep matematika dasar melalui permainan dan manipulatif konkret. Anak-anak belajar mengenal angka, berhitung, mengenal bentuk geometri, dan konsep dasar matematika dengan cara yang menyenangkan.",
        image: "/program-img-2.png",
        bgColor: "#7CBF25",
        accentColor: "#C4E5A0",
        iconName: "Calculator",
        features: [
            "Pengenalan angka 1-100",
            "Operasi dasar penjumlahan dan pengurangan",
            "Pengenalan bentuk geometri",
            "Konsep ukuran dan perbandingan",
            "Puzzle dan permainan logika"
        ],
        benefits: [
            "Mengembangkan kemampuan berpikir logis",
            "Mempersiapkan fondasi matematika",
            "Melatih problem solving",
            "Meningkatkan kemampuan konsentrasi"
        ],
        schedule: "Senin - Jumat, 10:30 - 11:30",
        ageGroup: "4 - 6 tahun"
    },
    {
        id: "sosial-emosional",
        title: "Sosial Emosional",
        subtitle: "Tumbuh Bersama Teman",
        description: "Pengembangan kecerdasan sosial dan emosional anak.",
        fullDescription: "Program pengembangan kecerdasan sosial dan emosional anak melalui berbagai aktivitas kelompok. Anak belajar berbagi, bekerja sama, mengelola emosi, dan membangun hubungan positif dengan teman sebaya.",
        image: "/program-img-3.png",
        bgColor: "#1B83C8",
        accentColor: "#8BC4E8",
        iconName: "Users",
        features: [
            "Circle time dan sharing session",
            "Permainan kelompok kooperatif",
            "Pengenalan dan pengelolaan emosi",
            "Roleplay situasi sosial",
            "Project bersama dan gotong royong"
        ],
        benefits: [
            "Mengembangkan kecerdasan emosional",
            "Melatih kemampuan bersosialisasi",
            "Belajar mengelola konflik",
            "Membangun empati dan kepedulian"
        ],
        schedule: "Setiap hari, 11:30 - 12:00",
        ageGroup: "3 - 6 tahun"
    },
]

// Helper function untuk mendapatkan program berdasarkan ID
export const getProgramById = (id: string): ProgramDetailData | undefined => {
    return PROGRAMS_DATA.find(program => program.id === id)
}

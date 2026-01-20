import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Play,
    Clock,
    Eye,
    Search,
    BookOpen,
    GraduationCap,
    Star,
    Download,
    FileText,
} from "lucide-react"

const educationLevels = [
    { id: "sd", name: "SD", count: 42 },
    { id: "smp", name: "SMP", count: 38 },
    { id: "sma", name: "SMA", count: 35 },
]

const sdVideos = [
    {
        id: 1,
        title: "Matematika SD - Penjumlahan dan Pengurangan",
        description: "Belajar konsep dasar penjumlahan dan pengurangan untuk kelas 1-2 SD.",
        duration: "12:45",
        views: 3456,
        subject: "Matematika",
        grade: "Kelas 1-2",
        hasModule: true,
        rating: 4.9,
    },
    {
        id: 2,
        title: "IPA SD - Mengenal Makhluk Hidup",
        description: "Pengenalan ciri-ciri makhluk hidup dan lingkungan sekitar.",
        duration: "15:20",
        views: 2890,
        subject: "IPA",
        grade: "Kelas 3-4",
        hasModule: true,
        rating: 4.8,
    },
    {
        id: 3,
        title: "Bahasa Indonesia - Membaca Cerita Pendek",
        description: "Teknik membaca dan memahami cerita pendek untuk anak SD.",
        duration: "10:30",
        views: 2145,
        subject: "B. Indonesia",
        grade: "Kelas 4-5",
        hasModule: true,
        rating: 4.7,
    },
    {
        id: 4,
        title: "Matematika SD - Perkalian dan Pembagian",
        description: "Konsep perkalian dan pembagian dengan metode yang menyenangkan.",
        duration: "18:00",
        views: 4210,
        subject: "Matematika",
        grade: "Kelas 3-4",
        hasModule: true,
        rating: 4.9,
    },
]

const smpVideos = [
    {
        id: 1,
        title: "Matematika SMP - Aljabar Dasar",
        description: "Pengenalan konsep aljabar dan variabel untuk siswa SMP.",
        duration: "20:15",
        views: 2890,
        subject: "Matematika",
        grade: "Kelas 7",
        hasModule: true,
        rating: 4.8,
    },
    {
        id: 2,
        title: "Fisika SMP - Gerak dan Gaya",
        description: "Memahami konsep gerak lurus dan gaya dalam kehidupan sehari-hari.",
        duration: "25:30",
        views: 2456,
        subject: "Fisika",
        grade: "Kelas 8",
        hasModule: true,
        rating: 4.7,
    },
    {
        id: 3,
        title: "Biologi SMP - Sistem Pencernaan",
        description: "Penjelasan lengkap sistem pencernaan manusia dan fungsinya.",
        duration: "22:45",
        views: 3120,
        subject: "Biologi",
        grade: "Kelas 8",
        hasModule: true,
        rating: 4.9,
    },
    {
        id: 4,
        title: "Bahasa Inggris - Grammar Essentials",
        description: "Present Tense, Past Tense, dan penggunaannya dalam kalimat.",
        duration: "18:00",
        views: 2780,
        subject: "B. Inggris",
        grade: "Kelas 7-9",
        hasModule: true,
        rating: 4.6,
    },
]

const smaVideos = [
    {
        id: 1,
        title: "Matematika SMA - Turunan Fungsi",
        description: "Konsep turunan, aturan turunan, dan aplikasinya.",
        duration: "30:00",
        views: 4560,
        subject: "Matematika",
        grade: "Kelas 11",
        hasModule: true,
        rating: 4.9,
    },
    {
        id: 2,
        title: "Fisika SMA - Hukum Newton",
        description: "Penjelasan mendalam tentang tiga hukum gerak Newton.",
        duration: "28:15",
        views: 3890,
        subject: "Fisika",
        grade: "Kelas 10",
        hasModule: true,
        rating: 4.8,
    },
    {
        id: 3,
        title: "Kimia SMA - Ikatan Kimia",
        description: "Jenis-jenis ikatan kimia: ionik, kovalen, dan logam.",
        duration: "25:30",
        views: 3420,
        subject: "Kimia",
        grade: "Kelas 10",
        hasModule: true,
        rating: 4.7,
    },
    {
        id: 4,
        title: "Biologi SMA - Genetika",
        description: "Hukum Mendel dan pewarisan sifat pada makhluk hidup.",
        duration: "32:00",
        views: 4120,
        subject: "Biologi",
        grade: "Kelas 12",
        hasModule: true,
        rating: 4.9,
    },
]

const getVideosByLevel = (level: string) => {
    switch (level) {
        case "sd":
            return sdVideos
        case "smp":
            return smpVideos
        case "sma":
            return smaVideos
        default:
            return sdVideos
    }
}

function VideoCard({ video }: { video: typeof sdVideos[0] }) {
    return (
        <Card className="overflow-hidden group cursor-pointer transition-all hover:shadow-lg">
            {/* Thumbnail */}
            <div className="relative aspect-video bg-linear-to-br from-[#7CBF25]/20 to-emerald-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-black/60 p-4 group-hover:bg-[#7CBF25] transition-colors">
                        <Play className="h-8 w-8 text-white fill-white" />
                    </div>
                </div>
                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2">
                    <Badge className="bg-black/70 hover:bg-black/70">
                        <Clock className="h-3 w-3 mr-1" />
                        {video.duration}
                    </Badge>
                </div>
                {/* Subject Badge */}
                <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="bg-white/90">
                        {video.subject}
                    </Badge>
                </div>
            </div>

            <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base line-clamp-2 group-hover:text-[#7CBF25] transition-colors">
                        {video.title}
                    </CardTitle>
                </div>
                <CardDescription className="line-clamp-2">
                    {video.description}
                </CardDescription>
            </CardHeader>

            <CardContent className="pb-2">
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                        <GraduationCap className="h-3 w-3 mr-1" />
                        {video.grade}
                    </Badge>
                    {video.hasModule && (
                        <Badge variant="outline" className="text-xs text-[#7CBF25] border-[#7CBF25]">
                            <FileText className="h-3 w-3 mr-1" />
                            Ada Modul
                        </Badge>
                    )}
                </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{video.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{video.views.toLocaleString()}</span>
                    </div>
                </div>
                <Button size="sm" variant="ghost" className="text-[#7CBF25] hover:text-[#7CBF25]/90">
                    <Download className="h-4 w-4 mr-1" />
                    Modul
                </Button>
            </CardFooter>
        </Card>
    )
}

export default function VideoPembelajaranPage() {
    return (
        <div className="flex flex-1 flex-col gap-6 p-6">
            {/* Header Section */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Video Pembelajaran
                        </h1>
                        <Badge variant="secondary" className="bg-[#7CBF25]/10 text-[#7CBF25]">
                            <BookOpen className="h-3 w-3 mr-1" />
                            Kurikulum Terbaru
                        </Badge>
                    </div>
                    <p className="text-muted-foreground">
                        Video materi pembelajaran untuk siswa SD, SMP, dan SMA sesuai kurikulum.
                    </p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Cari video pembelajaran..."
                        className="pl-9 w-[280px]"
                    />
                </div>
            </div>

            {/* Tabs by Education Level */}
            <Tabs defaultValue="sd" className="space-y-6">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                    {educationLevels.map((level) => (
                        <TabsTrigger key={level.id} value={level.id} className="gap-2">
                            {level.name}
                            <Badge variant="secondary" className="text-xs">
                                {level.count}
                            </Badge>
                        </TabsTrigger>
                    ))}
                </TabsList>

                {educationLevels.map((level) => (
                    <TabsContent key={level.id} value={level.id} className="space-y-6">
                        {/* Stats for this level */}
                        <div className="grid gap-4 md:grid-cols-4">
                            <Card>
                                <CardContent className="flex items-center gap-4 p-4">
                                    <div className="rounded-full bg-blue-500/10 p-2">
                                        <Play className="h-5 w-5 text-blue-500" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">{level.count}</p>
                                        <p className="text-sm text-muted-foreground">Total Video</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="flex items-center gap-4 p-4">
                                    <div className="rounded-full bg-green-500/10 p-2">
                                        <BookOpen className="h-5 w-5 text-green-500" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">5</p>
                                        <p className="text-sm text-muted-foreground">Mata Pelajaran</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="flex items-center gap-4 p-4">
                                    <div className="rounded-full bg-orange-500/10 p-2">
                                        <FileText className="h-5 w-5 text-orange-500" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">{level.count}</p>
                                        <p className="text-sm text-muted-foreground">Modul Tersedia</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="flex items-center gap-4 p-4">
                                    <div className="rounded-full bg-purple-500/10 p-2">
                                        <Clock className="h-5 w-5 text-purple-500" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">12 jam</p>
                                        <p className="text-sm text-muted-foreground">Total Durasi</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Video Grid */}
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {getVideosByLevel(level.id).map((video) => (
                                <VideoCard key={video.id} video={video} />
                            ))}
                        </div>

                        {/* Load More */}
                        <div className="flex justify-center">
                            <Button variant="outline">
                                Lihat Semua Video {level.name}
                            </Button>
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}

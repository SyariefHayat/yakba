import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Play,
    Clock,
    Eye,
    Search,
    Filter,
    BookOpen,
    Users,
    Star,
} from "lucide-react"

const videoCategories = [
    { name: "Semua", count: 45, active: true },
    { name: "Matematika", count: 12 },
    { name: "IPA", count: 8 },
    { name: "Bahasa", count: 10 },
    { name: "Marketing", count: 15 },
]

const featuredVideos = [
    {
        id: 1,
        title: "Cara Mengajar Matematika yang Menyenangkan",
        description: "Tips dan trik mengajar matematika agar siswa tidak bosan dan mudah memahami konsep dasar.",
        thumbnail: "/thumbnails/math-teaching.jpg",
        duration: "15:30",
        views: 1250,
        category: "Tutorial Mengajar",
        instructor: "Pak Ahmad",
        rating: 4.8,
        isNew: true,
    },
    {
        id: 2,
        title: "Strategi Marketing Bimbel untuk Pemula",
        description: "Panduan lengkap memulai marketing bimbel dari nol hingga mendapatkan siswa pertama.",
        thumbnail: "/thumbnails/marketing.jpg",
        duration: "22:15",
        views: 890,
        category: "Marketing",
        instructor: "Bu Sari",
        rating: 4.9,
        isNew: true,
    },
    {
        id: 3,
        title: "Pengenalan Platform YAKBA untuk Mitra Baru",
        description: "Tutorial lengkap penggunaan dashboard dan fitur-fitur platform YAKBA.",
        thumbnail: "/thumbnails/platform.jpg",
        duration: "18:45",
        views: 2100,
        category: "Onboarding",
        instructor: "Tim YAKBA",
        rating: 4.7,
        isNew: false,
    },
    {
        id: 4,
        title: "Teknik Komunikasi dengan Orang Tua Siswa",
        description: "Cara berkomunikasi efektif dengan orang tua untuk membangun kepercayaan.",
        thumbnail: "/thumbnails/communication.jpg",
        duration: "12:20",
        views: 756,
        category: "Soft Skills",
        instructor: "Pak Budi",
        rating: 4.6,
        isNew: false,
    },
    {
        id: 5,
        title: "Membuat Jadwal Bimbel yang Efektif",
        description: "Cara menyusun jadwal bimbel yang optimal untuk siswa dan pengajar.",
        thumbnail: "/thumbnails/schedule.jpg",
        duration: "10:15",
        views: 645,
        category: "Manajemen",
        instructor: "Bu Dewi",
        rating: 4.5,
        isNew: false,
    },
    {
        id: 6,
        title: "Menggunakan Media Pembelajaran Digital",
        description: "Tutorial penggunaan berbagai media digital untuk meningkatkan kualitas pembelajaran.",
        thumbnail: "/thumbnails/digital.jpg",
        duration: "25:00",
        views: 1890,
        category: "Tutorial Mengajar",
        instructor: "Pak Rudi",
        rating: 4.8,
        isNew: false,
    },
]

const stats = [
    { label: "Total Video", value: "124", icon: Play, color: "text-blue-500" },
    { label: "Total Durasi", value: "45 jam", icon: Clock, color: "text-green-500" },
    { label: "Total Views", value: "15.2K", icon: Eye, color: "text-orange-500" },
    { label: "Kategori", value: "8", icon: BookOpen, color: "text-purple-500" },
]

export default function VideoTutorialPage() {
    return (
        <div className="flex flex-1 flex-col gap-6 p-6">
            {/* Header Section */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Video Tutorial
                    </h1>
                    <p className="text-muted-foreground">
                        Kumpulan video tutorial untuk membantu Anda menjadi mitra sukses YAKBA.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Cari video..."
                            className="pl-9 w-[250px]"
                        />
                    </div>
                    <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.label}>
                        <CardContent className="flex items-center gap-4 p-4">
                            <div className={`rounded-full bg-muted p-2`}>
                                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{stat.value}</p>
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Category Pills */}
            <div className="flex gap-2 flex-wrap">
                {videoCategories.map((category) => (
                    <Button
                        key={category.name}
                        variant={category.active ? "default" : "outline"}
                        size="sm"
                        className={category.active ? "bg-[#7CBF25] hover:bg-[#7CBF25]/90" : ""}
                    >
                        {category.name}
                        <Badge variant="secondary" className="ml-2 text-xs">
                            {category.count}
                        </Badge>
                    </Button>
                ))}
            </div>

            {/* Video Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featuredVideos.map((video) => (
                    <Card key={video.id} className="overflow-hidden group cursor-pointer transition-all hover:shadow-lg">
                        {/* Thumbnail */}
                        <div className="relative aspect-video bg-linear-to-br from-muted to-muted/50">
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
                            {/* New Badge */}
                            {video.isNew && (
                                <div className="absolute top-2 left-2">
                                    <Badge className="bg-[#7CBF25] hover:bg-[#7CBF25]">
                                        Baru
                                    </Badge>
                                </div>
                            )}
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
                            <Badge variant="outline" className="text-xs">
                                {video.category}
                            </Badge>
                        </CardContent>

                        <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                <span>{video.instructor}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span>{video.rating}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Eye className="h-4 w-4" />
                                    <span>{video.views}</span>
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Load More */}
            <div className="flex justify-center">
                <Button variant="outline">
                    Muat Lebih Banyak
                </Button>
            </div>
        </div>
    )
}

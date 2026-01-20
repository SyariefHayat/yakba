import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    BookOpen,
    Download,
    Search,
    Filter,
    FileText,
    Eye,
    Clock,
    ArrowLeft,
    Target,
} from "lucide-react"
import Link from "next/link"

const subjects = [
    { name: "Semua", count: 54, active: true },
    { name: "Matematika", count: 14 },
    { name: "Fisika", count: 12 },
    { name: "Kimia", count: 10 },
    { name: "Biologi", count: 10 },
    { name: "B. Inggris", count: 8 },
]

const modules = [
    {
        id: 1,
        title: "Turunan Fungsi",
        description: "Konsep turunan, aturan-aturan turunan, dan aplikasi dalam optimasi.",
        subject: "Matematika",
        grade: "Kelas 11",
        pages: 34,
        downloads: 3890,
        views: 8200,
        updatedAt: "1 hari lalu",
        isNew: true,
        isUTBK: true,
    },
    {
        id: 2,
        title: "Integral Tak Tentu",
        description: "Konsep integral sebagai anti-turunan dan teknik-teknik pengintegralan.",
        subject: "Matematika",
        grade: "Kelas 11-12",
        pages: 32,
        downloads: 3450,
        views: 7400,
        updatedAt: "2 hari lalu",
        isNew: true,
        isUTBK: true,
    },
    {
        id: 3,
        title: "Limit Fungsi",
        description: "Pengertian limit, sifat-sifat limit, dan limit fungsi trigonometri.",
        subject: "Matematika",
        grade: "Kelas 11",
        pages: 28,
        downloads: 3100,
        views: 6800,
        updatedAt: "5 hari lalu",
        isNew: false,
        isUTBK: true,
    },
    {
        id: 4,
        title: "Hukum Newton",
        description: "Tiga hukum Newton tentang gerak dan aplikasinya dalam fisika.",
        subject: "Fisika",
        grade: "Kelas 10",
        pages: 30,
        downloads: 2890,
        views: 6200,
        updatedAt: "3 hari lalu",
        isNew: true,
        isUTBK: true,
    },
    {
        id: 5,
        title: "Gelombang dan Bunyi",
        description: "Karakteristik gelombang, resonansi, dan efek Doppler.",
        subject: "Fisika",
        grade: "Kelas 11",
        pages: 28,
        downloads: 2540,
        views: 5500,
        updatedAt: "1 minggu lalu",
        isNew: false,
        isUTBK: false,
    },
    {
        id: 6,
        title: "Ikatan Kimia",
        description: "Jenis-jenis ikatan kimia: ionik, kovalen, dan logam.",
        subject: "Kimia",
        grade: "Kelas 10",
        pages: 26,
        downloads: 2780,
        views: 6000,
        updatedAt: "4 hari lalu",
        isNew: false,
        isUTBK: true,
    },
    {
        id: 7,
        title: "Stoikiometri",
        description: "Perhitungan kimia: mol, massa molar, dan persamaan reaksi.",
        subject: "Kimia",
        grade: "Kelas 10",
        pages: 30,
        downloads: 2650,
        views: 5800,
        updatedAt: "1 minggu lalu",
        isNew: false,
        isUTBK: true,
    },
    {
        id: 8,
        title: "Genetika Mendel",
        description: "Hukum Mendel, pewarisan sifat, dan persilangan monohibrid.",
        subject: "Biologi",
        grade: "Kelas 12",
        pages: 32,
        downloads: 2890,
        views: 6300,
        updatedAt: "2 hari lalu",
        isNew: true,
        isUTBK: true,
    },
]

export default function ModulSMAPage() {
    return (
        <div className="flex flex-1 flex-col gap-6 p-6">
            {/* Header Section */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/dashboard/modul">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-3xl font-bold tracking-tight">
                                Modul SMA
                            </h1>
                            <Badge className="bg-purple-500/10 text-purple-600 hover:bg-purple-500/10">
                                <Target className="h-3 w-3 mr-1" />
                                UTBK Ready
                            </Badge>
                        </div>
                        <p className="text-muted-foreground">
                            Modul pembelajaran untuk siswa Sekolah Menengah Atas kelas 10-12.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Cari modul SMA..."
                                className="pl-9 w-[280px]"
                            />
                        </div>
                        <Button variant="outline" size="icon">
                            <Filter className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <BookOpen className="h-4 w-4" />
                        <span>54 modul tersedia</span>
                    </div>
                </div>
            </div>

            {/* Subject Pills */}
            <div className="flex gap-2 flex-wrap">
                {subjects.map((subject) => (
                    <Button
                        key={subject.name}
                        variant={subject.active ? "default" : "outline"}
                        size="sm"
                        className={subject.active ? "bg-purple-500 hover:bg-purple-500/90" : ""}
                    >
                        {subject.name}
                        <Badge variant="secondary" className="ml-2 text-xs">
                            {subject.count}
                        </Badge>
                    </Button>
                ))}
            </div>

            {/* Modules Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {modules.map((module) => (
                    <Card key={module.id} className="cursor-pointer transition-all hover:shadow-lg group">
                        {/* Card Header with Icon */}
                        <div className="relative h-32 bg-linear-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center">
                            <BookOpen className="h-12 w-12 text-purple-500/50 group-hover:text-purple-500 transition-colors" />
                            <div className="absolute top-2 right-2 flex gap-1">
                                {module.isNew && (
                                    <Badge className="bg-purple-500 hover:bg-purple-500">
                                        Baru
                                    </Badge>
                                )}
                                {module.isUTBK && (
                                    <Badge variant="outline" className="bg-white/80 text-purple-600 border-purple-300">
                                        <Target className="h-3 w-3 mr-1" />
                                        UTBK
                                    </Badge>
                                )}
                            </div>
                            <div className="absolute bottom-2 left-2">
                                <Badge variant="secondary" className="text-xs">
                                    {module.subject}
                                </Badge>
                            </div>
                        </div>

                        <CardHeader className="pb-2">
                            <CardTitle className="text-base line-clamp-1 group-hover:text-purple-500 transition-colors">
                                {module.title}
                            </CardTitle>
                            <CardDescription className="line-clamp-2 text-xs">
                                {module.description}
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="pb-2 space-y-2">
                            <Badge variant="outline" className="text-xs">
                                {module.grade}
                            </Badge>
                            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <FileText className="h-3 w-3" />
                                    <span>{module.pages} hal</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Download className="h-3 w-3" />
                                    <span>{module.downloads.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Eye className="h-3 w-3" />
                                    <span>{module.views.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    <span>{module.updatedAt}</span>
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter>
                            <Button variant="outline" size="sm" className="w-full">
                                <Download className="h-4 w-4 mr-2" />
                                Download
                            </Button>
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

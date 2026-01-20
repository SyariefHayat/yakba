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
} from "lucide-react"
import Link from "next/link"

const subjects = [
    { name: "Semua", count: 48, active: true },
    { name: "Matematika", count: 15 },
    { name: "IPA", count: 12 },
    { name: "B. Indonesia", count: 11 },
    { name: "B. Inggris", count: 10 },
]

const modules = [
    {
        id: 1,
        title: "Penjumlahan dan Pengurangan",
        description: "Konsep dasar penjumlahan dan pengurangan bilangan bulat dengan metode visual.",
        subject: "Matematika",
        grade: "Kelas 1-2",
        pages: 18,
        downloads: 2450,
        views: 5600,
        updatedAt: "2 hari lalu",
        isNew: true,
    },
    {
        id: 2,
        title: "Perkalian dan Pembagian",
        description: "Mengenal perkalian dan pembagian dengan pendekatan cerita dan gambar.",
        subject: "Matematika",
        grade: "Kelas 3-4",
        pages: 24,
        downloads: 1890,
        views: 4200,
        updatedAt: "1 minggu lalu",
        isNew: true,
    },
    {
        id: 3,
        title: "Pecahan Sederhana",
        description: "Pengenalan pecahan, penyederhanaan, dan operasi pecahan dasar.",
        subject: "Matematika",
        grade: "Kelas 4-5",
        pages: 22,
        downloads: 1650,
        views: 3800,
        updatedAt: "2 minggu lalu",
        isNew: false,
    },
    {
        id: 4,
        title: "Bangun Datar",
        description: "Mengenal berbagai bangun datar, sifat-sifat, dan cara menghitung luas.",
        subject: "Matematika",
        grade: "Kelas 5-6",
        pages: 26,
        downloads: 1420,
        views: 3200,
        updatedAt: "2 minggu lalu",
        isNew: false,
    },
    {
        id: 5,
        title: "Makhluk Hidup dan Lingkungan",
        description: "Ciri-ciri makhluk hidup, klasifikasi, dan hubungan dengan lingkungan.",
        subject: "IPA",
        grade: "Kelas 3-4",
        pages: 20,
        downloads: 1780,
        views: 4100,
        updatedAt: "3 hari lalu",
        isNew: true,
    },
    {
        id: 6,
        title: "Sistem Tubuh Manusia",
        description: "Pengenalan sistem organ tubuh manusia: pencernaan, pernapasan, dan peredaran darah.",
        subject: "IPA",
        grade: "Kelas 5-6",
        pages: 28,
        downloads: 1540,
        views: 3600,
        updatedAt: "1 minggu lalu",
        isNew: false,
    },
    {
        id: 7,
        title: "Membaca dan Menulis Permulaan",
        description: "Teknik membaca dan menulis untuk siswa kelas awal dengan metode fonik.",
        subject: "B. Indonesia",
        grade: "Kelas 1-2",
        pages: 16,
        downloads: 2100,
        views: 4800,
        updatedAt: "5 hari lalu",
        isNew: false,
    },
    {
        id: 8,
        title: "Cerita Pendek dan Puisi",
        description: "Memahami unsur-unsur cerita pendek dan puisi, serta cara menulis kreatif.",
        subject: "B. Indonesia",
        grade: "Kelas 4-5",
        pages: 22,
        downloads: 1320,
        views: 2900,
        updatedAt: "2 minggu lalu",
        isNew: false,
    },
]

export default function ModulSDPage() {
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
                        <h1 className="text-3xl font-bold tracking-tight">
                            Modul SD
                        </h1>
                        <p className="text-muted-foreground">
                            Modul pembelajaran untuk siswa Sekolah Dasar kelas 1-6.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Cari modul SD..."
                                className="pl-9 w-[280px]"
                            />
                        </div>
                        <Button variant="outline" size="icon">
                            <Filter className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <BookOpen className="h-4 w-4" />
                        <span>48 modul tersedia</span>
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
                        className={subject.active ? "bg-blue-500 hover:bg-blue-500/90" : ""}
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
                        <div className="relative h-32 bg-linear-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center">
                            <BookOpen className="h-12 w-12 text-blue-500/50 group-hover:text-blue-500 transition-colors" />
                            {module.isNew && (
                                <div className="absolute top-2 right-2">
                                    <Badge className="bg-blue-500 hover:bg-blue-500">
                                        Baru
                                    </Badge>
                                </div>
                            )}
                            <div className="absolute bottom-2 left-2">
                                <Badge variant="secondary" className="text-xs">
                                    {module.subject}
                                </Badge>
                            </div>
                        </div>

                        <CardHeader className="pb-2">
                            <CardTitle className="text-base line-clamp-1 group-hover:text-blue-500 transition-colors">
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

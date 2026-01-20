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
    { name: "Semua", count: 54, active: true },
    { name: "Matematika", count: 14 },
    { name: "IPA", count: 12 },
    { name: "IPS", count: 10 },
    { name: "B. Indonesia", count: 9 },
    { name: "B. Inggris", count: 9 },
]

const modules = [
    {
        id: 1,
        title: "Aljabar Dasar",
        description: "Pengenalan variabel, konstanta, dan operasi aljabar untuk pemula.",
        subject: "Matematika",
        grade: "Kelas 7",
        pages: 26,
        downloads: 2890,
        views: 6200,
        updatedAt: "1 hari lalu",
        isNew: true,
    },
    {
        id: 2,
        title: "Persamaan Linear",
        description: "Konsep persamaan linear satu variabel dan penyelesaiannya.",
        subject: "Matematika",
        grade: "Kelas 7-8",
        pages: 28,
        downloads: 2450,
        views: 5400,
        updatedAt: "3 hari lalu",
        isNew: true,
    },
    {
        id: 3,
        title: "Teorema Pythagoras",
        description: "Pembuktian dan aplikasi teorema Pythagoras dalam kehidupan sehari-hari.",
        subject: "Matematika",
        grade: "Kelas 8",
        pages: 24,
        downloads: 2100,
        views: 4800,
        updatedAt: "1 minggu lalu",
        isNew: false,
    },
    {
        id: 4,
        title: "Gerak dan Gaya",
        description: "Konsep gerak lurus, gaya, dan hukum Newton untuk SMP.",
        subject: "IPA",
        grade: "Kelas 8",
        pages: 30,
        downloads: 2340,
        views: 5100,
        updatedAt: "2 hari lalu",
        isNew: true,
    },
    {
        id: 5,
        title: "Sistem Peredaran Darah",
        description: "Struktur dan fungsi sistem peredaran darah manusia.",
        subject: "IPA",
        grade: "Kelas 8",
        pages: 25,
        downloads: 1980,
        views: 4300,
        updatedAt: "5 hari lalu",
        isNew: false,
    },
    {
        id: 6,
        title: "Sistem Pencernaan",
        description: "Organ-organ pencernaan dan proses pencernaan makanan.",
        subject: "IPA",
        grade: "Kelas 8",
        pages: 22,
        downloads: 1850,
        views: 4000,
        updatedAt: "1 minggu lalu",
        isNew: false,
    },
    {
        id: 7,
        title: "Sejarah Indonesia Modern",
        description: "Perjuangan kemerdekaan dan pembentukan NKRI.",
        subject: "IPS",
        grade: "Kelas 9",
        pages: 32,
        downloads: 1650,
        views: 3600,
        updatedAt: "1 minggu lalu",
        isNew: false,
    },
    {
        id: 8,
        title: "Tenses: Present & Past",
        description: "Penguasaan Present Tense dan Past Tense dalam Bahasa Inggris.",
        subject: "B. Inggris",
        grade: "Kelas 7-8",
        pages: 28,
        downloads: 2200,
        views: 4900,
        updatedAt: "4 hari lalu",
        isNew: false,
    },
]

export default function ModulSMPPage() {
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
                            Modul SMP
                        </h1>
                        <p className="text-muted-foreground">
                            Modul pembelajaran untuk siswa Sekolah Menengah Pertama kelas 7-9.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Cari modul SMP..."
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
                        className={subject.active ? "bg-green-500 hover:bg-green-500/90" : ""}
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
                        <div className="relative h-32 bg-linear-to-br from-green-500/10 to-emerald-500/10 flex items-center justify-center">
                            <BookOpen className="h-12 w-12 text-green-500/50 group-hover:text-green-500 transition-colors" />
                            {module.isNew && (
                                <div className="absolute top-2 right-2">
                                    <Badge className="bg-green-500 hover:bg-green-500">
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
                            <CardTitle className="text-base line-clamp-1 group-hover:text-green-500 transition-colors">
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

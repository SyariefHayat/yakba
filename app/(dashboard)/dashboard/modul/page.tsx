import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import {
    BookOpen,
    Download,
    Eye,
    Search,
    Filter,
    FileText,
    GraduationCap,
    Clock,
    ArrowRight,
} from "lucide-react"

const stats = [
    { label: "Total Modul", value: "156", icon: BookOpen, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Modul SD", value: "48", icon: GraduationCap, color: "text-green-500", bg: "bg-green-500/10" },
    { label: "Modul SMP", value: "54", icon: GraduationCap, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Modul SMA", value: "54", icon: GraduationCap, color: "text-purple-500", bg: "bg-purple-500/10" },
]

const levelCards = [
    {
        level: "SD",
        title: "Modul Sekolah Dasar",
        description: "Modul pembelajaran untuk siswa kelas 1-6 SD meliputi Matematika, IPA, Bahasa Indonesia, dan Bahasa Inggris.",
        totalModules: 48,
        subjects: ["Matematika", "IPA", "B. Indonesia", "B. Inggris"],
        color: "from-blue-500/10 to-cyan-500/10",
        iconColor: "text-blue-500",
        href: "/dashboard/modul/sd",
    },
    {
        level: "SMP",
        title: "Modul Sekolah Menengah Pertama",
        description: "Modul lengkap untuk siswa kelas 7-9 SMP meliputi semua mata pelajaran inti dan pendukung.",
        totalModules: 54,
        subjects: ["Matematika", "IPA", "IPS", "B. Indonesia", "B. Inggris"],
        color: "from-green-500/10 to-emerald-500/10",
        iconColor: "text-green-500",
        href: "/dashboard/modul/smp",
    },
    {
        level: "SMA",
        title: "Modul Sekolah Menengah Atas",
        description: "Modul intensif untuk siswa kelas 10-12 SMA dengan fokus persiapan ujian dan UTBK.",
        totalModules: 54,
        subjects: ["Matematika", "Fisika", "Kimia", "Biologi", "B. Inggris"],
        color: "from-purple-500/10 to-pink-500/10",
        iconColor: "text-purple-500",
        href: "/dashboard/modul/sma",
    },
]

const recentModules = [
    {
        id: 1,
        title: "Matematika SD - Pecahan",
        level: "SD",
        subject: "Matematika",
        grade: "Kelas 4-5",
        pages: 24,
        downloads: 1250,
        isNew: true,
    },
    {
        id: 2,
        title: "Fisika SMA - Kinematika",
        level: "SMA",
        subject: "Fisika",
        grade: "Kelas 10",
        pages: 32,
        downloads: 890,
        isNew: true,
    },
    {
        id: 3,
        title: "B. Inggris SMP - Tenses",
        level: "SMP",
        subject: "B. Inggris",
        grade: "Kelas 8",
        pages: 28,
        downloads: 756,
        isNew: true,
    },
    {
        id: 4,
        title: "IPA SMP - Sistem Peredaran Darah",
        level: "SMP",
        subject: "IPA",
        grade: "Kelas 8",
        pages: 20,
        downloads: 645,
        isNew: false,
    },
    {
        id: 5,
        title: "Kimia SMA - Stoikiometri",
        level: "SMA",
        subject: "Kimia",
        grade: "Kelas 10",
        pages: 36,
        downloads: 1120,
        isNew: false,
    },
    {
        id: 6,
        title: "Matematika SD - Bangun Datar",
        level: "SD",
        subject: "Matematika",
        grade: "Kelas 5-6",
        pages: 22,
        downloads: 980,
        isNew: false,
    },
]

const getLevelColor = (level: string) => {
    switch (level) {
        case "SD":
            return "bg-blue-500/10 text-blue-600"
        case "SMP":
            return "bg-green-500/10 text-green-600"
        case "SMA":
            return "bg-purple-500/10 text-purple-600"
        default:
            return "bg-muted text-muted-foreground"
    }
}

export default function ModulPage() {
    return (
        <div className="flex flex-1 flex-col gap-6 p-6">
            {/* Header Section */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Modul Bimbel
                    </h1>
                    <p className="text-muted-foreground">
                        Koleksi lengkap modul pembelajaran untuk semua jenjang pendidikan.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Cari modul..."
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
                            <div className={`rounded-full p-2 ${stat.bg}`}>
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

            {/* Level Cards */}
            <div className="grid gap-6 md:grid-cols-3">
                {levelCards.map((card) => (
                    <Card key={card.level} className="relative overflow-hidden transition-all hover:shadow-lg">
                        <div className={`absolute inset-0 bg-linear-to-br ${card.color} opacity-50`} />
                        <CardHeader className="relative">
                            <div className="flex items-center gap-3">
                                <div className={`rounded-lg p-2 ${card.color.replace('from-', 'bg-').split(' ')[0]}`}>
                                    <GraduationCap className={`h-6 w-6 ${card.iconColor}`} />
                                </div>
                                <div>
                                    <CardTitle>{card.level}</CardTitle>
                                    <CardDescription>{card.title}</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="relative space-y-4">
                            <p className="text-sm text-muted-foreground">
                                {card.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {card.subjects.map((subject) => (
                                    <Badge key={subject} variant="outline" className="text-xs">
                                        {subject}
                                    </Badge>
                                ))}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <BookOpen className="h-4 w-4" />
                                <span>{card.totalModules} modul tersedia</span>
                            </div>
                        </CardContent>
                        <CardFooter className="relative">
                            <Button asChild className="w-full bg-[#7CBF25] hover:bg-[#7CBF25]/90">
                                <Link href={card.href}>
                                    Lihat Modul {card.level}
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Recent Modules */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Modul Terbaru</h2>
                    <Button variant="ghost" size="sm">
                        Lihat Semua
                        <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {recentModules.map((module) => (
                        <Card key={module.id} className="cursor-pointer transition-all hover:shadow-md">
                            <CardHeader className="pb-2">
                                <div className="flex items-start justify-between">
                                    <Badge className={getLevelColor(module.level)}>
                                        {module.level}
                                    </Badge>
                                    {module.isNew && (
                                        <Badge className="bg-[#7CBF25] hover:bg-[#7CBF25]">
                                            Baru
                                        </Badge>
                                    )}
                                </div>
                                <CardTitle className="text-base mt-2">{module.title}</CardTitle>
                                <CardDescription>{module.subject} • {module.grade}</CardDescription>
                            </CardHeader>
                            <CardContent className="pb-2">
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <FileText className="h-4 w-4" />
                                        <span>{module.pages} halaman</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Download className="h-4 w-4" />
                                        <span>{module.downloads.toLocaleString()}</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" size="sm" className="w-full">
                                    <Download className="h-4 w-4 mr-2" />
                                    Download Modul
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

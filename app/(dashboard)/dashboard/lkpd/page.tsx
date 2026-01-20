import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    ClipboardList,
    Download,
    Search,
    Filter,
    FileText,
    Eye,
    Clock,
    GraduationCap,
    Printer,
    CheckSquare,
    PenTool,
    Target,
} from "lucide-react"

const stats = [
    { label: "Total LKPD", value: "189", icon: ClipboardList, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "LKPD SD", value: "62", icon: GraduationCap, color: "text-green-500", bg: "bg-green-500/10" },
    { label: "LKPD SMP", value: "65", icon: GraduationCap, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "LKPD SMA", value: "62", icon: GraduationCap, color: "text-purple-500", bg: "bg-purple-500/10" },
]

const subjects = [
    { name: "Semua", count: 189, active: true },
    { name: "Matematika", count: 48 },
    { name: "IPA", count: 42 },
    { name: "B. Indonesia", count: 35 },
    { name: "B. Inggris", count: 32 },
    { name: "IPS", count: 32 },
]

const sdLKPD = [
    {
        id: 1,
        title: "LKPD Penjumlahan Bilangan 1-100",
        description: "Lembar kerja latihan penjumlahan bilangan bulat untuk pemula.",
        subject: "Matematika",
        grade: "Kelas 1-2",
        topic: "Operasi Hitung",
        pages: 8,
        questions: 25,
        downloads: 2450,
        updatedAt: "1 hari lalu",
        isNew: true,
        hasAnswer: true,
    },
    {
        id: 2,
        title: "LKPD Perkalian dan Pembagian",
        description: "Latihan perkalian dan pembagian dengan metode visual.",
        subject: "Matematika",
        grade: "Kelas 3-4",
        topic: "Operasi Hitung",
        pages: 10,
        questions: 30,
        downloads: 1980,
        updatedAt: "2 hari lalu",
        isNew: true,
        hasAnswer: true,
    },
    {
        id: 3,
        title: "LKPD Ciri-Ciri Makhluk Hidup",
        description: "Mengidentifikasi dan mengelompokkan ciri-ciri makhluk hidup.",
        subject: "IPA",
        grade: "Kelas 3-4",
        topic: "Makhluk Hidup",
        pages: 6,
        questions: 20,
        downloads: 1650,
        updatedAt: "4 hari lalu",
        isNew: false,
        hasAnswer: true,
    },
    {
        id: 4,
        title: "LKPD Membaca Pemahaman",
        description: "Latihan membaca dan menjawab pertanyaan dari teks bacaan.",
        subject: "B. Indonesia",
        grade: "Kelas 4-5",
        topic: "Membaca",
        pages: 8,
        questions: 15,
        downloads: 1420,
        updatedAt: "1 minggu lalu",
        isNew: false,
        hasAnswer: true,
    },
]

const smpLKPD = [
    {
        id: 1,
        title: "LKPD Persamaan Linear Satu Variabel",
        description: "Latihan menyelesaikan persamaan linear satu variabel.",
        subject: "Matematika",
        grade: "Kelas 7",
        topic: "Aljabar",
        pages: 10,
        questions: 25,
        downloads: 2890,
        updatedAt: "1 hari lalu",
        isNew: true,
        hasAnswer: true,
    },
    {
        id: 2,
        title: "LKPD Sistem Peredaran Darah",
        description: "Mengidentifikasi organ dan fungsi sistem peredaran darah.",
        subject: "IPA",
        grade: "Kelas 8",
        topic: "Sistem Organ",
        pages: 8,
        questions: 20,
        downloads: 2340,
        updatedAt: "2 hari lalu",
        isNew: true,
        hasAnswer: true,
    },
    {
        id: 3,
        title: "LKPD Tenses: Present & Past",
        description: "Latihan penggunaan Present Tense dan Past Tense.",
        subject: "B. Inggris",
        grade: "Kelas 7-8",
        topic: "Grammar",
        pages: 12,
        questions: 30,
        downloads: 1980,
        updatedAt: "3 hari lalu",
        isNew: false,
        hasAnswer: true,
    },
    {
        id: 4,
        title: "LKPD Keragaman Budaya Indonesia",
        description: "Mengenal dan mengapresiasi keragaman budaya di Indonesia.",
        subject: "IPS",
        grade: "Kelas 7",
        topic: "Budaya",
        pages: 8,
        questions: 18,
        downloads: 1540,
        updatedAt: "5 hari lalu",
        isNew: false,
        hasAnswer: true,
    },
]

const smaLKPD = [
    {
        id: 1,
        title: "LKPD Turunan Fungsi Aljabar",
        description: "Latihan mencari turunan fungsi aljabar dengan berbagai aturan.",
        subject: "Matematika",
        grade: "Kelas 11",
        topic: "Kalkulus",
        pages: 12,
        questions: 25,
        downloads: 3450,
        updatedAt: "1 hari lalu",
        isNew: true,
        hasAnswer: true,
    },
    {
        id: 2,
        title: "LKPD Hukum Newton",
        description: "Latihan soal penerapan tiga hukum Newton dalam kehidupan.",
        subject: "Fisika",
        grade: "Kelas 10",
        topic: "Dinamika",
        pages: 10,
        questions: 20,
        downloads: 2890,
        updatedAt: "2 hari lalu",
        isNew: true,
        hasAnswer: true,
    },
    {
        id: 3,
        title: "LKPD Stoikiometri",
        description: "Latihan perhitungan mol, massa, dan persamaan reaksi.",
        subject: "Kimia",
        grade: "Kelas 10",
        topic: "Perhitungan Kimia",
        pages: 10,
        questions: 22,
        downloads: 2340,
        updatedAt: "3 hari lalu",
        isNew: false,
        hasAnswer: true,
    },
    {
        id: 4,
        title: "LKPD Genetika Mendel",
        description: "Latihan soal persilangan monohibrid dan dihibrid.",
        subject: "Biologi",
        grade: "Kelas 12",
        topic: "Genetika",
        pages: 10,
        questions: 20,
        downloads: 1980,
        updatedAt: "4 hari lalu",
        isNew: false,
        hasAnswer: true,
    },
]

const getSubjectColor = (subject: string) => {
    switch (subject) {
        case "Matematika":
            return "bg-blue-500/10 text-blue-600"
        case "IPA":
        case "Fisika":
        case "Kimia":
        case "Biologi":
            return "bg-green-500/10 text-green-600"
        case "B. Indonesia":
            return "bg-orange-500/10 text-orange-600"
        case "B. Inggris":
            return "bg-purple-500/10 text-purple-600"
        case "IPS":
            return "bg-amber-500/10 text-amber-600"
        default:
            return "bg-muted text-muted-foreground"
    }
}

function LKPDCard({ lkpd }: { lkpd: typeof sdLKPD[0] }) {
    return (
        <Card className="cursor-pointer transition-all hover:shadow-lg group">
            {/* Card Header with Icon */}
            <div className="relative h-28 bg-linear-to-br from-[#7CBF25]/10 to-emerald-500/10 flex items-center justify-center">
                <ClipboardList className="h-12 w-12 text-[#7CBF25]/30 group-hover:text-[#7CBF25]/60 transition-colors" />
                <div className="absolute top-2 left-2 flex gap-1">
                    {lkpd.isNew && (
                        <Badge className="bg-[#7CBF25] hover:bg-[#7CBF25]">
                            Baru
                        </Badge>
                    )}
                </div>
                <div className="absolute top-2 right-2">
                    {lkpd.hasAnswer && (
                        <Badge variant="outline" className="bg-white/80 text-green-600 border-green-300">
                            <CheckSquare className="h-3 w-3 mr-1" />
                            Kunci Jawaban
                        </Badge>
                    )}
                </div>
                <div className="absolute bottom-2 left-2">
                    <Badge className={getSubjectColor(lkpd.subject)}>
                        {lkpd.subject}
                    </Badge>
                </div>
            </div>

            <CardHeader className="pb-2">
                <CardTitle className="text-base line-clamp-1 group-hover:text-[#7CBF25] transition-colors">
                    {lkpd.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-xs">
                    {lkpd.description}
                </CardDescription>
            </CardHeader>

            <CardContent className="pb-2 space-y-2">
                <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                        <GraduationCap className="h-3 w-3 mr-1" />
                        {lkpd.grade}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                        <Target className="h-3 w-3 mr-1" />
                        {lkpd.topic}
                    </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        <span>{lkpd.pages} halaman</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <PenTool className="h-3 w-3" />
                        <span>{lkpd.questions} soal</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        <span>{lkpd.downloads.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{lkpd.updatedAt}</span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                </Button>
                <Button size="sm" className="flex-1 bg-[#7CBF25] hover:bg-[#7CBF25]/90">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                </Button>
            </CardFooter>
        </Card>
    )
}

export default function LKPDPage() {
    return (
        <div className="flex flex-1 flex-col gap-6 p-6">
            {/* Header Section */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <h1 className="text-3xl font-bold tracking-tight">
                            LKPD
                        </h1>
                        <Badge variant="secondary" className="bg-[#7CBF25]/10 text-[#7CBF25]">
                            Lembar Kerja Peserta Didik
                        </Badge>
                    </div>
                    <p className="text-muted-foreground">
                        Koleksi lembar kerja siap cetak untuk latihan dan evaluasi siswa.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Cari LKPD..."
                            className="pl-9 w-[250px]"
                        />
                    </div>
                    <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                        <Printer className="h-4 w-4" />
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

            {/* Subject Pills */}
            <div className="flex gap-2 flex-wrap">
                {subjects.map((subject) => (
                    <Button
                        key={subject.name}
                        variant={subject.active ? "default" : "outline"}
                        size="sm"
                        className={subject.active ? "bg-[#7CBF25] hover:bg-[#7CBF25]/90" : ""}
                    >
                        {subject.name}
                        <Badge variant="secondary" className="ml-2 text-xs">
                            {subject.count}
                        </Badge>
                    </Button>
                ))}
            </div>

            {/* Tabs by Education Level */}
            <Tabs defaultValue="sd" className="space-y-6">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                    <TabsTrigger value="sd" className="gap-2">
                        SD
                        <Badge variant="secondary" className="text-xs">62</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="smp" className="gap-2">
                        SMP
                        <Badge variant="secondary" className="text-xs">65</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="sma" className="gap-2">
                        SMA
                        <Badge variant="secondary" className="text-xs">62</Badge>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="sd" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {sdLKPD.map((lkpd) => (
                            <LKPDCard key={lkpd.id} lkpd={lkpd} />
                        ))}
                    </div>
                    <div className="flex justify-center">
                        <Button variant="outline">
                            Muat Lebih Banyak
                        </Button>
                    </div>
                </TabsContent>

                <TabsContent value="smp" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {smpLKPD.map((lkpd) => (
                            <LKPDCard key={lkpd.id} lkpd={lkpd} />
                        ))}
                    </div>
                    <div className="flex justify-center">
                        <Button variant="outline">
                            Muat Lebih Banyak
                        </Button>
                    </div>
                </TabsContent>

                <TabsContent value="sma" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {smaLKPD.map((lkpd) => (
                            <LKPDCard key={lkpd.id} lkpd={lkpd} />
                        ))}
                    </div>
                    <div className="flex justify-center">
                        <Button variant="outline">
                            Muat Lebih Banyak
                        </Button>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

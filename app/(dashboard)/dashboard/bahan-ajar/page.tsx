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
    Presentation,
    FileImage,
    FileSpreadsheet,
    Printer,
} from "lucide-react"

const stats = [
    { label: "Total Bahan Ajar", value: "234", icon: ClipboardList, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "PowerPoint", value: "89", icon: Presentation, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Lembar Kerja", value: "78", icon: FileSpreadsheet, color: "text-green-500", bg: "bg-green-500/10" },
    { label: "Poster & Infografis", value: "67", icon: FileImage, color: "text-purple-500", bg: "bg-purple-500/10" },
]

const materialTypes = [
    { name: "Semua", count: 234, active: true },
    { name: "PowerPoint", count: 89 },
    { name: "Lembar Kerja", count: 78 },
    { name: "Poster", count: 35 },
    { name: "Infografis", count: 32 },
]

const sdMaterials = [
    {
        id: 1,
        title: "PPT Matematika - Penjumlahan",
        description: "Presentasi interaktif untuk mengajar penjumlahan kelas 1-2 SD.",
        type: "PowerPoint",
        subject: "Matematika",
        grade: "Kelas 1-2",
        fileSize: "5.2 MB",
        downloads: 1890,
        views: 4200,
        updatedAt: "2 hari lalu",
        isNew: true,
    },
    {
        id: 2,
        title: "Lembar Kerja - Bangun Datar",
        description: "Latihan mengenal dan menggambar bangun datar untuk siswa SD.",
        type: "Lembar Kerja",
        subject: "Matematika",
        grade: "Kelas 3-4",
        fileSize: "1.8 MB",
        downloads: 1650,
        views: 3600,
        updatedAt: "3 hari lalu",
        isNew: true,
    },
    {
        id: 3,
        title: "Poster Sistem Pencernaan",
        description: "Poster edukatif tentang sistem pencernaan manusia.",
        type: "Poster",
        subject: "IPA",
        grade: "Kelas 5-6",
        fileSize: "3.5 MB",
        downloads: 1420,
        views: 3100,
        updatedAt: "1 minggu lalu",
        isNew: false,
    },
    {
        id: 4,
        title: "PPT IPA - Makhluk Hidup",
        description: "Presentasi tentang ciri-ciri dan klasifikasi makhluk hidup.",
        type: "PowerPoint",
        subject: "IPA",
        grade: "Kelas 3-4",
        fileSize: "8.1 MB",
        downloads: 1280,
        views: 2800,
        updatedAt: "5 hari lalu",
        isNew: false,
    },
]

const smpMaterials = [
    {
        id: 1,
        title: "PPT Aljabar - Persamaan Linear",
        description: "Presentasi lengkap tentang persamaan linear satu variabel.",
        type: "PowerPoint",
        subject: "Matematika",
        grade: "Kelas 7-8",
        fileSize: "6.4 MB",
        downloads: 2340,
        views: 5100,
        updatedAt: "1 hari lalu",
        isNew: true,
    },
    {
        id: 2,
        title: "Infografis Tata Surya",
        description: "Infografis menarik tentang planet-planet dalam tata surya.",
        type: "Infografis",
        subject: "IPA",
        grade: "Kelas 7",
        fileSize: "4.2 MB",
        downloads: 1980,
        views: 4300,
        updatedAt: "2 hari lalu",
        isNew: true,
    },
    {
        id: 3,
        title: "Lembar Kerja - Sistem Pernapasan",
        description: "Latihan mengidentifikasi organ dan fungsi sistem pernapasan.",
        type: "Lembar Kerja",
        subject: "IPA",
        grade: "Kelas 8",
        fileSize: "2.1 MB",
        downloads: 1650,
        views: 3600,
        updatedAt: "4 hari lalu",
        isNew: false,
    },
    {
        id: 4,
        title: "PPT Sejarah Indonesia",
        description: "Presentasi perjuangan kemerdekaan Indonesia.",
        type: "PowerPoint",
        subject: "IPS",
        grade: "Kelas 9",
        fileSize: "12.3 MB",
        downloads: 1420,
        views: 3100,
        updatedAt: "1 minggu lalu",
        isNew: false,
    },
]

const smaMaterials = [
    {
        id: 1,
        title: "PPT Fisika - Hukum Newton",
        description: "Presentasi lengkap tentang tiga hukum Newton dan aplikasinya.",
        type: "PowerPoint",
        subject: "Fisika",
        grade: "Kelas 10",
        fileSize: "9.8 MB",
        downloads: 2890,
        views: 6200,
        updatedAt: "1 hari lalu",
        isNew: true,
    },
    {
        id: 2,
        title: "Infografis Ikatan Kimia",
        description: "Infografis perbandingan ikatan ionik, kovalen, dan logam.",
        type: "Infografis",
        subject: "Kimia",
        grade: "Kelas 10",
        fileSize: "3.8 MB",
        downloads: 2340,
        views: 5100,
        updatedAt: "2 hari lalu",
        isNew: true,
    },
    {
        id: 3,
        title: "Lembar Kerja - Turunan Fungsi",
        description: "Latihan soal turunan fungsi aljabar dan trigonometri.",
        type: "Lembar Kerja",
        subject: "Matematika",
        grade: "Kelas 11",
        fileSize: "1.5 MB",
        downloads: 1980,
        views: 4300,
        updatedAt: "3 hari lalu",
        isNew: false,
    },
    {
        id: 4,
        title: "Poster Siklus Karbon",
        description: "Poster edukatif tentang siklus karbon di alam.",
        type: "Poster",
        subject: "Biologi",
        grade: "Kelas 10",
        fileSize: "4.5 MB",
        downloads: 1650,
        views: 3600,
        updatedAt: "5 hari lalu",
        isNew: false,
    },
]

const getTypeIcon = (type: string) => {
    switch (type) {
        case "PowerPoint":
            return Presentation
        case "Lembar Kerja":
            return FileSpreadsheet
        case "Poster":
            return FileImage
        case "Infografis":
            return FileImage
        default:
            return FileText
    }
}

const getTypeColor = (type: string) => {
    switch (type) {
        case "PowerPoint":
            return "bg-orange-500/10 text-orange-600"
        case "Lembar Kerja":
            return "bg-green-500/10 text-green-600"
        case "Poster":
            return "bg-purple-500/10 text-purple-600"
        case "Infografis":
            return "bg-blue-500/10 text-blue-600"
        default:
            return "bg-muted text-muted-foreground"
    }
}

function MaterialCard({ material }: { material: typeof sdMaterials[0] }) {
    const TypeIcon = getTypeIcon(material.type)

    return (
        <Card className="cursor-pointer transition-all hover:shadow-lg group">
            {/* Card Header with Icon */}
            <div className="relative h-28 bg-linear-to-br from-muted to-muted/50 flex items-center justify-center">
                <TypeIcon className="h-12 w-12 text-muted-foreground/30 group-hover:text-[#7CBF25]/50 transition-colors" />
                {material.isNew && (
                    <div className="absolute top-2 right-2">
                        <Badge className="bg-[#7CBF25] hover:bg-[#7CBF25]">
                            Baru
                        </Badge>
                    </div>
                )}
                <div className="absolute bottom-2 left-2">
                    <Badge className={getTypeColor(material.type)}>
                        {material.type}
                    </Badge>
                </div>
            </div>

            <CardHeader className="pb-2">
                <CardTitle className="text-base line-clamp-1 group-hover:text-[#7CBF25] transition-colors">
                    {material.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-xs">
                    {material.description}
                </CardDescription>
            </CardHeader>

            <CardContent className="pb-2 space-y-2">
                <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                        {material.subject}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                        <GraduationCap className="h-3 w-3 mr-1" />
                        {material.grade}
                    </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        <span>{material.fileSize}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        <span>{material.downloads.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{material.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{material.updatedAt}</span>
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

export default function BahanAjarPage() {
    return (
        <div className="flex flex-1 flex-col gap-6 p-6">
            {/* Header Section */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Bahan Ajar
                    </h1>
                    <p className="text-muted-foreground">
                        Koleksi lengkap bahan ajar siap pakai untuk mendukung proses pembelajaran.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Cari bahan ajar..."
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

            {/* Type Pills */}
            <div className="flex gap-2 flex-wrap">
                {materialTypes.map((type) => (
                    <Button
                        key={type.name}
                        variant={type.active ? "default" : "outline"}
                        size="sm"
                        className={type.active ? "bg-[#7CBF25] hover:bg-[#7CBF25]/90" : ""}
                    >
                        {type.name}
                        <Badge variant="secondary" className="ml-2 text-xs">
                            {type.count}
                        </Badge>
                    </Button>
                ))}
            </div>

            {/* Tabs by Education Level */}
            <Tabs defaultValue="sd" className="space-y-6">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                    <TabsTrigger value="sd" className="gap-2">
                        SD
                        <Badge variant="secondary" className="text-xs">78</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="smp" className="gap-2">
                        SMP
                        <Badge variant="secondary" className="text-xs">82</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="sma" className="gap-2">
                        SMA
                        <Badge variant="secondary" className="text-xs">74</Badge>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="sd" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {sdMaterials.map((material) => (
                            <MaterialCard key={material.id} material={material} />
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
                        {smpMaterials.map((material) => (
                            <MaterialCard key={material.id} material={material} />
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
                        {smaMaterials.map((material) => (
                            <MaterialCard key={material.id} material={material} />
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

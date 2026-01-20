import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Briefcase,
    Download,
    Search,
    Filter,
    Eye,
    FileText,
    Users,
    ClipboardCheck,
    Calendar,
    DollarSign,
    Building2,
    FileSignature,
    Receipt,
    Clock,
    CheckCircle2,
    Copy,
} from "lucide-react"

const stats = [
    { label: "Total Dokumen", value: "78", icon: Briefcase, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Form Administrasi", value: "32", icon: ClipboardCheck, color: "text-green-500", bg: "bg-green-500/10" },
    { label: "Template Surat", value: "28", icon: FileSignature, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Dokumen Keuangan", value: "18", icon: Receipt, color: "text-purple-500", bg: "bg-purple-500/10" },
]

const categories = [
    { name: "Semua", count: 78, active: true },
    { name: "Pendaftaran", count: 15 },
    { name: "Keuangan", count: 18 },
    { name: "Kepegawaian", count: 12 },
    { name: "Operasional", count: 20 },
    { name: "Legalitas", count: 13 },
]

const registrationDocs = [
    {
        id: 1,
        title: "Formulir Pendaftaran Siswa Baru",
        description: "Form lengkap untuk pendaftaran siswa baru dengan data orang tua.",
        type: "Form",
        category: "Pendaftaran",
        format: "DOCX, PDF",
        downloads: 3450,
        isNew: true,
        isEditable: true,
    },
    {
        id: 2,
        title: "Kartu Data Siswa",
        description: "Template kartu identitas siswa untuk arsip bimbel.",
        type: "Template",
        category: "Pendaftaran",
        format: "DOCX, PDF",
        downloads: 2890,
        isNew: true,
        isEditable: true,
    },
    {
        id: 3,
        title: "Surat Perjanjian Orang Tua",
        description: "Surat kesepakatan antara bimbel dan orang tua siswa.",
        type: "Surat",
        category: "Pendaftaran",
        format: "DOCX, PDF",
        downloads: 2340,
        isNew: false,
        isEditable: true,
    },
    {
        id: 4,
        title: "Form Perpindahan Kelas",
        description: "Formulir pengajuan perpindahan kelas atau program.",
        type: "Form",
        category: "Pendaftaran",
        format: "DOCX, PDF",
        downloads: 1650,
        isNew: false,
        isEditable: true,
    },
]

const financeDocs = [
    {
        id: 1,
        title: "Invoice Pembayaran SPP",
        description: "Template invoice untuk pembayaran SPP bulanan siswa.",
        type: "Template",
        category: "Keuangan",
        format: "XLSX, PDF",
        downloads: 4560,
        isNew: true,
        isEditable: true,
    },
    {
        id: 2,
        title: "Kwitansi Pembayaran",
        description: "Template kwitansi resmi untuk segala jenis pembayaran.",
        type: "Template",
        category: "Keuangan",
        format: "DOCX, PDF",
        downloads: 3890,
        isNew: false,
        isEditable: true,
    },
    {
        id: 3,
        title: "Laporan Keuangan Bulanan",
        description: "Template laporan keuangan bulanan bimbel.",
        type: "Template",
        category: "Keuangan",
        format: "XLSX",
        downloads: 2340,
        isNew: true,
        isEditable: true,
    },
    {
        id: 4,
        title: "Form Pengajuan Diskon",
        description: "Formulir pengajuan diskon atau keringanan biaya.",
        type: "Form",
        category: "Keuangan",
        format: "DOCX, PDF",
        downloads: 1890,
        isNew: false,
        isEditable: true,
    },
]

const operationalDocs = [
    {
        id: 1,
        title: "Jadwal Mengajar Mingguan",
        description: "Template jadwal mengajar tutor per minggu.",
        type: "Template",
        category: "Operasional",
        format: "XLSX, PDF",
        downloads: 3210,
        isNew: true,
        isEditable: true,
    },
    {
        id: 2,
        title: "Absensi Siswa",
        description: "Form absensi kehadiran siswa per kelas.",
        type: "Form",
        category: "Operasional",
        format: "XLSX, PDF",
        downloads: 4120,
        isNew: false,
        isEditable: true,
    },
    {
        id: 3,
        title: "Laporan Perkembangan Siswa",
        description: "Template laporan progress belajar siswa untuk orang tua.",
        type: "Template",
        category: "Operasional",
        format: "DOCX, PDF",
        downloads: 2890,
        isNew: true,
        isEditable: true,
    },
    {
        id: 4,
        title: "Berita Acara Rapat",
        description: "Template berita acara untuk rapat internal bimbel.",
        type: "Template",
        category: "Operasional",
        format: "DOCX, PDF",
        downloads: 1540,
        isNew: false,
        isEditable: true,
    },
]

const getTypeIcon = (type: string) => {
    switch (type) {
        case "Form":
            return ClipboardCheck
        case "Template":
            return FileText
        case "Surat":
            return FileSignature
        default:
            return FileText
    }
}

const getTypeColor = (type: string) => {
    switch (type) {
        case "Form":
            return "bg-blue-500/10 text-blue-600"
        case "Template":
            return "bg-green-500/10 text-green-600"
        case "Surat":
            return "bg-orange-500/10 text-orange-600"
        default:
            return "bg-muted text-muted-foreground"
    }
}

const getCategoryColor = (category: string) => {
    switch (category) {
        case "Pendaftaran":
            return "bg-blue-500/10 text-blue-600"
        case "Keuangan":
            return "bg-green-500/10 text-green-600"
        case "Kepegawaian":
            return "bg-orange-500/10 text-orange-600"
        case "Operasional":
            return "bg-purple-500/10 text-purple-600"
        case "Legalitas":
            return "bg-red-500/10 text-red-600"
        default:
            return "bg-muted text-muted-foreground"
    }
}

function AdminDocCard({ doc }: { doc: typeof registrationDocs[0] }) {
    const TypeIcon = getTypeIcon(doc.type)

    return (
        <Card className="cursor-pointer transition-all hover:shadow-lg group overflow-hidden">
            {/* Header with Icon */}
            <div className="relative h-28 bg-linear-to-br from-muted to-muted/50 flex items-center justify-center">
                <TypeIcon className="h-12 w-12 text-muted-foreground/30 group-hover:text-[#7CBF25]/50 transition-colors" />
                <div className="absolute top-2 left-2 flex gap-1">
                    {doc.isNew && (
                        <Badge className="bg-[#7CBF25] hover:bg-[#7CBF25]">
                            Baru
                        </Badge>
                    )}
                </div>
                <div className="absolute top-2 right-2">
                    <Badge className={getTypeColor(doc.type)}>
                        {doc.type}
                    </Badge>
                </div>
                {doc.isEditable && (
                    <div className="absolute bottom-2 right-2">
                        <Badge variant="outline" className="bg-white/80 text-xs">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Editable
                        </Badge>
                    </div>
                )}
            </div>

            <CardHeader className="pb-2">
                <CardTitle className="text-base line-clamp-1 group-hover:text-[#7CBF25] transition-colors">
                    {doc.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-xs">
                    {doc.description}
                </CardDescription>
            </CardHeader>

            <CardContent className="pb-2 space-y-2">
                <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                        {doc.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                        {doc.format}
                    </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Download className="h-3 w-3" />
                    <span>{doc.downloads.toLocaleString()} downloads</span>
                </div>
            </CardContent>

            <CardFooter className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                </Button>
                <Button variant="outline" size="icon" className="shrink-0">
                    <Copy className="h-4 w-4" />
                </Button>
                <Button size="sm" className="flex-1 bg-[#7CBF25] hover:bg-[#7CBF25]/90">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                </Button>
            </CardFooter>
        </Card>
    )
}

const quickLinks = [
    {
        title: "Pendaftaran Siswa",
        description: "Kelola proses pendaftaran siswa baru",
        icon: Users,
        count: 15,
    },
    {
        title: "Keuangan",
        description: "Template invoice, kwitansi, dan laporan",
        icon: DollarSign,
        count: 18,
    },
    {
        title: "Operasional",
        description: "Jadwal, absensi, dan laporan harian",
        icon: Calendar,
        count: 20,
    },
    {
        title: "Legalitas",
        description: "Dokumen legal dan perizinan",
        icon: Building2,
        count: 13,
    },
]

export default function AdministrasiPage() {
    return (
        <div className="flex flex-1 flex-col gap-6 p-6">
            {/* Header Section */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Administrasi
                    </h1>
                    <p className="text-muted-foreground">
                        Dokumen dan template administrasi untuk operasional bimbel.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Cari dokumen..."
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

            {/* Quick Links */}
            <div className="grid gap-4 md:grid-cols-4">
                {quickLinks.map((link) => (
                    <Card key={link.title} className="cursor-pointer hover:shadow-md transition-all group">
                        <CardContent className="flex items-center gap-4 p-4">
                            <div className="rounded-full bg-[#7CBF25]/10 p-3 group-hover:bg-[#7CBF25]/20 transition-colors">
                                <link.icon className="h-6 w-6 text-[#7CBF25]" />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium group-hover:text-[#7CBF25] transition-colors">{link.title}</p>
                                <p className="text-xs text-muted-foreground">{link.description}</p>
                            </div>
                            <Badge variant="secondary">{link.count}</Badge>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Category Pills */}
            <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
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

            {/* Tabs */}
            <Tabs defaultValue="registration" className="space-y-6">
                <TabsList className="grid w-full max-w-lg grid-cols-3">
                    <TabsTrigger value="registration" className="gap-2">
                        Pendaftaran
                        <Badge variant="secondary" className="text-xs">15</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="finance" className="gap-2">
                        Keuangan
                        <Badge variant="secondary" className="text-xs">18</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="operational" className="gap-2">
                        Operasional
                        <Badge variant="secondary" className="text-xs">20</Badge>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="registration" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {registrationDocs.map((doc) => (
                            <AdminDocCard key={doc.id} doc={doc} />
                        ))}
                    </div>
                    <div className="flex justify-center">
                        <Button variant="outline">
                            Muat Lebih Banyak
                        </Button>
                    </div>
                </TabsContent>

                <TabsContent value="finance" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {financeDocs.map((doc) => (
                            <AdminDocCard key={doc.id} doc={doc} />
                        ))}
                    </div>
                    <div className="flex justify-center">
                        <Button variant="outline">
                            Muat Lebih Banyak
                        </Button>
                    </div>
                </TabsContent>

                <TabsContent value="operational" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {operationalDocs.map((doc) => (
                            <AdminDocCard key={doc.id} doc={doc} />
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

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    FileText,
    Download,
    BookOpen,
    GraduationCap,
    Calendar,
    CheckCircle2,
    Clock,
    Target,
    ArrowRight,
    Eye,
} from "lucide-react"

const curriculumStats = [
    { label: "Total Dokumen", value: "45", icon: FileText, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Jenjang", value: "3", icon: GraduationCap, color: "text-green-500", bg: "bg-green-500/10" },
    { label: "Semester", value: "2", icon: Calendar, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Update Terakhir", value: "Jan 2026", icon: Clock, color: "text-purple-500", bg: "bg-purple-500/10" },
]

const sdCurriculum = {
    level: "SD",
    title: "Kurikulum Sekolah Dasar",
    description: "Kurikulum Merdeka untuk SD kelas 1-6",
    documents: [
        {
            id: 1,
            title: "Silabus Matematika SD",
            type: "Silabus",
            grade: "Kelas 1-6",
            semester: "Ganjil & Genap",
            pages: 45,
            downloads: 2340,
            updatedAt: "15 Jan 2026",
        },
        {
            id: 2,
            title: "RPP Matematika SD Lengkap",
            type: "RPP",
            grade: "Kelas 1-6",
            semester: "Ganjil & Genap",
            pages: 120,
            downloads: 1890,
            updatedAt: "12 Jan 2026",
        },
        {
            id: 3,
            title: "Silabus IPA SD",
            type: "Silabus",
            grade: "Kelas 3-6",
            semester: "Ganjil & Genap",
            pages: 38,
            downloads: 1650,
            updatedAt: "10 Jan 2026",
        },
        {
            id: 4,
            title: "RPP Bahasa Indonesia SD",
            type: "RPP",
            grade: "Kelas 1-6",
            semester: "Ganjil & Genap",
            pages: 95,
            downloads: 1420,
            updatedAt: "8 Jan 2026",
        },
    ],
}

const smpCurriculum = {
    level: "SMP",
    title: "Kurikulum Sekolah Menengah Pertama",
    description: "Kurikulum Merdeka untuk SMP kelas 7-9",
    documents: [
        {
            id: 1,
            title: "Silabus Matematika SMP",
            type: "Silabus",
            grade: "Kelas 7-9",
            semester: "Ganjil & Genap",
            pages: 52,
            downloads: 2890,
            updatedAt: "14 Jan 2026",
        },
        {
            id: 2,
            title: "RPP IPA Terpadu SMP",
            type: "RPP",
            grade: "Kelas 7-9",
            semester: "Ganjil & Genap",
            pages: 145,
            downloads: 2450,
            updatedAt: "11 Jan 2026",
        },
        {
            id: 3,
            title: "Silabus Bahasa Inggris SMP",
            type: "Silabus",
            grade: "Kelas 7-9",
            semester: "Ganjil & Genap",
            pages: 42,
            downloads: 1980,
            updatedAt: "9 Jan 2026",
        },
        {
            id: 4,
            title: "RPP IPS Terpadu SMP",
            type: "RPP",
            grade: "Kelas 7-9",
            semester: "Ganjil & Genap",
            pages: 110,
            downloads: 1650,
            updatedAt: "7 Jan 2026",
        },
    ],
}

const smaCurriculum = {
    level: "SMA",
    title: "Kurikulum Sekolah Menengah Atas",
    description: "Kurikulum Merdeka untuk SMA kelas 10-12",
    documents: [
        {
            id: 1,
            title: "Silabus Matematika Wajib SMA",
            type: "Silabus",
            grade: "Kelas 10-12",
            semester: "Ganjil & Genap",
            pages: 58,
            downloads: 3450,
            updatedAt: "15 Jan 2026",
        },
        {
            id: 2,
            title: "RPP Fisika SMA",
            type: "RPP",
            grade: "Kelas 10-12",
            semester: "Ganjil & Genap",
            pages: 165,
            downloads: 2890,
            updatedAt: "13 Jan 2026",
        },
        {
            id: 3,
            title: "Silabus Kimia SMA",
            type: "Silabus",
            grade: "Kelas 10-12",
            semester: "Ganjil & Genap",
            pages: 48,
            downloads: 2340,
            updatedAt: "10 Jan 2026",
        },
        {
            id: 4,
            title: "RPP Biologi SMA",
            type: "RPP",
            grade: "Kelas 10-12",
            semester: "Ganjil & Genap",
            pages: 155,
            downloads: 2100,
            updatedAt: "8 Jan 2026",
        },
    ],
}

const getTypeColor = (type: string) => {
    switch (type) {
        case "Silabus":
            return "bg-blue-500/10 text-blue-600 border-blue-200"
        case "RPP":
            return "bg-green-500/10 text-green-600 border-green-200"
        case "Prota":
            return "bg-orange-500/10 text-orange-600 border-orange-200"
        case "Prosem":
            return "bg-purple-500/10 text-purple-600 border-purple-200"
        default:
            return "bg-muted text-muted-foreground"
    }
}

function CurriculumDocumentCard({ doc }: { doc: typeof sdCurriculum.documents[0] }) {
    return (
        <Card className="cursor-pointer transition-all hover:shadow-md group">
            <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                    <Badge className={getTypeColor(doc.type)}>
                        {doc.type}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {doc.updatedAt}
                    </div>
                </div>
                <CardTitle className="text-base mt-2 group-hover:text-[#7CBF25] transition-colors">
                    {doc.title}
                </CardTitle>
            </CardHeader>
            <CardContent className="pb-2 space-y-3">
                <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                        <GraduationCap className="h-3 w-3 mr-1" />
                        {doc.grade}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        {doc.semester}
                    </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        <span>{doc.pages} halaman</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        <span>{doc.downloads.toLocaleString()}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                </Button>
                <Button size="sm" className="flex-1 bg-[#7CBF25] hover:bg-[#7CBF25]/90">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                </Button>
            </CardFooter>
        </Card>
    )
}

const curriculumFeatures = [
    "Sesuai dengan Kurikulum Merdeka terbaru",
    "Lengkap dengan Silabus, RPP, Prota, dan Prosem",
    "Dapat diedit sesuai kebutuhan lokal",
    "Update berkala setiap semester",
    "Format Word dan PDF tersedia",
    "Dilengkapi dengan contoh penilaian",
]

export default function KurikulumPage() {
    return (
        <div className="flex flex-1 flex-col gap-6 p-6">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Kurikulum
                    </h1>
                    <Badge variant="secondary" className="bg-[#7CBF25]/10 text-[#7CBF25]">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Kurikulum Merdeka
                    </Badge>
                </div>
                <p className="text-muted-foreground max-w-2xl">
                    Dokumen kurikulum lengkap untuk semua jenjang pendidikan sesuai dengan
                    Kurikulum Merdeka terbaru dari Kemendikbudristek.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-4">
                {curriculumStats.map((stat) => (
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

            {/* Features Card */}
            <Card className="bg-linear-to-br from-[#7CBF25]/5 to-emerald-500/5 border-[#7CBF25]/20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-[#7CBF25]" />
                        Keunggulan Kurikulum YAKBA
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-3">
                        {curriculumFeatures.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-[#7CBF25] shrink-0" />
                                <span className="text-sm text-muted-foreground">{feature}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Curriculum Tabs */}
            <Tabs defaultValue="sd" className="space-y-6">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                    <TabsTrigger value="sd" className="gap-2">
                        SD
                        <Badge variant="secondary" className="text-xs">
                            15
                        </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="smp" className="gap-2">
                        SMP
                        <Badge variant="secondary" className="text-xs">
                            15
                        </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="sma" className="gap-2">
                        SMA
                        <Badge variant="secondary" className="text-xs">
                            15
                        </Badge>
                    </TabsTrigger>
                </TabsList>

                {/* SD Tab */}
                <TabsContent value="sd" className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold">{sdCurriculum.title}</h3>
                            <p className="text-sm text-muted-foreground">{sdCurriculum.description}</p>
                        </div>
                        <Button variant="outline" size="sm">
                            Download Semua
                            <Download className="h-4 w-4 ml-2" />
                        </Button>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {sdCurriculum.documents.map((doc) => (
                            <CurriculumDocumentCard key={doc.id} doc={doc} />
                        ))}
                    </div>
                    <div className="flex justify-center">
                        <Button variant="ghost">
                            Lihat Semua Dokumen SD
                            <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                    </div>
                </TabsContent>

                {/* SMP Tab */}
                <TabsContent value="smp" className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold">{smpCurriculum.title}</h3>
                            <p className="text-sm text-muted-foreground">{smpCurriculum.description}</p>
                        </div>
                        <Button variant="outline" size="sm">
                            Download Semua
                            <Download className="h-4 w-4 ml-2" />
                        </Button>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {smpCurriculum.documents.map((doc) => (
                            <CurriculumDocumentCard key={doc.id} doc={doc} />
                        ))}
                    </div>
                    <div className="flex justify-center">
                        <Button variant="ghost">
                            Lihat Semua Dokumen SMP
                            <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                    </div>
                </TabsContent>

                {/* SMA Tab */}
                <TabsContent value="sma" className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold">{smaCurriculum.title}</h3>
                            <p className="text-sm text-muted-foreground">{smaCurriculum.description}</p>
                        </div>
                        <Button variant="outline" size="sm">
                            Download Semua
                            <Download className="h-4 w-4 ml-2" />
                        </Button>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {smaCurriculum.documents.map((doc) => (
                            <CurriculumDocumentCard key={doc.id} doc={doc} />
                        ))}
                    </div>
                    <div className="flex justify-center">
                        <Button variant="ghost">
                            Lihat Semua Dokumen SMA
                            <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

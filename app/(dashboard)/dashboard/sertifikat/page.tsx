import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Award,
    Download,
    Eye,
    Clock,
    Calendar,
    CheckCircle2,
    Share2,
    Printer,
    FileText,
    Medal,
    Trophy,
    Star,
} from "lucide-react"

const stats = [
    { label: "Total Sertifikat", value: "12", icon: Award, color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { label: "Sertifikat Aktif", value: "10", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10" },
    { label: "Sertifikat Pending", value: "2", icon: Clock, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Total Poin", value: "850", icon: Star, color: "text-purple-500", bg: "bg-purple-500/10" },
]

const myCertificates = [
    {
        id: 1,
        title: "Sertifikat Mitra Resmi YAKBA",
        description: "Sertifikat kemitraan resmi Bimbingan Belajar YAKBA.",
        issueDate: "15 Januari 2026",
        expiryDate: "15 Januari 2027",
        status: "active",
        type: "Kemitraan",
        credentialId: "YAKBA-2026-001234",
        points: 100,
    },
    {
        id: 2,
        title: "Sertifikat Pelatihan Mengajar Dasar",
        description: "Telah menyelesaikan pelatihan mengajar dasar untuk tutor bimbel.",
        issueDate: "20 Januari 2026",
        expiryDate: null,
        status: "active",
        type: "Pelatihan",
        credentialId: "YAKBA-TRN-2026-0567",
        points: 75,
    },
    {
        id: 3,
        title: "Sertifikat Webinar Marketing Bimbel",
        description: "Telah mengikuti webinar strategi marketing untuk bimbingan belajar.",
        issueDate: "10 Januari 2026",
        expiryDate: null,
        status: "active",
        type: "Webinar",
        credentialId: "YAKBA-WBN-2026-0089",
        points: 50,
    },
    {
        id: 4,
        title: "Sertifikat Workshop Kurikulum Merdeka",
        description: "Telah mengikuti workshop implementasi Kurikulum Merdeka.",
        issueDate: "5 Januari 2026",
        expiryDate: null,
        status: "active",
        type: "Workshop",
        credentialId: "YAKBA-WKS-2026-0045",
        points: 75,
    },
]

const availableCertificates = [
    {
        id: 1,
        title: "Sertifikat Master Trainer YAKBA",
        description: "Sertifikasi untuk menjadi master trainer bimbel YAKBA.",
        requirements: ["Minimal 6 bulan mitra aktif", "Mengikuti pelatihan master trainer", "Lulus ujian sertifikasi"],
        type: "Sertifikasi",
        points: 150,
        duration: "2 tahun",
        status: "available",
    },
    {
        id: 2,
        title: "Sertifikat Pelatihan Matematika Lanjutan",
        description: "Pelatihan teknik mengajar matematika tingkat lanjut.",
        requirements: ["Mitra aktif", "Sudah mengikuti pelatihan dasar"],
        type: "Pelatihan",
        points: 100,
        duration: "Selamanya",
        status: "available",
    },
    {
        id: 3,
        title: "Sertifikat Digital Marketing",
        description: "Pelatihan strategi digital marketing untuk mempromosikan bimbel.",
        requirements: ["Mitra aktif"],
        type: "Pelatihan",
        points: 75,
        duration: "Selamanya",
        status: "coming_soon",
    },
]

const pendingCertificates = [
    {
        id: 1,
        title: "Sertifikat Pelatihan IPA Terpadu",
        description: "Sedang dalam proses verifikasi kehadiran dan penyelesaian tugas.",
        submittedDate: "18 Januari 2026",
        type: "Pelatihan",
        status: "pending",
        progress: 80,
    },
    {
        id: 2,
        title: "Sertifikat Achievement: 50 Siswa",
        description: "Menunggu validasi data jumlah siswa aktif.",
        submittedDate: "15 Januari 2026",
        type: "Achievement",
        status: "pending",
        progress: 60,
    },
]

const getStatusColor = (status: string) => {
    switch (status) {
        case "active":
            return "bg-green-500/10 text-green-600 border-green-200"
        case "pending":
            return "bg-orange-500/10 text-orange-600 border-orange-200"
        case "expired":
            return "bg-red-500/10 text-red-600 border-red-200"
        case "available":
            return "bg-blue-500/10 text-blue-600 border-blue-200"
        case "coming_soon":
            return "bg-purple-500/10 text-purple-600 border-purple-200"
        default:
            return "bg-muted text-muted-foreground"
    }
}

const getStatusText = (status: string) => {
    switch (status) {
        case "active":
            return "Aktif"
        case "pending":
            return "Pending"
        case "expired":
            return "Kadaluarsa"
        case "available":
            return "Tersedia"
        case "coming_soon":
            return "Segera Hadir"
        default:
            return status
    }
}

const getTypeIcon = (type: string) => {
    switch (type) {
        case "Kemitraan":
            return Medal
        case "Sertifikasi":
            return Trophy
        case "Pelatihan":
            return Award
        case "Webinar":
            return FileText
        case "Workshop":
            return FileText
        case "Achievement":
            return Star
        default:
            return Award
    }
}

function MyCertificateCard({ cert }: { cert: typeof myCertificates[0] }) {
    const TypeIcon = getTypeIcon(cert.type)

    return (
        <Card className="cursor-pointer transition-all hover:shadow-lg group overflow-hidden">
            {/* Header with gradient */}
            <div className="relative h-32 bg-linear-to-br from-yellow-500/20 to-amber-500/20 flex items-center justify-center">
                <TypeIcon className="h-16 w-16 text-yellow-500/40 group-hover:text-yellow-500/60 transition-colors" />
                <div className="absolute top-2 left-2">
                    <Badge className={getStatusColor(cert.status)}>
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        {getStatusText(cert.status)}
                    </Badge>
                </div>
                <div className="absolute top-2 right-2">
                    <Badge variant="outline" className="bg-white/80">
                        {cert.type}
                    </Badge>
                </div>
            </div>

            <CardHeader className="pb-2">
                <CardTitle className="text-base line-clamp-1 group-hover:text-[#7CBF25] transition-colors">
                    {cert.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-xs">
                    {cert.description}
                </CardDescription>
            </CardHeader>

            <CardContent className="pb-2 space-y-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>Diterbitkan: {cert.issueDate}</span>
                </div>
                {cert.expiryDate && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>Berlaku sampai: {cert.expiryDate}</span>
                    </div>
                )}
                <div className="flex items-center justify-between">
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                        {cert.credentialId}
                    </code>
                    <Badge variant="secondary" className="text-xs">
                        <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                        {cert.points} poin
                    </Badge>
                </div>
            </CardContent>

            <CardFooter className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    Lihat
                </Button>
                <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                </Button>
                <Button size="sm" className="flex-1 bg-[#7CBF25] hover:bg-[#7CBF25]/90">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                </Button>
            </CardFooter>
        </Card>
    )
}

function AvailableCertificateCard({ cert }: { cert: typeof availableCertificates[0] }) {
    return (
        <Card className="cursor-pointer transition-all hover:shadow-lg group">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <Badge className={getStatusColor(cert.status)}>
                        {getStatusText(cert.status)}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                        <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                        {cert.points} poin
                    </Badge>
                </div>
                <CardTitle className="text-lg mt-2 group-hover:text-[#7CBF25] transition-colors">
                    {cert.title}
                </CardTitle>
                <CardDescription>
                    {cert.description}
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <p className="text-sm font-medium">Persyaratan:</p>
                    <ul className="space-y-1">
                        {cert.requirements.map((req, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="h-4 w-4 text-[#7CBF25]" />
                                {req}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Award className="h-4 w-4" />
                        <span>{cert.type}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Masa berlaku: {cert.duration}</span>
                    </div>
                </div>
            </CardContent>

            <CardFooter>
                <Button
                    className={`w-full ${cert.status === 'available' ? 'bg-[#7CBF25] hover:bg-[#7CBF25]/90' : ''}`}
                    disabled={cert.status === 'coming_soon'}
                >
                    {cert.status === 'coming_soon' ? 'Segera Hadir' : 'Daftar Sekarang'}
                </Button>
            </CardFooter>
        </Card>
    )
}

function PendingCertificateCard({ cert }: { cert: typeof pendingCertificates[0] }) {
    return (
        <Card className="cursor-pointer transition-all hover:shadow-md">
            <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                    <Badge className={getStatusColor(cert.status)}>
                        <Clock className="h-3 w-3 mr-1" />
                        {getStatusText(cert.status)}
                    </Badge>
                    <Badge variant="outline">{cert.type}</Badge>
                </div>
                <CardTitle className="text-base mt-2">{cert.title}</CardTitle>
                <CardDescription className="text-xs">{cert.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>Diajukan: {cert.submittedDate}</span>
                </div>
                <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                        <span>Progress</span>
                        <span>{cert.progress}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                            className="h-full bg-orange-500 rounded-full transition-all"
                            style={{ width: `${cert.progress}%` }}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default function SertifikatPage() {
    return (
        <div className="flex flex-1 flex-col gap-6 p-6">
            {/* Header Section */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Sertifikat
                        </h1>
                        <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600">
                            <Trophy className="h-3 w-3 mr-1" />
                            850 Poin
                        </Badge>
                    </div>
                    <p className="text-muted-foreground">
                        Kelola dan unduh sertifikat kemitraan, pelatihan, dan pencapaian Anda.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        <Printer className="h-4 w-4 mr-2" />
                        Cetak Semua
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

            {/* Tabs */}
            <Tabs defaultValue="my-certificates" className="space-y-6">
                <TabsList className="grid w-full max-w-lg grid-cols-3">
                    <TabsTrigger value="my-certificates" className="gap-2">
                        Sertifikat Saya
                        <Badge variant="secondary" className="text-xs">12</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="available" className="gap-2">
                        Tersedia
                        <Badge variant="secondary" className="text-xs">3</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="pending" className="gap-2">
                        Pending
                        <Badge variant="secondary" className="text-xs">2</Badge>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="my-certificates" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {myCertificates.map((cert) => (
                            <MyCertificateCard key={cert.id} cert={cert} />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="available" className="space-y-4">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {availableCertificates.map((cert) => (
                            <AvailableCertificateCard key={cert.id} cert={cert} />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="pending" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {pendingCertificates.map((cert) => (
                            <PendingCertificateCard key={cert.id} cert={cert} />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

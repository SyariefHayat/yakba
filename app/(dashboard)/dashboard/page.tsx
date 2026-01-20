import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Video,
    BookOpen,
    FileText,
    Award,
    Users,
    TrendingUp,
} from "lucide-react"

const stats = [
    {
        title: "Total Video",
        value: "124",
        description: "Video pembelajaran tersedia",
        icon: Video,
        color: "text-blue-500",
    },
    {
        title: "Modul Bimbel",
        value: "56",
        description: "Modul aktif",
        icon: BookOpen,
        color: "text-green-500",
    },
    {
        title: "Bahan Ajar",
        value: "89",
        description: "Materi tersedia",
        icon: FileText,
        color: "text-orange-500",
    },
    {
        title: "Sertifikat",
        value: "12",
        description: "Sertifikat Anda",
        icon: Award,
        color: "text-purple-500",
    },
]

export default function DashboardPage() {
    return (
        <div className="flex flex-1 flex-col gap-6 p-6">
            {/* Welcome Section */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">
                    Selamat Datang, Mitra! 👋
                </h1>
                <p className="text-muted-foreground">
                    Akses semua materi dan resources kemitraan YAKBA Anda di sini.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">
                                {stat.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            Aktivitas Terbaru
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 rounded-lg border p-4">
                                <Video className="h-8 w-8 text-blue-500" />
                                <div className="flex-1">
                                    <p className="font-medium">Video baru ditambahkan</p>
                                    <p className="text-sm text-muted-foreground">Tutorial Mengajar Matematika SD</p>
                                </div>
                                <span className="text-xs text-muted-foreground">2 jam lalu</span>
                            </div>
                            <div className="flex items-center gap-4 rounded-lg border p-4">
                                <BookOpen className="h-8 w-8 text-green-500" />
                                <div className="flex-1">
                                    <p className="font-medium">Modul baru tersedia</p>
                                    <p className="text-sm text-muted-foreground">Modul IPA Kelas 6</p>
                                </div>
                                <span className="text-xs text-muted-foreground">1 hari lalu</span>
                            </div>
                            <div className="flex items-center gap-4 rounded-lg border p-4">
                                <Award className="h-8 w-8 text-purple-500" />
                                <div className="flex-1">
                                    <p className="font-medium">Sertifikat tersedia</p>
                                    <p className="text-sm text-muted-foreground">Sertifikat Webinar Marketing</p>
                                </div>
                                <span className="text-xs text-muted-foreground">3 hari lalu</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            Info Mitra
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Status Kemitraan</p>
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                                <span className="font-medium">Aktif</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Bergabung Sejak</p>
                            <p className="font-medium">15 Januari 2026</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Total Bonus</p>
                            <p className="font-medium text-green-600">Rp 2.500.000</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

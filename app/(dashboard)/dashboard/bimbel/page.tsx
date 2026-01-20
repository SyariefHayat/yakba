import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    GraduationCap,
    Target,
    Users,
    Award,
    BookOpen,
    Clock,
    MapPin,
    CheckCircle2,
} from "lucide-react"

const highlights = [
    {
        icon: GraduationCap,
        title: "Pengajar Berkualitas",
        description: "Tim pengajar berpengalaman dan tersertifikasi",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
    },
    {
        icon: BookOpen,
        title: "Kurikulum Terkini",
        description: "Mengikuti kurikulum nasional terbaru",
        color: "text-green-500",
        bg: "bg-green-500/10",
    },
    {
        icon: Users,
        title: "Kelas Kecil",
        description: "Maksimal 10 siswa per kelas untuk perhatian optimal",
        color: "text-orange-500",
        bg: "bg-orange-500/10",
    },
    {
        icon: Award,
        title: "Prestasi Terbukti",
        description: "95% siswa mencapai target nilai yang diinginkan",
        color: "text-purple-500",
        bg: "bg-purple-500/10",
    },
]

const features = [
    "Metode pembelajaran interaktif dan menyenangkan",
    "Laporan perkembangan siswa secara berkala",
    "Latihan soal dan tryout rutin",
    "Konsultasi akademik gratis untuk orang tua",
    "Materi tambahan online 24/7",
    "Program remedial untuk siswa yang membutuhkan",
]

const stats = [
    { label: "Siswa Aktif", value: "500+", icon: Users },
    { label: "Mitra Cabang", value: "50+", icon: MapPin },
    { label: "Tahun Berpengalaman", value: "10+", icon: Clock },
    { label: "Tingkat Kelulusan", value: "95%", icon: Target },
]

export default function BimbelPage() {
    return (
        <div className="flex flex-1 flex-col gap-6 p-6">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Tentang Bimbel YAKBA
                    </h1>
                    <Badge variant="secondary" className="bg-[#7CBF25]/10 text-[#7CBF25]">
                        Resmi
                    </Badge>
                </div>
                <p className="text-muted-foreground max-w-2xl">
                    Bimbingan Belajar YAKBA adalah lembaga pendidikan non-formal yang berdedikasi
                    untuk membantu siswa mencapai prestasi akademik terbaik mereka melalui
                    pendekatan pembelajaran yang personal dan efektif.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.label} className="border-none bg-linear-to-br from-muted/50 to-muted">
                        <CardContent className="flex items-center gap-4 p-6">
                            <div className="rounded-full bg-[#7CBF25]/10 p-3">
                                <stat.icon className="h-6 w-6 text-[#7CBF25]" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{stat.value}</p>
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Highlights */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {highlights.map((item) => (
                    <Card key={item.title} className="transition-all hover:shadow-md">
                        <CardHeader>
                            <div className={`w-fit rounded-lg p-2 ${item.bg}`}>
                                <item.icon className={`h-5 w-5 ${item.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <CardTitle className="text-lg">{item.title}</CardTitle>
                            <CardDescription>{item.description}</CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Vision & Features */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Vision Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5 text-[#7CBF25]" />
                            Visi & Misi
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <h4 className="font-semibold">Visi</h4>
                            <p className="text-sm text-muted-foreground">
                                Menjadi lembaga bimbingan belajar terdepan yang menghasilkan
                                generasi cerdas, kreatif, dan berakhlak mulia.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-semibold">Misi</h4>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                                <li>• Memberikan pendidikan berkualitas dengan harga terjangkau</li>
                                <li>• Mengembangkan potensi siswa secara holistik</li>
                                <li>• Membangun karakter positif dan kecintaan belajar</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>

                {/* Features Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-[#7CBF25]" />
                            Keunggulan Kami
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {features.map((feature, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-[#7CBF25] shrink-0" />
                                    <span className="text-sm text-muted-foreground">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

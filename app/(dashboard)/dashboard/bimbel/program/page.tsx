import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    GraduationCap,
    Clock,
    Users,
    BookOpen,
    Star,
    ArrowRight,
} from "lucide-react"

const programs = [
    {
        id: 1,
        name: "Program SD",
        level: "Kelas 1-6",
        description: "Program bimbingan belajar untuk siswa Sekolah Dasar dengan fokus pada penguatan konsep dasar Matematika, IPA, dan Bahasa Indonesia.",
        subjects: ["Matematika", "IPA", "B. Indonesia", "B. Inggris"],
        duration: "2 jam/pertemuan",
        students: "8 siswa/kelas",
        price: "Rp 350.000",
        period: "/bulan",
        features: [
            "4x pertemuan per minggu",
            "Materi sesuai kurikulum terbaru",
            "Latihan soal harian",
            "Laporan mingguan",
        ],
        popular: false,
        color: "from-blue-500/10 to-cyan-500/10",
        borderColor: "border-blue-200",
        iconColor: "text-blue-500",
    },
    {
        id: 2,
        name: "Program SMP",
        level: "Kelas 7-9",
        description: "Bimbingan komprehensif untuk siswa SMP dengan persiapan ujian sekolah dan pembahasan materi mendalam.",
        subjects: ["Matematika", "IPA", "B. Indonesia", "B. Inggris", "IPS"],
        duration: "2.5 jam/pertemuan",
        students: "10 siswa/kelas",
        price: "Rp 450.000",
        period: "/bulan",
        features: [
            "5x pertemuan per minggu",
            "Try out bulanan",
            "Kelas remedial gratis",
            "Konsultasi via WhatsApp",
        ],
        popular: true,
        color: "from-[#7CBF25]/10 to-emerald-500/10",
        borderColor: "border-[#7CBF25]",
        iconColor: "text-[#7CBF25]",
    },
    {
        id: 3,
        name: "Program SMA",
        level: "Kelas 10-12",
        description: "Program intensif untuk siswa SMA dengan fokus persiapan UTBK, ujian sekolah, dan olimpiade.",
        subjects: ["Matematika", "Fisika", "Kimia", "Biologi", "B. Inggris"],
        duration: "3 jam/pertemuan",
        students: "10 siswa/kelas",
        price: "Rp 550.000",
        period: "/bulan",
        features: [
            "6x pertemuan per minggu",
            "Simulasi UTBK mingguan",
            "Bimbingan konseling PTN",
            "Akses video pembelajaran 24/7",
        ],
        popular: false,
        color: "from-purple-500/10 to-pink-500/10",
        borderColor: "border-purple-200",
        iconColor: "text-purple-500",
    },
    {
        id: 4,
        name: "Program Intensif UTBK",
        level: "Kelas 12 & Alumni",
        description: "Program khusus persiapan UTBK dengan pembahasan soal super intensif dan strategi menjawab.",
        subjects: ["TPS", "Literasi", "Penalaran Matematika"],
        duration: "4 jam/pertemuan",
        students: "12 siswa/kelas",
        price: "Rp 750.000",
        period: "/bulan",
        features: [
            "6x pertemuan per minggu",
            "500+ bank soal UTBK",
            "Prediksi soal UTBK",
            "Garansi mengulang gratis",
        ],
        popular: false,
        color: "from-orange-500/10 to-amber-500/10",
        borderColor: "border-orange-200",
        iconColor: "text-orange-500",
    },
]

export default function ProgramPage() {
    return (
        <div className="flex flex-1 flex-col gap-6 p-6">
            {/* Header Section */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">
                    Program Bimbel
                </h1>
                <p className="text-muted-foreground max-w-2xl">
                    Pilih program bimbingan belajar yang sesuai dengan kebutuhan dan jenjang pendidikan.
                    Setiap program dirancang khusus untuk memaksimalkan potensi siswa.
                </p>
            </div>

            {/* Programs Grid */}
            <div className="grid gap-6 md:grid-cols-2">
                {programs.map((program) => (
                    <Card
                        key={program.id}
                        className={`relative overflow-hidden transition-all hover:shadow-lg ${program.borderColor} ${program.popular ? 'border-2' : ''}`}
                    >
                        {/* Gradient Background */}
                        <div className={`absolute inset-0 bg-linear-to-br ${program.color} opacity-50`} />

                        {/* Popular Badge */}
                        {program.popular && (
                            <div className="absolute top-4 right-4">
                                <Badge className="bg-[#7CBF25] hover:bg-[#7CBF25]/90">
                                    <Star className="h-3 w-3 mr-1 fill-current" />
                                    Terpopuler
                                </Badge>
                            </div>
                        )}

                        <CardHeader className="relative">
                            <div className="flex items-start gap-4">
                                <div className={`rounded-xl p-3 ${program.color.replace('from-', 'bg-').split(' ')[0]}`}>
                                    <GraduationCap className={`h-6 w-6 ${program.iconColor}`} />
                                </div>
                                <div className="space-y-1">
                                    <CardTitle className="text-xl">{program.name}</CardTitle>
                                    <CardDescription className="text-sm">{program.level}</CardDescription>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="relative space-y-4">
                            <p className="text-sm text-muted-foreground">
                                {program.description}
                            </p>

                            {/* Subjects */}
                            <div className="flex flex-wrap gap-2">
                                {program.subjects.map((subject) => (
                                    <Badge key={subject} variant="outline" className="text-xs">
                                        {subject}
                                    </Badge>
                                ))}
                            </div>

                            {/* Info Grid */}
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    {program.duration}
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Users className="h-4 w-4" />
                                    {program.students}
                                </div>
                            </div>

                            {/* Features */}
                            <ul className="space-y-2">
                                {program.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-2 text-sm">
                                        <BookOpen className="h-3 w-3 text-[#7CBF25]" />
                                        <span className="text-muted-foreground">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>

                        <CardFooter className="relative flex items-center justify-between border-t pt-4">
                            <div>
                                <span className="text-2xl font-bold">{program.price}</span>
                                <span className="text-sm text-muted-foreground">{program.period}</span>
                            </div>
                            <Button
                                variant={program.popular ? "default" : "outline"}
                                className={program.popular ? "bg-[#7CBF25] hover:bg-[#7CBF25]/90" : ""}
                            >
                                Lihat Detail
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Additional Info */}
            <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                    <GraduationCap className="h-12 w-12 text-muted-foreground/50 mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Program Khusus?</h3>
                    <p className="text-sm text-muted-foreground mb-4 max-w-md">
                        Butuh program bimbingan dengan kebutuhan khusus? Hubungi kami untuk
                        konsultasi dan penawaran program yang disesuaikan.
                    </p>
                    <Button variant="outline">
                        Hubungi Kami
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    LifeBuoy,
    Search,
    MessageCircle,
    Phone,
    Mail,
    Clock,
    CheckCircle2,
    AlertCircle,
    ChevronRight,
    FileText,
    Video,
    HelpCircle,
    ExternalLink,
    Plus,
    ArrowRight,
} from "lucide-react"

const stats = [
    { label: "Tiket Aktif", value: "2", icon: MessageCircle, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Tiket Selesai", value: "15", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10" },
    { label: "Rata-rata Respon", value: "2 jam", icon: Clock, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Kepuasan", value: "98%", icon: LifeBuoy, color: "text-purple-500", bg: "bg-purple-500/10" },
]

const faqCategories = [
    { name: "Semua", count: 45, active: true },
    { name: "Akun", count: 8 },
    { name: "Pembayaran", count: 10 },
    { name: "Materi", count: 12 },
    { name: "Teknis", count: 15 },
]

const popularFAQs = [
    {
        id: 1,
        question: "Bagaimana cara mengubah password akun saya?",
        answer: "Anda dapat mengubah password melalui menu Settings > Keamanan > Ubah Password. Masukkan password lama dan password baru Anda.",
        category: "Akun",
        views: 1250,
    },
    {
        id: 2,
        question: "Bagaimana cara mengunduh modul pembelajaran?",
        answer: "Pilih modul yang ingin diunduh, klik tombol Download. File akan otomatis tersimpan di folder Downloads perangkat Anda.",
        category: "Materi",
        views: 980,
    },
    {
        id: 3,
        question: "Bagaimana cara melakukan pembayaran SPP siswa?",
        answer: "Pembayaran dapat dilakukan melalui transfer bank atau e-wallet. Invoice akan dikirim ke email setiap awal bulan.",
        category: "Pembayaran",
        views: 890,
    },
    {
        id: 4,
        question: "Mengapa video tidak bisa diputar?",
        answer: "Pastikan koneksi internet stabil. Coba refresh halaman atau clear cache browser. Jika masih bermasalah, hubungi support.",
        category: "Teknis",
        views: 756,
    },
    {
        id: 5,
        question: "Bagaimana cara mendapatkan bonus referral?",
        answer: "Bagikan kode referral Anda kepada calon mitra. Setelah mitra baru aktif dan membayar, bonus akan otomatis masuk ke saldo Anda.",
        category: "Pembayaran",
        views: 654,
    },
]

const myTickets = [
    {
        id: "TKT-2026-0125",
        subject: "Tidak bisa akses video pembelajaran",
        description: "Video di halaman pembelajaran tidak mau diputar sejak kemarin.",
        status: "in_progress",
        priority: "high",
        createdAt: "19 Jan 2026",
        lastUpdate: "2 jam lalu",
        responses: 3,
    },
    {
        id: "TKT-2026-0118",
        subject: "Request penambahan fitur kalender",
        description: "Mengusulkan penambahan fitur kalender untuk jadwal mengajar.",
        status: "open",
        priority: "low",
        createdAt: "15 Jan 2026",
        lastUpdate: "1 hari lalu",
        responses: 1,
    },
]

const closedTickets = [
    {
        id: "TKT-2026-0098",
        subject: "Error saat download modul",
        status: "resolved",
        createdAt: "10 Jan 2026",
        closedAt: "11 Jan 2026",
        rating: 5,
    },
    {
        id: "TKT-2026-0085",
        subject: "Pertanyaan tentang bonus referral",
        status: "resolved",
        createdAt: "5 Jan 2026",
        closedAt: "5 Jan 2026",
        rating: 5,
    },
]

const contactOptions = [
    {
        title: "WhatsApp Support",
        description: "Chat langsung dengan tim support",
        icon: MessageCircle,
        action: "Chat Sekarang",
        availability: "24/7",
        color: "bg-green-500",
    },
    {
        title: "Telepon",
        description: "Hubungi hotline support kami",
        icon: Phone,
        action: "021-1234-5678",
        availability: "Senin-Jumat, 08:00-17:00",
        color: "bg-blue-500",
    },
    {
        title: "Email",
        description: "Kirim email untuk pertanyaan detail",
        icon: Mail,
        action: "support@yakba.com",
        availability: "Respon 1x24 jam",
        color: "bg-purple-500",
    },
]

const helpResources = [
    {
        title: "Panduan Pengguna",
        description: "Dokumentasi lengkap penggunaan platform",
        icon: FileText,
        link: "#",
    },
    {
        title: "Video Tutorial",
        description: "Tutorial video step-by-step",
        icon: Video,
        link: "#",
    },
    {
        title: "FAQ Lengkap",
        description: "Pertanyaan yang sering ditanyakan",
        icon: HelpCircle,
        link: "#",
    },
]

const getStatusColor = (status: string) => {
    switch (status) {
        case "open":
            return "bg-blue-500/10 text-blue-600"
        case "in_progress":
            return "bg-orange-500/10 text-orange-600"
        case "resolved":
            return "bg-green-500/10 text-green-600"
        default:
            return "bg-muted text-muted-foreground"
    }
}

const getStatusText = (status: string) => {
    switch (status) {
        case "open":
            return "Dibuka"
        case "in_progress":
            return "Diproses"
        case "resolved":
            return "Selesai"
        default:
            return status
    }
}

const getPriorityColor = (priority: string) => {
    switch (priority) {
        case "high":
            return "bg-red-500/10 text-red-600"
        case "medium":
            return "bg-orange-500/10 text-orange-600"
        case "low":
            return "bg-green-500/10 text-green-600"
        default:
            return "bg-muted text-muted-foreground"
    }
}

function TicketCard({ ticket }: { ticket: typeof myTickets[0] }) {
    return (
        <Card className="cursor-pointer hover:shadow-md transition-all">
            <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(ticket.status)}>
                            {getStatusText(ticket.status)}
                        </Badge>
                        <Badge className={getPriorityColor(ticket.priority)}>
                            {ticket.priority === 'high' ? 'Prioritas Tinggi' : 'Prioritas Rendah'}
                        </Badge>
                    </div>
                    <code className="text-xs text-muted-foreground">{ticket.id}</code>
                </div>
                <CardTitle className="text-base mt-2">{ticket.subject}</CardTitle>
                <CardDescription className="text-xs">{ticket.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>Dibuat: {ticket.createdAt}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" />
                        <span>{ticket.responses} balasan</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                    Update terakhir: {ticket.lastUpdate}
                </span>
                <Button variant="ghost" size="sm">
                    Lihat Detail
                    <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
            </CardFooter>
        </Card>
    )
}

function FAQCard({ faq }: { faq: typeof popularFAQs[0] }) {
    return (
        <Card className="cursor-pointer hover:shadow-md transition-all group">
            <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                    <Badge variant="outline">{faq.category}</Badge>
                    <span className="text-xs text-muted-foreground">{faq.views} views</span>
                </div>
                <CardTitle className="text-base mt-2 group-hover:text-[#7CBF25] transition-colors">
                    {faq.question}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">{faq.answer}</p>
            </CardContent>
            <CardFooter>
                <Button variant="ghost" size="sm" className="text-[#7CBF25]">
                    Baca Selengkapnya
                    <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
            </CardFooter>
        </Card>
    )
}

export default function SupportPage() {
    return (
        <div className="flex flex-1 flex-col gap-6 p-6">
            {/* Header Section */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Support
                        </h1>
                        <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Online
                        </Badge>
                    </div>
                    <p className="text-muted-foreground">
                        Pusat bantuan dan dukungan untuk mitra YAKBA.
                    </p>
                </div>
                <Button className="bg-[#7CBF25] hover:bg-[#7CBF25]/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Buat Tiket Baru
                </Button>
            </div>

            {/* Search Bar */}
            <Card className="bg-linear-to-br from-[#7CBF25]/5 to-emerald-500/5 border-[#7CBF25]/20">
                <CardContent className="p-6">
                    <div className="max-w-2xl mx-auto space-y-4 text-center">
                        <h2 className="text-xl font-semibold">Ada yang bisa kami bantu?</h2>
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Cari pertanyaan atau masalah Anda..."
                                className="pl-12 h-12 text-base"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

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

            {/* Contact Options */}
            <div className="grid gap-4 md:grid-cols-3">
                {contactOptions.map((option) => (
                    <Card key={option.title} className="cursor-pointer hover:shadow-md transition-all group">
                        <CardContent className="flex items-center gap-4 p-4">
                            <div className={`rounded-full p-3 ${option.color}`}>
                                <option.icon className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium group-hover:text-[#7CBF25] transition-colors">{option.title}</p>
                                <p className="text-xs text-muted-foreground">{option.description}</p>
                                <p className="text-sm font-medium mt-1">{option.action}</p>
                            </div>
                            <Badge variant="outline" className="text-xs">
                                {option.availability}
                            </Badge>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Tabs */}
            <Tabs defaultValue="faq" className="space-y-6">
                <TabsList className="grid w-full max-w-lg grid-cols-3">
                    <TabsTrigger value="faq" className="gap-2">
                        FAQ
                        <Badge variant="secondary" className="text-xs">45</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="tickets" className="gap-2">
                        Tiket Saya
                        <Badge variant="secondary" className="text-xs">2</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="resources" className="gap-2">
                        Resources
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="faq" className="space-y-6">
                    {/* Category Pills */}
                    <div className="flex gap-2 flex-wrap">
                        {faqCategories.map((category) => (
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

                    {/* FAQ Grid */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {popularFAQs.map((faq) => (
                            <FAQCard key={faq.id} faq={faq} />
                        ))}
                    </div>

                    <div className="flex justify-center">
                        <Button variant="outline">
                            Lihat Semua FAQ
                            <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                    </div>
                </TabsContent>

                <TabsContent value="tickets" className="space-y-6">
                    {/* Active Tickets */}
                    <div className="space-y-4">
                        <h3 className="font-semibold flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 text-orange-500" />
                            Tiket Aktif
                        </h3>
                        <div className="grid gap-4 md:grid-cols-2">
                            {myTickets.map((ticket) => (
                                <TicketCard key={ticket.id} ticket={ticket} />
                            ))}
                        </div>
                    </div>

                    {/* Closed Tickets */}
                    <div className="space-y-4">
                        <h3 className="font-semibold flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                            Tiket Selesai
                        </h3>
                        <div className="space-y-2">
                            {closedTickets.map((ticket) => (
                                <Card key={ticket.id} className="cursor-pointer hover:shadow-sm transition-all">
                                    <CardContent className="flex items-center gap-4 p-4">
                                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                                        <div className="flex-1">
                                            <p className="font-medium">{ticket.subject}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {ticket.id} • Diselesaikan: {ticket.closedAt}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {[...Array(ticket.rating)].map((_, i) => (
                                                <span key={i} className="text-yellow-400">★</span>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="resources" className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-3">
                        {helpResources.map((resource) => (
                            <Card key={resource.title} className="cursor-pointer hover:shadow-md transition-all group">
                                <CardHeader>
                                    <div className="rounded-full bg-[#7CBF25]/10 p-3 w-fit">
                                        <resource.icon className="h-6 w-6 text-[#7CBF25]" />
                                    </div>
                                    <CardTitle className="text-lg group-hover:text-[#7CBF25] transition-colors">
                                        {resource.title}
                                    </CardTitle>
                                    <CardDescription>{resource.description}</CardDescription>
                                </CardHeader>
                                <CardFooter>
                                    <Button variant="ghost" className="text-[#7CBF25]">
                                        Lihat
                                        <ExternalLink className="h-4 w-4 ml-2" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

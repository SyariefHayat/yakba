import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Megaphone,
    Download,
    Search,
    Filter,
    Eye,
    FileText,
    Video,
    Image,
    Presentation,
    MessageSquare,
    Mail,
    Copy,
    Package,
    Sparkles,
    Star,
} from "lucide-react"

const stats = [
    { label: "Total Marketing Kit", value: "124", icon: Package, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Template", value: "45", icon: FileText, color: "text-green-500", bg: "bg-green-500/10" },
    { label: "Script & Caption", value: "52", icon: MessageSquare, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Media Assets", value: "27", icon: Image, color: "text-purple-500", bg: "bg-purple-500/10" },
]

const categories = [
    { name: "Semua", count: 124, active: true },
    { name: "Template", count: 45 },
    { name: "Script", count: 32 },
    { name: "Caption", count: 20 },
    { name: "Email", count: 15 },
    { name: "Video", count: 12 },
]

const templates = [
    {
        id: 1,
        title: "Template Proposal Kerjasama",
        description: "Template proposal untuk kerjasama dengan sekolah atau instansi.",
        type: "Template",
        format: "DOCX, PDF",
        category: "Proposal",
        downloads: 1890,
        isNew: true,
        isPremium: false,
    },
    {
        id: 2,
        title: "Template Kontrak Kemitraan",
        description: "Template kontrak kerjasama mitra bimbel YAKBA.",
        type: "Template",
        format: "DOCX, PDF",
        category: "Legal",
        downloads: 1650,
        isNew: true,
        isPremium: false,
    },
    {
        id: 3,
        title: "Template Invoice & Kwitansi",
        description: "Template invoice dan kwitansi untuk pembayaran siswa.",
        type: "Template",
        format: "XLSX, PDF",
        category: "Keuangan",
        downloads: 2340,
        isNew: false,
        isPremium: false,
    },
    {
        id: 4,
        title: "Template Laporan Bulanan",
        description: "Template laporan perkembangan siswa untuk orang tua.",
        type: "Template",
        format: "DOCX, PDF",
        category: "Laporan",
        downloads: 1420,
        isNew: false,
        isPremium: false,
    },
]

const scriptsAndCaptions = [
    {
        id: 1,
        title: "Script Telepon Follow Up",
        description: "Script untuk menghubungi calon siswa yang sudah mendaftar trial.",
        type: "Script",
        format: "PDF",
        category: "Sales",
        downloads: 2890,
        isNew: true,
        isPremium: false,
    },
    {
        id: 2,
        title: "Caption Instagram 30 Hari",
        description: "Kumpulan caption Instagram untuk posting selama 30 hari.",
        type: "Caption",
        format: "PDF, TXT",
        category: "Social Media",
        downloads: 3450,
        isNew: true,
        isPremium: true,
    },
    {
        id: 3,
        title: "Script WhatsApp Broadcast",
        description: "Template pesan broadcast WhatsApp untuk berbagai keperluan.",
        type: "Script",
        format: "PDF, TXT",
        category: "Messaging",
        downloads: 2650,
        isNew: false,
        isPremium: false,
    },
    {
        id: 4,
        title: "Script Presentasi ke Sekolah",
        description: "Script presentasi untuk menawarkan kerjasama ke sekolah.",
        type: "Script",
        format: "PDF",
        category: "Sales",
        downloads: 1980,
        isNew: false,
        isPremium: false,
    },
]

const mediaAssets = [
    {
        id: 1,
        title: "Logo YAKBA Package",
        description: "Paket logo YAKBA dalam berbagai format dan ukuran.",
        type: "Media",
        format: "PNG, SVG, AI",
        category: "Branding",
        downloads: 4560,
        isNew: false,
        isPremium: false,
    },
    {
        id: 2,
        title: "Brand Guidelines",
        description: "Panduan penggunaan brand YAKBA (warna, font, dll).",
        type: "Media",
        format: "PDF",
        category: "Branding",
        downloads: 2340,
        isNew: true,
        isPremium: false,
    },
    {
        id: 3,
        title: "Video Profil YAKBA",
        description: "Video company profile Bimbingan Belajar YAKBA.",
        type: "Video",
        format: "MP4",
        category: "Video",
        downloads: 1890,
        isNew: true,
        isPremium: false,
    },
    {
        id: 4,
        title: "Stock Photo Pembelajaran",
        description: "Koleksi foto kegiatan belajar mengajar berkualitas tinggi.",
        type: "Media",
        format: "JPG, PNG",
        category: "Photo",
        downloads: 3210,
        isNew: false,
        isPremium: true,
    },
]

const getTypeIcon = (type: string) => {
    switch (type) {
        case "Template":
            return FileText
        case "Script":
            return MessageSquare
        case "Caption":
            return MessageSquare
        case "Media":
            return Image
        case "Video":
            return Video
        default:
            return Package
    }
}

const getTypeColor = (type: string) => {
    switch (type) {
        case "Template":
            return "bg-blue-500/10 text-blue-600"
        case "Script":
            return "bg-green-500/10 text-green-600"
        case "Caption":
            return "bg-orange-500/10 text-orange-600"
        case "Media":
            return "bg-purple-500/10 text-purple-600"
        case "Video":
            return "bg-pink-500/10 text-pink-600"
        default:
            return "bg-muted text-muted-foreground"
    }
}

function MarketingKitCard({ item }: { item: typeof templates[0] }) {
    const TypeIcon = getTypeIcon(item.type)

    return (
        <Card className="cursor-pointer transition-all hover:shadow-lg group overflow-hidden">
            {/* Header with Icon */}
            <div className="relative h-28 bg-linear-to-br from-[#7CBF25]/10 to-emerald-500/10 flex items-center justify-center">
                <TypeIcon className="h-12 w-12 text-[#7CBF25]/30 group-hover:text-[#7CBF25]/60 transition-colors" />
                <div className="absolute top-2 left-2 flex gap-1">
                    {item.isNew && (
                        <Badge className="bg-[#7CBF25] hover:bg-[#7CBF25]">
                            Baru
                        </Badge>
                    )}
                    {item.isPremium && (
                        <Badge className="bg-yellow-500 hover:bg-yellow-500">
                            <Star className="h-3 w-3 mr-1 fill-current" />
                            Premium
                        </Badge>
                    )}
                </div>
                <div className="absolute top-2 right-2">
                    <Badge className={getTypeColor(item.type)}>
                        {item.type}
                    </Badge>
                </div>
            </div>

            <CardHeader className="pb-2">
                <CardTitle className="text-base line-clamp-1 group-hover:text-[#7CBF25] transition-colors">
                    {item.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-xs">
                    {item.description}
                </CardDescription>
            </CardHeader>

            <CardContent className="pb-2 space-y-2">
                <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                        {item.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                        {item.format}
                    </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Download className="h-3 w-3" />
                    <span>{item.downloads.toLocaleString()} downloads</span>
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

const featuredKits = [
    {
        title: "Starter Kit Mitra Baru",
        description: "Paket lengkap untuk memulai bimbel: template, script, dan media assets.",
        items: 25,
        downloads: 8900,
    },
    {
        title: "Social Media Kit",
        description: "Paket konten sosial media: caption, template, dan jadwal posting.",
        items: 30,
        downloads: 7650,
    },
    {
        title: "Sales Kit",
        description: "Paket penjualan: proposal, script telepon, dan materi presentasi.",
        items: 18,
        downloads: 5430,
    },
]

export default function MarketingKitPage() {
    return (
        <div className="flex flex-1 flex-col gap-6 p-6">
            {/* Header Section */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Marketing Kit
                        </h1>
                        <Badge variant="secondary" className="bg-[#7CBF25]/10 text-[#7CBF25]">
                            <Sparkles className="h-3 w-3 mr-1" />
                            124 Resources
                        </Badge>
                    </div>
                    <p className="text-muted-foreground">
                        Koleksi lengkap alat marketing untuk membantu promosi bimbel Anda.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Cari marketing kit..."
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

            {/* Featured Kits */}
            <div className="grid gap-4 md:grid-cols-3">
                {featuredKits.map((kit) => (
                    <Card key={kit.title} className="bg-linear-to-br from-[#7CBF25]/5 to-emerald-500/5 border-[#7CBF25]/20 hover:shadow-md transition-all cursor-pointer">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Package className="h-5 w-5 text-[#7CBF25]" />
                                {kit.title}
                            </CardTitle>
                            <CardDescription>{kit.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <FileText className="h-4 w-4" />
                                <span>{kit.items} items</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Download className="h-4 w-4" />
                                <span>{kit.downloads.toLocaleString()}</span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full bg-[#7CBF25] hover:bg-[#7CBF25]/90">
                                <Download className="h-4 w-4 mr-2" />
                                Download Complete Kit
                            </Button>
                        </CardFooter>
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
            <Tabs defaultValue="templates" className="space-y-6">
                <TabsList className="grid w-full max-w-lg grid-cols-3">
                    <TabsTrigger value="templates" className="gap-2">
                        Template
                        <Badge variant="secondary" className="text-xs">45</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="scripts" className="gap-2">
                        Script & Caption
                        <Badge variant="secondary" className="text-xs">52</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="media" className="gap-2">
                        Media Assets
                        <Badge variant="secondary" className="text-xs">27</Badge>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="templates" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {templates.map((item) => (
                            <MarketingKitCard key={item.id} item={item} />
                        ))}
                    </div>
                    <div className="flex justify-center">
                        <Button variant="outline">
                            Muat Lebih Banyak
                        </Button>
                    </div>
                </TabsContent>

                <TabsContent value="scripts" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {scriptsAndCaptions.map((item) => (
                            <MarketingKitCard key={item.id} item={item} />
                        ))}
                    </div>
                    <div className="flex justify-center">
                        <Button variant="outline">
                            Muat Lebih Banyak
                        </Button>
                    </div>
                </TabsContent>

                <TabsContent value="media" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {mediaAssets.map((item) => (
                            <MarketingKitCard key={item.id} item={item} />
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

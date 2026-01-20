import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Image,
    Download,
    Search,
    Filter,
    Eye,
    Clock,
    Smartphone,
    Monitor,
    Square,
    RectangleHorizontal,
    RectangleVertical,
    Copy,
    Share2,
} from "lucide-react"

const stats = [
    { label: "Total Banner", value: "86", icon: Image, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Banner Promosi", value: "32", icon: RectangleHorizontal, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Banner Sosmed", value: "38", icon: Square, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Banner Cetak", value: "16", icon: RectangleVertical, color: "text-green-500", bg: "bg-green-500/10" },
]

const categories = [
    { name: "Semua", count: 86, active: true },
    { name: "Promosi", count: 32 },
    { name: "Instagram", count: 24 },
    { name: "Facebook", count: 14 },
    { name: "WhatsApp", count: 10 },
    { name: "Cetak", count: 16 },
]

const promotionBanners = [
    {
        id: 1,
        title: "Banner Promo Awal Tahun 2026",
        description: "Banner promosi diskon pendaftaran awal tahun ajaran baru.",
        category: "Promosi",
        size: "1200 x 628 px",
        format: "PNG, JPG",
        downloads: 1250,
        isNew: true,
        isEditable: true,
    },
    {
        id: 2,
        title: "Banner Gratis Uji Coba",
        description: "Promosi kelas gratis uji coba untuk siswa baru.",
        category: "Promosi",
        size: "1200 x 628 px",
        format: "PNG, JPG",
        downloads: 980,
        isNew: true,
        isEditable: true,
    },
    {
        id: 3,
        title: "Banner Diskon Semester Genap",
        description: "Promosi diskon khusus untuk pendaftaran semester genap.",
        category: "Promosi",
        size: "1200 x 628 px",
        format: "PNG, JPG",
        downloads: 856,
        isNew: false,
        isEditable: true,
    },
    {
        id: 4,
        title: "Banner Referral Program",
        description: "Banner untuk program ajak teman dapat bonus.",
        category: "Promosi",
        size: "1200 x 628 px",
        format: "PNG, JPG",
        downloads: 742,
        isNew: false,
        isEditable: true,
    },
]

const socialMediaBanners = [
    {
        id: 1,
        title: "IG Post - Tips Belajar",
        description: "Konten tips belajar efektif untuk Instagram.",
        category: "Instagram",
        size: "1080 x 1080 px",
        format: "PNG, JPG",
        downloads: 1890,
        isNew: true,
        isEditable: true,
    },
    {
        id: 2,
        title: "IG Story - Pendaftaran Baru",
        description: "Story Instagram untuk promosi pendaftaran.",
        category: "Instagram",
        size: "1080 x 1920 px",
        format: "PNG, JPG",
        downloads: 1650,
        isNew: true,
        isEditable: true,
    },
    {
        id: 3,
        title: "FB Cover - Bimbel YAKBA",
        description: "Cover Facebook dengan branding YAKBA.",
        category: "Facebook",
        size: "820 x 312 px",
        format: "PNG, JPG",
        downloads: 1420,
        isNew: false,
        isEditable: true,
    },
    {
        id: 4,
        title: "WA Status - Promo Mingguan",
        description: "Status WhatsApp untuk promosi mingguan.",
        category: "WhatsApp",
        size: "1080 x 1920 px",
        format: "PNG, JPG",
        downloads: 1280,
        isNew: false,
        isEditable: true,
    },
]

const printBanners = [
    {
        id: 1,
        title: "Spanduk Bimbel YAKBA",
        description: "Desain spanduk untuk dipasang di depan lokasi bimbel.",
        category: "Cetak",
        size: "300 x 100 cm",
        format: "PDF, AI",
        downloads: 654,
        isNew: true,
        isEditable: false,
    },
    {
        id: 2,
        title: "Brosur Lipat 3",
        description: "Brosur lipat tiga dengan informasi lengkap program.",
        category: "Cetak",
        size: "A4 Landscape",
        format: "PDF, AI",
        downloads: 589,
        isNew: true,
        isEditable: false,
    },
    {
        id: 3,
        title: "Poster A3 - Program Bimbel",
        description: "Poster ukuran A3 berisi daftar program bimbel.",
        category: "Cetak",
        size: "A3 (297 x 420 mm)",
        format: "PDF, AI",
        downloads: 478,
        isNew: false,
        isEditable: false,
    },
    {
        id: 4,
        title: "X-Banner Roll Up",
        description: "Desain X-Banner untuk pameran dan event.",
        category: "Cetak",
        size: "60 x 160 cm",
        format: "PDF, AI",
        downloads: 423,
        isNew: false,
        isEditable: false,
    },
]

const getCategoryColor = (category: string) => {
    switch (category) {
        case "Promosi":
            return "bg-orange-500/10 text-orange-600"
        case "Instagram":
            return "bg-pink-500/10 text-pink-600"
        case "Facebook":
            return "bg-blue-500/10 text-blue-600"
        case "WhatsApp":
            return "bg-green-500/10 text-green-600"
        case "Cetak":
            return "bg-purple-500/10 text-purple-600"
        default:
            return "bg-muted text-muted-foreground"
    }
}

const getCategoryIcon = (category: string) => {
    switch (category) {
        case "Instagram":
        case "WhatsApp":
            return Smartphone
        case "Facebook":
        case "Promosi":
            return Monitor
        case "Cetak":
            return RectangleVertical
        default:
            return Image
    }
}

function BannerCard({ banner }: { banner: typeof promotionBanners[0] }) {
    const CategoryIcon = getCategoryIcon(banner.category)

    return (
        <Card className="cursor-pointer transition-all hover:shadow-lg group overflow-hidden">
            {/* Banner Preview */}
            <div className="relative aspect-video bg-linear-to-br from-muted to-muted/50 flex items-center justify-center">
                <Image className="h-12 w-12 text-muted-foreground/30 group-hover:text-[#7CBF25]/50 transition-colors" />
                <div className="absolute top-2 left-2 flex gap-1">
                    {banner.isNew && (
                        <Badge className="bg-[#7CBF25] hover:bg-[#7CBF25]">
                            Baru
                        </Badge>
                    )}
                </div>
                <div className="absolute top-2 right-2">
                    <Badge className={getCategoryColor(banner.category)}>
                        <CategoryIcon className="h-3 w-3 mr-1" />
                        {banner.category}
                    </Badge>
                </div>
                {banner.isEditable && (
                    <div className="absolute bottom-2 right-2">
                        <Badge variant="outline" className="bg-white/80 text-xs">
                            Bisa Diedit
                        </Badge>
                    </div>
                )}
            </div>

            <CardHeader className="pb-2">
                <CardTitle className="text-base line-clamp-1 group-hover:text-[#7CBF25] transition-colors">
                    {banner.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-xs">
                    {banner.description}
                </CardDescription>
            </CardHeader>

            <CardContent className="pb-2 space-y-2">
                <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                        <RectangleHorizontal className="h-3 w-3 mr-1" />
                        {banner.size}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                        {banner.format}
                    </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Download className="h-3 w-3" />
                    <span>{banner.downloads.toLocaleString()} downloads</span>
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

export default function BannerPage() {
    return (
        <div className="flex flex-1 flex-col gap-6 p-6">
            {/* Header Section */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Banner
                    </h1>
                    <p className="text-muted-foreground">
                        Koleksi banner siap pakai untuk promosi bimbel di berbagai platform.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Cari banner..."
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
            <Tabs defaultValue="promotion" className="space-y-6">
                <TabsList className="grid w-full max-w-lg grid-cols-3">
                    <TabsTrigger value="promotion" className="gap-2">
                        Promosi
                        <Badge variant="secondary" className="text-xs">32</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="social" className="gap-2">
                        Sosial Media
                        <Badge variant="secondary" className="text-xs">38</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="print" className="gap-2">
                        Cetak
                        <Badge variant="secondary" className="text-xs">16</Badge>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="promotion" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {promotionBanners.map((banner) => (
                            <BannerCard key={banner.id} banner={banner} />
                        ))}
                    </div>
                    <div className="flex justify-center">
                        <Button variant="outline">
                            Muat Lebih Banyak
                        </Button>
                    </div>
                </TabsContent>

                <TabsContent value="social" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {socialMediaBanners.map((banner) => (
                            <BannerCard key={banner.id} banner={banner} />
                        ))}
                    </div>
                    <div className="flex justify-center">
                        <Button variant="outline">
                            Muat Lebih Banyak
                        </Button>
                    </div>
                </TabsContent>

                <TabsContent value="print" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {printBanners.map((banner) => (
                            <BannerCard key={banner.id} banner={banner} />
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

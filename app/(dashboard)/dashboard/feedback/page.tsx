"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Send,
    MessageSquare,
    Star,
    ThumbsUp,
    Lightbulb,
    Bug,
    Clock,
    CheckCircle2,
    AlertCircle,
    Heart,
    Sparkles,
} from "lucide-react"

const stats = [
    { label: "Feedback Dikirim", value: "8", icon: Send, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Diimplementasi", value: "3", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10" },
    { label: "Dalam Review", value: "2", icon: Clock, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Poin Kontribusi", value: "150", icon: Star, color: "text-purple-500", bg: "bg-purple-500/10" },
]

const feedbackTypes = [
    {
        id: "suggestion",
        title: "Saran Fitur",
        description: "Usulkan fitur baru atau peningkatan",
        icon: Lightbulb,
        color: "bg-yellow-500",
    },
    {
        id: "bug",
        title: "Laporan Bug",
        description: "Laporkan masalah atau error",
        icon: Bug,
        color: "bg-red-500",
    },
    {
        id: "improvement",
        title: "Peningkatan",
        description: "Saran untuk meningkatkan yang sudah ada",
        icon: Sparkles,
        color: "bg-purple-500",
    },
    {
        id: "appreciation",
        title: "Apresiasi",
        description: "Berikan pujian atau terima kasih",
        icon: Heart,
        color: "bg-pink-500",
    },
]

const myFeedback = [
    {
        id: 1,
        title: "Request fitur kalender jadwal mengajar",
        description: "Akan sangat membantu jika ada fitur kalender untuk melihat jadwal mengajar secara visual.",
        type: "suggestion",
        status: "implemented",
        createdAt: "10 Jan 2026",
        votes: 45,
        response: "Terima kasih atas sarannya! Fitur ini sudah diimplementasi di versi terbaru.",
    },
    {
        id: 2,
        title: "Bug: Video tidak bisa di-pause",
        description: "Ketika menonton video pembelajaran, tombol pause tidak berfungsi di browser Safari.",
        type: "bug",
        status: "in_progress",
        createdAt: "15 Jan 2026",
        votes: 12,
        response: "Tim kami sedang menginvestigasi masalah ini. Terima kasih atas laporannya.",
    },
    {
        id: 3,
        title: "Tambahkan dark mode",
        description: "Mohon ditambahkan opsi dark mode untuk kenyamanan mata saat belajar malam.",
        type: "suggestion",
        status: "under_review",
        createdAt: "18 Jan 2026",
        votes: 89,
        response: null,
    },
]

const popularFeedback = [
    {
        id: 1,
        title: "Notifikasi push untuk update materi baru",
        description: "Agar mitra bisa langsung tahu ketika ada materi baru.",
        type: "suggestion",
        author: "Pak Ahmad",
        votes: 156,
        status: "planned",
    },
    {
        id: 2,
        title: "Export laporan ke Excel",
        description: "Fitur untuk mengexport laporan siswa ke format Excel.",
        type: "improvement",
        author: "Bu Sari",
        votes: 132,
        status: "in_progress",
    },
    {
        id: 3,
        title: "Integrasi dengan Google Calendar",
        description: "Sinkronisasi jadwal bimbel dengan Google Calendar.",
        type: "suggestion",
        author: "Pak Budi",
        votes: 98,
        status: "under_review",
    },
    {
        id: 4,
        title: "Fitur chat antar mitra",
        description: "Wadah diskusi dan berbagi pengalaman antar mitra.",
        type: "suggestion",
        author: "Bu Dewi",
        votes: 87,
        status: "planned",
    },
]

const getStatusColor = (status: string) => {
    switch (status) {
        case "implemented":
            return "bg-green-500/10 text-green-600"
        case "in_progress":
            return "bg-blue-500/10 text-blue-600"
        case "under_review":
            return "bg-orange-500/10 text-orange-600"
        case "planned":
            return "bg-purple-500/10 text-purple-600"
        default:
            return "bg-muted text-muted-foreground"
    }
}

const getStatusText = (status: string) => {
    switch (status) {
        case "implemented":
            return "Diimplementasi"
        case "in_progress":
            return "Dalam Pengerjaan"
        case "under_review":
            return "Dalam Review"
        case "planned":
            return "Direncanakan"
        default:
            return status
    }
}

const getTypeIcon = (type: string) => {
    switch (type) {
        case "suggestion":
            return Lightbulb
        case "bug":
            return Bug
        case "improvement":
            return Sparkles
        case "appreciation":
            return Heart
        default:
            return MessageSquare
    }
}

const getTypeColor = (type: string) => {
    switch (type) {
        case "suggestion":
            return "bg-yellow-500/10 text-yellow-600"
        case "bug":
            return "bg-red-500/10 text-red-600"
        case "improvement":
            return "bg-purple-500/10 text-purple-600"
        case "appreciation":
            return "bg-pink-500/10 text-pink-600"
        default:
            return "bg-muted text-muted-foreground"
    }
}

function FeedbackCard({ feedback }: { feedback: typeof myFeedback[0] }) {
    const TypeIcon = getTypeIcon(feedback.type)

    return (
        <Card className="cursor-pointer hover:shadow-md transition-all">
            <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <Badge className={getTypeColor(feedback.type)}>
                            <TypeIcon className="h-3 w-3 mr-1" />
                            {feedback.type === 'suggestion' ? 'Saran' :
                                feedback.type === 'bug' ? 'Bug' :
                                    feedback.type === 'improvement' ? 'Peningkatan' : 'Apresiasi'}
                        </Badge>
                        <Badge className={getStatusColor(feedback.status)}>
                            {getStatusText(feedback.status)}
                        </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                        <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{feedback.votes}</span>
                    </div>
                </div>
                <CardTitle className="text-base mt-2">{feedback.title}</CardTitle>
                <CardDescription className="text-xs">{feedback.description}</CardDescription>
            </CardHeader>
            {feedback.response && (
                <CardContent className="pb-2">
                    <div className="bg-muted/50 rounded-lg p-3">
                        <p className="text-xs font-medium mb-1">Respons Tim YAKBA:</p>
                        <p className="text-xs text-muted-foreground">{feedback.response}</p>
                    </div>
                </CardContent>
            )}
            <CardFooter className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 inline mr-1" />
                    {feedback.createdAt}
                </span>
                <Button variant="ghost" size="sm">
                    Lihat Detail
                </Button>
            </CardFooter>
        </Card>
    )
}

function PopularFeedbackCard({ feedback }: { feedback: typeof popularFeedback[0] }) {
    const TypeIcon = getTypeIcon(feedback.type)

    return (
        <Card className="cursor-pointer hover:shadow-md transition-all group">
            <CardContent className="p-4">
                <div className="flex gap-4">
                    {/* Vote Section */}
                    <div className="flex flex-col items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <span className="font-bold text-lg">{feedback.votes}</span>
                        <span className="text-xs text-muted-foreground">votes</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                            <Badge className={getTypeColor(feedback.type)}>
                                <TypeIcon className="h-3 w-3 mr-1" />
                                {feedback.type === 'suggestion' ? 'Saran' :
                                    feedback.type === 'improvement' ? 'Peningkatan' : feedback.type}
                            </Badge>
                            <Badge className={getStatusColor(feedback.status)}>
                                {getStatusText(feedback.status)}
                            </Badge>
                        </div>
                        <h4 className="font-medium group-hover:text-[#7CBF25] transition-colors">
                            {feedback.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">{feedback.description}</p>
                        <p className="text-xs text-muted-foreground">
                            Oleh: {feedback.author}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default function FeedbackPage() {
    const [selectedType, setSelectedType] = useState<string | null>(null)

    return (
        <div className="flex flex-1 flex-col gap-6 p-6">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Feedback
                    </h1>
                    <Badge variant="secondary" className="bg-[#7CBF25]/10 text-[#7CBF25]">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        150 Poin
                    </Badge>
                </div>
                <p className="text-muted-foreground">
                    Bantu kami meningkatkan platform dengan memberikan feedback Anda.
                </p>
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
            <Tabs defaultValue="submit" className="space-y-6">
                <TabsList className="grid w-full max-w-lg grid-cols-3">
                    <TabsTrigger value="submit">
                        Kirim Feedback
                    </TabsTrigger>
                    <TabsTrigger value="my-feedback" className="gap-2">
                        Feedback Saya
                        <Badge variant="secondary" className="text-xs">8</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="popular" className="gap-2">
                        Populer
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="submit" className="space-y-6">
                    {/* Feedback Type Selection */}
                    <div className="space-y-4">
                        <h3 className="font-semibold">Pilih Jenis Feedback</h3>
                        <div className="grid gap-4 md:grid-cols-4">
                            {feedbackTypes.map((type) => (
                                <Card
                                    key={type.id}
                                    className={`cursor-pointer transition-all hover:shadow-md ${selectedType === type.id ? 'ring-2 ring-[#7CBF25]' : ''
                                        }`}
                                    onClick={() => setSelectedType(type.id)}
                                >
                                    <CardContent className="p-4 text-center">
                                        <div className={`rounded-full p-3 mx-auto w-fit ${type.color}`}>
                                            <type.icon className="h-6 w-6 text-white" />
                                        </div>
                                        <h4 className="font-medium mt-3">{type.title}</h4>
                                        <p className="text-xs text-muted-foreground mt-1">{type.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Feedback Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Tulis Feedback Anda</CardTitle>
                            <CardDescription>
                                Feedback Anda sangat berarti untuk pengembangan platform YAKBA.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Judul</label>
                                <Input placeholder="Ringkasan singkat feedback Anda" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Deskripsi</label>
                                <Textarea
                                    placeholder="Jelaskan feedback Anda secara detail..."
                                    rows={5}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Screenshot (Opsional)</label>
                                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                                    <p className="text-sm text-muted-foreground">
                                        Drag & drop gambar atau klik untuk upload
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <p className="text-xs text-muted-foreground">
                                <Star className="h-3 w-3 inline mr-1 text-yellow-500" />
                                Dapatkan 10 poin untuk setiap feedback yang dikirim
                            </p>
                            <Button className="bg-[#7CBF25] hover:bg-[#7CBF25]/90">
                                <Send className="h-4 w-4 mr-2" />
                                Kirim Feedback
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="my-feedback" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        {myFeedback.map((feedback) => (
                            <FeedbackCard key={feedback.id} feedback={feedback} />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="popular" className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold">Feedback Terpopuler</h3>
                        <p className="text-sm text-muted-foreground">
                            Vote untuk mendukung feedback yang Anda setujui
                        </p>
                    </div>
                    <div className="space-y-4">
                        {popularFeedback.map((feedback) => (
                            <PopularFeedbackCard key={feedback.id} feedback={feedback} />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

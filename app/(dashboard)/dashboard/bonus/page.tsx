import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Gift,
    Wallet,
    TrendingUp,
    Users,
    Clock,
    CheckCircle2,
    ArrowRight,
    Calendar,
    Target,
    Star,
    Trophy,
    Coins,
    CreditCard,
    History,
    AlertCircle,
} from "lucide-react"

const stats = [
    { label: "Total Bonus", value: "Rp 2.500.000", icon: Wallet, color: "text-green-500", bg: "bg-green-500/10" },
    { label: "Bonus Bulan Ini", value: "Rp 350.000", icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Pending", value: "Rp 150.000", icon: Clock, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Referral Aktif", value: "12", icon: Users, color: "text-purple-500", bg: "bg-purple-500/10" },
]

const bonusPrograms = [
    {
        id: 1,
        title: "Bonus Referral Mitra",
        description: "Dapatkan bonus untuk setiap mitra baru yang Anda rekomendasikan.",
        amount: "Rp 500.000",
        type: "Per Referral",
        status: "active",
        requirements: ["Mitra baru harus membayar paket kemitraan", "Mitra baru aktif minimal 1 bulan"],
        totalEarned: "Rp 1.500.000",
        referrals: 3,
    },
    {
        id: 2,
        title: "Bonus Pendaftaran Siswa",
        description: "Bonus untuk setiap 10 siswa baru yang mendaftar.",
        amount: "Rp 100.000",
        type: "Per 10 Siswa",
        status: "active",
        requirements: ["Minimal 10 siswa baru per bulan", "Siswa aktif minimal 3 bulan"],
        totalEarned: "Rp 500.000",
        referrals: 50,
    },
    {
        id: 3,
        title: "Bonus Prestasi Bulanan",
        description: "Bonus untuk mitra dengan pertumbuhan siswa terbaik.",
        amount: "Rp 250.000",
        type: "Per Bulan",
        status: "active",
        requirements: ["Peringkat top 10 pertumbuhan siswa", "Minimal 20 siswa aktif"],
        totalEarned: "Rp 500.000",
        referrals: 2,
    },
]

const bonusHistory = [
    {
        id: 1,
        title: "Bonus Referral - Pak Ahmad",
        description: "Referral mitra baru: Bimbel YAKBA Surabaya",
        amount: "Rp 500.000",
        date: "18 Jan 2026",
        status: "completed",
        type: "referral",
    },
    {
        id: 2,
        title: "Bonus 10 Siswa Baru",
        description: "Target pendaftaran siswa tercapai",
        amount: "Rp 100.000",
        date: "15 Jan 2026",
        status: "completed",
        type: "achievement",
    },
    {
        id: 3,
        title: "Bonus Prestasi Bulanan",
        description: "Peringkat #5 pertumbuhan siswa Desember",
        amount: "Rp 250.000",
        date: "5 Jan 2026",
        status: "completed",
        type: "achievement",
    },
    {
        id: 4,
        title: "Bonus Referral - Bu Sari",
        description: "Referral mitra baru: Bimbel YAKBA Malang",
        amount: "Rp 500.000",
        date: "28 Des 2025",
        status: "completed",
        type: "referral",
    },
]

const pendingBonuses = [
    {
        id: 1,
        title: "Bonus Referral - Pak Budi",
        description: "Menunggu pembayaran paket kemitraan",
        amount: "Rp 500.000",
        date: "19 Jan 2026",
        status: "pending",
        progress: 75,
    },
    {
        id: 2,
        title: "Bonus 10 Siswa Baru",
        description: "8/10 siswa - 2 siswa lagi",
        amount: "Rp 100.000",
        date: "Ongoing",
        status: "in_progress",
        progress: 80,
    },
]

const withdrawals = [
    {
        id: 1,
        amount: "Rp 1.000.000",
        date: "10 Jan 2026",
        status: "completed",
        method: "Bank Transfer - BCA",
        accountNumber: "****4567",
    },
    {
        id: 2,
        amount: "Rp 750.000",
        date: "15 Des 2025",
        status: "completed",
        method: "Bank Transfer - Mandiri",
        accountNumber: "****8901",
    },
]

const getStatusColor = (status: string) => {
    switch (status) {
        case "completed":
            return "bg-green-500/10 text-green-600"
        case "pending":
            return "bg-orange-500/10 text-orange-600"
        case "in_progress":
            return "bg-blue-500/10 text-blue-600"
        case "active":
            return "bg-green-500/10 text-green-600"
        default:
            return "bg-muted text-muted-foreground"
    }
}

const getTypeIcon = (type: string) => {
    switch (type) {
        case "referral":
            return Users
        case "achievement":
            return Trophy
        default:
            return Gift
    }
}

function BonusProgramCard({ program }: { program: typeof bonusPrograms[0] }) {
    return (
        <Card className="overflow-hidden transition-all hover:shadow-lg">
            <div className="relative h-24 bg-linear-to-br from-[#7CBF25]/20 to-emerald-500/20 flex items-center justify-center">
                <Gift className="h-12 w-12 text-[#7CBF25]/40" />
                <div className="absolute top-2 right-2">
                    <Badge className={getStatusColor(program.status)}>
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Aktif
                    </Badge>
                </div>
            </div>
            <CardHeader className="pb-2">
                <CardTitle className="text-lg">{program.title}</CardTitle>
                <CardDescription className="text-xs">{program.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-2xl font-bold text-[#7CBF25]">{program.amount}</p>
                        <p className="text-xs text-muted-foreground">{program.type}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-medium">{program.totalEarned}</p>
                        <p className="text-xs text-muted-foreground">Total diterima</p>
                    </div>
                </div>
                <div className="space-y-2">
                    <p className="text-xs font-medium">Syarat:</p>
                    <ul className="space-y-1">
                        {program.requirements.map((req, index) => (
                            <li key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
                                <CheckCircle2 className="h-3 w-3 mt-0.5 text-[#7CBF25] shrink-0" />
                                {req}
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full bg-[#7CBF25] hover:bg-[#7CBF25]/90">
                    Lihat Detail
                    <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
            </CardFooter>
        </Card>
    )
}

function HistoryCard({ item }: { item: typeof bonusHistory[0] }) {
    const TypeIcon = getTypeIcon(item.type)

    return (
        <Card className="cursor-pointer hover:shadow-md transition-all">
            <CardContent className="flex items-center gap-4 p-4">
                <div className="rounded-full bg-[#7CBF25]/10 p-3">
                    <TypeIcon className="h-5 w-5 text-[#7CBF25]" />
                </div>
                <div className="flex-1">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                        <Calendar className="h-3 w-3 inline mr-1" />
                        {item.date}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-lg font-bold text-green-600">+{item.amount}</p>
                    <Badge className={getStatusColor(item.status)}>
                        {item.status === 'completed' ? 'Selesai' : 'Pending'}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    )
}

function PendingCard({ item }: { item: typeof pendingBonuses[0] }) {
    return (
        <Card className="border-orange-200 bg-orange-50/50">
            <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                    <Badge className={getStatusColor(item.status)}>
                        {item.status === 'pending' ? 'Pending' : 'Progress'}
                    </Badge>
                </div>
                <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                        <span>Progress</span>
                        <span>{item.progress}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                            className="h-full bg-orange-500 rounded-full transition-all"
                            style={{ width: `${item.progress}%` }}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                    <p className="font-bold text-orange-600">{item.amount}</p>
                </div>
            </CardContent>
        </Card>
    )
}

export default function BonusPage() {
    return (
        <div className="flex flex-1 flex-col gap-6 p-6">
            {/* Header Section */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Bonus
                        </h1>
                        <Badge variant="secondary" className="bg-[#7CBF25]/10 text-[#7CBF25]">
                            <Star className="h-3 w-3 mr-1 fill-current" />
                            Mitra Aktif
                        </Badge>
                    </div>
                    <p className="text-muted-foreground">
                        Kelola dan pantau bonus kemitraan Anda.
                    </p>
                </div>
                <Button className="bg-[#7CBF25] hover:bg-[#7CBF25]/90">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Tarik Bonus
                </Button>
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

            {/* Pending Alert */}
            {pendingBonuses.length > 0 && (
                <Card className="border-orange-200 bg-orange-50/50">
                    <CardContent className="flex items-center gap-4 p-4">
                        <AlertCircle className="h-5 w-5 text-orange-500" />
                        <div className="flex-1">
                            <p className="font-medium">Anda memiliki {pendingBonuses.length} bonus yang sedang diproses</p>
                            <p className="text-sm text-muted-foreground">Total: Rp 600.000 dalam proses verifikasi</p>
                        </div>
                        <Button variant="outline" size="sm">
                            Lihat Detail
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* Tabs */}
            <Tabs defaultValue="programs" className="space-y-6">
                <TabsList className="grid w-full max-w-lg grid-cols-3">
                    <TabsTrigger value="programs" className="gap-2">
                        Program Bonus
                    </TabsTrigger>
                    <TabsTrigger value="history" className="gap-2">
                        Riwayat
                        <Badge variant="secondary" className="text-xs">12</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="withdrawal" className="gap-2">
                        Penarikan
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="programs" className="space-y-6">
                    {/* Bonus Programs */}
                    <div className="grid gap-6 md:grid-cols-3">
                        {bonusPrograms.map((program) => (
                            <BonusProgramCard key={program.id} program={program} />
                        ))}
                    </div>

                    {/* Pending Bonuses */}
                    {pendingBonuses.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="font-semibold flex items-center gap-2">
                                <Clock className="h-5 w-5 text-orange-500" />
                                Bonus dalam Proses
                            </h3>
                            <div className="grid gap-4 md:grid-cols-2">
                                {pendingBonuses.map((item) => (
                                    <PendingCard key={item.id} item={item} />
                                ))}
                            </div>
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="history" className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold">Riwayat Bonus</h3>
                        <Button variant="ghost" size="sm">
                            <History className="h-4 w-4 mr-2" />
                            Lihat Semua
                        </Button>
                    </div>
                    <div className="space-y-3">
                        {bonusHistory.map((item) => (
                            <HistoryCard key={item.id} item={item} />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="withdrawal" className="space-y-6">
                    {/* Balance Card */}
                    <Card className="bg-linear-to-br from-[#7CBF25] to-emerald-600 text-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm opacity-80">Saldo Tersedia</p>
                                    <p className="text-3xl font-bold">Rp 750.000</p>
                                </div>
                                <Button variant="secondary" className="bg-white text-[#7CBF25] hover:bg-white/90">
                                    <CreditCard className="h-4 w-4 mr-2" />
                                    Tarik Sekarang
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Withdrawal History */}
                    <div className="space-y-4">
                        <h3 className="font-semibold">Riwayat Penarikan</h3>
                        {withdrawals.map((item) => (
                            <Card key={item.id}>
                                <CardContent className="flex items-center gap-4 p-4">
                                    <div className="rounded-full bg-green-500/10 p-3">
                                        <CreditCard className="h-5 w-5 text-green-500" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium">{item.amount}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {item.method} • {item.accountNumber}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <Badge className={getStatusColor(item.status)}>
                                            <CheckCircle2 className="h-3 w-3 mr-1" />
                                            Selesai
                                        </Badge>
                                        <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

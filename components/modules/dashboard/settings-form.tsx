"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import {
    Loader2,
    Moon,
    Save,
    Sun,
    User,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Skeleton } from "@/components/ui/skeleton"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function SettingsForm() {
    const [loading, setLoading] = useState(true)
    const [savingProfile, setSavingProfile] = useState(false)
    const [savingPassword, setSavingPassword] = useState(false)

    const [profile, setProfile] = useState({ name: "", email: "" })
    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    })

    const [appearance, setAppearance] = useState({
        theme: typeof window !== "undefined" && document.documentElement.classList.contains("dark") ? "dark" : "light",
    })

    const [notifications, setNotifications] = useState({
        emailNotif: true,
        orderNotif: true,
        productNotif: false,
    })

    // Fetch profile on mount
    useEffect(() => {
        async function fetchProfile() {
            try {
                const res = await fetch("/api/settings/profile")
                const json = await res.json()
                if (res.ok && json.data) {
                    setProfile({
                        name: json.data.name ?? "",
                        email: json.data.email ?? "",
                    })
                }
            } catch {
                toast.error("Gagal memuat data profil")
            } finally {
                setLoading(false)
            }
        }
        fetchProfile()
    }, [])

    async function handleSaveProfile() {
        if (!profile.name || !profile.email) {
            toast.error("Nama dan email wajib diisi.")
            return
        }
        setSavingProfile(true)
        try {
            const res = await fetch("/api/settings/profile", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(profile),
            })
            const json = await res.json()
            if (!res.ok) throw new Error(json.error)
            toast.success("Profil berhasil disimpan")
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Gagal menyimpan profil")
        } finally {
            setSavingProfile(false)
        }
    }

    async function handleChangePassword() {
        const { currentPassword, newPassword, confirmPassword } = passwords
        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.error("Semua field password wajib diisi.")
            return
        }
        if (newPassword !== confirmPassword) {
            toast.error("Password baru dan konfirmasi tidak cocok.")
            return
        }
        if (newPassword.length < 8) {
            toast.error("Password baru minimal 8 karakter.")
            return
        }
        setSavingPassword(true)
        try {
            const res = await fetch("/api/settings/password", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(passwords),
            })
            const json = await res.json()
            if (!res.ok) throw new Error(json.error)
            toast.success("Password berhasil diubah")
            setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" })
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Gagal mengubah password")
        } finally {
            setSavingPassword(false)
        }
    }

    function handleThemeChange(theme: string) {
        setAppearance({ theme })
        if (theme === "dark") {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
        localStorage.setItem("theme", theme)
        toast.success(`Tema diubah ke ${theme === "dark" ? "Gelap" : "Terang"}`)
    }

    return (
        <Tabs defaultValue="profile" className="space-y-6">
            <TabsList>
                <TabsTrigger value="profile" className="cursor-pointer">
                    <User className="size-4" />
                    Profil
                </TabsTrigger>
                <TabsTrigger value="appearance" className="cursor-pointer">
                    <Sun className="size-4" />
                    Tampilan
                </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Profil</CardTitle>
                        <CardDescription>
                            Perbarui informasi profil Anda.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {loading ? (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Skeleton className="h-4 w-16" />
                                    <Skeleton className="h-9 w-full" />
                                </div>
                                <div className="grid gap-2">
                                    <Skeleton className="h-4 w-16" />
                                    <Skeleton className="h-9 w-full" />
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Nama</Label>
                                        <Input
                                            id="name"
                                            placeholder="Nama Anda"
                                            value={profile.name}
                                            onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="email@example.com"
                                            value={profile.email}
                                            onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <Button onClick={handleSaveProfile} disabled={savingProfile} className="cursor-pointer">
                                        {savingProfile ? <Loader2 className="size-4 mr-2 animate-spin" /> : <Save className="size-4 mr-2" />}
                                        Simpan Profil
                                    </Button>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Ubah Password</CardTitle>
                        <CardDescription>
                            Pastikan password baru Anda cukup kuat (minimal 8 karakter).
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="currentPassword">Password Saat Ini</Label>
                            <Input
                                id="currentPassword"
                                type="password"
                                placeholder="••••••••"
                                value={passwords.currentPassword}
                                onChange={(e) => setPasswords((p) => ({ ...p, currentPassword: e.target.value }))}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="newPassword">Password Baru</Label>
                                <Input
                                    id="newPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    value={passwords.newPassword}
                                    onChange={(e) => setPasswords((p) => ({ ...p, newPassword: e.target.value }))}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    value={passwords.confirmPassword}
                                    onChange={(e) => setPasswords((p) => ({ ...p, confirmPassword: e.target.value }))}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button
                                variant="outline"
                                className="cursor-pointer"
                                onClick={handleChangePassword}
                                disabled={savingPassword}
                            >
                                {savingPassword ? <Loader2 className="size-4 mr-2 animate-spin" /> : <Save className="size-4 mr-2" />}
                                Ubah Password
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Tema</CardTitle>
                        <CardDescription>
                            Sesuaikan tampilan dashboard Anda.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => handleThemeChange("light")}
                                className={`relative flex flex-col items-center gap-3 rounded-xl border-2 p-6 transition-all cursor-pointer ${appearance.theme === "light"
                                    ? "border-primary bg-primary/5 shadow-sm"
                                    : "border-muted hover:border-muted-foreground/30"
                                    }`}
                            >
                                <div className="flex size-12 items-center justify-center rounded-full bg-amber-100">
                                    <Sun className="size-6 text-amber-600" />
                                </div>
                                <div className="text-center">
                                    <p className="font-medium">Terang</p>
                                    <p className="text-xs text-muted-foreground">Tampilan cerah dan bersih</p>
                                </div>
                            </button>
                            <button
                                type="button"
                                onClick={() => handleThemeChange("dark")}
                                className={`relative flex flex-col items-center gap-3 rounded-xl border-2 p-6 transition-all cursor-pointer ${appearance.theme === "dark"
                                    ? "border-primary bg-primary/5 shadow-sm"
                                    : "border-muted hover:border-muted-foreground/30"
                                    }`}
                            >
                                <div className="flex size-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
                                    <Moon className="size-6 text-indigo-600 dark:text-indigo-300" />
                                </div>
                                <div className="text-center">
                                    <p className="font-medium">Gelap</p>
                                    <p className="text-xs text-muted-foreground">Nyaman untuk mata di malam hari</p>
                                </div>
                            </button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Notifikasi</CardTitle>
                        <CardDescription>
                            Atur preferensi notifikasi Anda.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <div>
                                <p className="font-medium text-sm">Notifikasi Email</p>
                                <p className="text-xs text-muted-foreground">Terima pemberitahuan via email</p>
                            </div>
                            <Switch
                                checked={notifications.emailNotif}
                                onCheckedChange={(v) => setNotifications((n) => ({ ...n, emailNotif: v }))}
                            />
                        </div>
                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <div>
                                <p className="font-medium text-sm">Order Baru</p>
                                <p className="text-xs text-muted-foreground">Notifikasi saat ada order masuk</p>
                            </div>
                            <Switch
                                checked={notifications.orderNotif}
                                onCheckedChange={(v) => setNotifications((n) => ({ ...n, orderNotif: v }))}
                            />
                        </div>
                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <div>
                                <p className="font-medium text-sm">Update Produk</p>
                                <p className="text-xs text-muted-foreground">Notifikasi saat produk diperbarui</p>
                            </div>
                            <Switch
                                checked={notifications.productNotif}
                                onCheckedChange={(v) => setNotifications((n) => ({ ...n, productNotif: v }))}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Bahasa & Regional</CardTitle>
                        <CardDescription>
                            Atur preferensi bahasa dan zona waktu.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label>Bahasa</Label>
                                <Select defaultValue="id">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="id">Bahasa Indonesia</SelectItem>
                                        <SelectItem value="en">English</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label>Zona Waktu</Label>
                                <Select defaultValue="wib">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="wib">WIB (UTC+7)</SelectItem>
                                        <SelectItem value="wita">WITA (UTC+8)</SelectItem>
                                        <SelectItem value="wit">WIT (UTC+9)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}

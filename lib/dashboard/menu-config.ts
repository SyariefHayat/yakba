import {
    Home,
    GraduationCap,
    Video,
    BookOpen,
    FileText,
    ClipboardList,
    Award,
    Image,
    Megaphone,
    Briefcase,
    Gift,
    Users,
    Settings,
    LifeBuoy,
    Send,
} from "lucide-react"
import { NavMainItem, NavSecondaryItem, Role } from "./types"

// ============================================
// Helper: Check if menu is visible for role
// ============================================
export function filterMenuByRole<T extends { roles: Role[] }>(
    items: T[],
    userRole: Role
): T[] {
    return items.filter((item) => item.roles.includes(userRole))
}

// ============================================
// Main Navigation Menu
// ============================================
export const navMainItems: NavMainItem[] = [
    {
        title: "Home",
        url: "/dashboard",
        icon: Home,
        isActive: true,
        roles: ["super_admin", "admin", "mitra"],
    },
    {
        title: "Bimbel YAKBA",
        url: "/dashboard/bimbel",
        icon: GraduationCap,
        roles: ["super_admin", "admin", "mitra"],
        items: [
            { title: "Tentang Bimbel", url: "/dashboard/bimbel" },
            { title: "Program", url: "/dashboard/bimbel/program" },
        ],
    },
    {
        title: "Video",
        url: "/dashboard/video",
        icon: Video,
        roles: ["super_admin", "admin", "mitra"],
        items: [
            { title: "Video Tutorial", url: "/dashboard/video" },
            { title: "Video Pembelajaran", url: "/dashboard/video/pembelajaran" },
        ],
    },
    {
        title: "Modul Bimbel",
        url: "/dashboard/modul",
        icon: BookOpen,
        roles: ["super_admin", "admin", "mitra"],
        items: [
            { title: "Semua Modul", url: "/dashboard/modul" },
            { title: "SD", url: "/dashboard/modul/sd" },
            { title: "SMP", url: "/dashboard/modul/smp" },
            { title: "SMA", url: "/dashboard/modul/sma" },
        ],
    },
    {
        title: "Kurikulum",
        url: "/dashboard/kurikulum",
        icon: FileText,
        roles: ["super_admin", "admin", "mitra"],
    },
    {
        title: "Bahan Ajar",
        url: "/dashboard/bahan-ajar",
        icon: ClipboardList,
        roles: ["super_admin", "admin", "mitra"],
    },
    {
        title: "LKPD",
        url: "/dashboard/lkpd",
        icon: ClipboardList,
        roles: ["super_admin", "admin", "mitra"],
    },
    {
        title: "Sertifikat",
        url: "/dashboard/sertifikat",
        icon: Award,
        roles: ["super_admin", "admin", "mitra"],
    },
    {
        title: "Banner",
        url: "/dashboard/banner",
        icon: Image,
        roles: ["super_admin", "admin", "mitra"],
    },
    {
        title: "Marketing Kit",
        url: "/dashboard/marketing-kit",
        icon: Megaphone,
        roles: ["super_admin", "admin", "mitra"],
    },
    {
        title: "Administrasi",
        url: "/dashboard/administrasi",
        icon: Briefcase,
        roles: ["super_admin", "admin", "mitra"],
    },
    {
        title: "Bonus",
        url: "/dashboard/bonus",
        icon: Gift,
        roles: ["super_admin", "admin", "mitra"],
    },
    {
        title: "User Management",
        url: "/dashboard/users",
        icon: Users,
        roles: ["super_admin", "admin"], // Only admin and super_admin
        items: [
            { title: "Semua User", url: "/dashboard/users" },
            { title: "Tambah User", url: "/dashboard/users/create", roles: ["super_admin"] },
        ],
    },
    {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
        roles: ["super_admin"], // Only super_admin
        items: [
            { title: "General", url: "/dashboard/settings" },
            { title: "Branding", url: "/dashboard/settings/branding" },
        ],
    },
]

// ============================================
// Secondary Navigation (Footer)
// ============================================
export const navSecondaryItems: NavSecondaryItem[] = [
    {
        title: "Support",
        url: "/dashboard/support",
        icon: LifeBuoy,
        roles: ["super_admin", "admin", "mitra"],
    },
    {
        title: "Feedback",
        url: "/dashboard/feedback",
        icon: Send,
        roles: ["super_admin", "admin", "mitra"],
    },
]

// ============================================
// Get filtered menu for specific role
// ============================================
export function getMenuForRole(role: Role) {
    return {
        navMain: filterMenuByRole(navMainItems, role),
        navSecondary: filterMenuByRole(navSecondaryItems, role),
    }
}

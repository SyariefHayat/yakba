import { LucideIcon } from "lucide-react"

// ============================================
// Role Types
// ============================================
export type Role = "super_admin" | "admin" | "mitra"

// ============================================
// Menu Item Types
// ============================================
export interface NavMainItem {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
    roles: Role[] // Which roles can see this menu
    items?: {
        title: string
        url: string
        roles?: Role[] // Optional sub-item role filtering
    }[]
}

export interface NavSecondaryItem {
    title: string
    url: string
    icon: LucideIcon
    roles: Role[]
}

export interface UserData {
    name: string
    email: string
    avatar: string
    role: Role
}

// ============================================
// Sidebar Data Structure
// ============================================
export interface SidebarData {
    user: UserData
    navMain: NavMainItem[]
    navSecondary: NavSecondaryItem[]
}

"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"
import { getMenuForRole, Role, UserData } from "@/lib/dashboard"

// Mock user data - replace with actual auth data later
const mockUser: UserData = {
    name: "Mitra YAKBA",
    email: "mitra@yakba.com",
    avatar: "/avatars/user.jpg",
    role: "mitra", // Change this to test different roles: "super_admin" | "admin" | "mitra"
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
    userRole?: Role
}

export function AppSidebar({ userRole = mockUser.role, ...props }: AppSidebarProps) {
    // Get filtered menu based on user role
    const { navMain, navSecondary } = getMenuForRole(userRole)

    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-[#7CBF25]">
                                    <span className="text-white font-bold text-sm">Y</span>
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">YAKBA</span>
                                    <span className="truncate text-xs capitalize">{userRole.replace("_", " ")}</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navMain} />
                <NavSecondary items={navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={{ ...mockUser, role: userRole }} />
            </SidebarFooter>
        </Sidebar>
    )
}

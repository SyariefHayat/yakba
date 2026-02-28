"use client"

import * as React from "react"

import {
    FolderTree,
    LayoutDashboard,
    Package,
    Receipt,
    Settings2,
    Users,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

import Image from "next/image"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { YAKBA_LETTERS } from "@/lib/constants"

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboard,
            isActive: true,
        },
        {
            title: "Users",
            url: "/dashboard/users",
            icon: Users,
        },
        {
            title: "Products",
            url: "/dashboard/products",
            icon: Package,
        },
        {
            title: "Categories",
            url: "/dashboard/categories",
            icon: FolderTree,
        },
        {
            title: "Orders",
            url: "/dashboard/orders",
            icon: Receipt,
        },
        {
            title: "Settings",
            url: "/dashboard/settings",
            icon: Settings2,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="/dashboard">
                                <Image src="/logo.png" alt="Logo YAKBA" width={100} height={100} className="w-10 h-10" />
                                <div className="flex flex-col flex-1 text-left leading-tight">
                                    <span className="font-mochi-boom text-3xl mt-1">
                                        {YAKBA_LETTERS.map(({ letter, color }, index) => (
                                            <span key={index} style={{ color }}>
                                                {letter}
                                            </span>
                                        ))}
                                    </span>
                                    <span className="truncate text-xs text-muted-foreground -mt-2 ml-1">Learning Center</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    )
}

"use client";

import * as React from "react";

import {
  LifeBuoy,
  LayoutDashboard,
  FileText,
  NotebookText,
  GraduationCap,
  Briefcase,
  Package,
  Calendar,
  MessageSquare,
  Users,
  Image as ImageIcon,
  BarChart3,
  Cog,
  Command,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { NavContent } from "./nav-content";
import { NavSecondary } from "./nav-secondary";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: LayoutDashboard,
    },
  ],
  contents: [
    {
      title: "Halaman",
      url: "#",
      icon: FileText,
      isActive: false,
      items: [
        { title: "Tentang Kami", url: "/admin/tentang-kami" },
        // { title: "Fasilitas", url: "/admin/fasilitas" },
        { title: "Peluang Usaha", url: "/admin/peluang-usaha" },
      ],
    },
    {
      title: "Blog",
      url: "#",
      icon: NotebookText,
      items: [
        { title: "Semua Artikel", url: "/admin/blog" },
        { title: "Buat Artikel", url: "/admin/blog/new" },
        { title: "Kategori", url: "/admin/blog/kategori" },
      ],
    },
    {
      title: "Program Belajar",
      url: "#",
      icon: GraduationCap,
      items: [
        { title: "Program Offline", url: "/admin/program/offline" },
        { title: "Program Online", url: "/admin/program/online" },
        { title: "Jadwal Kelas", url: "/admin/program/jadwal" },
        { title: "Pendaftar", url: "/admin/program/pendaftar" },
      ],
    },
    {
      title: "Event & Promosi",
      url: "#",
      icon: Calendar,
      items: [
        { title: "Semua Event", url: "/admin/event" },
        { title: "Tambah Event", url: "/admin/event/new" },
        { title: "Promo", url: "/admin/event/promo" },
      ],
    },
    {
      title: "Produk Digital",
      url: "#",
      icon: Package,
      items: [
        { title: "List Produk", url: "/admin/produk" },
        { title: "Tambah Produk", url: "/admin/produk/new" },
        { title: "Penjualan", url: "/admin/produk/penjualan" },
      ],
    },
  ],
  operational: [
    {
      title: "Lowongan Tentor",
      url: "#",
      icon: Briefcase,
      isActive: false,
      items: [
        { title: "List Lowongan", url: "/admin/karir" },
        { title: "Pelamar", url: "/admin/karir/pelamar" },
      ],
    },
    {
      title: "Lead / Pesan Masuk",
      url: "#",
      icon: MessageSquare,
      items: [
        { title: "Semua Pesan", url: "/admin/pesan" },
        { title: "Belum Ditangani", url: "/admin/pesan/pending" },
      ],
    },
    {
      title: "Media Manager",
      url: "#",
      icon: ImageIcon,
      items: [
        { title: "Semua Media", url: "/admin/media" },
        { title: "Upload Baru", url: "/admin/media/upload" },
      ],
    },
  ],
  system: [
    {
      title: "User Management",
      url: "#",
      icon: Users,
      isActive: false,
      items: [
        { title: "Admin", url: "/admin/users/admin" },
        { title: "Guru / Tentor", url: "/admin/users/guru" },
        { title: "Role & Permission", url: "/admin/users/role" },
      ],
    },
    {
      title: "Report & Analytics",
      url: "#",
      icon: BarChart3,
      items: [
        { title: "Penjualan", url: "/admin/report/penjualan" },
        { title: "Pendaftar", url: "/admin/report/pendaftar" },
        { title: "Traffic Website", url: "/admin/report/traffic" },
      ],
    },
    {
      title: "Pengaturan",
      url: "#",
      icon: Cog,
      items: [
        { title: "General", url: "/admin/settings/general" },
        { title: "Branding", url: "/admin/settings/branding" },
        { title: "Integrasi API", url: "/admin/settings/integrasi" },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Bantuan",
      url: "/admin/help",
      icon: LifeBuoy,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavContent label="Manajemen Konten" contents={data.contents} />
        <NavContent label="Operasional" contents={data.operational} />
        <NavContent label="Sistem" contents={data.system} />
        <NavSecondary items={data.navSecondary} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}

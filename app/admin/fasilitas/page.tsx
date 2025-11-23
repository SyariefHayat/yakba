"use client";

import { useState } from "react";
import { Plus, Wifi, School, Globe, Laptop, Edit2, Trash2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

type FacilityType = "online" | "offline";

type Facility = {
  id: string;
  name: string;
  type: FacilityType;
  location?: string;
  description: string;
  isActive: boolean;
};

const initialFacilities: Facility[] = [
  {
    id: "1",
    name: "Ruang Kelas Ceria",
    type: "offline",
    location: "Gedung A - Lantai 1",
    description:
      "Ruang kelas dengan dekorasi warna-warni dan fasilitas belajar anak.",
    isActive: true,
  },
  {
    id: "2",
    name: "Kelas Online Zoom Interaktif",
    type: "online",
    description:
      "Kelas online via Zoom dengan guru live dan materi interaktif.",
    isActive: true,
  },
  {
    id: "3",
    name: "Ruang Bermain Outdoor",
    type: "offline",
    location: "Halaman Depan",
    description: "Area bermain anak dengan permainan motorik kasar yang aman.",
    isActive: false,
  },
];

const Page = () => {
  const [facilities] = useState<Facility[]>(initialFacilities);

  return (
    <div className="p-4 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Fasilitas</h1>
          <p className="text-muted-foreground">
            Kelola fasilitas online & offline yang ditampilkan di website.
          </p>
        </div>
        <Button className="mt-2 sm:mt-0 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Tambah Fasilitas
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tambah / Edit Fasilitas</CardTitle>
          <CardDescription>
            Isi data fasilitas baru atau update fasilitas yang sudah ada.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Nama Fasilitas</label>
              <Input placeholder="Contoh: Ruang Kelas Ceria" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Tipe</label>
                <Select defaultValue="offline">
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih tipe fasilitas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="offline">
                      <div className="flex items-center gap-2">
                        <School className="w-4 h-4" />
                        Offline
                      </div>
                    </SelectItem>
                    <SelectItem value="online">
                      <div className="flex items-center gap-2">
                        <Wifi className="w-4 h-4" />
                        Online
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between gap-2 pt-6">
                <span className="text-sm">Tampilkan di website</span>
                <Switch defaultChecked />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">
                Lokasi (untuk fasilitas offline)
              </label>
              <Input placeholder="Contoh: Gedung A - Lantai 1" />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Deskripsi</label>
              <Textarea
                className="min-h-[120px]"
                placeholder="Tuliskan penjelasan singkat tentang fasilitas ini..."
              />
            </div>

            <div>
              <label className="text-sm font-medium">Icon / Highlight</label>
              <div className="flex flex-wrap gap-2 mt-1">
                <Badge variant="outline" className="flex items-center gap-1">
                  <School className="w-3 h-3" />
                  Kelas
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Laptop className="w-3 h-3" />
                  Online
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  Global
                </Badge>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline">Batal</Button>
              <Button>Simpan Fasilitas</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Fasilitas</CardTitle>
          <CardDescription>
            Fasilitas yang saat ini terdaftar di sistem.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {facilities.map((facility) => (
            <div
              key={facility.id}
              className="flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{facility.name}</span>
                  {facility.type === "online" ? (
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Wifi className="w-3 h-3" /> Online
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <School className="w-3 h-3" /> Offline
                    </Badge>
                  )}
                  {facility.isActive ? (
                    <Badge className="bg-emerald-500 text-white hover:bg-emerald-500">
                      Aktif
                    </Badge>
                  ) : (
                    <Badge variant="outline">Tidak Aktif</Badge>
                  )}
                </div>
                {facility.location && (
                  <p className="text-xs text-muted-foreground">
                    Lokasi: {facility.location}
                  </p>
                )}
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {facility.description}
                </p>
              </div>

              <div className="flex gap-2 pt-2 sm:pt-0">
                <Button variant="outline" size="icon">
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="destructive" size="icon">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;

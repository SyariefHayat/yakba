"use client";

import { useState } from "react";

import {
  Briefcase,
  Users,
  Wallet,
  Globe,
  Plus,
  Edit2,
  Trash2,
  Link as LinkIcon,
  CheckCircle2,
  XCircle,
} from "lucide-react";

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

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type OpportunityType = "kemitraan" | "reseller" | "tentor" | "affiliate";

type Opportunity = {
  id: string;
  name: string;
  type: OpportunityType;
  commission: string;
  investment?: string;
  description: string;
  isActive: boolean;
  targetArea?: string;
  link?: string;
};

const initialOpportunities: Opportunity[] = [
  {
    id: "1",
    name: "Kemitraan Yakba Learning Center",
    type: "kemitraan",
    commission: "Bagi hasil 40% - 60%",
    investment: "Mulai dari 25 juta",
    description:
      "Program kemitraan untuk membuka cabang Yakba Learning Center di kota Anda.",
    isActive: true,
    targetArea: "Kota/Kabupaten di Jawa Timur",
    link: "https://yakba-contoh.com/kemitraan",
  },
  {
    id: "2",
    name: "Reseller Produk Digital",
    type: "reseller",
    commission: "Komisi 25% per produk",
    investment: "Tanpa biaya pendaftaran",
    description:
      "Jadilah reseller buku bergambar & worksheet Yakba secara online.",
    isActive: true,
    targetArea: "Seluruh Indonesia (online)",
    link: "https://yakba-contoh.com/reseller",
  },
  {
    id: "3",
    name: "Tentor Freelancer",
    type: "tentor",
    commission: "Fee per jam mengajar",
    investment: undefined,
    description:
      "Kesempatan menjadi tentor freelance untuk kelas online dan offline.",
    isActive: false,
    targetArea: "Domisili Surabaya & sekitarnya",
  },
];

const Page = () => {
  const [opportunities] = useState<Opportunity[]>(initialOpportunities);

  return (
    <div className="p-4 flex flex-col gap-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-primary" />
            Peluang Usaha
          </h1>
          <p className="text-muted-foreground">
            Kelola informasi peluang kemitraan, reseller, affiliate, dan tentor.
          </p>
        </div>
        <Button className="mt-2 sm:mt-0 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Tambah Peluang
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tambah / Edit Peluang Usaha</CardTitle>
          <CardDescription>
            Isi detail peluang usaha yang akan ditampilkan di halaman website.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Nama Program</label>
              <Input placeholder="Contoh: Kemitraan Yakba Learning Center" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Tipe Peluang</label>
                <Select defaultValue="kemitraan">
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih tipe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kemitraan">
                      Kemitraan / Franchise
                    </SelectItem>
                    <SelectItem value="reseller">Reseller Produk</SelectItem>
                    <SelectItem value="affiliate">
                      Affiliate / Referal
                    </SelectItem>
                    <SelectItem value="tentor">Tentor / Pengajar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between gap-2 pt-6">
                <span className="text-sm">Status aktif</span>
                <Switch defaultChecked />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Skema Komisi</label>
              <Input placeholder="Contoh: Komisi 25% per transaksi" />
            </div>

            <div>
              <label className="text-sm font-medium">
                Minimal Investasi (opsional)
              </label>
              <Input placeholder="Contoh: Mulai dari 10 juta" />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">
                Area / Target Wilayah
              </label>
              <Input placeholder="Contoh: Seluruh Indonesia / Jawa Timur / Online" />
            </div>

            <div>
              <label className="text-sm font-medium">
                Link Info Detail (opsional)
              </label>
              <Input placeholder="Contoh: https://yakba.com/peluang-usaha" />
            </div>

            <div>
              <label className="text-sm font-medium">Deskripsi Program</label>
              <Textarea
                className="min-h-[120px]"
                placeholder="Jelaskan secara singkat tentang peluang usaha ini, benefit, dan syarat utamanya..."
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline">Batal</Button>
              <Button>Simpan Peluang</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              Total Peluang Aktif
            </CardTitle>
            <CardDescription>Peluang yang saat ini dibuka</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {opportunities.filter((o) => o.isActive).length}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Wallet className="w-4 h-4 text-primary" />
              Tipe Kemitraan & Reseller
            </CardTitle>
            <CardDescription>Program yang menghasilkan komisi</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {
              opportunities.filter((o) =>
                ["kemitraan", "reseller", "affiliate"].includes(o.type)
              ).length
            }
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              Skala Jangkauan
            </CardTitle>
            <CardDescription>Contoh target wilayah peluang</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1 text-sm text-muted-foreground">
            <p>• Kota / Kabupaten tertentu</p>
            <p>• Online seluruh Indonesia</p>
            <p>• Domisili tentor sekitar lokasi</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Peluang Usaha</CardTitle>
          <CardDescription>
            Semua peluang usaha yang tersedia untuk mitra, reseller, atau
            tentor.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {opportunities.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold">{item.name}</span>

                  <Badge variant="outline" className="flex items-center gap-1">
                    <Briefcase className="w-3 h-3" />
                    {item.type === "kemitraan"
                      ? "Kemitraan"
                      : item.type === "reseller"
                      ? "Reseller"
                      : item.type === "affiliate"
                      ? "Affiliate"
                      : "Tentor"}
                  </Badge>

                  {item.isActive ? (
                    <Badge className="flex items-center gap-1 bg-emerald-500 text-white hover:bg-emerald-500">
                      <CheckCircle2 className="w-3 h-3" />
                      Aktif
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 text-muted-foreground"
                    >
                      <XCircle className="w-3 h-3" />
                      Ditutup
                    </Badge>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  {item.commission && <span>Komisi: {item.commission}</span>}
                  {item.investment && (
                    <span className="border-l pl-3">
                      Investasi: {item.investment}
                    </span>
                  )}
                </div>

                {item.targetArea && (
                  <p className="text-xs text-muted-foreground">
                    Area: {item.targetArea}
                  </p>
                )}

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {item.description}
                </p>

                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    <LinkIcon className="w-3 h-3" />
                    Lihat halaman informasi
                  </a>
                )}
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

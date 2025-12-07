"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Plus, MoreHorizontal, Pencil, Eye } from "lucide-react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ProgramType = "online" | "offline" | "hybrid";

type Program = {
  _id: string;
  name: string;
  slug: string;
  type: ProgramType;
  level?: string;
  ageMin?: number;
  ageMax?: number;
  shortDescription?: string;
  price?: number;
  discountPrice?: number | null;
  billingPeriod?: "once" | "monthly";
  isActive: boolean;
  isFeatured?: boolean;
  thumbnailUrl?: string;
  createdAt?: string;
};

const Page = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [filtered, setFiltered] = useState<Program[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const res = await fetch("/api/programs?type=offline");
        if (!res.ok) {
          throw new Error("Gagal mengambil data program offline");
        }

        const data: Program[] = await res.json();
        const offlineOnly = data.filter((p) => p.type === "offline");
        setPrograms(offlineOnly);
        setFiltered(offlineOnly);
      } catch (err) {
        const e = err as Error;
        setErrorMessage(e.message || "Terjadi kesalahan saat memuat data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      programs.filter((p) => {
        const name = p.name.toLowerCase();
        const level = (p.level || "").toLowerCase();
        return name.includes(q) || level.includes(q);
      })
    );
  }, [search, programs]);

  const formatCurrency = (value?: number | null) => {
    if (!value) return "Rp 0";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatAgeRange = (min?: number, max?: number) => {
    if (!min && !max) return "-";
    if (min && max) return `${min}–${max} tahun`;
    if (min) return `≥ ${min} tahun`;
    if (max) return `≤ ${max} tahun`;
    return "-";
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Program Offline</h1>
          <p className="text-sm text-muted-foreground">
            Kelola program belajar tatap muka (offline) yang tersedia di Yakba.
          </p>
        </div>

        <Button asChild className="gap-2">
          <Link href="/admin/program/offline/new">
            <Plus className="w-4 h-4" />
            Tambah Program Offline
          </Link>
        </Button>
      </div>

      {/* Search & info */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Cari program offline (nama / level)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-72"
          />
          {search && (
            <Button variant="ghost" size="sm" onClick={() => setSearch("")}>
              Clear
            </Button>
          )}
        </div>
        <div className="text-sm text-muted-foreground">
          Total: <span className="font-medium">{filtered.length}</span> program
        </div>
      </div>

      {errorMessage && (
        <div className="text-sm text-red-600">{errorMessage}</div>
      )}
      {isLoading && (
        <div className="text-sm text-muted-foreground">
          Memuat data program offline...
        </div>
      )}

      {!isLoading && !errorMessage && (
        <Table>
          <TableCaption>
            Daftar semua program belajar offline yang aktif di sistem.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Program</TableHead>
              <TableHead className="hidden md:table-cell">
                Level & Usia
              </TableHead>
              <TableHead>Harga</TableHead>
              <TableHead className="hidden md:table-cell">Periode</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-20 text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-sm">
                  Belum ada program offline.
                </TableCell>
              </TableRow>
            )}

            {filtered.map((program) => (
              <TableRow key={program._id}>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-medium line-clamp-1">
                      {program.name}
                    </span>
                    {program.shortDescription && (
                      <span className="text-xs text-muted-foreground line-clamp-1">
                        {program.shortDescription}
                      </span>
                    )}
                  </div>
                </TableCell>

                <TableCell className="hidden md:table-cell">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm">
                      {program.level || "Level tidak diatur"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatAgeRange(program.ageMin, program.ageMax)}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">
                      {program.discountPrice
                        ? formatCurrency(program.discountPrice)
                        : formatCurrency(program.price)}
                    </span>
                    {program.discountPrice && (
                      <span className="text-xs line-through text-muted-foreground">
                        {formatCurrency(program.price)}
                      </span>
                    )}
                  </div>
                </TableCell>

                <TableCell className="hidden md:table-cell">
                  {program.billingPeriod === "once"
                    ? "Sekali bayar"
                    : "Bulanan"}
                </TableCell>

                <TableCell>
                  <div className="flex flex-col gap-1">
                    <Badge
                      variant={program.isActive ? "default" : "outline"}
                      className="w-fit"
                    >
                      {program.isActive ? "Aktif" : "Nonaktif"}
                    </Badge>
                    {program.isFeatured && (
                      <span className="text-[10px] text-amber-600">
                        Ditampilkan di highlight
                      </span>
                    )}
                  </div>
                </TableCell>

                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/program/offline/${program._id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          Detail / Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        disabled
                        className="text-muted-foreground"
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit Cepat (coming soon)
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Page;

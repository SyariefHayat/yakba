"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MoreHorizontal, Pencil, Trash2, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Article = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  thumbnailUrl?: string;
  tags?: string[];
  author?: string;
  createdAt?: string;
};

const getInitials = (name?: string) => {
  if (!name) return "?";
  return name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0]?.toUpperCase())
    .join("")
    .slice(0, 2);
};

const Page = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filtered, setFiltered] = useState<Article[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/article");
        if (!res.ok) {
          throw new Error("Gagal mengambil daftar artikel");
        }
        const data: Article[] = await res.json();
        setArticles(data);
        setFiltered(data);
      } catch (err) {
        const e = err as Error;
        setErrorMessage(e.message || "Terjadi kesalahan saat memuat artikel");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(articles.filter((a) => a.title.toLowerCase().includes(q)));
  }, [search, articles]);

  const handleDelete = async (id: string) => {
    const ok = window.confirm("Yakin ingin menghapus artikel ini?");
    if (!ok) return;

    try {
      setIsDeleting(id);
      const res = await fetch(`/api/article/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Gagal menghapus artikel");
      }

      setArticles((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      const e = err as Error;
      alert(e.message || "Terjadi kesalahan saat menghapus artikel");
    } finally {
      setIsDeleting(null);
    }
  };

  const formatDate = (value?: string) => {
    if (!value) return "-";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "-";
    return d.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Semua Artikel</h1>
          <p className="text-sm text-muted-foreground">
            Kelola artikel blog yang tampil di landing page.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Cari judul artikel..."
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

        <Button asChild className="gap-2">
          <Link href="/admin/blog/new">
            <Plus className="w-4 h-4" />
            Buat Artikel
          </Link>
        </Button>
      </div>

      {errorMessage && (
        <div className="text-sm text-red-600">{errorMessage}</div>
      )}
      {isLoading && (
        <div className="text-sm text-muted-foreground">
          Memuat daftar artikel...
        </div>
      )}

      {!isLoading && !errorMessage && (
        <>
          {filtered.length === 0 ? (
            <div className="text-sm text-center text-muted-foreground">
              Belum ada artikel.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((article) => (
                <Card
                  key={article._id}
                  className="flex flex-col items-start justify-between p-3"
                >
                  <div className="flex w-full items-start justify-between gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/blog/${article._id}`}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDelete(article._id)}
                          disabled={isDeleting === article._id}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          {isDeleting === article._id
                            ? "Menghapus..."
                            : "Hapus"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <figure className="mt-3 w-full overflow-hidden rounded-xl aspect-video bg-muted">
                    {article.thumbnailUrl ? (
                      <Image
                        src={article.thumbnailUrl}
                        alt={article.title}
                        className="w-full h-full object-cover object-center"
                        width={640}
                        height={360}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                        Tidak ada gambar
                      </div>
                    )}
                  </figure>

                  <div className="mt-3 w-full">
                    <Link href={`/blog/${article.slug || "#"}`}>
                      <h3 className="text-lg font-semibold line-clamp-2">
                        {article.title}
                      </h3>
                    </Link>
                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                      {article.excerpt ||
                        "Belum ada ringkasan untuk artikel ini."}
                    </p>

                    {article.tags && article.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {article.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-[10px]"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {article.tags.length > 3 && (
                          <span className="text-[10px] text-muted-foreground">
                            +{article.tags.length - 3} lagi
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex w-full items-center justify-between gap-3">
                    <div className="flex items-center gap-x-3">
                      <Avatar className="h-10 w-10 bg-muted">
                        <AvatarImage src="" alt={article.author || ""} />
                        <AvatarFallback>
                          {getInitials(article.author)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="text-xs">
                        <p className="font-semibold text-foreground">
                          {article.author || "Admin"}
                        </p>
                        <time className="text-muted-foreground">
                          {formatDate(article.createdAt)}
                        </time>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Page;

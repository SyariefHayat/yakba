"use client";

import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Loader2,
  ImageIcon,
  DollarSign,
  Calendar,
  MapPin,
  Link as LinkIcon,
  Megaphone,
  Save,
  X,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Field,
  FieldLabel,
  FieldContent,
  FieldDescription,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

interface EventFormProps {
  userId?: string;
  initialData?: any;
}

export function EventForm({ userId, initialData }: EventFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.imageUrl || null
  );

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    if (!initialData) {
      setSlug(
        value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "")
      );
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    // if (userId) formData.append("createdBy", userId); 

    try {
      const url = initialData
        ? `/api/event/${initialData._id}`
        : "/api/event";
      const method = initialData ? "PUT" : "POST";

      const res = await fetch(url, {
        method: method,
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal menyimpan event/promosi");
      }

      toast.success(
        initialData
          ? "Event/Promosi berhasil diperbarui"
          : "Event/Promosi berhasil dibuat"
      );

      // Smart redirect
      const savedType = formData.get("type");
      if (savedType === "promotion") {
        router.push("/admin/event/promo");
      } else {
        router.push("/admin/event");
      }
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-10">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Utama</CardTitle>
              <CardDescription>
                Detail dasar mengenai event atau promosi.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Field>
                <FieldLabel>Judul Event/Promosi</FieldLabel>
                <FieldContent>
                  <Input
                    name="title"
                    placeholder="Contoh: Lomba Mewarnai 2024"
                    required
                    value={title}
                    onChange={handleTitleChange}
                    className="text-lg"
                  />
                </FieldContent>
                <FieldDescription>
                  Judul yang menarik dan jelas.
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel>Slug (URL)</FieldLabel>
                <FieldContent>
                  <Input
                    name="slug"
                    placeholder="lomba-mewarnai-2024"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="font-mono"
                  />
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel>Tipe</FieldLabel>
                <FieldContent>
                  <Select name="type" defaultValue={initialData?.type || typeParam || "event"}>
                    <SelectTrigger className="w-full">
                      <div className="flex items-center gap-2">
                        <Megaphone className="h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder="Pilih tipe" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="event">Event (Acara)</SelectItem>
                      <SelectItem value="promotion">Promosi</SelectItem>
                    </SelectContent>
                  </Select>
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel>Deskripsi</FieldLabel>
                <FieldContent>
                  <Textarea
                    name="description"
                    placeholder="Jelaskan detail lengkap event atau promosi ini..."
                    className="min-h-[150px] resize-y"
                    required
                    defaultValue={initialData?.description}
                  />
                </FieldContent>
              </Field>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Waktu & Lokasi</CardTitle>
              <CardDescription>
                Kapan dan di mana event ini dilaksanakan.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2">
              <Field>
                <FieldLabel>Tanggal Mulai</FieldLabel>
                <FieldContent>
                  <Input
                    name="startDate"
                    type="datetime-local"
                    defaultValue={
                      initialData?.startDate
                        ? new Date(initialData.startDate).toISOString().slice(0, 16)
                        : ""
                    }
                  />
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel>Tanggal Selesai</FieldLabel>
                <FieldContent>
                  <Input
                    name="endDate"
                    type="datetime-local"
                    defaultValue={
                      initialData?.endDate
                        ? new Date(initialData.endDate).toISOString().slice(0, 16)
                        : ""
                    }
                  />
                </FieldContent>
              </Field>

              <div className="sm:col-span-2">
                <Field>
                  <FieldLabel>Lokasi</FieldLabel>
                  <FieldContent>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        name="location"
                        placeholder="Contoh: Aula Sekolah, Zoom Meeting"
                        className="pl-9"
                        defaultValue={initialData?.location}
                      />
                    </div>
                  </FieldContent>
                </Field>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informasi Tambahan</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2">
              <Field>
                <FieldLabel>Harga / Biaya</FieldLabel>
                <FieldContent>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      name="price"
                      type="number"
                      placeholder="0"
                      className="pl-9"
                      defaultValue={initialData?.price}
                    />
                  </div>
                </FieldContent>
                <FieldDescription>
                  Kosongkan atau isi 0 jika gratis.
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel>Link Pendaftaran/Info</FieldLabel>
                <FieldContent>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      name="link"
                      placeholder="https://..."
                      className="pl-9"
                      defaultValue={initialData?.link}
                    />
                  </div>
                </FieldContent>
              </Field>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Status Publikasi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium leading-none">
                    Aktif
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Tampilkan di website.
                  </p>
                </div>
                <Switch
                  name="isActive"
                  value="true"
                  defaultChecked={initialData?.isActive ?? true}
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium leading-none">
                    Featured
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Tampilkan di highlight/banner utama.
                  </p>
                </div>
                <Switch
                  name="isFeatured"
                  value="true"
                  defaultChecked={initialData?.isFeatured ?? false}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-base">Gambar Banner</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="aspect-video w-full relative rounded-md border-2 border-dashed border-muted-foreground/25 flex flex-col items-center justify-center bg-muted/50 overflow-hidden hover:bg-muted/70 transition-colors">
                  {imagePreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imagePreview}
                      alt="Banner preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-muted-foreground p-4 text-center">
                      <ImageIcon className="h-10 w-10 mb-2 opacity-50" />
                      <span className="text-xs font-medium">
                        Klik untuk Upload Gambar
                      </span>
                    </div>
                  )}
                  <Input
                    name="imageUrl"
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleImageChange}
                  />
                </div>
                <div className="text-xs text-muted-foreground">
                  <p>Format: JPG, PNG, WEBP.</p>
                  <p>Maksimal ukuran: 5MB.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-3">
            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {initialData ? "Simpan Perubahan" : "Simpan Event/Promosi"}
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => router.back()}
              disabled={isLoading}
              className="w-full"
            >
              <X className="mr-2 h-4 w-4" />
              Batal
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

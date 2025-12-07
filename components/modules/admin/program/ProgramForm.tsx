"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Loader2,
  ImageIcon,
  DollarSign,
  Calendar,
  BookOpen,
  Monitor,
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

interface ProgramFormProps {
  userId: string;
  initialData?: any; // Using any for now to match strict IProgram vs form structure, or define a comprehensive type
}

export function ProgramForm({ userId, initialData }: ProgramFormProps) {
  const router = useRouter();

  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [isLoading, setIsLoading] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
    initialData?.thumbnailUrl || null
  );

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    if (!initialData) {
      setSlug(
        value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "")
      );
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setThumbnailPreview(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.append("createdBy", userId);

    try {
      const url = initialData
        ? `/api/program/${initialData._id}`
        : "/api/program";
      const method = initialData ? "PUT" : "POST";

      const res = await fetch(url, {
        method: method,
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal menyimpan program");
      }

      toast.success(
        initialData ? "Program berhasil diperbarui" : "Program berhasil dibuat"
      );
      router.push("/admin/program");
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
              <CardTitle>Informasi Umum</CardTitle>
              <CardDescription>
                Informasi dasar mengenai program yang akan {initialData ? "diperbarui" : "dibuat"}.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Field>
                <FieldLabel>Nama Program</FieldLabel>
                <FieldContent>
                  <Input
                    name="name"
                    placeholder="Bootcamp Fullstack Javascript"
                    required
                    value={name}
                    onChange={handleNameChange}
                    className="text-lg"
                  />
                </FieldContent>
                <FieldDescription>
                  Nama program yang menarik dan deskriptif.
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel>Slug (URL)</FieldLabel>
                <FieldContent>
                  <Input
                    name="slug"
                    placeholder="bootcamp-fullstack-javascript"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="font-mono"
                  />
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel>Deskripsi</FieldLabel>
                <FieldContent>
                  <Textarea
                    name="description"
                    placeholder="Jelaskan detail program, apa yang akan dipelajari, dan siapa target audiens..."
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
              <CardTitle>Detail Program</CardTitle>
              <CardDescription>
                Spesifikasi dan target peserta program.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2">
              <Field>
                <FieldLabel>Tipe Pembelajaran</FieldLabel>
                <FieldContent>
                  <Select name="type" defaultValue={initialData?.type || "offline"}>
                    <SelectTrigger className="w-full">
                      <div className="flex items-center gap-2">
                        <Monitor className="h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder="Pilih tipe" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">Online (Daring)</SelectItem>
                      <SelectItem value="offline">
                        Offline (Tatap Muka)
                      </SelectItem>
                      <SelectItem value="hybrid">Hybrid (Campuran)</SelectItem>
                    </SelectContent>
                  </Select>
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel>Level Kesulitan</FieldLabel>
                <FieldContent>
                  <Select name="level" defaultValue={initialData?.level || "beginner"}>
                    <SelectTrigger className="w-full">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder="Pilih level" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Pemula</SelectItem>
                      <SelectItem value="intermediate">Menengah</SelectItem>
                      <SelectItem value="advanced">Lanjutan</SelectItem>
                      <SelectItem value="all-level">Semua Level</SelectItem>
                    </SelectContent>
                  </Select>
                </FieldContent>
              </Field>

              <div className="sm:col-span-2">
                <FieldLabel className="mb-2 block">Rentang Umur</FieldLabel>
                <div className="flex items-center gap-4">
                  <Field className="flex-1">
                    <FieldContent>
                      <div className="relative">
                        <Input
                          name="ageMin"
                          type="number"
                          placeholder="Min"
                          min={0}
                          defaultValue={initialData?.ageMin}
                        />
                        <span className="absolute right-3 top-2.5 text-xs text-muted-foreground">
                          Tahun
                        </span>
                      </div>
                    </FieldContent>
                  </Field>
                  <span className="text-muted-foreground">-</span>
                  <Field className="flex-1">
                    <FieldContent>
                      <div className="relative">
                        <Input
                          name="ageMax"
                          type="number"
                          placeholder="Max"
                          min={0}
                          defaultValue={initialData?.ageMax}
                        />
                        <span className="absolute right-3 top-2.5 text-xs text-muted-foreground">
                          Tahun
                        </span>
                      </div>
                    </FieldContent>
                  </Field>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Harga & Biaya</CardTitle>
              <CardDescription>
                Atur kebijakan harga untuk program ini.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-3">
              <Field>
                <FieldLabel>Harga Normal</FieldLabel>
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
              </Field>

              <Field>
                <FieldLabel>Harga Diskon</FieldLabel>
                <FieldContent>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      name="discountPrice"
                      type="number"
                      placeholder="0"
                      className="pl-9"
                      defaultValue={initialData?.discountPrice}
                    />
                  </div>
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel>Periode Tagihan</FieldLabel>
                <FieldContent>
                  <Select name="billingPeriod" defaultValue={initialData?.billingPeriod || "once"}>
                    <SelectTrigger className="w-full">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder="Pilih periode" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="once">Sekali Bayar</SelectItem>
                      <SelectItem value="monthly">Bulanan</SelectItem>
                      <SelectItem value="yearly">Tahunan</SelectItem>
                    </SelectContent>
                  </Select>
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
            <CardContent>
              <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Aktif
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Tampilkan program ini.
                  </p>
                </div>
                <Switch name="isActive" value="true" defaultChecked={initialData?.isActive ?? true} />
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-base">Thumbnail</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="aspect-video w-full relative rounded-md border-2 border-dashed border-muted-foreground/25 flex flex-col items-center justify-center bg-muted/50 overflow-hidden hover:bg-muted/70 transition-colors">
                  {thumbnailPreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-muted-foreground p-4 text-center">
                      <ImageIcon className="h-10 w-10 mb-2 opacity-50" />
                      <span className="text-xs font-medium">
                        Baks Seret & Lepas atau Klik untuk Upload
                      </span>
                    </div>
                  )}
                  <Input
                    name="thumbnailUrl"
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleThumbnailChange}
                  />
                </div>
                <div className="text-xs text-muted-foreground">
                  <p>Format: JPG, PNG, WEBP.</p>
                  <p>Maksimal ukuran: 5MB.</p>
                  <p>Rekomendasi ukuran: 1280x720px.</p>
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
                  {initialData ? "Simpan Perubahan" : "Simpan Program"}
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

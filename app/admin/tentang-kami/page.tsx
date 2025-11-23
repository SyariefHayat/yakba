"use client";

import {
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useRef,
  ChangeEvent,
} from "react";
import { Plus, Trash2, Upload } from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

type StringListSetter = Dispatch<SetStateAction<string[]>>;

export default function Page() {
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [content, setContent] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");

  const [visiList, setVisiList] = useState<string[]>([""]);
  const [misiList, setMisiList] = useState<string[]>([""]);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAddItem = (setter: StringListSetter) => {
    setter((prev) => [...prev, ""]);
  };

  const handleUpdateItem = (
    setter: StringListSetter,
    index: number,
    value: string
  ) => {
    setter((prev) => {
      const newArr = [...prev];
      newArr[index] = value;
      return newArr;
    });
  };

  const handleRemoveItem = (setter: StringListSetter, index: number) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/landing/tentang-kami");

        if (!res.ok) throw new Error("Gagal mengambil data Tentang Kami");

        const data = await res.json();

        setTitle(data.title || "");
        setShortDescription(data.shortDescription || "");
        setContent(data.content || "");
        setBannerUrl(data.bannerUrl || "");

        setVisiList(
          Array.isArray(data.visi) && data.visi.length > 0 ? data.visi : [""]
        );
        setMisiList(
          Array.isArray(data.misi) && data.misi.length > 0 ? data.misi : [""]
        );
      } catch (err: unknown) {
        const message =
          typeof err === "string"
            ? err
            : err instanceof Error
            ? err.message
            : "Terjadi kesalahan";
        setErrorMessage(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAbout();
  }, []);

  const handleOpenFileDialog = () => {
    setUploadError(null);
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);

    const previewUrl = URL.createObjectURL(file);
    setBannerUrl(previewUrl);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setErrorMessage(null);
      setStatusMessage(null);

      const cleanVisi = visiList.map((v) => v.trim()).filter(Boolean);
      const cleanMisi = misiList.map((m) => m.trim()).filter(Boolean);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("shortDescription", shortDescription);
      formData.append("content", content);

      cleanVisi.forEach((v) => formData.append("visi[]", v));
      cleanMisi.forEach((m) => formData.append("misi[]", m));

      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      const res = await fetch("/api/landing/tentang-kami", {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || "Gagal menyimpan data");

      setStatusMessage(data.message || "Berhasil menyimpan perubahan.");
    } catch (err: unknown) {
      const message =
        typeof err === "string"
          ? err
          : err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat menyimpan";
      setErrorMessage(message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-4 flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Tentang Kami</h1>
        <p className="text-muted-foreground">
          Kelola informasi halaman Tentang Kami untuk ditampilkan pada website.
        </p>
      </div>

      {isLoading && (
        <div className="text-sm text-muted-foreground">
          Memuat data Tentang Kami...
        </div>
      )}
      {statusMessage && (
        <div className="text-sm text-emerald-600">{statusMessage}</div>
      )}
      {errorMessage && (
        <div className="text-sm text-red-600">{errorMessage}</div>
      )}
      {uploadError && <div className="text-sm text-red-600">{uploadError}</div>}

      <Card>
        <CardHeader>
          <CardTitle>Informasi Umum</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Judul Halaman</label>
            <Input
              placeholder="Contoh: Selamat Datang di Yakba Learning Center"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Deskripsi Singkat</label>
            <Textarea
              className="min-h-[90px]"
              placeholder="Tulis deskripsi singkat..."
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Konten Lengkap</label>
            <Textarea
              className="min-h-[140px]"
              placeholder="Tulis konten lengkap..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium">Banner / Gambar Utama</label>

            {bannerUrl && (
              <div className="w-full max-w-xl">
                <Image
                  src={bannerUrl}
                  alt="Preview Banner"
                  width={800}
                  height={400}
                  className="w-full rounded-lg border object-cover max-h-56"
                />
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            <div className="border rounded-lg p-4 flex items-center justify-between">
              <span className="text-muted-foreground text-sm">
                Pilih gambar baru. Gambar akan diupload saat Anda menyimpan
                perubahan.
              </span>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={handleOpenFileDialog}
              >
                <Upload className="w-4 h-4" />
                Pilih Gambar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Visi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {visiList.map((item, idx) => (
            <div key={idx} className="flex gap-2">
              <Input
                placeholder={`Visi ${idx + 1}`}
                value={item}
                onChange={(e) =>
                  handleUpdateItem(setVisiList, idx, e.target.value)
                }
              />
              <Button
                size="icon"
                variant="destructive"
                onClick={() => handleRemoveItem(setVisiList, idx)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}

          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => handleAddItem(setVisiList)}
          >
            <Plus className="w-4 h-4" /> Tambah Visi
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Misi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {misiList.map((item, idx) => (
            <div key={idx} className="flex gap-2">
              <Input
                placeholder={`Misi ${idx + 1}`}
                value={item}
                onChange={(e) =>
                  handleUpdateItem(setMisiList, idx, e.target.value)
                }
              />
              <Button
                size="icon"
                variant="destructive"
                onClick={() => handleRemoveItem(setMisiList, idx)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}

          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => handleAddItem(setMisiList)}
          >
            <Plus className="w-4 h-4" /> Tambah Misi
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          className="px-6 py-2"
          onClick={handleSave}
          disabled={isSaving || isLoading}
        >
          {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
      </div>
    </div>
  );
}

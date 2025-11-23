"use client";

import { useState } from "react";
import { Plus, Trash2, Upload } from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Page() {
  const [visiList, setVisiList] = useState<string[]>([""]);
  const [misiList, setMisiList] = useState<string[]>([""]);

  const handleAddItem = (
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev: string[]) => [...prev, ""]);
  };

  const handleUpdateItem = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    value: string
  ) => {
    setter((prev: string[]) => {
      const newArr = [...prev];
      newArr[index] = value;
      return newArr;
    });
  };

  const handleRemoveItem = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number
  ) => {
    setter((prev: string[]) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Tentang Kami</h1>
        <p className="text-muted-foreground">
          Kelola informasi halaman Tentang Kami untuk ditampilkan pada website.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informasi Umum</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Judul Halaman</label>
            <Input placeholder="Contoh: Selamat Datang di Yakba Learning Center" />
          </div>

          <div>
            <label className="text-sm font-medium">Deskripsi Singkat</label>
            <Textarea
              className="min-h-[90px]"
              placeholder="Tulis deskripsi singkat tentang lembaga Anda..."
            />
          </div>

          <div>
            <label className="text-sm font-medium">Konten Lengkap</label>
            <Textarea
              className="min-h-[140px]"
              placeholder="Tulis konten lebih lengkap untuk halaman Tentang Kami..."
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Banner / Gambar Utama</label>

            <div className="border rounded-lg p-4 flex items-center justify-between">
              <span className="text-muted-foreground text-sm">
                Upload gambar header untuk halaman Tentang Kami
              </span>
              <Button variant="outline" className="flex items-center gap-2">
                <Upload className="w-4 h-4" /> Upload
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
        <Button className="px-6 py-2">Simpan Perubahan</Button>
      </div>
    </div>
  );
}

"use client";

import { FormEvent, useEffect, useState } from "react";
import { Edit2, Trash2, UserPlus } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Mitra = {
  _id: string;
  name: string;
  city: string;
  phone: string;
  address: string;
  email?: string;
  isActive?: boolean;
};

const Page = () => {
  const [mitras, setMitras] = useState<Mitra[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchMitras = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/landing/mitra");
        const json = await res.json();

        if (!res.ok || !json.success) {
          console.error(json);
          alert(json.message || "Gagal mengambil data mitra");
          return;
        }

        setMitras(json.data);
      } catch (error) {
        console.error("Error fetch /api/landing/mitra:", error);
        alert("Terjadi kesalahan saat mengambil data mitra.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMitras();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setCity("");
    setPhone("");
    setAddress("");
    setEmail("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !city.trim() || !phone.trim() || !address.trim()) {
      alert("Nama, kota, telepon, dan alamat wajib diisi.");
      return;
    }

    try {
      setSubmitLoading(true);

      if (!editingId) {
        const res = await fetch("/api/landing/mitra", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            city,
            phone,
            address,
            email,
          }),
        });

        const json = await res.json();

        if (!res.ok || !json.success) {
          console.error(json);
          alert(json.message || "Gagal menambahkan mitra");
          return;
        }

        setMitras((prev) => [json.data, ...prev]);
      } else {
        const res = await fetch(`/api/landing/mitra/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            city,
            phone,
            address,
            email,
          }),
        });

        const json = await res.json();

        if (!res.ok || !json.success) {
          console.error(json);
          alert(json.message || "Gagal mengupdate mitra");
          return;
        }

        const updated: Mitra = json.data;

        setMitras((prev) =>
          prev.map((item) => (item._id === updated._id ? updated : item))
        );
      }

      resetForm();
    } catch (error) {
      console.error("Error submit mitra:", error);
      alert("Terjadi kesalahan saat menyimpan data mitra.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleEdit = (item: Mitra) => {
    setEditingId(item._id);
    setName(item.name);
    setCity(item.city);
    setPhone(item.phone);
    setAddress(item.address);
    setEmail(item.email || "");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus data mitra ini?")) return;

    try {
      const res = await fetch(`/api/landing/mitra/${id}`, {
        method: "DELETE",
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        console.error(json);
        alert(json.message || "Gagal menghapus mitra");
        return;
      }

      setMitras((prev) => prev.filter((item) => item._id !== id));
      if (editingId === id) resetForm();
    } catch (error) {
      console.error("Error delete mitra:", error);
      alert("Terjadi kesalahan saat menghapus data mitra.");
    }
  };

  return (
    <div className="p-4 flex flex-col gap-6">
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader className="flex flex-row items-center justify-between gap-2">
            <div>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-primary" />
                {editingId ? "Edit Data Mitra" : "Tambah Mitra Baru"}
              </CardTitle>
              <CardDescription>
                Lengkapi data mitra Yakba: nama, kota, kontak, dan alamat.
              </CardDescription>
            </div>

            {editingId && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={resetForm}
              >
                Batal Edit
              </Button>
            )}
          </CardHeader>

          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Nama Mitra</label>
                <Input
                  placeholder="Contoh: Mitra Yakba Surabaya"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Kota</label>
                <Input
                  placeholder="Contoh: Surabaya"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Telepon</label>
                <Input
                  placeholder="Contoh: 0812-3456-7890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Alamat</label>
                <Input
                  placeholder="Contoh: Jl. Raya Ahmad Yani No. 10"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Email (opsional)</label>
                <Input
                  type="email"
                  placeholder="Contoh: surabaya@yakba.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  disabled={submitLoading}
                >
                  Reset
                </Button>
                <Button type="submit" disabled={submitLoading}>
                  {submitLoading
                    ? "Menyimpan..."
                    : editingId
                    ? "Update Data"
                    : "Simpan Data"}
                </Button>
              </div>
            </div>
          </CardContent>
        </form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Mitra Terdaftar</CardTitle>
          <CardDescription>
            Data mitra yang sudah terdaftar dalam sistem. Gunakan aksi edit atau
            hapus untuk mengelola data.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Memuat data...</p>
          ) : (
            <div className="w-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Kota</TableHead>
                    <TableHead>Telepon</TableHead>
                    <TableHead>Alamat</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {mitras.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center text-sm text-muted-foreground"
                      >
                        Belum ada mitra terdaftar.
                      </TableCell>
                    </TableRow>
                  ) : (
                    mitras.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell className="font-medium">
                          {item.name}
                        </TableCell>
                        <TableCell>{item.city}</TableCell>
                        <TableCell>{item.phone}</TableCell>
                        <TableCell className="max-w-[260px]">
                          <span className="line-clamp-2">{item.address}</span>
                        </TableCell>
                        <TableCell>{item.email || "-"}</TableCell>

                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              type="button"
                              onClick={() => handleEdit(item)}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="icon"
                              type="button"
                              onClick={() => handleDelete(item._id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;

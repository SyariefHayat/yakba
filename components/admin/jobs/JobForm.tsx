"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { IJob } from "@/models/Job";

interface JobFormProps {
    initialData?: Partial<IJob>;
    isEdit?: boolean;
}

export default function JobForm({ initialData, isEdit = false }: JobFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);

        const jobData = {
            title: formData.get("title"),
            slug: (formData.get("title") as string)
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, ""),
            location: formData.get("location"),
            type: formData.get("type"),
            description: formData.get("description"),
            requirements: formData.get("requirements"),
            responsibilities: formData.get("responsibilities"),
            qualifications: formData.get("qualifications"),
            status: formData.get("status"),
            postedDate: initialData?.postedDate || new Date().toISOString(),
            contactEmail: formData.get("contactEmail"),
        };

        try {
            const url = isEdit && initialData?._id
                ? `/api/jobs/${initialData._id}`
                : "/api/jobs";
            const method = isEdit ? "PUT" : "POST";

            const res = await fetch(url, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(jobData),
            });

            if (!res.ok) throw new Error(isEdit ? "Gagal memperbarui lowongan" : "Gagal membuat lowongan");

            toast.success(isEdit ? "Lowongan berhasil diperbarui" : "Lowongan berhasil dibuat");
            router.push("/admin/lowongan");
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error(isEdit ? "Gagal memperbarui lowongan" : "Gagal membuat lowongan");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            <div className="space-y-2">
                <Label htmlFor="title">Judul Lowongan *</Label>
                <Input
                    id="title"
                    name="title"
                    required
                    defaultValue={initialData?.title}
                    placeholder="e.g. Frontend Developer"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="location">Lokasi *</Label>
                <Input
                    id="location"
                    name="location"
                    required
                    defaultValue={initialData?.location}
                    placeholder="e.g. Jakarta, Indonesia"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="type">Tipe Pekerjaan *</Label>
                <Select name="type" required defaultValue={initialData?.type}>
                    <SelectTrigger>
                        <SelectValue placeholder="Pilih tipe pekerjaan" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="full-time">Full Time</SelectItem>
                        <SelectItem value="part-time">Part Time</SelectItem>
                        <SelectItem value="contract">Kontrak</SelectItem>
                        <SelectItem value="internship">Magang</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Deskripsi *</Label>
                <textarea
                    id="description"
                    name="description"
                    required
                    defaultValue={initialData?.description}
                    className="w-full min-h-[120px] px-3 py-2 border rounded-md"
                    placeholder="Deskripsi pekerjaan..."
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="responsibilities">Tanggung Jawab</Label>
                <textarea
                    id="responsibilities"
                    name="responsibilities"
                    defaultValue={initialData?.responsibilities}
                    className="w-full min-h-[100px] px-3 py-2 border rounded-md"
                    placeholder="Tanggung jawab pekerjaan..."
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="requirements">Persyaratan</Label>
                <textarea
                    id="requirements"
                    name="requirements"
                    defaultValue={initialData?.requirements}
                    className="w-full min-h-[100px] px-3 py-2 border rounded-md"
                    placeholder="Persyaratan pekerjaan..."
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="qualifications">Kualifikasi</Label>
                <textarea
                    id="qualifications"
                    name="qualifications"
                    defaultValue={initialData?.qualifications}
                    className="w-full min-h-[100px] px-3 py-2 border rounded-md"
                    placeholder="Kualifikasi yang dibutuhkan..."
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="contactEmail">Email Kontak</Label>
                <Input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    defaultValue={initialData?.contactEmail}
                    placeholder="hr@company.com"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="status">Status *</Label>
                <Select name="status" defaultValue={initialData?.status || "draft"} required>
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="active">Aktif</SelectItem>
                        <SelectItem value="closed">Ditutup</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex gap-4">
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Menyimpan..." : (isEdit ? "Perbarui Lowongan" : "Simpan Lowongan")}
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                >
                    Batal
                </Button>
            </div>
        </form>
    );
}

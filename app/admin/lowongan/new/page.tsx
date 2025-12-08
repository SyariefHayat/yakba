"use client";

import JobForm from "@/components/admin/jobs/JobForm";

export default function NewJobPage() {
    return (
        <div className="w-full p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight">Tambah Lowongan</h1>
                <p className="text-muted-foreground">Buat lowongan pekerjaan baru.</p>
            </div>

            <JobForm />
        </div>
    );
}

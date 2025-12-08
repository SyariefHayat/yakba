import JobForm from "@/components/admin/jobs/JobForm";
import Job from "@/models/Job";
import connectDB from "@/lib/mongodb";
import { notFound } from "next/navigation";
import { Types } from "mongoose";

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
    await connectDB();

    let job;
    const { id } = await params;
    try {
        job = await Job.findById(id).lean();
    } catch (error) {
        // Handle invalid ID format
        notFound();
    }

    if (!job) {
        notFound();
    }

    // Convert ObjectId and Dates to strings/numbers as needed for serialization
    const initialData = {
        ...job,
        _id: job._id.toString(),
        postedDate: job.postedDate ? new Date(job.postedDate).toISOString() : undefined,
        // Ensure other potential dates are handled if necessary, though job model mainly has postedDate as required/important here.
        // Also cast to any to avoid partial IJob type conflicts with string IDs
    } as any;

    return (
        <div className="w-full p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight">Edit Lowongan</h1>
                <p className="text-muted-foreground">Perbarui informasi lowongan pekerjaan.</p>
            </div>

            <JobForm initialData={initialData} isEdit />
        </div>
    );
}

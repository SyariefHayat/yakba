import Job from "@/models/Job";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const { id } = await params;
        const job = await Job.findById(id);

        if (!job) {
            return NextResponse.json(
                { error: "Lowongan tidak ditemukan" },
                { status: 404 }
            );
        }

        return NextResponse.json(job, { status: 200 });
    } catch (error) {
        console.error("Error fetching job:", error);
        return NextResponse.json(
            { error: "Gagal mengambil data lowongan" },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const { id } = await params;
        const body = await request.json();

        const job = await Job.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        if (!job) {
            return NextResponse.json(
                { error: "Lowongan tidak ditemukan" },
                { status: 404 }
            );
        }

        return NextResponse.json(job, { status: 200 });
    } catch (error) {
        console.error("Error updating job:", error);
        return NextResponse.json(
            { error: "Gagal memperbarui lowongan" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const { id } = await params;

        const job = await Job.findByIdAndDelete(id);

        if (!job) {
            return NextResponse.json(
                { error: "Lowongan tidak ditemukan" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Lowongan berhasil dihapus" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting job:", error);
        return NextResponse.json(
            { error: "Gagal menghapus lowongan" },
            { status: 500 }
        );
    }
}

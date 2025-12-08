import Job from "@/models/Job";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const status = searchParams.get("status");

        let filter = {};

        // For public view, only show active jobs
        if (status === "active") {
            filter = { status: "active" };
        }

        const jobs = await Job.find(filter).sort({ postedDate: -1 });

        return NextResponse.json(jobs, { status: 200 });
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return NextResponse.json(
            { error: "Failed to fetch jobs" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const body = await request.json();

        const job = await Job.create(body);

        return NextResponse.json(job, { status: 201 });
    } catch (error) {
        console.error("Error creating job:", error);
        return NextResponse.json(
            { error: "Failed to create job" },
            { status: 500 }
        );
    }
}

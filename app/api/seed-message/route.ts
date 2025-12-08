import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Message from "@/models/Message";

export async function GET() {
    await connectDB();

    await Message.create({
        name: "John Doe",
        email: "john@example.com",
        subject: "Hiring Inquiry",
        message: "I am interested in your services.",
        status: "unread",
    });

    return NextResponse.json({ success: true, message: "Seeded" });
}

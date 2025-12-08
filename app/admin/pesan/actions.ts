"use server";

import connectDB from "@/lib/mongodb";
import Message from "@/models/Message";
import { revalidatePath } from "next/cache";

export async function deleteMessage(id: string) {
    try {
        await connectDB();
        await Message.findByIdAndDelete(id);
        revalidatePath("/admin/pesan");
        revalidatePath("/admin/pesan/pending");
        return { success: true };
    } catch (error) {
        console.error("Error deleting message:", error);
        return { success: false, error: "Failed to delete message" };
    }
}

export async function updateMessageStatus(id: string, status: "read" | "unread" | "replied") {
    try {
        await connectDB();
        await Message.findByIdAndUpdate(id, { status });
        revalidatePath("/admin/pesan");
        revalidatePath("/admin/pesan/pending");
        return { success: true };
    } catch (error) {
        console.error("Error updating message status:", error);
        return { success: false, error: "Failed to update message status" };
    }
}

"use server";

import cloudinary from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

export async function getImages(nextCursor?: string) {
    try {
        const results = await cloudinary.api.resources({
            type: "upload",
            prefix: "", // Adjust if you want to filter by folder
            max_results: 30,
            next_cursor: nextCursor,
            sort_by: "created_at",
            direction: "desc",
        });
        return { success: true, ...results };
    } catch (error) {
        console.error("Error fetching images:", error);
        return { success: false, error: "Failed to fetch images" };
    }
}

export async function deleteImage(publicId: string) {
    try {
        await cloudinary.uploader.destroy(publicId);
        revalidatePath("/admin/media");
        return { success: true };
    } catch (error) {
        console.error("Error deleting image:", error);
        return { success: false, error: "Failed to delete image" };
    }
}

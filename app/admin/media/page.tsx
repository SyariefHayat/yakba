
import React from "react";
import { getImages } from "./actions";
import { MediaGallery } from "./media-gallery";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default async function MediaPage() {
    const res = await getImages();

    if (!res.success) {
        return (
            <div className="p-6">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        Gagal memuat media dari Cloudinary. Pastikan konfigurasi API key sudah benar.
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Media Manager</h1>
            </div>

            <MediaGallery
                initialImages={res.resources}
                initialNextCursor={res.next_cursor}
            />
        </div>
    );
}

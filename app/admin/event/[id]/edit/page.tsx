import { EventForm } from "@/components/modules/admin/event/EventForm";
import { Separator } from "@/components/ui/separator";
import connectDB from "@/lib/mongodb";
import EventPromotion from "@/models/EventPromotion";
import { notFound } from "next/navigation";

export default async function EditEventPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    await connectDB();
    const { id } = await params;
    const event = await EventPromotion.findById(id);

    if (!event) {
        notFound();
    }

    // Serializable object for client component
    const initialData = JSON.parse(JSON.stringify(event));

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Edit Event / Promosi</h3>
                <p className="text-sm text-muted-foreground">
                    Perbarui detail event atau promosi.
                </p>
            </div>
            <Separator />
            <EventForm userId="6924670cb10f0bd7f9b3381e" initialData={initialData} />
        </div>
    );
}

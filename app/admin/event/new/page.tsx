import { EventForm } from "@/components/modules/admin/event/EventForm";
import { Separator } from "@/components/ui/separator";

export default async function NewEventPage() {
    // Hardcoded userId for now, matching the Program page pattern until auth is fully integrated
    // const session = await auth();
    // if (!session) redirect("/auth/login");

    return (
        <div className="flex flex-col gap-6 p-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Buat Event & Promosi Baru</h1>
                <p className="text-muted-foreground">
                    Isi detail di bawah ini untuk membuat event atau promosi baru.
                </p>
            </div>
            <Separator />
            <EventForm userId="6924670cb10f0bd7f9b3381e" />
        </div>
    );
}

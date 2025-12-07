// import { auth } from "@/auth";
import { Separator } from "@/components/ui/separator";
import { ProgramForm } from "@/components/modules/admin/program/ProgramForm";
import connectDB from "@/lib/mongodb";
import Program from "@/models/Program";
import { redirect } from "next/navigation";

interface EditProgramPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditProgramPage({ params }: EditProgramPageProps) {
    // const session = await auth();

    // if (!session || !session.user || !session.user.email) {
    //     redirect("/auth/login");
    // }

    await connectDB();
    // const user = await User.findOne({ email: session.user.email });

    // if (!user) {
    //     redirect("/auth/login");
    // }

    const { id } = await params;
    const program = await Program.findById(id).lean();

    if (!program) {
        redirect("/admin/program");
    }

    // Convert _id and other ObjectIds to string to avoid serialization issues
    const serializedProgram = {
        ...program,
        _id: program._id.toString(),
        createdBy: program.createdBy?.toString(),
        createdAt: program.createdAt?.toISOString(),
        // @ts-ignore
        updatedAt: program.updatedAt?.toISOString(),
    };

    return (
        <div className="flex flex-col gap-6 p-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Edit Program</h1>
                <p className="text-muted-foreground">
                    Perbarui informasi program yang sudah ada.
                </p>
            </div>
            <Separator />
            <ProgramForm
                userId={String("6924670cb10f0bd7f9b3381e")} // Using hardcoded ID as per existing new page pattern for now
                initialData={serializedProgram}
            />
        </div>
    );
}

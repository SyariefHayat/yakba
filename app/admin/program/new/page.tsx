// import { auth } from "@/auth";
// import { redirect } from "next/navigation";
// import connectDB from "@/lib/mongodb";
// import User from "@/models/User";
import { ProgramForm } from "@/components/modules/admin/program/ProgramForm";
import { Separator } from "@/components/ui/separator";

export default async function NewProgramPage() {
  // const session = await auth();

  // if (!session || !session.user || !session.user.email) {
  //     redirect("/auth/login");
  // }

  // await connectDB();
  // const user = await User.findOne({ email: session.user.email });

  // if (!user) {
  //     redirect("/auth/login");
  // }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Buat Program Baru</h1>
        <p className="text-muted-foreground">
          Isi detail di bawah ini untuk membuat program baru.
        </p>
      </div>
      <Separator />
      <ProgramForm userId={String("6924670cb10f0bd7f9b3381e")} />
    </div>
  );
}

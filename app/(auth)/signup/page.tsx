import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import { SignupForm } from "@/components/modules/auth/SignupForm";

const SignUp = async () => {
  const session = await auth();

  if (session?.user) {
    redirect("/profile");
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <Toaster />
      <div className="w-full max-w-sm md:max-w-4xl">
        <SignupForm />
      </div>
    </div>
  );
};

export default SignUp;

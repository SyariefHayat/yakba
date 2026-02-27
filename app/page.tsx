import { Toaster } from "@/components/ui/sonner";
import { LoginForm } from "@/components/modules/login-form";

export default function LoginPage() {
  return (
    <div className="relative min-h-svh bg-linear-to-b from-sky-100 via-sky-50 to-white overflow-hidden">
      <Toaster />
      <div className="relative z-10 flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-4xl">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

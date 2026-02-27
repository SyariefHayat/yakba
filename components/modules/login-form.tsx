"use client"

import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field"

import Link from "next/link"
import { toast } from "sonner"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { object, string } from "zod"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { loginAction } from "@/app/action/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { COLORS, YAKBA_LETTERS } from "@/lib/constants"
import { Card, CardContent } from "@/components/ui/card"

const signInSchema = object({
    email: string()
        .min(1, "Email wajib diisi")
        .email("Format email tidak valid"),
    password: string()
        .min(1, "Kata sandi wajib diisi")
        .min(8, "Minimal 8 karakter")
        .max(32, "Maksimal 32 karakter"),
})

type SignInFormValues = {
    email: string
    password: string
}

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormValues>({
        resolver: zodResolver(signInSchema),
    })

    const onSubmit = async (data: SignInFormValues) => {
        const result = await loginAction(data)

        if (result?.error) {
            toast.error(result.error)
            return
        }

        toast.success("Berhasil login 🎉")
        router.push("/dashboard")
        router.refresh()
    }

    return (
        <div
            className={cn("relative flex flex-col gap-6 font-poppins", className)}
            {...props}
        >
            <Card className="relative z-10 overflow-hidden p-0 border-4 border-white shadow-2xl">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="p-6 md:p-8 bg-white"
                    >
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-3 text-center mb-2">
                                <Link href="/">
                                    <Image
                                        src="/logo.png"
                                        alt="Yakba Logo"
                                        width={80}
                                        height={80}
                                        className="w-16 h-16 md:w-20 md:h-20"
                                    />
                                </Link>

                                <div>
                                    <h1 className="text-2xl md:text-3xl font-mochi-boom">
                                        Selamat Datang di{" "}
                                        {YAKBA_LETTERS.map(({ letter, color }, index) => (
                                            <span key={index} style={{ color }}>
                                                {letter}
                                            </span>
                                        ))}
                                    </h1>

                                    <p className="text-muted-foreground text-sm md:text-base mt-1">
                                        Masuk ke akun Anda untuk melanjutkan
                                    </p>
                                </div>
                            </div>

                            <Field>
                                <FieldLabel htmlFor="email" className="font-semibold">
                                    Email
                                </FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="contoh@email.com"
                                    className="border-2 border-sky-200 focus:border-sky-400 transition-colors"
                                    {...register("email")}
                                    disabled={isSubmitting}
                                />
                                {errors.email && (
                                    <FieldDescription className="text-red-500 text-sm">
                                        {errors.email.message}
                                    </FieldDescription>
                                )}
                            </Field>

                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password" className="font-semibold">
                                        Kata Sandi
                                    </FieldLabel>
                                </div>

                                <Input
                                    id="password"
                                    type="password"
                                    className="border-2 border-sky-200 focus:border-sky-400 transition-colors"
                                    {...register("password")}
                                    disabled={isSubmitting}
                                />

                                {errors.password && (
                                    <FieldDescription className="text-red-500 text-sm">
                                        {errors.password.message}
                                    </FieldDescription>
                                )}
                            </Field>

                            <Field>
                                <Button
                                    type="submit"
                                    className="w-full font-bold text-base py-5 bg-yellow-400 hover:bg-yellow-500 text-black transition-all hover:scale-[1.02]"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="size-4 mr-2 animate-spin" />
                                            Memproses...
                                        </>
                                    ) : (
                                        "Masuk"
                                    )}
                                </Button>
                            </Field>
                        </FieldGroup>
                    </form>

                    <div className="relative hidden md:flex flex-col items-center justify-center bg-[url('/bg.png')] bg-cover bg-center">
                    </div>
                </CardContent>
            </Card>

            <FieldDescription className="relative z-10 px-6 text-center text-xs text-muted-foreground">
                Dengan melanjutkan, Anda menyetujui{" "}
                <Link href="/terms" className="underline hover:text-foreground">
                    Syarat Layanan
                </Link>{" "}
                dan{" "}
                <Link href="/privacy" className="underline hover:text-foreground">
                    Kebijakan Privasi
                </Link>{" "}
                kami.
            </FieldDescription>
        </div>
    )
}
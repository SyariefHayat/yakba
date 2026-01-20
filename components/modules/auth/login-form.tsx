import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { COLORS, YAKBA_LETTERS } from "@/lib/constants"

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div className={cn("relative flex flex-col gap-6 font-poppins", className)} {...props}>
            {/* Main Card */}
            <Card className="relative z-10 overflow-hidden p-0 border-4 border-white shadow-2xl">
                <CardContent className="grid p-0 md:grid-cols-2">
                    {/* Form Section */}
                    <form className="p-6 md:p-8 bg-white">
                        <FieldGroup>
                            {/* Logo & Title */}
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

                            {/* Email Field */}
                            <Field>
                                <FieldLabel htmlFor="email" className="font-semibold">
                                    Email
                                </FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="contoh@email.com"
                                    className="border-2 border-sky-200 focus:border-sky-400 transition-colors"
                                    required
                                />
                            </Field>

                            {/* Password Field */}
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password" className="font-semibold">
                                        Kata Sandi
                                    </FieldLabel>
                                    <Link
                                        href="#"
                                        className="ml-auto text-sm underline-offset-2 hover:underline"
                                        style={{ color: COLORS.blue }}
                                    >
                                        Lupa kata sandi?
                                    </Link>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    className="border-2 border-sky-200 focus:border-sky-400 transition-colors"
                                    required
                                />
                            </Field>

                            {/* Login Button */}
                            <Field>
                                <Button
                                    type="submit"
                                    className="w-full cursor-pointer font-bold text-base py-5 bg-yellow-400 hover:bg-yellow-500 text-black transition-all hover:scale-[1.02]"
                                    asChild
                                >
                                    <Link href="/dashboard">Masuk</Link>
                                </Button>
                            </Field>

                            {/* Separator */}
                            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-white text-muted-foreground">
                                Atau masuk dengan
                            </FieldSeparator>

                            {/* Google Login */}
                            <Field>
                                <Button
                                    variant="outline"
                                    type="button"
                                    className="w-full cursor-pointer border-2 border-sky-200 hover:border-sky-400 hover:bg-sky-50 transition-all"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                                        <path
                                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    <span className="ml-2">Masuk dengan Google</span>
                                </Button>
                            </Field>

                            {/* Sign Up Link */}
                            <FieldDescription className="text-center text-sm">
                                Belum punya akun?{" "}
                                <Link
                                    href="/signup"
                                    className="font-semibold hover:underline"
                                    style={{ color: COLORS.pink }}
                                >
                                    Daftar sekarang
                                </Link>
                            </FieldDescription>
                        </FieldGroup>
                    </form>

                    {/* Image/Mascot Section */}
                    <div className="relative hidden md:flex flex-col items-center justify-center bg-[url('/bg.png')] bg-cover bg-center">

                    </div>
                </CardContent>
            </Card>

            {/* Footer */}
            <FieldDescription className="relative z-10 px-6 text-center text-xs text-muted-foreground">
                Dengan melanjutkan, Anda menyetujui{" "}
                <Link href="/terms" className="underline hover:text-foreground">Syarat Layanan</Link>
                {" "}dan{" "}
                <Link href="/privacy" className="underline hover:text-foreground">Kebijakan Privasi</Link> kami.
            </FieldDescription>
        </div>
    )
}

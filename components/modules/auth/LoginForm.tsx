"use client";

import Link from "next/link";
import * as React from "react";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";

import { cn } from "@/lib/utils";
import GoogleBtn from "./GoogleBtn";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function handleCredentialsSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      if (!email || !password) {
        toast.error("Email dan password wajib diisi");
        setLoading(false);
        return;
      }

      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!res) {
        toast.error("Terjadi kesalahan, coba lagi.");
        setLoading(false);
        return;
      }

      if (res?.error) {
        if (res.error === "CredentialsSignin") {
          toast.error("Email, password, atau status verifikasi salah.");
        } else {
          toast.error("Terjadi kesalahan. Coba lagi.");
        }
        setLoading(false);
        return;
      }

      toast.success("Login berhasil 🎉");
      router.push("/profile");
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan, coba lagi.");
      setLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div>
            <form className="p-6 md:p-8" onSubmit={handleCredentialsSubmit}>
              <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-muted-foreground text-balance">
                    Login to your Yakba account
                  </p>
                </div>

                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Field>

                <Field>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-2 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Field>

                <Field>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full cursor-pointer"
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </Field>

                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                  Or continue with
                </FieldSeparator>
              </FieldGroup>
            </form>

            <div className="flex flex-col gap-4 px-6 md:px-8 pb-6 md:pb-8">
              <Field>
                <GoogleBtn />
              </Field>
              <FieldDescription className="text-center">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="underline-offset-2 hover:underline"
                >
                  Sign up
                </Link>
              </FieldDescription>
            </div>
          </div>

          <div className="bg-sky-300 relative hidden md:block" />
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}

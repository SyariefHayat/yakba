"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function loginAction(data: { email: string; password: string }) {
    try {
        await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirectTo: "/dashboard",
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Email atau password salah" };
                default:
                    return { error: "Terjadi kesalahan, coba lagi" };
            }
        }
        throw error;
    }
}

export async function logoutAction() {
    try {
        await signOut({ redirectTo: "/" });
    } catch (error) {
        if (isRedirectError(error)) throw error;
        return { error: "Gagal logout, coba lagi" };
    }
}
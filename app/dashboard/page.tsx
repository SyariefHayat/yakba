"use client";

import { Button } from "@/components/ui/button";
import { logoutAction } from "../action/auth";
import { toast } from "sonner";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { Toaster } from "@/components/ui/sonner";

const page = () => {
    const handleLogout = async () => {
        toast.promise(
            logoutAction()
                .then((result) => {
                    if (result?.error) throw new Error(result.error);
                })
                .catch((err) => {
                    if (isRedirectError(err)) return;
                    throw err;
                }),
            {
                loading: "Logging out...",
                success: "Berhasil logout",
                error: (err) => err.message ?? "Gagal logout",
            },
        );
    };
    return (
        <div>
            <Toaster />
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p>Welcome to your dashboard!</p>
            <Button onClick={handleLogout} className="cursor-pointer">
                Logout
            </Button>
        </div>
    );
};

export default page;
import { auth } from "@/auth";
import { NextResponse } from "next/server";

const protectedPrefixes = ["/dashboard"];

export const proxy = auth((req) => {
    const isLoggedIn = !!req.auth;
    const isProtectedRoute = protectedPrefixes.some((prefix) =>
        req.nextUrl.pathname.startsWith(prefix)
    );

    if (!isLoggedIn && isProtectedRoute) {
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    if (isLoggedIn && req.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$|.*\\.ico$|.*\\.webp$|.*\\.ttf$|.*\\.woff2?$).*)"],
};
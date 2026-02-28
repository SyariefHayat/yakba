import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

// GET /api/settings/profile — get current user profile
export async function GET() {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                image: true,
                createdAt: true,
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User tidak ditemukan." },
                { status: 404 }
            );
        }

        return NextResponse.json({ data: user });
    } catch (error) {
        console.error("[GET /api/settings/profile]", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

// PATCH /api/settings/profile — update name & email
export async function PATCH(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await req.json();
        const { name, email } = body;

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User tidak ditemukan." },
                { status: 404 }
            );
        }

        // Validate email if changed
        if (email && email !== user.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return NextResponse.json(
                    { error: "Format email tidak valid." },
                    { status: 400 }
                );
            }
            const emailTaken = await prisma.user.findFirst({
                where: { email, NOT: { id: user.id } },
            });
            if (emailTaken) {
                return NextResponse.json(
                    { error: "Email sudah digunakan user lain." },
                    { status: 409 }
                );
            }
        }

        const updateData: Record<string, unknown> = {};
        if (name !== undefined) updateData.name = name;
        if (email !== undefined) updateData.email = email;

        if (Object.keys(updateData).length === 0) {
            return NextResponse.json(
                { error: "Tidak ada field yang diupdate." },
                { status: 400 }
            );
        }

        const updated = await prisma.user.update({
            where: { id: user.id },
            data: updateData,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                image: true,
            },
        });

        return NextResponse.json({ data: updated });
    } catch (error) {
        console.error("[PATCH /api/settings/profile]", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

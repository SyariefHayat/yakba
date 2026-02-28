import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type Role = "ADMIN" | "USER";
const ROLES: Role[] = ["ADMIN", "USER"];
import bcrypt from "bcryptjs";

type Params = { params: Promise<{ id: string }> };

// GET /api/users/:id
export async function GET(_req: NextRequest, { params }: Params) {
    try {
        const { id } = await params;

        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                emailVerified: true,
                image: true,
                createdAt: true,
                updatedAt: true,
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
        console.error("[GET /api/users/:id]", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

// PATCH /api/users/:id
// Semua field opsional — hanya field yang dikirim yang akan diupdate
export async function PATCH(req: NextRequest, { params }: Params) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { name, email, password, role, image } = body;

        // Pastikan user ada
        const existing = await prisma.user.findUnique({ where: { id } });
        if (!existing) {
            return NextResponse.json(
                { error: "User tidak ditemukan." },
                { status: 404 }
            );
        }

        // Validasi email jika dikirim
        if (email !== undefined) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return NextResponse.json(
                    { error: "Format email tidak valid." },
                    { status: 400 }
                );
            }

            const emailTaken = await prisma.user.findFirst({
                where: { email, NOT: { id } },
            });
            if (emailTaken) {
                return NextResponse.json(
                    { error: "Email sudah digunakan user lain." },
                    { status: 409 }
                );
            }
        }

        // Validasi role jika dikirim
        if (role !== undefined && !ROLES.includes(role)) {
            return NextResponse.json(
                { error: `Role tidak valid. Pilihan: ${ROLES.join(", ")}` },
                { status: 400 }
            );
        }

        // Validasi password jika dikirim
        if (password !== undefined && password.length < 8) {
            return NextResponse.json(
                { error: "Password minimal 8 karakter." },
                { status: 400 }
            );
        }

        const updateData: Record<string, unknown> = {};
        if (name !== undefined) updateData.name = name;
        if (email !== undefined) updateData.email = email;
        if (role !== undefined) updateData.role = role;
        if (image !== undefined) updateData.image = image;
        if (password !== undefined) {
            updateData.password = await bcrypt.hash(password, 12);
        }

        if (Object.keys(updateData).length === 0) {
            return NextResponse.json(
                { error: "Tidak ada field yang diupdate." },
                { status: 400 }
            );
        }

        const updated = await prisma.user.update({
            where: { id },
            data: updateData,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                image: true,
                updatedAt: true,
            },
        });

        return NextResponse.json({ data: updated });
    } catch (error) {
        console.error("[PATCH /api/users/:id]", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

// DELETE /api/users/:id
export async function DELETE(_req: NextRequest, { params }: Params) {
    try {
        const { id } = await params;

        const existing = await prisma.user.findUnique({ where: { id } });
        if (!existing) {
            return NextResponse.json(
                { error: "User tidak ditemukan." },
                { status: 404 }
            );
        }

        await prisma.user.delete({ where: { id } });

        return NextResponse.json(
            { message: "User berhasil dihapus." },
            { status: 200 }
        );
    } catch (error) {
        console.error("[DELETE /api/users/:id]", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
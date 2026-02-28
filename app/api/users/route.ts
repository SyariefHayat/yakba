import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type Role = "ADMIN" | "USER";
const ROLES: Role[] = ["ADMIN", "USER"];
import bcrypt from "bcryptjs";

// GET /api/users
// Query params: ?page=1&limit=10&role=ADMIN&search=john
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        const page = Math.max(1, Number(searchParams.get("page") ?? 1));
        const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit") ?? 10)));
        const role = searchParams.get("role") as Role | null;
        const search = searchParams.get("search") ?? "";

        const where = {
            ...(role && { role }),
            ...(search && {
                OR: [
                    { name: { contains: search, mode: "insensitive" as const } },
                    { email: { contains: search, mode: "insensitive" as const } },
                ],
            }),
        };

        const [users, total] = await Promise.all([
            prisma.user.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: "desc" },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    emailVerified: true,
                    image: true,
                    createdAt: true,
                    updatedAt: true,
                    // password sengaja tidak di-select
                },
            }),
            prisma.user.count({ where }),
        ]);

        return NextResponse.json({
            data: users,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("[GET /api/users]", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

// POST /api/users
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, password, role } = body;

        // Validasi
        if (!email || !password) {
            return NextResponse.json(
                { error: "Email dan password wajib diisi." },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Format email tidak valid." },
                { status: 400 }
            );
        }

        if (password.length < 8) {
            return NextResponse.json(
                { error: "Password minimal 8 karakter." },
                { status: 400 }
            );
        }

        if (role && !ROLES.includes(role)) {
            return NextResponse.json(
                { error: `Role tidak valid. Pilihan: ${ROLES.join(", ")}` },
                { status: 400 }
            );
        }

        // Cek email duplikat
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return NextResponse.json(
                { error: "Email sudah terdaftar." },
                { status: 409 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                name: name ?? null,
                email,
                password: hashedPassword,
                role: role ?? "USER",
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });

        return NextResponse.json({ data: user }, { status: 201 });
    } catch (error) {
        console.error("[POST /api/users]", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
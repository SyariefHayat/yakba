import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET /api/categories?search=keyword&page=1&limit=10
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const search = searchParams.get("search") ?? "";
        const page = Math.max(1, Number(searchParams.get("page") ?? 1));
        const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit") ?? 50)));

        const where = {
            ...(search && {
                name: { contains: search, mode: "insensitive" as const },
            }),
        };

        const [categories, total] = await Promise.all([
            prisma.category.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { name: "asc" },
                include: {
                    _count: { select: { products: true } },
                },
            }),
            prisma.category.count({ where }),
        ]);

        return NextResponse.json({
            data: categories,
            meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
        });
    } catch (error) {
        console.error("[GET /api/categories]", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

function generateSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
}

// POST /api/categories
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, isActive } = body;

        if (!name) {
            return NextResponse.json(
                { error: "Nama kategori wajib diisi." },
                { status: 400 }
            );
        }

        let slug = generateSlug(name);
        const existingSlug = await prisma.category.findUnique({ where: { slug } });
        if (existingSlug) {
            slug = `${slug}-${Date.now().toString(36)}`;
        }

        const category = await prisma.category.create({
            data: {
                name,
                slug,
                isActive: isActive ?? true,
            },
        });

        return NextResponse.json({ data: category }, { status: 201 });
    } catch (error) {
        console.error("[POST /api/categories]", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ProductType } from "@prisma/client";

// GET /api/products
// Query params: ?page=1&limit=10&search=keyword&type=DIGITAL&category=slug
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        const page = Math.max(1, Number(searchParams.get("page") ?? 1));
        const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit") ?? 10)));
        const search = searchParams.get("search") ?? "";
        const type = searchParams.get("type") as ProductType | null;
        const categoryId = searchParams.get("categoryId");

        const where = {
            ...(type && { type }),
            ...(categoryId && { categoryId }),
            ...(search && {
                OR: [
                    { name: { contains: search, mode: "insensitive" as const } },
                    { slug: { contains: search, mode: "insensitive" as const } },
                ],
            }),
        };

        const [products, total] = await prisma.$transaction([
            prisma.product.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: "desc" },
                include: {
                    category: { select: { id: true, name: true, slug: true } },
                    detail: true,
                    images: { select: { id: true, imageUrl: true } },
                    _count: { select: { items: true } },
                },
            }),
            prisma.product.count({ where }),
        ]);

        return NextResponse.json({
            data: products,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("[GET /api/products]", error);
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

// POST /api/products
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, description, price, discount, type, categoryId, isActive, stock, weight, fileUrl } = body;

        if (!name || !description || price === undefined || !type || !categoryId) {
            return NextResponse.json(
                { error: "Nama, deskripsi, harga, tipe, dan kategori wajib diisi." },
                { status: 400 }
            );
        }

        if (!Object.values(ProductType).includes(type)) {
            return NextResponse.json(
                { error: `Tipe tidak valid. Pilihan: ${Object.values(ProductType).join(", ")}` },
                { status: 400 }
            );
        }

        // Generate unique slug
        let slug = generateSlug(name);
        const existingSlug = await prisma.product.findUnique({ where: { slug } });
        if (existingSlug) {
            slug = `${slug}-${Date.now().toString(36)}`;
        }

        const product = await prisma.product.create({
            data: {
                name,
                slug,
                description,
                price: Number(price),
                discount: discount ? Number(discount) : null,
                type,
                categoryId,
                isActive: isActive ?? true,
                detail: {
                    create: {
                        stock: stock ? Number(stock) : null,
                        weight: weight ? Number(weight) : null,
                        fileUrl: fileUrl ?? null,
                    },
                },
                ...(body.imageUrls?.length > 0 && {
                    images: {
                        create: body.imageUrls.map((url: string) => ({
                            imageUrl: url,
                        })),
                    },
                }),
            },
            include: {
                category: { select: { id: true, name: true } },
                detail: true,
                images: { select: { id: true, imageUrl: true } },
            },
        });

        return NextResponse.json({ data: product }, { status: 201 });
    } catch (error) {
        console.error("[POST /api/products]", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

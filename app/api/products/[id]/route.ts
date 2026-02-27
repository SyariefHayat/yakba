import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ProductType } from "@prisma/client";

type Params = { params: Promise<{ id: string }> };

// GET /api/products/:id
export async function GET(_req: NextRequest, { params }: Params) {
    try {
        const { id } = await params;

        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                category: { select: { id: true, name: true, slug: true } },
                detail: true,
                images: { select: { id: true, imageUrl: true } },
            },
        });

        if (!product) {
            return NextResponse.json(
                { error: "Produk tidak ditemukan." },
                { status: 404 }
            );
        }

        return NextResponse.json({ data: product });
    } catch (error) {
        console.error("[GET /api/products/:id]", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

// PATCH /api/products/:id
export async function PATCH(req: NextRequest, { params }: Params) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { name, description, price, discount, type, categoryId, isActive, stock, weight, fileUrl } = body;

        const existing = await prisma.product.findUnique({ where: { id } });
        if (!existing) {
            return NextResponse.json(
                { error: "Produk tidak ditemukan." },
                { status: 404 }
            );
        }

        if (type !== undefined && !Object.values(ProductType).includes(type)) {
            return NextResponse.json(
                { error: `Tipe tidak valid. Pilihan: ${Object.values(ProductType).join(", ")}` },
                { status: 400 }
            );
        }

        const productData: Record<string, unknown> = {};
        if (name !== undefined) productData.name = name;
        if (description !== undefined) productData.description = description;
        if (price !== undefined) productData.price = Number(price);
        if (discount !== undefined) productData.discount = discount ? Number(discount) : null;
        if (type !== undefined) productData.type = type;
        if (categoryId !== undefined) productData.categoryId = categoryId;
        if (isActive !== undefined) productData.isActive = isActive;

        // Update detail if any detail field is provided
        const hasDetail = stock !== undefined || weight !== undefined || fileUrl !== undefined;

        const updated = await prisma.product.update({
            where: { id },
            data: {
                ...productData,
                ...(hasDetail && {
                    detail: {
                        upsert: {
                            create: {
                                stock: stock ? Number(stock) : null,
                                weight: weight ? Number(weight) : null,
                                fileUrl: fileUrl ?? null,
                            },
                            update: {
                                ...(stock !== undefined && { stock: stock ? Number(stock) : null }),
                                ...(weight !== undefined && { weight: weight ? Number(weight) : null }),
                                ...(fileUrl !== undefined && { fileUrl: fileUrl ?? null }),
                            },
                        },
                    },
                }),
            },
            include: {
                category: { select: { id: true, name: true } },
                detail: true,
            },
        });

        return NextResponse.json({ data: updated });
    } catch (error) {
        console.error("[PATCH /api/products/:id]", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

// DELETE /api/products/:id
export async function DELETE(_req: NextRequest, { params }: Params) {
    try {
        const { id } = await params;

        const existing = await prisma.product.findUnique({ where: { id } });
        if (!existing) {
            return NextResponse.json(
                { error: "Produk tidak ditemukan." },
                { status: 404 }
            );
        }

        await prisma.product.delete({ where: { id } });

        return NextResponse.json(
            { message: "Produk berhasil dihapus." },
            { status: 200 }
        );
    } catch (error) {
        console.error("[DELETE /api/products/:id]", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

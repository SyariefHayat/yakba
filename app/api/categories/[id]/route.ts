import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = { params: Promise<{ id: string }> };

// PATCH /api/categories/:id
export async function PATCH(req: NextRequest, { params }: Params) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { name, isActive } = body;

        const existing = await prisma.category.findUnique({ where: { id } });
        if (!existing) {
            return NextResponse.json(
                { error: "Kategori tidak ditemukan." },
                { status: 404 }
            );
        }

        const updateData: Record<string, unknown> = {};
        if (name !== undefined) updateData.name = name;
        if (isActive !== undefined) updateData.isActive = isActive;

        if (Object.keys(updateData).length === 0) {
            return NextResponse.json(
                { error: "Tidak ada field yang diupdate." },
                { status: 400 }
            );
        }

        const updated = await prisma.category.update({
            where: { id },
            data: updateData,
        });

        return NextResponse.json({ data: updated });
    } catch (error) {
        console.error("[PATCH /api/categories/:id]", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

// DELETE /api/categories/:id
export async function DELETE(_req: NextRequest, { params }: Params) {
    try {
        const { id } = await params;

        const existing = await prisma.category.findUnique({
            where: { id },
            include: { _count: { select: { products: true } } },
        });

        if (!existing) {
            return NextResponse.json(
                { error: "Kategori tidak ditemukan." },
                { status: 404 }
            );
        }

        if (existing._count.products > 0) {
            return NextResponse.json(
                { error: `Tidak bisa menghapus. Kategori masih memiliki ${existing._count.products} produk.` },
                { status: 400 }
            );
        }

        await prisma.category.delete({ where: { id } });

        return NextResponse.json(
            { message: "Kategori berhasil dihapus." },
            { status: 200 }
        );
    } catch (error) {
        console.error("[DELETE /api/categories/:id]", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

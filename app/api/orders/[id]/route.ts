import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { OrderStatus } from "@prisma/client";

type Params = { params: Promise<{ id: string }> };

// PATCH /api/orders/:id (update status, notes)
export async function PATCH(req: NextRequest, { params }: Params) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { status, notes, customerName, customerPhone } = body;

        const existing = await prisma.order.findUnique({ where: { id } });
        if (!existing) {
            return NextResponse.json(
                { error: "Order tidak ditemukan." },
                { status: 404 }
            );
        }

        if (status !== undefined && !Object.values(OrderStatus).includes(status)) {
            return NextResponse.json(
                { error: `Status tidak valid. Pilihan: ${Object.values(OrderStatus).join(", ")}` },
                { status: 400 }
            );
        }

        const updateData: Record<string, unknown> = {};
        if (status !== undefined) updateData.status = status;
        if (notes !== undefined) updateData.notes = notes;
        if (customerName !== undefined) updateData.customerName = customerName;
        if (customerPhone !== undefined) updateData.customerPhone = customerPhone;

        if (Object.keys(updateData).length === 0) {
            return NextResponse.json(
                { error: "Tidak ada field yang diupdate." },
                { status: 400 }
            );
        }

        const updated = await prisma.order.update({
            where: { id },
            data: updateData,
            include: {
                items: {
                    include: {
                        product: { select: { id: true, name: true } },
                    },
                },
            },
        });

        return NextResponse.json({ data: updated });
    } catch (error) {
        console.error("[PATCH /api/orders/:id]", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

// DELETE /api/orders/:id
export async function DELETE(_req: NextRequest, { params }: Params) {
    try {
        const { id } = await params;

        const existing = await prisma.order.findUnique({ where: { id } });
        if (!existing) {
            return NextResponse.json(
                { error: "Order tidak ditemukan." },
                { status: 404 }
            );
        }

        await prisma.order.delete({ where: { id } });

        return NextResponse.json(
            { message: "Order berhasil dihapus." },
            { status: 200 }
        );
    } catch (error) {
        console.error("[DELETE /api/orders/:id]", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

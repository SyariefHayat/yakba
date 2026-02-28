import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
type OrderStatus = "PENDING" | "CONTACTED" | "SUCCESS" | "CANCELED";

// GET /api/orders?page=1&limit=10&search=keyword&status=PENDING
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        const page = Math.max(1, Number(searchParams.get("page") ?? 1));
        const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit") ?? 10)));
        const search = searchParams.get("search") ?? "";
        const status = searchParams.get("status") as OrderStatus | null;

        const where = {
            ...(status && { status }),
            ...(search && {
                OR: [
                    { customerName: { contains: search, mode: "insensitive" as const } },
                    { customerPhone: { contains: search, mode: "insensitive" as const } },
                ],
            }),
        };

        const [orders, total] = await Promise.all([
            prisma.order.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: "desc" },
                include: {
                    items: {
                        include: {
                            product: {
                                select: { id: true, name: true, slug: true, type: true },
                            },
                        },
                    },
                },
            }),
            prisma.order.count({ where }),
        ]);

        // Add computed total for each order
        const ordersWithTotal = orders.map((order) => ({
            ...order,
            total: order.items.reduce(
                (sum: number, item: { quantity: number; priceAtOrder: number }) => sum + item.quantity * item.priceAtOrder,
                0
            ),
            itemCount: order.items.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0),
        }));

        return NextResponse.json({
            data: ordersWithTotal,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("[GET /api/orders]", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

// POST /api/orders
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { customerName, customerPhone, notes, items } = body;

        if (!customerName || !customerPhone) {
            return NextResponse.json(
                { error: "Nama dan nomor telepon pelanggan wajib diisi." },
                { status: 400 }
            );
        }

        if (!items || !Array.isArray(items) || items.length === 0) {
            return NextResponse.json(
                { error: "Order harus memiliki minimal 1 item." },
                { status: 400 }
            );
        }

        // Validate products exist and get prices
        const productIds = items.map((i: { productId: string }) => i.productId);
        const products = await prisma.product.findMany({
            where: { id: { in: productIds } },
            select: { id: true, price: true, discount: true },
        });

        const productMap = new Map(products.map((p) => [p.id, p]));

        for (const item of items) {
            if (!productMap.has(item.productId)) {
                return NextResponse.json(
                    { error: `Produk dengan ID ${item.productId} tidak ditemukan.` },
                    { status: 400 }
                );
            }
        }

        const order = await prisma.order.create({
            data: {
                customerName,
                customerPhone,
                notes: notes ?? null,
                items: {
                    create: items.map((item: { productId: string; quantity: number }) => {
                        const product = productMap.get(item.productId)!;
                        const finalPrice = product.discount
                            ? product.price - product.discount
                            : product.price;
                        return {
                            productId: item.productId,
                            quantity: item.quantity ?? 1,
                            priceAtOrder: finalPrice,
                        };
                    }),
                },
            },
            include: {
                items: {
                    include: {
                        product: { select: { id: true, name: true } },
                    },
                },
            },
        });

        return NextResponse.json({ data: order }, { status: 201 });
    } catch (error) {
        console.error("[POST /api/orders]", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

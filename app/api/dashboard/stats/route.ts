import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/dashboard/stats
export async function GET() {
    try {
        const [totalProducts, totalOrders, totalUsers, revenueResult] = await prisma.$transaction([
            prisma.product.count(),
            prisma.order.count(),
            prisma.user.count(),
            prisma.orderItem.findMany({
                select: {
                    quantity: true,
                    priceAtOrder: true,
                },
            }),
        ]);

        const totalRevenue = revenueResult.reduce(
            (sum, item) => sum + item.quantity * item.priceAtOrder,
            0
        );

        return NextResponse.json({
            totalProducts,
            totalOrders,
            totalUsers,
            totalRevenue,
        });
    } catch (error) {
        console.error("[GET /api/dashboard/stats]", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET /api/dashboard/transactions?days=90
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const days = Math.min(365, Math.max(7, Number(searchParams.get("days") ?? 90)));

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        startDate.setHours(0, 0, 0, 0);

        // Get all order items with their order date and product type
        const orderItems = await prisma.orderItem.findMany({
            where: {
                order: {
                    createdAt: { gte: startDate },
                },
            },
            select: {
                quantity: true,
                priceAtOrder: true,
                product: {
                    select: { type: true },
                },
                order: {
                    select: { createdAt: true },
                },
            },
        });

        // Group revenue by date and product type
        const dailyMap = new Map<string, { digital: number; physical: number }>();

        // Pre-fill all dates in the range so the chart has no gaps
        const now = new Date();
        for (let d = new Date(startDate); d <= now; d.setDate(d.getDate() + 1)) {
            const key = d.toISOString().split("T")[0];
            dailyMap.set(key, { digital: 0, physical: 0 });
        }

        for (const item of orderItems) {
            const dateKey = item.order.createdAt.toISOString().split("T")[0];
            const revenue = item.quantity * item.priceAtOrder;
            const entry = dailyMap.get(dateKey) ?? { digital: 0, physical: 0 };

            if (item.product.type === "DIGITAL") {
                entry.digital += revenue;
            } else {
                entry.physical += revenue;
            }

            dailyMap.set(dateKey, entry);
        }

        // Convert to sorted array
        const chartData = Array.from(dailyMap.entries())
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([date, values]) => ({
                date,
                digital: values.digital,
                physical: values.physical,
            }));

        // Calculate total revenue for the period
        const totalRevenue = orderItems.reduce(
            (sum, item) => sum + item.quantity * item.priceAtOrder,
            0
        );

        return NextResponse.json({ chartData, totalRevenue });
    } catch (error) {
        console.error("[GET /api/dashboard/transactions]", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

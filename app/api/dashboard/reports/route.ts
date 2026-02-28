import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET /api/dashboard/reports?days=30
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const days = Math.min(365, Math.max(7, Number(searchParams.get("days") ?? 30)));

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        startDate.setHours(0, 0, 0, 0);

        // 1. Order status breakdown
        const ordersByStatus = await prisma.order.groupBy({
            by: ["status"],
            _count: { id: true },
            where: { createdAt: { gte: startDate } },
        });

        // 2. Revenue over time (daily)
        const orderItems = await prisma.orderItem.findMany({
            where: { order: { createdAt: { gte: startDate } } },
            select: {
                quantity: true,
                priceAtOrder: true,
                product: { select: { name: true, type: true } },
                order: { select: { createdAt: true, status: true } },
            },
        });

        // Daily revenue
        const dailyRevenue = new Map<string, number>();
        const now = new Date();
        for (let d = new Date(startDate); d <= now; d.setDate(d.getDate() + 1)) {
            dailyRevenue.set(d.toISOString().split("T")[0], 0);
        }

        let totalRevenue = 0;
        let successRevenue = 0;
        const productRevenue = new Map<string, { name: string; revenue: number; qty: number }>();

        for (const item of orderItems) {
            const revenue = item.quantity * item.priceAtOrder;
            const dateKey = item.order.createdAt.toISOString().split("T")[0];
            totalRevenue += revenue;

            if (item.order.status === "SUCCESS") {
                successRevenue += revenue;
            }

            dailyRevenue.set(dateKey, (dailyRevenue.get(dateKey) ?? 0) + revenue);

            // Top products
            const existing = productRevenue.get(item.product.name);
            if (existing) {
                existing.revenue += revenue;
                existing.qty += item.quantity;
            } else {
                productRevenue.set(item.product.name, {
                    name: item.product.name,
                    revenue,
                    qty: item.quantity,
                });
            }
        }

        // Sort top products by revenue
        const topProducts = Array.from(productRevenue.values())
            .sort((a, b) => b.revenue - a.revenue)
            .slice(0, 5);

        // Revenue chart data
        const revenueChart = Array.from(dailyRevenue.entries())
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([date, revenue]) => ({ date, revenue }));

        // 3. Summary counts
        const [totalOrders, totalProducts, totalCategories, totalUsers] = await prisma.$transaction([
            prisma.order.count({ where: { createdAt: { gte: startDate } } }),
            prisma.product.count({ where: { isActive: true } }),
            prisma.category.count({ where: { isActive: true } }),
            prisma.user.count(),
        ]);

        // Status breakdown formatted
        const statusBreakdown = [
            { status: "PENDING", label: "Pending", count: 0 },
            { status: "CONTACTED", label: "Dihubungi", count: 0 },
            { status: "SUCCESS", label: "Sukses", count: 0 },
            { status: "CANCELED", label: "Dibatalkan", count: 0 },
        ];
        for (const s of ordersByStatus) {
            const found = statusBreakdown.find((sb) => sb.status === s.status);
            if (found) found.count = s._count.id;
        }

        return NextResponse.json({
            totalRevenue,
            successRevenue,
            totalOrders,
            totalProducts,
            totalCategories,
            totalUsers,
            statusBreakdown,
            topProducts,
            revenueChart,
        });
    } catch (error) {
        console.error("[GET /api/dashboard/reports]", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/categories
export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            where: { isActive: true },
            orderBy: { name: "asc" },
            select: {
                id: true,
                name: true,
                slug: true,
            },
        });

        return NextResponse.json({ data: categories });
    } catch (error) {
        console.error("[GET /api/categories]", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

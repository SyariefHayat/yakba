import prisma from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { ProductType } from "@prisma/client";

type Params = { params: Promise<{ id: string }> };

/**
 * Extract Cloudinary public_id from a secure_url.
 * e.g. "https://res.cloudinary.com/xxx/image/upload/v123/yakba/products/abc.jpg"
 *  → "yakba/products/abc"
 */
function extractPublicId(url: string): string | null {
    try {
        const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.\w+$/);
        return match?.[1] ?? null;
    } catch {
        return null;
    }
}

async function deleteCloudinaryImages(imageUrls: string[]) {
    const publicIds = imageUrls
        .map(extractPublicId)
        .filter((id): id is string => id !== null);

    await Promise.allSettled(
        publicIds.map((id) => cloudinary.uploader.destroy(id))
    );
}

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

        const existing = await prisma.product.findUnique({
            where: { id },
            include: { images: { select: { imageUrl: true } } },
        });
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

        // Handle images if provided
        const imageUrls: string[] | undefined = body.imageUrls;

        // Find removed images to delete from Cloudinary
        let removedImageUrls: string[] = [];
        if (imageUrls !== undefined) {
            const newSet = new Set(imageUrls);
            removedImageUrls = existing.images
                .map((img) => img.imageUrl)
                .filter((url) => !newSet.has(url));
        }

        const updated = await prisma.$transaction(async (tx) => {
            if (imageUrls !== undefined) {
                // Delete all existing images and re-create with the new list
                await tx.productImage.deleteMany({ where: { productId: id } });

                if (imageUrls.length > 0) {
                    await tx.productImage.createMany({
                        data: imageUrls.map((url: string) => ({
                            imageUrl: url,
                            productId: id,
                        })),
                    });
                }
            }

            return tx.product.update({
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
                    images: { select: { id: true, imageUrl: true } },
                },
            });
        });

        // Delete removed images from Cloudinary (after DB transaction succeeds)
        if (removedImageUrls.length > 0) {
            await deleteCloudinaryImages(removedImageUrls);
        }

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

        const existing = await prisma.product.findUnique({
            where: { id },
            include: { images: { select: { imageUrl: true } } },
        });
        if (!existing) {
            return NextResponse.json(
                { error: "Produk tidak ditemukan." },
                { status: 404 }
            );
        }

        // Collect image URLs before deletion
        const imageUrlsToDelete = existing.images.map((img) => img.imageUrl);

        // Delete in correct order to avoid foreign key constraints
        await prisma.$transaction(async (tx) => {
            await tx.orderItem.deleteMany({ where: { productId: id } });
            await tx.productImage.deleteMany({ where: { productId: id } });
            await tx.productDetail.deleteMany({ where: { productId: id } });
            await tx.product.delete({ where: { id } });
        });

        // Delete images from Cloudinary after DB cleanup
        if (imageUrlsToDelete.length > 0) {
            await deleteCloudinaryImages(imageUrlsToDelete);
        }

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

import bcrypt from "bcryptjs";
import { Role, ProductType, OrderStatus } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("🌱 Seeding database...");

    const hashedPassword = await bcrypt.hash("password123", 12);

    await prisma.user.upsert({
        where: { email: "admin@example.com" },
        update: {},
        create: {
            name: "Admin Dev",
            email: "admin@example.com",
            password: hashedPassword,
            role: Role.ADMIN,
        },
    });

    await prisma.user.upsert({
        where: { email: "user@example.com" },
        update: {},
        create: {
            name: "Regular User",
            email: "user@example.com",
            password: hashedPassword,
            role: Role.USER,
        },
    });

    const ebookCategory = await prisma.category.upsert({
        where: { slug: "ebook" },
        update: {},
        create: {
            name: "E-Book",
            slug: "ebook",
        },
    });

    const courseCategory = await prisma.category.upsert({
        where: { slug: "online-course" },
        update: {},
        create: {
            name: "Online Course",
            slug: "online-course",
        },
    });

    const merchCategory = await prisma.category.upsert({
        where: { slug: "merchandise" },
        update: {},
        create: {
            name: "Merchandise",
            slug: "merchandise",
        },
    });

    const ebook = await prisma.product.upsert({
        where: { slug: "panduan-fullstack" },
        update: {},
        create: {
            name: "Panduan Fullstack Developer",
            slug: "panduan-fullstack",
            description: "Ebook lengkap belajar fullstack dari nol.",
            price: 100000,
            discount: 20,
            type: ProductType.DIGITAL,
            categoryId: ebookCategory.id,
            detail: {
                create: {
                    fileUrl: "https://example.com/files/fullstack.pdf",
                },
            },
            images: {
                create: [
                    { imageUrl: "https://example.com/images/ebook1.jpg" },
                ],
            },
        },
    });

    const course = await prisma.product.upsert({
        where: { slug: "nextjs-masterclass" },
        update: {},
        create: {
            name: "Next.js Masterclass",
            slug: "nextjs-masterclass",
            description: "Belajar Next.js sampai production ready.",
            price: 500000,
            discount: 10,
            type: ProductType.DIGITAL,
            categoryId: courseCategory.id,
            detail: {
                create: {
                    fileUrl: "https://example.com/files/nextjs-course.zip",
                },
            },
            images: {
                create: [
                    { imageUrl: "https://example.com/images/course1.jpg" },
                ],
            },
        },
    });

    const tshirt = await prisma.product.upsert({
        where: { slug: "tshirt-dev" },
        update: {},
        create: {
            name: "T-Shirt Developer",
            slug: "tshirt-dev",
            description: "Kaos premium untuk developer sejati.",
            price: 150000,
            type: ProductType.PHYSICAL,
            categoryId: merchCategory.id,
            detail: {
                create: {
                    stock: 50,
                    weight: 300,
                },
            },
            images: {
                create: [
                    { imageUrl: "https://example.com/images/tshirt.jpg" },
                ],
            },
        },
    });

    const finalEbookPrice =
        ebook.discount
            ? ebook.price - (ebook.price * ebook.discount) / 100
            : ebook.price;

    const finalTshirtPrice =
        tshirt.discount
            ? tshirt.price - (tshirt.price * tshirt.discount) / 100
            : tshirt.price;

    await prisma.order.create({
        data: {
            customerName: "Budi Santoso",
            customerPhone: "081234567890",
            status: OrderStatus.PENDING,
            items: {
                create: [
                    {
                        productId: ebook.id,
                        quantity: 1,
                        priceAtOrder: finalEbookPrice,
                    },
                    {
                        productId: tshirt.id,
                        quantity: 2,
                        priceAtOrder: finalTshirtPrice,
                    },
                ],
            },
        },
    });

    console.log("✅ Seed berhasil dan data dummy siap digunakan!");
}

main()
    .catch((e) => {
        console.error("❌ Seed gagal:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
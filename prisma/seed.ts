import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
    const hashedPassword = await bcrypt.hash("password123", 12);

    const users = [
        {
            name: "Dev Xy",
            email: "admin@example.com",
            password: hashedPassword,
            role: Role.ADMIN,
        },
        {
            name: "John Doe",
            email: "john@example.com",
            password: hashedPassword,
            role: Role.USER,
        },
    ];

    for (const user of users) {
        await prisma.user.upsert({
            where: { email: user.email },
            update: {},
            create: user,
        });
    }

    console.log("✅ Seed berhasil!");
}

main()
    .catch((e) => {
        console.error("❌ Seed gagal:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
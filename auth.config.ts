import bcrypt from "bcryptjs";
import prisma from "./lib/prisma";
import { signInSchema } from "./lib/zod";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default {
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (Credentials) => {
                const parsed = signInSchema.safeParse(Credentials);
                if (!parsed.success) return null;

                const { email, password } = parsed.data;

                const user = await prisma.user.findUnique({
                    where: { email },
                });

                if (!user || !user.password) return null;

                const isPasswordValid = await bcrypt.compare(
                    password,
                    user.password as string,
                );
                if (!isPasswordValid) return null;

                return user;
            },
        }),
    ],
} satisfies NextAuthConfig;
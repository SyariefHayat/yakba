import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import NextAuth from "next-auth";
import User from "./models/User";
import connectDB from "./lib/mongodb";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { label: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        const email = credentials?.email;
        const password = credentials?.password;

        if (
          !email ||
          !password ||
          typeof email !== "string" ||
          typeof password !== "string"
        ) {
          throw new Error("Email dan password wajib diisi");
        }

        const user = await User.findOne({ email });

        if (!user) {
          return null;
        }

        if (!user.password || typeof user.password !== "string") {
          return null;
        }

        if (!user.emailVerified) {
          return null;
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          return null;
        }

        return {
          id: String(user._id),
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        await connectDB();

        if (!user.email) return false;

        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            emailVerified: new Date(),
          });
        }

        if (existingUser && !existingUser.emailVerified) {
          existingUser.emailVerified = new Date();
          await existingUser.save();
        }
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.picture as string;
      }
      return session;
    },
  },
});

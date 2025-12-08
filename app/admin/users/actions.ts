"use server";

import User from "@/models/User";
import { revalidatePath } from "next/cache";
import connectDB from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function getUsers(role?: string, page: number = 1, limit: number = 10) {
    try {
        await connectDB();
        const query = role ? { role } : {};
        const skip = (page - 1) * limit;

        const users = await User.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await User.countDocuments(query);
        const totalPages = Math.ceil(total / limit);

        // Convert _id and dates to string/ISO format for serialization
        const serializedUsers = users.map((user) => ({
            ...user,
            _id: user._id.toString(),
            createdAt: user.createdAt.toString(),
            updatedAt: user.updatedAt.toString(),
            emailVerified: user.emailVerified ? user.emailVerified.toString() : null,
        }));

        return {
            success: true,
            data: serializedUsers,
            pagination: {
                total,
                totalPages,
                currentPage: page,
                limit,
            },
        };
    } catch (error) {
        console.error("Error fetching users:", error);
        return { success: false, error: "Failed to fetch users" };
    }
}

export async function createUser(data: any) {
    try {
        await connectDB();
        const { name, email, password, role } = data;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return { success: false, error: "Email already exists" };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || "user",
        });

        revalidatePath("/admin/users/admin");
        revalidatePath("/admin/users/guru");
        return { success: true, data: JSON.parse(JSON.stringify(newUser)) };
    } catch (error) {
        console.error("Error creating user:", error);
        return { success: false, error: "Failed to create user" };
    }
}

export async function updateUser(id: string, data: any) {
    try {
        await connectDB();
        const { name, email, password, role } = data;

        const updateData: any = { name, email, role };
        if (password && password.trim() !== "") {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(id, updateData, {
            new: true,
        }).lean();

        if (!updatedUser) {
            return { success: false, error: "User not found" };
        }

        revalidatePath("/admin/users/admin");
        revalidatePath("/admin/users/guru");

        return { success: true, data: JSON.parse(JSON.stringify(updatedUser)) };
    } catch (error) {
        console.error("Error updating user:", error);
        return { success: false, error: "Failed to update user" };
    }
}

export async function deleteUser(id: string) {
    try {
        await connectDB();
        await User.findByIdAndDelete(id);

        revalidatePath("/admin/users/admin");
        revalidatePath("/admin/users/guru");
        return { success: true };
    } catch (error) {
        console.error("Error deleting user:", error);
        return { success: false, error: "Failed to delete user" };
    }
}

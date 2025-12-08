import React from "react";
import connectDB from "@/lib/mongodb";
import Message, { IMessage } from "@/models/Message";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageRow } from "./message-row";

// Helper to serialize Mongoose doc
const serializeMessage = (doc: any): IMessage => {
    return {
        _id: doc._id.toString(),
        name: doc.name,
        email: doc.email,
        subject: doc.subject,
        message: doc.message,
        status: doc.status,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
    };
};

export default async function MessagesPage() {
    await connectDB();
    const rawMessages = await Message.find({}).sort({ createdAt: -1 });
    const messages = rawMessages.map(serializeMessage);

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Pesan Masuk</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Daftar Pesan</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tanggal</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead>Subjek</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {messages.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center h-24">
                                        Belum ada pesan masuk.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                messages.map((msg) => (
                                    <MessageRow key={msg._id?.toString()} message={msg} />
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

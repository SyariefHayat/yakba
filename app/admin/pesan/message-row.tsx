"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, CheckCircle, MailOpen } from "lucide-react";
import { IMessage } from "@/models/Message";
import { deleteMessage, updateMessageStatus } from "./actions";
import { toast } from "sonner";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";

interface MessageRowProps {
    message: IMessage;
}

export function MessageRow({ message }: MessageRowProps) {
    const handleDelete = async () => {
        if (confirm("Apakah Anda yakin ingin menghapus pesan ini?")) {
            const result = await deleteMessage(message._id as string);
            if (result.success) {
                toast.success("Pesan berhasil dihapus");
            } else {
                toast.error("Gagal menghapus pesan");
            }
        }
    };

    const handleMarkRead = async () => {
        const newStatus = message.status === "unread" ? "read" : "unread";
        const result = await updateMessageStatus(message._id as string, newStatus);
        if (result.success) {
            toast.success(`Status diubah menjadi ${newStatus}`);
        } else {
            toast.error("Gagal mengubah status");
        }
    };

    return (
        <TableRow>
            <TableCell className="font-medium">
                {message.createdAt
                    ? format(new Date(message.createdAt), "dd MMM yyyy HH:mm", { locale: idLocale })
                    : "-"}
            </TableCell>
            <TableCell>
                <div className="flex flex-col">
                    <span className="font-semibold">{message.name}</span>
                    <span className="text-xs text-muted-foreground">{message.email}</span>
                </div>
            </TableCell>
            <TableCell>
                <div className="max-w-[300px] truncate" title={message.message}>
                    <div className="font-medium">{message.subject}</div>
                    <div className="text-xs text-muted-foreground truncate">{message.message}</div>
                </div>
            </TableCell>
            <TableCell>
                <Badge
                    variant={
                        message.status === "unread"
                            ? "destructive"
                            : message.status === "replied"
                                ? "secondary"
                                : "outline"
                    }
                >
                    {message.status === "unread"
                        ? "Belum Dibaca"
                        : message.status === "read"
                            ? "Sudah Dibaca"
                            : "Dibalas"}
                </Badge>
            </TableCell>
            <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleMarkRead}
                        title={message.status === "unread" ? "Tandai sudah dibaca" : "Tandai belum dibaca"}
                    >
                        {message.status === "unread" ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                            <MailOpen className="h-4 w-4 text-gray-400" />
                        )}
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleDelete}
                        title="Hapus Pesan"
                    >
                        <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    );
}

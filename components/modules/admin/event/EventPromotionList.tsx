"use client";

import * as React from "react";
import { toast } from "sonner";
import Link from "next/link";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";

import {
    ArrowUpDown,
    ChevronDown,
    Columns2,
    MoreHorizontal,
    Plus,
    Loader2,
} from "lucide-react";

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table";

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { TableSkeleton } from "@/components/modules/admin/event/TableSkeleton";

export type EventPromotionType = "event" | "promotion";

export type EventPromotion = {
    _id: string;
    title: string;
    slug: string;
    type: EventPromotionType;
    description: string;
    startDate?: string;
    endDate?: string;
    location?: string;
    price?: number;
    isActive: boolean;
    isFeatured: boolean;
    createdAt: string;
};

interface EventPromotionListProps {
    filterType?: EventPromotionType;
    title?: string;
}

export function EventPromotionList({ filterType, title = "Event & Promosi" }: EventPromotionListProps) {
    const [events, setEvents] = React.useState<EventPromotion[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const getEventData = async () => {
        try {
            setIsLoading(true);
            const res = await fetch("/api/event");
            if (!res.ok) throw new Error("Gagal mengambil daftar event");
            const data: EventPromotion[] = await res.json();

            if (filterType) {
                setEvents(data.filter(item => item.type === filterType));
            } else {
                setEvents(data);
            }
        } catch (error) {
            console.error(error);
            toast.error("Terjadi kesalahan saat memuat data");
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        getEventData();
    }, [filterType]);

    const handleDelete = async (id: string) => {
        if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) return;

        try {
            const res = await fetch(`/api/event/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Gagal menghapus data");

            setEvents((prev) => prev.filter((item) => item._id !== id));
            toast.success("Data berhasil dihapus");
        } catch (error) {
            console.error(error);
            toast.error("Gagal menghapus data");
        }
    };

    const columns = React.useMemo<ColumnDef<EventPromotion>[]>(
        () => [
            {
                accessorKey: "title",
                header: ({ column }) => (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Judul
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
            },
            {
                accessorKey: "type",
                header: "Tipe",
                cell: ({ row }) => {
                    const type = row.getValue("type") as string;
                    return (
                        <Badge variant={type === "event" ? "default" : "secondary"}>
                            {type === "event" ? "Acara" : "Promosi"}
                        </Badge>
                    );
                },
            },
            {
                accessorKey: "startDate",
                header: "Tanggal Mulai",
                cell: ({ row }) => {
                    const date = row.getValue("startDate") as string;
                    if (!date) return "-";
                    try {
                        return format(new Date(date), "dd MMM yyyy, HH:mm", { locale: idLocale });
                    } catch (e) {
                        return "-";
                    }
                },
            },

            {
                accessorKey: "location",
                header: "Lokasi",
                cell: ({ row }) => row.getValue("location") || "-",
            },
            {
                accessorKey: "price",
                header: "Harga",
                cell: ({ row }) => {
                    const price = row.getValue("price") as number;
                    return price > 0 ? `Rp ${price.toLocaleString("id-ID")}` : "Gratis";
                },
            },
            {
                accessorKey: "isActive",
                header: "Status",
                cell: ({ row }) => (
                    <Badge variant={row.getValue("isActive") ? "outline" : "destructive"}>
                        {row.getValue("isActive") ? "Aktif" : "Non-Aktif"}
                    </Badge>
                ),
            },
            {
                id: "actions",
                enableHiding: false,
                cell: ({ row }) => {
                    const event = row.original;

                    return (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                                <DropdownMenuItem
                                    onClick={() => navigator.clipboard.writeText(event._id)}
                                    className="cursor-pointer"
                                >
                                    Copy ID
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href={`/admin/event/${event._id}/edit`} className="cursor-pointer">
                                        Edit Data
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer text-red-600 focus:text-red-600"
                                    onClick={() => handleDelete(event._id)}
                                >
                                    Hapus
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    );
                },
            },
        ],
        []
    );

    const table = useReactTable({
        data: events,
        columns,
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="w-full px-4">
            <div className="flex items-center justify-between space-y-2 py-4">
                <h2 className="text-xl font-bold tracking-tight">{title}</h2>
            </div>
            <div className="sm:flex justify-between items-center py-4">
                <Input
                    placeholder="Filter judul..."
                    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("title")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <div className="flex sm:gap-5 sm:mt-0 gap-3 mt-3">
                    <Link href={`/admin/event/new${filterType ? `?type=${filterType}` : ''}`}>
                        <Button variant="outline" className="ml-auto cursor-pointer">
                            <Plus className="mr-2 h-4 w-4" /> Tambah Data
                        </Button>
                    </Link>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                <Columns2 className="mr-2 h-4 w-4" /> Kolom <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id === 'title' ? 'Judul' : column.id}
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableSkeleton rows={5} columns={columns.length} />
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Tidak ada data {filterType === 'promotion' ? 'promosi' : (filterType === 'event' ? 'event' : 'event/promosi')}.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="text-muted-foreground flex-1 text-sm">
                    Menampilkan {table.getState().pagination.pageSize} dari{" "}
                    {table.getFilteredRowModel().rows.length} data.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="cursor-pointer"
                    >
                        Sebelumnya
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="cursor-pointer"
                    >
                        Selanjutnya
                    </Button>
                </div>
            </div>
        </div>
    );
}

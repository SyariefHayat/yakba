"use client";

import * as React from "react";
import { toast } from "sonner";
import Link from "next/link";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import {
    ArrowUpDown,
    ChevronDown,
    Columns2,
    MoreHorizontal,
    Search,
    Download,
    Eye
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
import { TableSkeleton } from "@/components/modules/admin/products/TableSkeleton"; // Reusing skeleton

// Dummy data type
export type Sale = {
    id: string;
    invoice: string;
    customerName: string;
    customerEmail: string;
    items: string[];
    totalAmount: number;
    status: "pending" | "paid" | "failed" | "refunded";
    createdAt: Date;
};

// Dummy data
const DUMMY_SALES: Sale[] = [
    {
        id: "1",
        invoice: "INV-20241208-001",
        customerName: "Budi Santoso",
        customerEmail: "budi@example.com",
        items: ["Kursus React JS Masterclass"],
        totalAmount: 150000,
        status: "paid",
        createdAt: new Date("2024-12-08T08:00:00"),
    },
    {
        id: "2",
        invoice: "INV-20241207-005",
        customerName: "Siti Aminah",
        customerEmail: "siti@example.com",
        items: ["Ebook JavaScript Advanced"],
        totalAmount: 75000,
        status: "pending",
        createdAt: new Date("2024-12-07T14:30:00"),
    },
    {
        id: "3",
        invoice: "INV-20241206-012",
        customerName: "Joko Anwar",
        customerEmail: "joko@example.com",
        items: ["Bootcamp Fullstack"],
        totalAmount: 2500000,
        status: "paid",
        createdAt: new Date("2024-12-06T09:15:00"),
    },
    {
        id: "4",
        invoice: "INV-20241205-003",
        customerName: "Rina Nose",
        customerEmail: "rina@example.com",
        items: ["Kursus React JS Masterclass", "Ebook CSS Magic"],
        totalAmount: 200000,
        status: "failed",
        createdAt: new Date("2024-12-05T18:20:00"),
    },
];

export default function SalesListPage() {
    const [data, setData] = React.useState<Sale[]>(DUMMY_SALES);
    const [isLoading, setIsLoading] = React.useState(false); // Can be true if real fetching

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const columns = React.useMemo<ColumnDef<Sale>[]>(
        () => [
            {
                accessorKey: "invoice",
                header: "Invoice",
                cell: ({ row }) => <div className="font-medium">{row.getValue("invoice")}</div>,
            },
            {
                accessorKey: "customerName",
                header: ({ column }) => (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Customer
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                cell: ({ row }) => (
                    <div className="flex flex-col">
                        <span className="font-medium">{row.getValue("customerName")}</span>
                        <span className="text-xs text-muted-foreground">{row.original.customerEmail}</span>
                    </div>
                )
            },
            {
                id: "items",
                header: "Item",
                cell: ({ row }) => {
                    const items = row.original.items;
                    return (
                        <div className="text-sm">
                            {items[0]}
                            {items.length > 1 && <span className="text-xs text-muted-foreground"> +{items.length - 1} lainnya</span>}
                        </div>
                    )
                }
            },
            {
                accessorKey: "totalAmount",
                header: "Total",
                cell: ({ row }) => {
                    const amount = parseFloat(row.getValue("totalAmount"));
                    const formatted = new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                    }).format(amount);
                    return <div>{formatted}</div>;
                },
            },
            {
                accessorKey: "createdAt",
                header: "Tanggal",
                cell: ({ row }) => {
                    return <div>{format(row.original.createdAt, "dd MMM yyyy HH:mm", { locale: id })}</div>
                }
            },
            {
                accessorKey: "status",
                header: "Status",
                cell: ({ row }) => {
                    const status = row.getValue("status") as string;
                    let variant: "default" | "secondary" | "destructive" | "outline" = "outline";
                    let className = "capitalize";

                    if (status === "paid") {
                        variant = "default";
                        className += " bg-green-600 hover:bg-green-700"; // Custom green for paid
                    }
                    if (status === "pending") variant = "secondary";
                    if (status === "failed") variant = "destructive";
                    if (status === "refunded") {
                        variant = "outline";
                        className += " text-orange-500 border-orange-500";
                    }

                    return <Badge variant={variant} className={className}>{status}</Badge>;
                },
            },
            {
                id: "actions",
                enableHiding: false,
                cell: ({ row }) => {
                    const sale = row.original;

                    return (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                                <DropdownMenuItem
                                    onClick={() => navigator.clipboard.writeText(sale.invoice)}
                                >
                                    Copy Invoice
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Eye className="mr-2 h-4 w-4" /> Lihat Detail
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Download className="mr-2 h-4 w-4" /> Download Invoice
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
        data,
        columns,
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
        <div className="w-full p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Data Penjualan</h1>
                    <p className="text-muted-foreground">Riwayat transaksi pembelian produk digital.</p>
                </div>
            </div>

            <div className="flex items-center justify-between py-4 gap-4">
                <div className="relative max-w-sm w-full">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Cari customer atau invoice..."
                        value={(table.getColumn("customerName")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("customerName")?.setFilterValue(event.target.value)
                        }
                        className="pl-9"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                <Columns2 className="mr-2 h-4 w-4" />
                                Kolom <ChevronDown className="ml-2 h-4 w-4" />
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
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" /> Export
                    </Button>
                </div>
            </div>

            <div className="rounded-md border">
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
                                    Tidak ada data penjualan.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}

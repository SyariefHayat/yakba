"use client";

import * as React from "react";
import { toast } from "sonner";
import Link from "next/link";

import {
    ArrowUpDown,
    ChevronDown,
    Columns2,
    MoreHorizontal,
    Plus,
    Search,
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
import { TableSkeleton } from "@/components/modules/admin/products/TableSkeleton";

export type Product = {
    _id: string;
    name: string;
    slug: string;
    price: number;
    stock: number;
    sku: string;
    category: string;
    status: "active" | "draft" | "archived";
    images: string[];
    createdAt: string;
};

export default function ProductListPage() {
    const [products, setProducts] = React.useState<Product[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    React.useEffect(() => {
        const getProductData = async () => {
            try {
                setIsLoading(true);

                const res = await fetch("/api/products");

                if (!res.ok) toast.error("Gagal mengambil daftar produk");

                const data: Product[] = await res.json();

                setProducts(data);
            } catch (error) {
                console.error(error);
                toast.error("Terjadi kesalahan saat memuat produk");
            } finally {
                setIsLoading(false);
            }
        };

        getProductData();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Apakah Anda yakin ingin menghapus produk ini?")) return;

        try {
            const res = await fetch(`/api/products/${id}`, { // Need to implement DELETE route later or if strictly following user instructions I focus on UI only but functionality implies it. user didn't ask for DELETE route yet, but UI has the button.
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Gagal menghapus produk");

            setProducts((prev) => prev.filter((p) => p._id !== id));
            toast.success("Produk berhasil dihapus");
        } catch (error) {
            console.error(error);
            toast.error("Belum ada endpoint delete / Gagal menghapus produk");
        }
    };

    const columns = React.useMemo<ColumnDef<Product>[]>(
        () => [
            {
                accessorKey: "name",
                header: ({ column }) => (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Nama Produk
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                cell: ({ row }) => (
                    <div className="flex flex-col">
                        <span className="font-medium">{row.getValue("name")}</span>
                        <span className="text-xs text-muted-foreground">{row.original.sku}</span>
                    </div>
                )
            },
            {
                accessorKey: "category",
                header: "Kategori",
            },
            {
                accessorKey: "price",
                header: "Harga",
                cell: ({ row }) => {
                    const price = parseFloat(row.getValue("price"));
                    const formatted = new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                    }).format(price);
                    return <div>{formatted}</div>;
                },
            },
            {
                accessorKey: "stock",
                header: "Stok",
            },
            {
                accessorKey: "status",
                header: "Status",
                cell: ({ row }) => {
                    const status = row.getValue("status") as string;
                    let variant: "default" | "secondary" | "destructive" | "outline" = "outline";
                    if (status === "active") variant = "default";
                    if (status === "draft") variant = "secondary";
                    if (status === "archived") variant = "destructive";

                    return <Badge variant={variant} className="capitalize">{status}</Badge>;
                },
            },
            {
                id: "actions",
                enableHiding: false,
                cell: ({ row }) => {
                    const product = row.original;

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
                                    onClick={() => navigator.clipboard.writeText(product._id)}
                                >
                                    Copy ID
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href={`/admin/produk/${product._id}/edit`}>Edit Produk</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDelete(product._id)} className="text-red-600 focus:text-red-600">
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
        data: products,
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
                    <h1 className="text-2xl font-bold tracking-tight">Daftar Produk</h1>
                    <p className="text-muted-foreground">Kelola katalog produk digital Anda di sini.</p>
                </div>
            </div>

            <div className="flex items-center justify-between py-4 gap-4">
                <div className="relative max-w-sm w-full">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Cari nama produk..."
                        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("name")?.setFilterValue(event.target.value)
                        }
                        className="pl-9"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Button asChild>
                        <Link href="/admin/produk/new">
                            <Plus className="mr-2 h-4 w-4" /> Tambah Produk
                        </Link>
                    </Button>

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
                            <TableSkeleton rows={8} columns={columns.length} />
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
                                    Tidak ada produk ditemukan.
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

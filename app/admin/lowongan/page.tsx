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

export type Job = {
    _id: string;
    title: string;
    slug: string;
    location: string;
    type: "full-time" | "part-time" | "contract" | "internship";
    status: "active" | "closed" | "draft";
    postedDate: string;
    closingDate?: string;
};

export default function JobListPage() {
    const [jobs, setJobs] = React.useState<Job[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    React.useEffect(() => {
        const getJobData = async () => {
            try {
                setIsLoading(true);

                const res = await fetch("/api/jobs");

                if (!res.ok) toast.error("Gagal mengambil daftar lowongan");

                const data: Job[] = await res.json();

                setJobs(data);
            } catch (error) {
                console.error(error);
                toast.error("Terjadi kesalahan saat memuat lowongan");
            } finally {
                setIsLoading(false);
            }
        };

        getJobData();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Apakah Anda yakin ingin menghapus lowongan ini?")) return;

        try {
            const res = await fetch(`/api/jobs/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Gagal menghapus lowongan");

            setJobs((prev) => prev.filter((j) => j._id !== id));
            toast.success("Lowongan berhasil dihapus");
        } catch (error) {
            console.error(error);
            toast.error("Gagal menghapus lowongan");
        }
    };

    const columns = React.useMemo<ColumnDef<Job>[]>(
        () => [
            {
                accessorKey: "title",
                header: ({ column }) => (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Judul Lowongan
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                cell: ({ row }) => (
                    <div className="flex flex-col">
                        <span className="font-medium">{row.getValue("title")}</span>
                        <span className="text-xs text-muted-foreground">{row.original.location}</span>
                    </div>
                )
            },
            {
                accessorKey: "type",
                header: "Tipe",
                cell: ({ row }) => {
                    const type = row.getValue("type") as string;
                    const typeLabels: Record<string, string> = {
                        "full-time": "Full Time",
                        "part-time": "Part Time",
                        "contract": "Kontrak",
                        "internship": "Magang"
                    };
                    return <div className="capitalize">{typeLabels[type] || type}</div>;
                },
            },
            {
                accessorKey: "postedDate",
                header: "Tanggal Posting",
                cell: ({ row }) => {
                    const date = new Date(row.getValue("postedDate"));
                    return <div>{date.toLocaleDateString("id-ID")}</div>;
                },
            },
            {
                accessorKey: "status",
                header: "Status",
                cell: ({ row }) => {
                    const status = row.getValue("status") as string;
                    let variant: "default" | "secondary" | "destructive" | "outline" = "outline";
                    if (status === "active") variant = "default";
                    if (status === "draft") variant = "secondary";
                    if (status === "closed") variant = "destructive";

                    const statusLabels: Record<string, string> = {
                        "active": "Aktif",
                        "draft": "Draft",
                        "closed": "Ditutup"
                    };

                    return <Badge variant={variant} className="capitalize">{statusLabels[status] || status}</Badge>;
                },
            },
            {
                id: "actions",
                enableHiding: false,
                cell: ({ row }) => {
                    const job = row.original;

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
                                    onClick={() => navigator.clipboard.writeText(job._id)}
                                >
                                    Copy ID
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href={`/admin/lowongan/${job._id}/edit`}>Edit Lowongan</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDelete(job._id)} className="text-red-600 focus:text-red-600">
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
        data: jobs,
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
                    <h1 className="text-2xl font-bold tracking-tight">Daftar Lowongan</h1>
                    <p className="text-muted-foreground">Kelola lowongan pekerjaan di sini.</p>
                </div>
            </div>

            <div className="flex items-center justify-between py-4 gap-4">
                <div className="relative max-w-sm w-full">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Cari judul lowongan..."
                        value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("title")?.setFilterValue(event.target.value)
                        }
                        className="pl-9"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Button asChild>
                        <Link href="/admin/lowongan/new">
                            <Plus className="mr-2 h-4 w-4" /> Tambah Lowongan
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
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Memuat...
                                </TableCell>
                            </TableRow>
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
                                    Tidak ada lowongan ditemukan.
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

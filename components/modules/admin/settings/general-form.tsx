"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

const generalFormSchema = z.object({
    siteName: z.string().min(2, {
        message: "Nama situs harus minimal 2 karakter.",
    }),
    description: z.string().max(160).min(4),
    supportEmail: z.string().email(),
    address: z.string().optional(),
})

type GeneralFormValues = z.infer<typeof generalFormSchema>

// This can come from your database or API.
const defaultValues: Partial<GeneralFormValues> = {
    siteName: "Yakba",
    description: "Platform edukasi dan manajemen sekolah.",
    supportEmail: "support@yakba.com",
}

export function GeneralForm() {
    const form = useForm<GeneralFormValues>({
        resolver: zodResolver(generalFormSchema),
        defaultValues,
        mode: "onChange",
    })

    function onSubmit(data: GeneralFormValues) {
        toast.success("Pengaturan berhasil disimpan", {
            description: "Perubahan pada pengaturan umum telah diterapkan.",
        })
        console.log(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="siteName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nama Situs</FormLabel>
                            <FormControl>
                                <Input placeholder="Nama Situs Anda" {...field} />
                            </FormControl>
                            <FormDescription>
                                Ini adalah nama yang akan ditampilkan di halaman utama dan meta title.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Deskripsi</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Deskripsi singkat tentang situs anda"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Deskripsi ini akan digunakan untuk meta description dan SEO.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="supportEmail"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email Support</FormLabel>
                            <FormControl>
                                <Input placeholder="support@domain.com" {...field} />
                            </FormControl>
                            <FormDescription>
                                Email yang akan ditampilkan di halaman kontak.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Alamat</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Alamat kantor..."
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Alamat fisik kantor atau operasional.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Simpan Perubahan</Button>
            </form>
        </Form>
    )
}

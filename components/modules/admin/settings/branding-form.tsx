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
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

const brandingFormSchema = z.object({
    logoUrl: z.string().url({ message: "URL logo tidak valid." }).optional().or(z.literal("")),
    faviconUrl: z.string().url({ message: "URL favicon tidak valid." }).optional().or(z.literal("")),
    primaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
        message: "Format warna harus Hex code (contoh: #FF0000).",
    }),
})

type BrandingFormValues = z.infer<typeof brandingFormSchema>

const defaultValues: Partial<BrandingFormValues> = {
    logoUrl: "",
    faviconUrl: "",
    primaryColor: "#0f172a",
}

export function BrandingForm() {
    const form = useForm<BrandingFormValues>({
        resolver: zodResolver(brandingFormSchema),
        defaultValues,
        mode: "onChange",
    })

    function onSubmit(data: BrandingFormValues) {
        toast.success("Branding berhasil disimpan", {
            description: "Perubahan pada branding telah diterapkan.",
        })
        console.log(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="logoUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Logo URL</FormLabel>
                            <FormControl>
                                <div className="flex gap-4 items-end">
                                    <Input placeholder="https://example.com/logo.png" {...field} />
                                    {field.value && (
                                        <div className="h-10 w-10 relative flex-shrink-0 border rounded overflow-hidden">
                                            <img src={field.value} alt="Logo Preview" className="h-full w-full object-contain" />
                                        </div>
                                    )}
                                </div>
                            </FormControl>
                            <FormDescription>
                                URL gambar untuk logo utama aplikasi.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="faviconUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Favicon URL</FormLabel>
                            <FormControl>
                                <div className="flex gap-4 items-end">
                                    <Input placeholder="https://example.com/favicon.ico" {...field} />
                                    {field.value && (
                                        <div className="h-10 w-10 relative flex-shrink-0 border rounded overflow-hidden p-2 bg-slate-100">
                                            <img src={field.value} alt="Favicon Preview" className="h-full w-full object-contain" />
                                        </div>
                                    )}
                                </div>
                            </FormControl>
                            <FormDescription>
                                URL gambar untuk icon browser (favicon).
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="primaryColor"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Warna Utama</FormLabel>
                            <FormControl>
                                <div className="flex gap-2 items-center">
                                    <div
                                        className="w-10 h-10 rounded border shadow-sm flex-shrink-0"
                                        style={{ backgroundColor: field.value }}
                                    />
                                    <Input placeholder="#000000" {...field} />
                                </div>
                            </FormControl>
                            <FormDescription>
                                Kode warna HEX untuk tema utama aplikasi.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Simpan Branding</Button>
            </form>
        </Form>
    )
}

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
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

const integrasiFormSchema = z.object({
    enablePaymentGateway: z.boolean().default(false),
    paymentGatewayApiKey: z.string().optional(),
    enableEmailService: z.boolean().default(false),
    emailServiceApiKey: z.string().optional(),
    whatsappApiKey: z.string().optional(),
})

type IntegrasiFormValues = z.infer<typeof integrasiFormSchema>

const defaultValues: Partial<IntegrasiFormValues> = {
    enablePaymentGateway: false,
    enableEmailService: true,
}

export function IntegrasiForm() {
    const form = useForm({
        resolver: zodResolver(integrasiFormSchema),
        defaultValues,
        mode: "onChange",
    })

    function onSubmit(data: IntegrasiFormValues) {
        toast.success("Integrasi berhasil disimpan", {
            description: "Pengaturan integrasi API telah diperbarui.",
        })
        console.log(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Payment Gateway (Midtrans/Xendit)</h3>
                    <FormField
                        control={form.control}
                        name="enablePaymentGateway"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base">Aktifkan Pembayaran</FormLabel>
                                    <FormDescription>
                                        Izinkan pengguna melakukan pembayaran online.
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {form.watch("enablePaymentGateway") && (
                        <FormField
                            control={form.control}
                            name="paymentGatewayApiKey"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>API Key Payment Gateway</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="sk_test_..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Service (Resend/SendGrid)</h3>
                    <FormField
                        control={form.control}
                        name="enableEmailService"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base">Aktifkan Email Notifikasi</FormLabel>
                                    <FormDescription>
                                        Kirim email notifikasi transaksi dan sistem.
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {form.watch("enableEmailService") && (
                        <FormField
                            control={form.control}
                            name="emailServiceApiKey"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>API Key Email Service</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="re_..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Whatsapp Gateway (Wablas/Fonnte)</h3>
                    <FormField
                        control={form.control}
                        name="whatsappApiKey"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>API Token Whatsapp</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Token..." {...field} />
                                </FormControl>
                                <FormDescription>
                                    Digunakan untuk notifikasi via WhatsApp.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button type="submit">Simpan Integrasi</Button>
            </form>
        </Form>
    )
}

import { SettingsHeader } from "@/components/modules/admin/settings/settings-header"
import { IntegrasiForm } from "@/components/modules/admin/settings/integrasi-form"

export default function IntegrasiSettingsPage() {
    return (
        <div className="space-y-6">
            <SettingsHeader
                heading="Integrasi API"
                text="Kelola koneksi dengan layanan pihak ketiga."
            />
            <IntegrasiForm />
        </div>
    )
}

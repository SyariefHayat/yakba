import { SettingsHeader } from "@/components/modules/admin/settings/settings-header"
import { GeneralForm } from "@/components/modules/admin/settings/general-form"

export default function GeneralSettingsPage() {
    return (
        <div className="space-y-6">
            <SettingsHeader
                heading="Pengaturan Umum"
                text="Kelola informasi dasar dan konfigurasi situs anda."
            />
            <GeneralForm />
        </div>
    )
}

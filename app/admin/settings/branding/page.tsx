import { SettingsHeader } from "@/components/modules/admin/settings/settings-header"
import { BrandingForm } from "@/components/modules/admin/settings/branding-form"

export default function BrandingSettingsPage() {
    return (
        <div className="space-y-6">
            <SettingsHeader
                heading="Brand & Tampilan"
                text="Sesuaikan logo, ikon, dan warna tema aplikasi."
            />
            <BrandingForm />
        </div>
    )
}

import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Settings",
    description: "Manage your account settings and preferences.",
}

interface SettingsLayoutProps {
    children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
    return (
        <div className="p-8 max-w-5xl mx-auto">
            {children}
        </div>
    )
}

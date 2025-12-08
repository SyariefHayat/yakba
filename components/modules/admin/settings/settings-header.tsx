import { Separator } from "@/components/ui/separator"

interface SettingsHeaderProps {
    heading: string
    text?: string
}

export function SettingsHeader({ heading, text }: SettingsHeaderProps) {
    return (
        <div className="space-y-2">
            <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">{heading}</h2>
                {text && <p className="text-muted-foreground">{text}</p>}
            </div>
            <Separator className="my-6" />
        </div>
    )
}

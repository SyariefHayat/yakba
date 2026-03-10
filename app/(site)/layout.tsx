import Navbar from "@/components/modules/shared/navbar";

export default function SiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <header>
                <Navbar />
            </header>
            {children}
        </>
    );
}

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

const landingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <SidebarInset>
                {/* <Navbar /> */}
                {children}
            </SidebarInset>
            {/* <AppSidebar /> */}
        </SidebarProvider>
    )
}

export default landingLayout
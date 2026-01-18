import Navbar from "@/components/layouts/landingLayout/Navbar"
import { AppSidebar } from "@/components/modules/landing/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

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
import React from 'react'
import { AppSidebar } from '@/components/modules/dashboard/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Providers } from '@/components/providers';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Providers>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    {children}
                </SidebarInset>
            </SidebarProvider>
        </Providers>
    )
}

export default DashboardLayout;

// "use client";

// import { Button } from "@/components/ui/button";
// import { logoutAction } from "../action/auth";
// import { toast } from "sonner";
// import { isRedirectError } from "next/dist/client/components/redirect-error";
// import { Toaster } from "@/components/ui/sonner";

// const page = () => {
//     const handleLogout = async () => {
//         toast.promise(
//             logoutAction()
//                 .then((result) => {
//                     if (result?.error) throw new Error(result.error);
//                 })
//                 .catch((err) => {
//                     if (isRedirectError(err)) return;
//                     throw err;
//                 }),
//             {
//                 loading: "Logging out...",
//                 success: "Berhasil logout",
//                 error: (err) => err.message ?? "Gagal logout",
//             },
//         );
//     };
//     return (
//         <div>
//             <Toaster />
//             <h1 className="text-2xl font-bold">Dashboard</h1>
//             <p>Welcome to your dashboard!</p>
//             <Button onClick={handleLogout} className="cursor-pointer">
//                 Logout
//             </Button>
//         </div>
//     );
// };

// export default page;

import { AppSidebar } from "@/components/modules/dashboard/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Build Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

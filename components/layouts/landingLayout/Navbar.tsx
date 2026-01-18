import { SidebarTrigger } from "@/components/ui/sidebar"
import Image from "next/image"

const Navbar = () => {
    return (
        <nav className="absolute top-0 left-0 right-0 z-50 border py-5">
            <div className="flex justify-between items-center border">
                <Image src="/logo.png" alt="Logo" width={70} height={70} />
                <div>
                    <SidebarTrigger />
                </div>
            </div>
        </nav>
    )
}

export default Navbar
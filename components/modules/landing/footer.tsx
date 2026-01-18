import Image from "next/image"
import Link from "next/link"

// Interface untuk footer link
interface FooterLink {
    label: string
    href: string
    icon?: string  // Optional icon untuk social media
}

// Interface untuk footer column
interface FooterColumn {
    title: string
    links: FooterLink[]
    isSocialMedia?: boolean  // Flag untuk menandai kolom social media
}

// Data footer columns (termasuk Social Media)
const FOOTER_COLUMNS: FooterColumn[] = [
    {
        title: "Navigation",
        links: [
            { label: "Homepage", href: "/" },
            { label: "Our Mission", href: "/mission" },
            { label: "Our Journey", href: "/journey" },
            { label: "Contact Us", href: "/contact" },
        ],
    },
    {
        title: "Programs",
        links: [
            { label: "Toddlers", href: "/programs/toddlers" },
            { label: "Preschool", href: "/programs/preschool" },
            { label: "Kindergarten", href: "/programs/kindergarten" },
            { label: "Others", href: "/programs/others" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About Us", href: "/about" },
            { label: "Features", href: "/features" },
            { label: "Careers", href: "/careers" },
            { label: "Blog", href: "/blog" },
        ],
    },
    {
        title: "Social Media",
        isSocialMedia: true,
        links: [
            { label: "WhatsApp", href: "#", icon: "/wa-icon.png" },
            { label: "TikTok", href: "#", icon: "/tiktok-icon.png" },
            { label: "Instagram", href: "#", icon: "/ig-icon.png" },
            { label: "YouTube", href: "#", icon: "/yt-icon.png" },
            { label: "Facebook", href: "#", icon: "/fb-icon.png" },
            { label: "Lemon8", href: "#", icon: "/lemon8-icon.png" },
        ],
    },
]

// Data bottom links
const BOTTOM_LINKS = [
    { label: "Term & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
]

const Footer = () => {
    return (
        <footer className="w-full pb-5 px-4 md:px-10">
            {/* Footer Links Grid */}
            <div className="
                w-[90%] md:w-full 
                grid grid-cols-2 md:grid-cols-4
                items-start justify-between 
                gap-8 md:gap-0 pl-7 lg:pl-30
            ">
                {/* All Columns (including Social Media) */}
                {FOOTER_COLUMNS.map((column, index) => (
                    <FooterColumn key={index} {...column} />
                ))}
            </div>

            {/* Bottom Bar */}
            <div className="
                w-[90%]
                mt-10 lg:mt-15 mx-auto 
                flex flex-col md:flex-row 
                items-center justify-center md:justify-between 
                gap-2 md:gap-0
                font-poppins text-xs md:text-sm text-center
            ">
                <p>© 2025 Yakba Learning Center. All rights reserved.</p>
                <div className="flex gap-4">
                    {BOTTOM_LINKS.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="hover:underline cursor-pointer"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    )
}

// Komponen untuk setiap column (link atau social media)
const FooterColumn = ({ title, links, isSocialMedia = false }: FooterColumn) => {
    return (
        <div className="w-full">
            <h3 className="text-xl md:text-2xl font-mochi-boom text-[#1F3B5A]">
                {title}
            </h3>

            {isSocialMedia ? (
                // Render Social Media Icons
                <div className="w-40 mt-2 grid grid-cols-3 gap-5 md:gap-4">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="hover:opacity-80 transition-opacity cursor-pointer"
                        >
                            <Image
                                src={link.icon || ""}
                                alt={link.label}
                                width={40}
                                height={40}
                                className="w-8 h-8 md:w-10 md:h-10"
                            />
                        </Link>
                    ))}
                </div>
            ) : (
                // Render Regular Links
                <ul className="text-base md:text-lg font-poppins space-y-1 md:space-y-2 mt-2">
                    {links.map((link, index) => (
                        <li key={index}>
                            <Link
                                href={link.href}
                                className="hover:underline cursor-pointer"
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Footer

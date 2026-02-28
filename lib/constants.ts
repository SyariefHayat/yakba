export const COLORS = {
    green: "#7CBF25",
    pink: "#EE2D70",
    blue: "#1B83C8",
    navy: "#1F3B5A",
} as const

// Huruf YAKBA dengan warnanya
export const YAKBA_LETTERS = [
    { letter: "Y", color: COLORS.pink },
    { letter: "A", color: COLORS.green },
    { letter: "K", color: COLORS.blue },
    { letter: "B", color: COLORS.pink },
    { letter: "A", color: COLORS.green },
] as const

export const MENU_ITEMS = [
    { label: "Beranda", href: "/" },
    { label: "Tentang Kami", href: "/about" },
    { label: "Program", href: "/programs" },
    { label: "Artikel", href: "/article" },
    { label: "Galeri", href: "/gallery" },
    { label: "Fasilitas", href: "/facilities" },
    { label: "Product", href: "/product" },
    { label: "Tentor", href: "/tentor" },
    { label: "Peluang Usaha", href: "/mitra" },
    { label: "Event Promosi", href: "/event" },
    { label: "Hubungi Kami", href: "/contact" },
] as const
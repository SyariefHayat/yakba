// Konstanta warna brand YAKBA
export const COLORS = {
    green: "#7CBF25",
    pink: "#EE2D70",
    blue: "#1B83C8",
    navy: "#1F3B5A",
} as const

// Huruf YAKBA dengan warnanya
export const YAKBA_LETTERS = [
    { letter: "A", color: COLORS.green },
    { letter: "K", color: COLORS.pink },
    { letter: "B", color: COLORS.blue },
    { letter: "A", color: COLORS.green },
] as const

// Menu items untuk sidebar navigasi
export const MENU_ITEMS = [
    { label: "Beranda", href: "/" },
    { label: "Artikel", href: "/article" },
    { label: "Galeri", href: "/gallery" },
    { label: "Fasilitas", href: "/facilities" },
    { label: "Product", href: "/product" },
    { label: "Tentor", href: "/tentor" },
    { label: "Peluang Usaha", href: "/mitra" },
    { label: "Event Promosi", href: "/event" },
    { label: "Hubungi Kami", href: "/contact" },
] as const

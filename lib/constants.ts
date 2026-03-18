export const MENU_ITEMS = [
  { label: "Beranda", href: "/" },
  { label: "Tentang Kami", href: "/about" },
  { label: "Product", href: "/product" },
  { label: "Program", href: "/program" },
  { label: "Mitra", href: "/mitra" },
] as const;

export const FEATURES_ITEMS = [
  {
    id: "video-belajar-anak",
    title: "Video Belajar Anak",
    description:
      "Konten video yang membantu anak menghafal doa dan memahami nilai Islam dengan mudah.",
    imageAlt: "Ilustrasi video belajar anak",
    isReverse: false,
  },
  {
    id: "materi-terstruktur",
    title: "Materi Terstruktur",
    description:
      "Materi disusun bertahap dan mudah diikuti oleh anak usia dini.",
    imageAlt: "Ilustrasi materi terstruktur",
    isReverse: true,
  },
  {
    id: "untuk-orang-tua-&-guru",
    title: "Untuk Orang Tua & Guru",
    description:
      "Cocok digunakan untuk belajar di rumah maupun di sekolah / TPA.",
    imageAlt: "Ilustrasi untuk orang tua & guru",
    isReverse: false,
  },
];

export const PROGRAM_ITEMS = [
  {
    id: "doa-harian-anak",
    title: "Doa Harian Anak",
    description:
      "Membantu anak menghafal doa sehari-hari dengan cara yang mudah dan menyenangkan.",
  },
  {
    id: "belajar-mengaji",
    title: "Belajar Mengaji",
    description:
      "Mengenal huruf hijaiyah dan membaca Al-Qur'an dengan dasar tajwid.",
  },
  {
    id: "aktivitas-kreatif-anak",
    title: "Aktivitas Kreatif Anak",
    description:
      "Menggambar, bercerita, dan bermain untuk mengembangkan imajinasi dan kepercayaan diri.",
  },
];

export const PRODUCT_ITEMS = [
  {
    id: "doa-harian-anak",
    title: "Video Doa Harian Anak",
    description:
      "Video animasi yang membantu anak menghafal doa sehari-hari dengan mudah.",
    icon: "🎬",
    color: "#FF6B6B",
  },
  {
    id: "belajar-mengaji",
    title: "Buku Aktivitas Islami",
    description:
      "Buku mewarnai yang mengenalkan huruf hijaiyah, doa, dan kisah nabi melalui aktivitas kreatif.",
    icon: "🎨",
    color: "#0474BE",
  },
  {
    id: "aktivitas-kreatif-anak",
    title: "Merchandise Yakba",
    description:
      "Produk eksklusif Yakba seperti kaos dan tas dengan desain islami untuk anak.",
    icon: "👕",
    color: "#E85206",
  },
  // {
  //   id: "flashcard-hijaiyah",
  //   title: "Flashcard Hijaiyah",
  //   description:
  //     "Kartu belajar huruf hijaiyah interaktif yang membantu anak mengenal dan menghafal huruf Arab.",
  //   icon: "🃏",
  //   color: "#1A9F4A",
  // },
];

export const FOOTER_ITEMS = [
  {
    title: "Navigasi",
    links: [
      { label: "Beranda", href: "/" },
      { label: "Tentang Kami", href: "/about" },
      { label: "Program", href: "/programs" },
      { label: "Hubungi Kami", href: "/contact" },
    ],
  },
  {
    title: "Program",
    links: [
      { label: "Kreativitas Seni", href: "/programs/kreativitas-seni" },
      { label: "Belajar Mengaji", href: "/programs/belajar-mengaji" },
      { label: "Kelas Bahasa", href: "/programs/kelas-bahasa" },
      { label: "Lihat Semua", href: "/programs" },
    ],
  },
  {
    title: "Lainnya",
    links: [
      { label: "Artikel", href: "/article" },
      { label: "Galeri", href: "/gallery" },
      { label: "Fasilitas", href: "/facilities" },
      { label: "Tentor", href: "/tentor" },
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
];

export const BOTTOM_LINKS = [
  { label: "Syarat & Ketentuan", href: "/terms" },
  { label: "Kebijakan Privasi", href: "/privacy" },
];

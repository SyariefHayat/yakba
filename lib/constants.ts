export const MENU_ITEMS = [
  { label: "Beranda", href: "/" },
  { label: "Tentang Kami", href: "/about" },
  { label: "Product", href: "/product" },
  { label: "Program", href: "/program" },
  { label: "Mitra", href: "/mitra" },
] as const;

export const FEATURES_ITEMS = [
  {
    id: "interactive-learning",
    title: "Belajar Interaktif",
    description:
      "Belajar aktif yang menumbuhkan rasa ingin tahu dan percaya diri.",
    imageAlt: "Ilustrasi belajar interaktif",
    isReverse: false,
  },
  {
    id: "islamic-curriculum",
    title: "Kurikulum Islami & Bahasa Arab",
    description:
      "Pembelajaran nilai Islam dan Bahasa Arab sejak dini untuk membentuk akhlak dan dasar berbahasa anak.",
    imageAlt: "Ilustrasi kurikulum Islami dan Bahasa Arab",
    isReverse: true,
  },
  {
    id: "flexible-learning",
    title: "Fleksibel & Terukur",
    description:
      "Pilihan kelas online dan offline dengan perkembangan anak yang nyata dan terpantau.",
    imageAlt: "Ilustrasi pembelajaran fleksibel",
    isReverse: false,
  },
];

export const PROGRAM_ITEMS = [
  {
    id: "kreativitas-seni",
    title: "Kreativitas Seni",
    description:
      "Menggambar, melukis, membuat prakarya untuk mengasah kreativitas anak.",
  },
  {
    id: "belajar-mengaji",
    title: "Belajar Mengaji",
    description: "Program intensif mengaji dengan metode tahsin dan tajwid.",
  },
  {
    id: "kelas-bahasa",
    title: "Kelas Bahasa",
    description: "Belajar bahasa asing dengan pendekatan permainan interaktif.",
  },
];

export const PRODUCT_ITEMS = [
  {
    id: "buku-mewarnai",
    title: "Buku Mewarnai",
    description:
      "Buku mewarnai islami yang mengajarkan huruf hijaiyah, doa harian, dan kisah nabi melalui aktivitas kreatif.",
    icon: "🎨",
    color: "#FF6B6B",
  },
  {
    id: "video-doa",
    title: "Video Doa-Doa",
    description:
      "Koleksi video animasi doa harian anak dengan visualisasi menarik dan pengucapan yang mudah diikuti.",
    icon: "🎬",
    color: "#0474BE",
  },
  {
    id: "merch-yakba",
    title: "Merch Yakba",
    description:
      "Merchandise resmi Yakba — kaos, topi, dan tas eksklusif dengan desain edukatif dan islami.",
    icon: "👕",
    color: "#E85206",
  },
  {
    id: "flashcard-hijaiyah",
    title: "Flashcard Hijaiyah",
    description:
      "Kartu belajar huruf hijaiyah interaktif yang membantu anak mengenal dan menghafal huruf Arab.",
    icon: "🃏",
    color: "#1A9F4A",
  },
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

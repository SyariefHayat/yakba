import { title } from "process";

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

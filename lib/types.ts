import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { PortableTextBlock } from "next-sanity";

// Category
export interface Category {
    _id: string;
    name: string;
    slug: { current: string };
}

// WhatsApp CTA
export interface WhatsappCta {
    enabled: boolean;
    intent: "beli" | "tanya";
    buttonLabel: string;
    messageTemplate: string;
}

// SEO
export interface Seo {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: SanityImageSource;
}

// Product
export interface Product {
    _id: string;
    name: string;
    slug: { current: string };
    type: "digital" | "fisik";
    category: Category;
    shortDescription: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    description: any[];
    price: number;
    discount?: number;
    currency: string;
    media: SanityImageSource[];
    stock?: number;
    isPublished: boolean;
    whatsappCta: WhatsappCta;
    seo?: Seo;
}

// Program
export interface Program {
    _id: string;
    name: string;
    slug: { current: string };
    targetAgeRange: string;
    learningOutcomes: string[];
    scheduleModel: string;
    curriculumSummary: PortableTextBlock[];
    heroImage?: SanityImageSource;
    isPublished: boolean;
    whatsappCta: WhatsappCta;
    seo?: Seo;
}

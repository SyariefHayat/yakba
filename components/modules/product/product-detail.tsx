"use client";

import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { urlFor } from "@/sanity/lib/image";
import type { Product } from "@/lib/types";
import { PortableText } from "next-sanity";
import Star from "../elements/star";

interface ProductDetailProps {
    product: Product;
}

function formatPrice(price: number, currency: string = "IDR"): string {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
}

function getDiscountedPrice(price: number, discount?: number): number {
    if (!discount) return price;
    return price - (price * discount) / 100;
}

function buildWhatsAppUrl(product: Product): string {
    const cta = product.whatsappCta;
    if (!cta?.enabled) return "/contact";

    const message = (cta.messageTemplate || "")
        .replace("{{itemName}}", product.name)
        .replace("{{intent}}", cta.intent === "beli" ? "membeli" : "bertanya tentang");

    // Use a generic WhatsApp link (no phone number hardcoded here, can be configured)
    return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    const hasDiscount = product.discount && product.discount > 0;
    const finalPrice = getDiscountedPrice(product.price, product.discount);

    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.2 });

        if (imageRef.current) {
            tl.fromTo(
                imageRef.current,
                { x: -40, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
            );
        }

        if (contentRef.current) {
            tl.fromTo(
                contentRef.current,
                { x: 40, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
                "-=0.4"
            );
        }

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <section className="w-full bg-white pt-28 md:pt-32 pb-20 md:pb-28 px-6 md:px-12 lg:px-20 relative overflow-hidden">
            {/* Decorative stars */}
            <Star delay={0.5} className="top-[8%] right-[5%] hidden lg:block" />
            <Star delay={1.2} className="top-[15%] left-[3%] hidden lg:block" />

            <div className="max-w-6xl mx-auto">
                {/* Breadcrumb */}
                <nav className="mb-8">
                    <ol className="flex items-center gap-2 font-poppins text-sm text-[#1A3F26]/50">
                        <li>
                            <Link href="/" className="hover:text-[#1A3F26] transition-colors">
                                Beranda
                            </Link>
                        </li>
                        <li>/</li>
                        <li>
                            <Link
                                href="/product"
                                className="hover:text-[#1A3F26] transition-colors"
                            >
                                Produk
                            </Link>
                        </li>
                        <li>/</li>
                        <li className="text-[#1A3F26] font-medium truncate max-w-[200px]">
                            {product.name}
                        </li>
                    </ol>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                    {/* Image Gallery */}
                    <div ref={imageRef} style={{ opacity: 0 }}>
                        {/* Main Image */}
                        <div className="relative aspect-square rounded-3xl overflow-hidden bg-[#FFF9E0] mb-4 border-2 border-gray-100">
                            {product.media && product.media.length > 0 ? (
                                <Image
                                    src={urlFor(product.media[selectedImage])
                                        .width(800)
                                        .height(800)
                                        .url()}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    priority
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <svg
                                        viewBox="0 0 64 64"
                                        className="w-24 h-24 text-[#1A3F26]/15"
                                        fill="currentColor"
                                    >
                                        <rect x="8" y="12" width="48" height="40" rx="4" />
                                    </svg>
                                </div>
                            )}

                            {/* Discount badge */}
                            {hasDiscount && (
                                <div className="absolute top-4 right-4">
                                    <span className="bg-[#E85206] text-white text-sm font-bold px-3 py-1.5 rounded-full">
                                        -{product.discount}%
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Thumbnail strip */}
                        {product.media && product.media.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-2">
                                {product.media.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all duration-200 ${selectedImage === index
                                                ? "border-[#E85206] shadow-md"
                                                : "border-gray-200 hover:border-[#FFD502]"
                                            }`}
                                    >
                                        <Image
                                            src={urlFor(img).width(160).height(160).url()}
                                            alt={`${product.name} - ${index + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="80px"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div ref={contentRef} style={{ opacity: 0 }}>
                        {/* Badges */}
                        <div className="flex items-center gap-3 mb-4">
                            <span
                                className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide ${product.type === "digital"
                                        ? "bg-[#0474BE]/10 text-[#0474BE]"
                                        : "bg-[#E85206]/10 text-[#E85206]"
                                    }`}
                            >
                                {product.type}
                            </span>
                            {product.category && (
                                <span className="text-xs font-semibold text-[#1A3F26]/50 uppercase tracking-wide">
                                    {product.category.name}
                                </span>
                            )}
                        </div>

                        {/* Name */}
                        <h1 className="font-mochi text-3xl md:text-4xl lg:text-5xl text-[#1A3F26] mb-4 leading-tight">
                            {product.name}
                        </h1>

                        {/* Short description */}
                        <p className="font-poppins text-base md:text-lg text-[#1A3F26]/65 mb-6 leading-relaxed">
                            {product.shortDescription}
                        </p>

                        {/* Price */}
                        <div className="bg-[#FFF9E0] rounded-2xl p-6 mb-6">
                            <div className="flex items-baseline gap-3">
                                <span className="font-poppins text-3xl md:text-4xl font-bold text-[#1A3F26]">
                                    {formatPrice(finalPrice, product.currency)}
                                </span>
                                {hasDiscount && (
                                    <span className="font-poppins text-lg text-[#1A3F26]/35 line-through">
                                        {formatPrice(product.price, product.currency)}
                                    </span>
                                )}
                            </div>
                            {hasDiscount && (
                                <p className="font-poppins text-sm text-[#E85206] font-semibold mt-1">
                                    Hemat{" "}
                                    {formatPrice(
                                        product.price - finalPrice,
                                        product.currency
                                    )}
                                </p>
                            )}
                        </div>

                        {/* Stock */}
                        {product.type === "fisik" && product.stock !== undefined && (
                            <div className="flex items-center gap-2 mb-6">
                                <div
                                    className={`w-2.5 h-2.5 rounded-full ${product.stock > 0 ? "bg-green-500" : "bg-red-500"
                                        }`}
                                />
                                <span className="font-poppins text-sm font-medium text-[#1A3F26]/70">
                                    {product.stock > 0
                                        ? `Stok tersedia: ${product.stock}`
                                        : "Stok habis"}
                                </span>
                            </div>
                        )}

                        {/* WhatsApp CTA */}
                        {product.whatsappCta?.enabled && (
                            <a
                                href={buildWhatsAppUrl(product)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 w-full sm:w-auto justify-center bg-[#1A3F26] hover:bg-[#1A3F26]/90 text-white font-bold text-base md:text-lg px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#1A3F26]/20 hover:-translate-y-0.5 active:translate-y-0 mb-4"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    className="w-5 h-5"
                                    fill="currentColor"
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                {product.whatsappCta.buttonLabel || "Hubungi via WhatsApp"}
                            </a>
                        )}

                        {/* Back link */}
                        <Link
                            href="/product"
                            className="inline-flex items-center gap-2 font-poppins text-sm font-semibold text-[#1A3F26]/50 hover:text-[#1A3F26] transition-colors"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                            Kembali ke Katalog
                        </Link>
                    </div>
                </div>

                {/* Full Description */}
                {product.description && product.description.length > 0 && (
                    <div className="mt-16 max-w-3xl">
                        <h2 className="font-mochi text-2xl md:text-3xl text-[#1A3F26] mb-6">
                            Deskripsi Produk
                        </h2>
                        <div className="font-poppins text-base text-[#1A3F26]/75 leading-relaxed prose prose-headings:text-[#1A3F26] prose-headings:font-poppins prose-strong:text-[#1A3F26] prose-a:text-[#0474BE] max-w-none">
                            <PortableText value={product.description} />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProductDetail;

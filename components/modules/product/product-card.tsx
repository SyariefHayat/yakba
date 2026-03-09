"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import type { Product } from "@/lib/types";

interface ProductCardProps {
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

const ProductCard = ({ product }: ProductCardProps) => {
    const hasDiscount = product.discount && product.discount > 0;
    const finalPrice = getDiscountedPrice(product.price, product.discount);
    const imageUrl =
        product.media && product.media.length > 0
            ? urlFor(product.media[0]).width(600).height(600).url()
            : null;

    return (
        <Link
            href={`/product/${product.slug.current}`}
            className="group block bg-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-[#FFD502] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
            {/* Image */}
            <div className="relative aspect-square overflow-hidden bg-[#FFF9E0]">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <svg
                            viewBox="0 0 64 64"
                            className="w-16 h-16 text-[#1A3F26]/20"
                            fill="currentColor"
                        >
                            <rect x="8" y="12" width="48" height="40" rx="4" />
                            <circle cx="24" cy="28" r="6" fill="white" opacity="0.5" />
                            <path d="M8 44l16-12 12 8 12-16 8 10v18H8z" fill="white" opacity="0.3" />
                        </svg>
                    </div>
                )}

                {/* Type Badge */}
                <div className="absolute top-3 left-3">
                    <span
                        className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide ${product.type === "digital"
                                ? "bg-[#0474BE] text-white"
                                : "bg-[#E85206] text-white"
                            }`}
                    >
                        {product.type === "digital" ? (
                            <svg viewBox="0 0 16 16" className="w-3 h-3" fill="currentColor">
                                <path d="M2 3a1 1 0 011-1h10a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1V3zm4 11h4v1H6v-1z" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 16 16" className="w-3 h-3" fill="currentColor">
                                <path d="M4 2a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H4zm1 3h6v1H5V5zm0 3h6v1H5V8zm0 3h4v1H5v-1z" />
                            </svg>
                        )}
                        {product.type}
                    </span>
                </div>

                {/* Discount Badge */}
                {hasDiscount && (
                    <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center bg-[#E85206] text-white text-xs font-bold px-2.5 py-1.5 rounded-full">
                            -{product.discount}%
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5">
                {/* Category */}
                {product.category && (
                    <span className="inline-block text-xs font-semibold text-[#0474BE] uppercase tracking-wide mb-2">
                        {product.category.name}
                    </span>
                )}

                {/* Name */}
                <h3 className="font-poppins text-lg font-bold text-[#1A3F26] mb-2 line-clamp-2 group-hover:text-[#E85206] transition-colors duration-300">
                    {product.name}
                </h3>

                {/* Short Description */}
                <p className="font-poppins text-sm text-[#1A3F26]/60 mb-4 line-clamp-2">
                    {product.shortDescription}
                </p>

                {/* Price */}
                <div className="flex items-center gap-2">
                    <span className="font-poppins text-lg font-bold text-[#1A3F26]">
                        {formatPrice(finalPrice, product.currency)}
                    </span>
                    {hasDiscount && (
                        <span className="font-poppins text-sm text-[#1A3F26]/40 line-through">
                            {formatPrice(product.price, product.currency)}
                        </span>
                    )}
                </div>

                {/* Stock indicator for fisik */}
                {product.type === "fisik" && product.stock !== undefined && (
                    <div className="mt-2">
                        <span
                            className={`text-xs font-medium ${product.stock > 0 ? "text-green-600" : "text-red-500"
                                }`}
                        >
                            {product.stock > 0 ? `Stok: ${product.stock}` : "Stok habis"}
                        </span>
                    </div>
                )}
            </div>
        </Link>
    );
};

export default ProductCard;

"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState, useCallback } from "react";
import type { Product, Category } from "@/lib/types";
import ProductCard from "./product-card";

gsap.registerPlugin(ScrollTrigger);

interface ProductCatalogProps {
    products: Product[];
    categories: Category[];
}

type FilterType = "semua" | "digital" | "fisik";

const ProductCatalog = ({ products, categories }: ProductCatalogProps) => {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const [activeType, setActiveType] = useState<FilterType>("semua");
    const [activeCategory, setActiveCategory] = useState<string>("semua");

    const filteredProducts = products.filter((product) => {
        const typeMatch = activeType === "semua" || product.type === activeType;
        const categoryMatch =
            activeCategory === "semua" || product.category?._id === activeCategory;
        return typeMatch && categoryMatch;
    });

    // Animate cards when filter changes
    const animateCards = useCallback(() => {
        if (!gridRef.current) return;
        const cards = gridRef.current.querySelectorAll("[data-product-card]");
        gsap.fromTo(
            cards,
            { y: 30, opacity: 0, scale: 0.95 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.4,
                stagger: 0.08,
                ease: "back.out(1.2)",
            }
        );
    }, []);

    useEffect(() => {
        animateCards();
    }, [activeType, activeCategory, animateCards]);

    // Initial scroll-triggered animation
    useEffect(() => {
        if (!sectionRef.current || !headingRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
            },
        });

        tl.fromTo(
            headingRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
        );

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="w-full bg-white py-16 md:py-24 lg:py-28 px-6 md:px-12 lg:px-20"
        >
            <div className="max-w-6xl mx-auto">
                {/* Header + Filters */}
                <div ref={headingRef} className="mb-12" style={{ opacity: 0 }}>
                    {/* Section heading */}
                    <div className="text-center mb-10">
                        <h2 className="font-mochi text-3xl md:text-4xl text-[#1A3F26] mb-3">
                            Jelajahi Produk
                        </h2>
                        <div className="w-16 h-1.5 bg-[#E85206] rounded-full mx-auto" />
                    </div>

                    {/* Type Filter */}
                    <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
                        {(["semua", "digital", "fisik"] as FilterType[]).map((type) => (
                            <button
                                key={type}
                                onClick={() => setActiveType(type)}
                                className={`font-poppins text-sm md:text-base font-semibold px-5 py-2.5 rounded-full transition-all duration-300 capitalize ${activeType === type
                                        ? "bg-[#1A3F26] text-white shadow-lg shadow-[#1A3F26]/20"
                                        : "bg-[#1A3F26]/5 text-[#1A3F26]/70 hover:bg-[#1A3F26]/10"
                                    }`}
                            >
                                {type === "semua" ? "Semua Tipe" : `Produk ${type}`}
                            </button>
                        ))}
                    </div>

                    {/* Category Filter */}
                    {categories.length > 0 && (
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            <button
                                onClick={() => setActiveCategory("semua")}
                                className={`font-poppins text-xs md:text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 ${activeCategory === "semua"
                                        ? "bg-[#E85206] text-white"
                                        : "bg-gray-100 text-[#1A3F26]/60 hover:bg-gray-200"
                                    }`}
                            >
                                Semua Kategori
                            </button>
                            {categories.map((category) => (
                                <button
                                    key={category._id}
                                    onClick={() => setActiveCategory(category._id)}
                                    className={`font-poppins text-xs md:text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 ${activeCategory === category._id
                                            ? "bg-[#E85206] text-white"
                                            : "bg-gray-100 text-[#1A3F26]/60 hover:bg-gray-200"
                                        }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Grid */}
                <div ref={gridRef}>
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {filteredProducts.map((product) => (
                                <div key={product._id} data-product-card>
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#FFD502]/20 rounded-full mb-6">
                                <svg
                                    viewBox="0 0 48 48"
                                    className="w-10 h-10 text-[#1A3F26]/30"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                >
                                    <circle cx="20" cy="20" r="14" />
                                    <path d="M30 30l10 10" strokeLinecap="round" />
                                </svg>
                            </div>
                            <h3 className="font-poppins text-xl font-bold text-[#1A3F26]/50 mb-2">
                                Produk Tidak Ditemukan
                            </h3>
                            <p className="font-poppins text-sm text-[#1A3F26]/40">
                                Coba ubah filter untuk melihat lebih banyak produk.
                            </p>
                        </div>
                    )}
                </div>

                {/* Product count */}
                {filteredProducts.length > 0 && (
                    <div className="text-center mt-10">
                        <p className="font-poppins text-sm text-[#1A3F26]/40">
                            Menampilkan{" "}
                            <span className="font-semibold text-[#1A3F26]/60">
                                {filteredProducts.length}
                            </span>{" "}
                            produk
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProductCatalog;

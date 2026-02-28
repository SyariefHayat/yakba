"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { COLORS } from "@/lib/constants"
import { ShoppingCart, Star, Tag } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

// Interface untuk product item
interface ProductItem {
    id: number
    name: string
    description: string
    image: string
    price: number
    originalPrice?: number
    category: string
    categoryColor: string
    rating: number
    isNew?: boolean
    isBestSeller?: boolean
}

// Format harga ke Rupiah
const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price)
}

// Data produk (dummy data - bisa diganti dengan data dari API)
const PRODUCTS: ProductItem[] = [
    {
        id: 1,
        name: "Seragam YAKBA Lengkap",
        description: "Set seragam lengkap dengan bahan nyaman dan berkualitas tinggi untuk aktivitas sehari-hari.",
        image: "/program-img-1.png",
        price: 350000,
        originalPrice: 400000,
        category: "Seragam",
        categoryColor: COLORS.blue,
        rating: 4.9,
        isBestSeller: true,
    },
    {
        id: 2,
        name: "Buku Panduan Mengaji",
        description: "Buku panduan mengaji dengan metode mudah dipahami untuk anak usia dini.",
        image: "/program-img-2.png",
        price: 75000,
        category: "Buku",
        categoryColor: COLORS.green,
        rating: 4.8,
        isNew: true,
    },
    {
        id: 3,
        name: "Tas Ransel YAKBA",
        description: "Tas ransel dengan desain lucu dan ergonomis khusus untuk anak TK.",
        image: "/program-img-3.png",
        price: 150000,
        originalPrice: 180000,
        category: "Perlengkapan",
        categoryColor: COLORS.pink,
        rating: 4.7,
    },
    {
        id: 4,
        name: "Botol Minum Karakter",
        description: "Botol minum food grade dengan karakter maskot YAKBA yang lucu.",
        image: "/gallery-1.png",
        price: 85000,
        category: "Perlengkapan",
        categoryColor: COLORS.pink,
        rating: 4.6,
        isNew: true,
    },
    {
        id: 5,
        name: "Set Alat Tulis YAKBA",
        description: "Paket alat tulis lengkap dengan pensil, penghapus, dan tempat pensil.",
        image: "/gallery-2.png",
        price: 65000,
        category: "Alat Tulis",
        categoryColor: COLORS.blue,
        rating: 4.5,
    },
    {
        id: 6,
        name: "Buku Aktivitas Anak",
        description: "Buku aktivitas mewarnai, menggambar, dan puzzle untuk anak.",
        image: "/gallery-3.png",
        price: 45000,
        category: "Buku",
        categoryColor: COLORS.green,
        rating: 4.8,
        isBestSeller: true,
    },
    {
        id: 7,
        name: "Topi YAKBA",
        description: "Topi dengan logo YAKBA, nyaman dipakai saat outdoor activity.",
        image: "/gallery-4.png",
        price: 55000,
        category: "Aksesoris",
        categoryColor: COLORS.pink,
        rating: 4.4,
    },
    {
        id: 8,
        name: "Lunch Box Set",
        description: "Kotak makan dengan sekat dan sendok garpu, BPA free.",
        image: "/why-img-1.png",
        price: 95000,
        originalPrice: 120000,
        category: "Perlengkapan",
        categoryColor: COLORS.blue,
        rating: 4.7,
    },
]

// Category filter
const CATEGORIES = [
    { label: "Semua", value: "all" },
    { label: "Seragam", value: "Seragam" },
    { label: "Buku", value: "Buku" },
    { label: "Perlengkapan", value: "Perlengkapan" },
    { label: "Alat Tulis", value: "Alat Tulis" },
    { label: "Aksesoris", value: "Aksesoris" },
]

const ProductListSection = () => {
    const titleRef = useRef<HTMLHeadingElement>(null)
    const [selectedCategory, setSelectedCategory] = useState("all")

    const filteredProducts = selectedCategory === "all"
        ? PRODUCTS
        : PRODUCTS.filter(product => product.category === selectedCategory)

    useEffect(() => {
        // Animasi untuk title
        if (titleRef.current) {
            gsap.set(titleRef.current, {
                y: 100,
                opacity: 0,
            })

            gsap.to(titleRef.current, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 90%",
                    end: "top 20%",
                    toggleActions: "play none none none"
                }
            })
        }
    }, [])

    return (
        <section className="w-full min-h-screen pt-10 md:pt-20 px-4 md:px-0 overflow-hidden bg-white">
            {/* Section Title */}
            <h2 ref={titleRef} className="text-3xl md:text-5xl font-mochi-boom text-[#1B83C8] text-center mb-6 md:mb-10">
                Produk Kami
            </h2>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12 px-4">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat.value}
                        onClick={() => setSelectedCategory(cat.value)}
                        className={`
                            px-4 py-2 md:px-6 md:py-3 rounded-full font-poppins text-sm md:text-base font-medium 
                            transition-all duration-300 cursor-pointer
                            ${selectedCategory === cat.value
                                ? "bg-yellow-300 text-black shadow-lg scale-105"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }
                        `}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Products Grid */}
            <div className="w-[90%] md:w-[85%] lg:w-[80%] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
                <div className="text-center py-20">
                    <p className="font-poppins text-gray-500 text-lg">
                        Tidak ada produk untuk kategori ini
                    </p>
                </div>
            )}
        </section>
    )
}

// Komponen untuk setiap product card
interface ProductCardProps {
    product: ProductItem
    index: number
}

const ProductCard = ({ product, index }: ProductCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (cardRef.current) {
            gsap.set(cardRef.current, {
                y: 50,
                opacity: 0
            })

            gsap.to(cardRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.6,
                delay: (index % 4) * 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top 95%",
                    end: "top 20%",
                    toggleActions: "play none none none"
                }
            })
        }
    }, [index])

    const discount = product.originalPrice
        ? Math.round((1 - product.price / product.originalPrice) * 100)
        : 0

    return (
        <div
            ref={cardRef}
            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100"
        >
            {/* Image Container */}
            <div className="relative w-full h-40 md:h-48 overflow-hidden bg-gray-50">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.isNew && (
                        <span className="px-2 py-1 bg-green-500 text-white text-xs font-poppins font-semibold rounded-full">
                            Baru
                        </span>
                    )}
                    {product.isBestSeller && (
                        <span className="px-2 py-1 bg-orange-500 text-white text-xs font-poppins font-semibold rounded-full">
                            Best Seller
                        </span>
                    )}
                    {discount > 0 && (
                        <span className="px-2 py-1 bg-red-500 text-white text-xs font-poppins font-semibold rounded-full flex items-center gap-1">
                            <Tag className="size-3" />
                            -{discount}%
                        </span>
                    )}
                </div>

                {/* Category Badge */}
                <span
                    className="absolute top-2 right-2 px-2 py-1 rounded-full text-white text-xs font-poppins font-semibold"
                    style={{ backgroundColor: product.categoryColor }}
                >
                    {product.category}
                </span>
            </div>

            {/* Content */}
            <div className="p-3 md:p-4">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-1">
                    <Star className="size-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-poppins text-sm text-gray-600">{product.rating}</span>
                </div>

                {/* Name */}
                <h3 className="font-mochi-boom text-sm md:text-base text-[#1F3B5A] line-clamp-2 mb-1 group-hover:text-[#1B83C8] transition-colors">
                    {product.name}
                </h3>

                {/* Description */}
                <p className="font-poppins text-xs text-gray-500 line-clamp-2 mb-2 hidden md:block">
                    {product.description}
                </p>

                {/* Price */}
                <div className="flex items-center gap-2 mb-3">
                    <span className="font-poppins font-bold text-base md:text-lg text-[#1B83C8]">
                        {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                        <span className="font-poppins text-xs text-gray-400 line-through">
                            {formatPrice(product.originalPrice)}
                        </span>
                    )}
                </div>

                {/* Add to Cart Button */}
                <Button
                    className="w-full bg-yellow-300 hover:bg-yellow-400 text-black font-poppins text-xs md:text-sm py-2 cursor-pointer"
                >
                    <ShoppingCart className="size-4 mr-1" />
                    Beli Sekarang
                </Button>
            </div>
        </div>
    )
}

export default ProductListSection

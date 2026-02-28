"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { COLORS } from "@/lib/constants"
import { ShoppingCart, Star, Tag, Loader2, PackageX } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

// Interface sesuai response API
interface ProductImage {
    id: string
    imageUrl: string
}

interface ProductCategory {
    id: string
    name: string
    slug: string
}

interface ProductFromAPI {
    id: string
    name: string
    slug: string
    description: string
    price: number
    discount: number | null
    type: string
    isActive: boolean
    categoryId: string
    category: ProductCategory
    images: ProductImage[]
    detail: {
        stock: number | null
        weight: number | null
        fileUrl: string | null
    } | null
    createdAt: string
}

interface CategoryFromAPI {
    id: string
    name: string
    slug: string
    isActive: boolean
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

const ProductListSection = () => {
    const titleRef = useRef<HTMLHeadingElement>(null)
    const [products, setProducts] = useState<ProductFromAPI[]>([])
    const [categories, setCategories] = useState<CategoryFromAPI[]>([])
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("/api/categories")
                const json = await res.json()
                if (json.data) {
                    setCategories(json.data.filter((c: CategoryFromAPI) => c.isActive))
                }
            } catch (err) {
                console.error("Failed to fetch categories:", err)
            }
        }
        fetchCategories()
    }, [])

    // Fetch products
    const fetchProducts = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            const params = new URLSearchParams({ limit: "50" })
            if (selectedCategory !== "all") {
                params.set("categoryId", selectedCategory)
            }
            const res = await fetch(`/api/products?${params.toString()}`)
            const json = await res.json()
            if (json.data) {
                setProducts(json.data.filter((p: ProductFromAPI) => p.isActive))
            }
        } catch (err) {
            console.error("Failed to fetch products:", err)
            setError("Gagal memuat produk. Silakan coba lagi.")
        } finally {
            setIsLoading(false)
        }
    }, [selectedCategory])

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])

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
                <button
                    onClick={() => setSelectedCategory("all")}
                    className={`
                        px-4 py-2 md:px-6 md:py-3 rounded-full font-poppins text-sm md:text-base font-medium 
                        transition-all duration-300 cursor-pointer
                        ${selectedCategory === "all"
                            ? "bg-yellow-300 text-black shadow-lg scale-105"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }
                    `}
                >
                    Semua
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`
                            px-4 py-2 md:px-6 md:py-3 rounded-full font-poppins text-sm md:text-base font-medium 
                            transition-all duration-300 cursor-pointer
                            ${selectedCategory === cat.id
                                ? "bg-yellow-300 text-black shadow-lg scale-105"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }
                        `}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                    <Loader2 className="size-10 text-[#1B83C8] animate-spin" />
                    <p className="font-poppins text-gray-500">Memuat produk...</p>
                </div>
            )}

            {/* Error State */}
            {!isLoading && error && (
                <div className="text-center py-20">
                    <p className="font-poppins text-red-500 text-lg mb-4">{error}</p>
                    <Button onClick={fetchProducts} className="bg-yellow-300 hover:bg-yellow-400 text-black font-poppins cursor-pointer">
                        Coba Lagi
                    </Button>
                </div>
            )}

            {/* Products Grid */}
            {!isLoading && !error && products.length > 0 && (
                <div className="w-[90%] md:w-[85%] lg:w-[80%] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {products.map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!isLoading && !error && products.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                    <PackageX className="size-16 text-gray-300" />
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
    product: ProductFromAPI
    index: number
}

const ProductCard = ({ product, index }: ProductCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null)

    const imageUrl = product.images.length > 0
        ? product.images[0].imageUrl
        : "/placeholder-product.png"

    const discountPercent = product.discount ?? 0
    const discountedPrice = discountPercent > 0
        ? product.price - Math.round(product.price * discountPercent / 100)
        : product.price

    // Tentukan warna berdasarkan index category
    const categoryColors = [COLORS.blue, COLORS.green, COLORS.pink]
    const categoryColor = categoryColors[index % categoryColors.length]

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

    return (
        <Link href={`/product/${product.slug}`}>
            <div
                ref={cardRef}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100"
            >
                {/* Image Container */}
                <div className="relative w-full h-40 md:h-48 overflow-hidden bg-gray-50">
                    <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {discountPercent > 0 && (
                            <span className="px-2 py-1 bg-red-500 text-white text-xs font-poppins font-semibold rounded-full flex items-center gap-1">
                                <Tag className="size-3" />
                                -{discountPercent}%
                            </span>
                        )}
                    </div>

                    {/* Category Badge */}
                    <span
                        className="absolute top-2 right-2 px-2 py-1 rounded-full text-white text-xs font-poppins font-semibold"
                        style={{ backgroundColor: categoryColor }}
                    >
                        {product.category.name}
                    </span>
                </div>

                {/* Content */}
                <div className="p-3 md:p-4">
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
                            {formatPrice(discountedPrice)}
                        </span>
                        {discountPercent > 0 && (
                            <span className="font-poppins text-xs text-gray-400 line-through">
                                {formatPrice(product.price)}
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
        </Link>
    )
}

export default ProductListSection

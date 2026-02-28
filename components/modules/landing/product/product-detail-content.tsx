"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useParams } from "next/navigation"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { COLORS } from "@/lib/constants"
import {
    ArrowLeft,
    ShoppingCart,
    Tag,
    Package,
    Weight,
    FileDown,
    Loader2,
    PackageX,
    ChevronLeft,
    ChevronRight,
} from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

// Interfaces sesuai API response
interface ProductImage {
    id: string
    imageUrl: string
}

interface ProductCategory {
    id: string
    name: string
    slug: string
}

interface ProductDetail {
    stock: number | null
    weight: number | null
    fileUrl: string | null
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
    detail: ProductDetail | null
    createdAt: string
}

// Format harga ke Rupiah
const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price)
}

const ProductDetailContent = () => {
    const params = useParams()
    const slug = params.slug as string

    const contentRef = useRef<HTMLDivElement>(null)
    const relatedRef = useRef<HTMLDivElement>(null)

    const [product, setProduct] = useState<ProductFromAPI | null>(null)
    const [relatedProducts, setRelatedProducts] = useState<ProductFromAPI[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [activeImageIndex, setActiveImageIndex] = useState(0)

    // Fetch product by slug — kita cari dulu dari list berdasarkan slug lalu ambil detail by ID
    const fetchProduct = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            // Ambil product berdasarkan slug via search
            const listRes = await fetch(`/api/products?search=${encodeURIComponent(slug)}&limit=50`)
            const listJson = await listRes.json()
            const matched = listJson.data?.find((p: ProductFromAPI) => p.slug === slug)

            if (!matched) {
                setError("Produk tidak ditemukan.")
                setIsLoading(false)
                return
            }

            // Ambil detail lengkap
            const detailRes = await fetch(`/api/products/${matched.id}`)
            const detailJson = await detailRes.json()

            if (detailJson.data) {
                setProduct(detailJson.data)

                // Fetch related products dari kategori yang sama
                const relatedRes = await fetch(`/api/products?categoryId=${detailJson.data.categoryId}&limit=4`)
                const relatedJson = await relatedRes.json()
                if (relatedJson.data) {
                    setRelatedProducts(
                        relatedJson.data.filter((p: ProductFromAPI) => p.id !== detailJson.data.id && p.isActive).slice(0, 3)
                    )
                }
            } else {
                setError("Produk tidak ditemukan.")
            }
        } catch (err) {
            console.error("Failed to fetch product:", err)
            setError("Gagal memuat produk. Silakan coba lagi.")
        } finally {
            setIsLoading(false)
        }
    }, [slug])

    useEffect(() => {
        if (slug) fetchProduct()
    }, [slug, fetchProduct])

    // Animations
    useEffect(() => {
        if (!product || isLoading) return

        if (contentRef.current) {
            gsap.set(contentRef.current, { y: 50, opacity: 0 })
            gsap.to(contentRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
            })
        }

        if (relatedRef.current) {
            const cards = relatedRef.current.querySelectorAll(".related-card")
            gsap.set(cards, { y: 40, opacity: 0 })
            gsap.to(cards, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power3.out",
                stagger: 0.1,
                scrollTrigger: {
                    trigger: relatedRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            })
        }
    }, [product, isLoading])

    // Loading state
    if (isLoading) {
        return (
            <section className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-3">
                <Loader2 className="size-10 text-[#1B83C8] animate-spin" />
                <p className="font-poppins text-gray-500">Memuat produk...</p>
            </section>
        )
    }

    // Error state
    if (error || !product) {
        return (
            <section className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <PackageX className="size-16 text-gray-300" />
                <p className="font-poppins text-gray-500 text-lg">{error || "Produk tidak ditemukan."}</p>
                <div className="flex gap-3">
                    <Button onClick={fetchProduct} className="bg-yellow-300 hover:bg-yellow-400 text-black font-poppins cursor-pointer">
                        Coba Lagi
                    </Button>
                    <Button asChild variant="outline" className="font-poppins cursor-pointer">
                        <Link href="/product">Kembali ke Produk</Link>
                    </Button>
                </div>
            </section>
        )
    }

    const images = product.images.length > 0 ? product.images : [{ id: "placeholder", imageUrl: "/placeholder-product.png" }]
    const discountPercent = product.discount ?? 0
    const discountedPrice = discountPercent > 0
        ? product.price - Math.round(product.price * discountPercent / 100)
        : product.price

    const handlePrevImage = () => {
        setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    }

    const handleNextImage = () => {
        setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }

    return (
        <section className="w-full pt-10 md:pt-16 pb-16 bg-white">
            <div className="max-w-5xl mx-auto px-4 md:px-8">
                {/* Back Button */}
                <Link
                    href="/product"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-poppins mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali ke Daftar Produk</span>
                </Link>

                {/* Product Detail Grid */}
                <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
                    {/* Image Gallery */}
                    <div>
                        {/* Main Image — rasio 4:3 */}
                        <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-gray-100 mb-4">
                            <Image
                                src={images[activeImageIndex].imageUrl}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />

                            {/* Discount badge */}
                            {discountPercent > 0 && (
                                <span className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-sm font-poppins font-semibold rounded-full flex items-center gap-1">
                                    <Tag className="size-3.5" />
                                    -{discountPercent}%
                                </span>
                            )}

                            {/* Navigation arrows */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={handlePrevImage}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-colors cursor-pointer"
                                    >
                                        <ChevronLeft className="size-5" />
                                    </button>
                                    <button
                                        onClick={handleNextImage}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-colors cursor-pointer"
                                    >
                                        <ChevronRight className="size-5" />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Thumbnail Gallery — rasio 1:1 */}
                        {images.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {images.map((img, idx) => (
                                    <button
                                        key={img.id}
                                        onClick={() => setActiveImageIndex(idx)}
                                        className={`
                                            relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden shrink-0 cursor-pointer
                                            transition-all duration-200
                                            ${activeImageIndex === idx
                                                ? "ring-2 ring-[#1B83C8] ring-offset-2 opacity-100"
                                                : "opacity-60 hover:opacity-100"
                                            }
                                        `}
                                    >
                                        <Image
                                            src={img.imageUrl}
                                            alt={`${product.name} - ${idx + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="80px"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Information */}
                    <div className="flex flex-col">
                        {/* Category */}
                        <span
                            className="inline-block w-fit px-3 py-1 rounded-full text-white text-xs font-poppins font-semibold mb-3"
                            style={{ backgroundColor: COLORS.blue }}
                        >
                            {product.category.name}
                        </span>

                        {/* Name */}
                        <h1 className="text-2xl md:text-3xl font-mochi-boom text-[#1F3B5A] mb-3">
                            {product.name}
                        </h1>

                        {/* Price */}
                        <div className="flex items-baseline gap-3 mb-4">
                            <span className="text-2xl md:text-3xl font-poppins font-bold text-[#1B83C8]">
                                {formatPrice(discountedPrice)}
                            </span>
                            {discountPercent > 0 && (
                                <span className="text-lg font-poppins text-gray-400 line-through">
                                    {formatPrice(product.price)}
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        <p className="font-poppins text-gray-600 leading-relaxed mb-6">
                            {product.description}
                        </p>

                        {/* Product Details */}
                        <div className="flex flex-wrap gap-3 mb-6">
                            {/* Type */}
                            <div className="flex items-center gap-2 px-4 py-2 bg-sky-50 rounded-xl">
                                <Package className="size-4 text-[#1B83C8]" />
                                <span className="font-poppins text-sm text-gray-700">
                                    {product.type === "DIGITAL" ? "Produk Digital" : "Produk Fisik"}
                                </span>
                            </div>

                            {/* Stock */}
                            {product.detail?.stock !== null && product.detail?.stock !== undefined && (
                                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-xl">
                                    <Package className="size-4 text-green-600" />
                                    <span className="font-poppins text-sm text-gray-700">
                                        Stok: {product.detail.stock}
                                    </span>
                                </div>
                            )}

                            {/* Weight */}
                            {product.detail?.weight !== null && product.detail?.weight !== undefined && (
                                <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-xl">
                                    <Weight className="size-4 text-orange-600" />
                                    <span className="font-poppins text-sm text-gray-700">
                                        {product.detail.weight}g
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* CTA Button */}
                        <Button className="w-full md:w-auto bg-yellow-300 hover:bg-yellow-400 text-black font-poppins font-semibold text-base py-6 cursor-pointer">
                            <ShoppingCart className="size-5 mr-2" />
                            Beli Sekarang
                        </Button>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div ref={relatedRef}>
                        <h3
                            className="text-xl md:text-2xl font-mochi-boom text-center mb-6"
                            style={{ color: COLORS.navy }}
                        >
                            Produk Terkait
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                            {relatedProducts.map((related) => {
                                const relImg = related.images.length > 0 ? related.images[0].imageUrl : "/placeholder-product.png"
                                const relDiscount = related.discount ?? 0
                                const relPrice = relDiscount > 0
                                    ? related.price - Math.round(related.price * relDiscount / 100)
                                    : related.price

                                return (
                                    <Link key={related.id} href={`/product/${related.slug}`}>
                                        <div className="related-card group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300 cursor-pointer">
                                            <div className="relative w-full aspect-4/3 overflow-hidden bg-gray-50">
                                                <Image
                                                    src={relImg}
                                                    alt={related.name}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                    sizes="(max-width: 768px) 50vw, 33vw"
                                                />
                                            </div>
                                            <div className="p-3 md:p-4">
                                                <h4 className="font-mochi-boom text-sm md:text-base text-[#1F3B5A] line-clamp-1 mb-1 group-hover:text-[#1B83C8] transition-colors">
                                                    {related.name}
                                                </h4>
                                                <span className="font-poppins font-bold text-sm md:text-base text-[#1B83C8]">
                                                    {formatPrice(relPrice)}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default ProductDetailContent

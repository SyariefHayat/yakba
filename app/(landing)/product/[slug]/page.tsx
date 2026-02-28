import CtaSection from "@/components/modules/landing/home/cta-section"
import Footer from "@/components/modules/landing/home/footer"
import ProductDetailContent from "@/components/modules/landing/product/product-detail-content"
import ProductDetailHero from "@/components/modules/landing/product/product-detail-hero"

const ProductDetailPage = () => {
    return (
        <main className="font-poppins">
            <ProductDetailHero />
            <ProductDetailContent />
            <CtaSection />
            <Footer />
        </main>
    )
}

export default ProductDetailPage

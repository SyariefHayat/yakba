import ProductHeroSection from "@/components/modules/landing/product/product-hero-section"
import ProductListSection from "@/components/modules/landing/product/product-list-section"
import CtaSection from "@/components/modules/landing/home/cta-section"
import Footer from "@/components/modules/landing/home/footer"

const Product = () => {
    return (
        <main className="font-poppins">
            <ProductHeroSection />
            <ProductListSection />
            <CtaSection />
            <Footer />
        </main>
    )
}

export default Product

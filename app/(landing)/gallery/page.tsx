import GalleryHeroSection from "@/components/modules/landing/gallery/gallery-hero-section"
import GalleryGridSection from "@/components/modules/landing/gallery/gallery-grid-section"
import CtaSection from "@/components/modules/landing/home/cta-section"
import Footer from "@/components/modules/landing/home/footer"

const Gallery = () => {
    return (
        <main className="font-poppins">
            <GalleryHeroSection />
            <GalleryGridSection />
            <CtaSection />
            <Footer />
        </main>
    )
}

export default Gallery
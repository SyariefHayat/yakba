import CtaSection from "@/components/modules/landing/cta-section"
import FaqSection from "@/components/modules/landing/faq-section"
import Footer from "@/components/modules/landing/footer"
import GallerySection from "@/components/modules/landing/gallery-section"
import HeroSection from "@/components/modules/landing/hero-section"
import ProgramSection from "@/components/modules/landing/program-section"
import WhySection from "@/components/modules/landing/why-section"

const Home = () => {
    return (
        <main>
            <HeroSection />
            <WhySection />
            <ProgramSection />
            <GallerySection />
            <FaqSection />
            <CtaSection />
            <Footer />
        </main>
    )
}

export default Home
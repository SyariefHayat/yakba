import TentorHeroSection from "@/components/modules/landing/tentor/tentor-hero-section"
import TentorListSection from "@/components/modules/landing/tentor/tentor-list-section"
import CtaSection from "@/components/modules/landing/home/cta-section"
import Footer from "@/components/modules/landing/home/footer"

const Tentor = () => {
    return (
        <main className="font-poppins">
            <TentorHeroSection />
            <TentorListSection />
            <CtaSection />
            <Footer />
        </main>
    )
}

export default Tentor
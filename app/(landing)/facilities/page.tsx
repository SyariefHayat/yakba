import FacilitiesHeroSection from "@/components/modules/landing/facilities/facilities-hero-section"
import FacilitiesListSection from "@/components/modules/landing/facilities/facilities-list-section"
import CtaSection from "@/components/modules/landing/home/cta-section"
import Footer from "@/components/modules/landing/home/footer"

const Facilities = () => {
    return (
        <main className="font-poppins">
            <FacilitiesHeroSection />
            <FacilitiesListSection />
            <CtaSection />
            <Footer />
        </main>
    )
}

export default Facilities
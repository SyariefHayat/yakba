import AboutHeroSection from "@/components/modules/landing/about/about-hero-section"
import AboutContentSection from "@/components/modules/landing/about/about-content-section"
import AboutTeamSection from "@/components/modules/landing/about/about-team-section"
import CtaSection from "@/components/modules/landing/home/cta-section"
import Footer from "@/components/modules/landing/home/footer"

const About = () => {
    return (
        <main className="font-poppins">
            <AboutHeroSection />
            <AboutContentSection />
            <AboutTeamSection />
            <CtaSection />
            <Footer />
        </main>
    )
}

export default About

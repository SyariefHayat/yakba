import ProgramsHeroSection from "@/components/modules/landing/programs/programs-hero-section"
import ProgramsListSection from "@/components/modules/landing/programs/programs-list-section"
import CtaSection from "@/components/modules/landing/home/cta-section"
import Footer from "@/components/modules/landing/home/footer"

const Programs = () => {
    return (
        <main className="font-poppins">
            <ProgramsHeroSection />
            <ProgramsListSection />
            <CtaSection />
            <Footer />
        </main>
    )
}

export default Programs

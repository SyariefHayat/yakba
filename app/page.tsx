import CtaSection from "@/components/modules/landing/home/cta-section"
import FaqSection from "@/components/modules/landing/home/faq-section"
import Footer from "@/components/modules/landing/home/footer"
import GallerySection from "@/components/modules/landing/home/gallery-section"
import HeroSection from "@/components/modules/landing/home/hero-section"
import ProgramSection from "@/components/modules/landing/home/program-section"
import WhySection from "@/components/modules/landing/home/why-section"

const Home = () => {
  return (
    <main className="font-poppins">
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
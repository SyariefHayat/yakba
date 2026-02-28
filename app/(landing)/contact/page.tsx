import ContactHeroSection from "@/components/modules/landing/contact/contact-hero-section"
import ContactContentSection from "@/components/modules/landing/contact/contact-content-section"
import Footer from "@/components/modules/landing/home/footer"

const Contact = () => {
    return (
        <main className="font-poppins">
            <ContactHeroSection />
            <ContactContentSection />
            <Footer />
        </main>
    )
}

export default Contact
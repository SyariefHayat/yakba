import EventHeroSection from "@/components/modules/landing/event/event-hero-section"
import EventListSection from "@/components/modules/landing/event/event-list-section"
import CtaSection from "@/components/modules/landing/home/cta-section"
import Footer from "@/components/modules/landing/home/footer"

const Event = () => {
    return (
        <main className="font-poppins">
            <EventHeroSection />
            <EventListSection />
            <CtaSection />
            <Footer />
        </main>
    )
}

export default Event
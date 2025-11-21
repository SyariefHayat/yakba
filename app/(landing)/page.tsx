import CtaSection from "@/components/modules/landing/CtaSection";
import FaqSection from "@/components/modules/landing/FaqSection";
import WhySection from "@/components/modules/landing/WhySection";
import HeroSection from "@/components/modules/landing/HeroSection";
import ProgramSection from "@/components/modules/landing/ProgramSection";

const Home = () => {
  return (
    <main>
      <HeroSection />
      <WhySection />
      <ProgramSection />
      <FaqSection />
      <CtaSection />
    </main>
  );
};

export default Home;

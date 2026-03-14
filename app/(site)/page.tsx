import CtaSection from "@/components/modules/home/cta-section";
import FeatureSection from "@/components/modules/home/features-section";
import HeroSection from "@/components/modules/home/hero-section";
import ProductSection from "@/components/modules/home/products-section";
import ProgramSection from "@/components/modules/home/programs-section";

const Home = () => {
  return (
    <main className="font-poppins">
      <HeroSection />
      <FeatureSection />
      <ProgramSection />
      <ProductSection />
      <CtaSection />
    </main>
  );
};

export default Home;

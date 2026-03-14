import FeatureSection from "@/components/modules/home/features-section";
import HeroSection from "@/components/modules/home/hero-section";
import ProgramSection from "@/components/modules/home/programs-section";

const Home = () => {
  return (
    <main className="font-poppins">
      <HeroSection />
      <FeatureSection />
      <ProgramSection />
    </main>
  );
};

export default Home;

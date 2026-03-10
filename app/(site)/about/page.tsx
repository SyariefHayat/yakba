import AboutHero from "@/components/modules/about/about-hero";
import AboutStory from "@/components/modules/about/about-story";
import AboutVision from "@/components/modules/about/about-vision";
import AboutMethod from "@/components/modules/about/about-method";
import AboutValues from "@/components/modules/about/about-values";
import AboutCTA from "@/components/modules/about/about-cta";

export default function TentangPage() {
  return (
    <main className="font-poppins">
      <AboutHero />
      <AboutStory />
      <AboutVision />
      <AboutMethod />
      <AboutValues />
      <AboutCTA />
    </main>
  );
}

import MitraHero from "@/components/modules/mitra/mitra-hero";
import MitraBenefits from "@/components/modules/mitra/mitra-benefits";
import MitraSteps from "@/components/modules/mitra/mitra-steps";
import MitraRequirements from "@/components/modules/mitra/mitra-requirements";
import MitraCTA from "@/components/modules/mitra/mitra-cta";

export default function KemitraanPage() {
  return (
    <main className="font-poppins">
      <MitraHero />
      <MitraBenefits />
      <MitraSteps />
      <MitraRequirements />
      <MitraCTA />
    </main>
  );
}

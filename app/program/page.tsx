import ProgramHero from "@/components/modules/program/program-hero";
import ProgramList from "@/components/modules/program/program-list";
import { getAllPrograms } from "@/lib/queries";

export default async function ProgramPage() {
  const programs = await getAllPrograms();

  return (
    <main className="font-poppins">
      <ProgramHero />
      <ProgramList programs={programs} />
    </main>
  );
}

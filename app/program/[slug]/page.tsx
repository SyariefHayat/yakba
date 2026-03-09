import { getProgramBySlug } from "@/lib/queries";
import ProgramDetail from "@/components/modules/program/program-detail";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);

  if (!program) {
    return { title: "Program Tidak Ditemukan | Yakba Learning Center" };
  }

  return {
    title: `${program.seo?.metaTitle || program.name} | Yakba Learning Center`,
    description: program.seo?.metaDescription || `Program ${program.name} untuk usia ${program.targetAgeRange}`,
  };
}

export default async function ProgramDetailPage({ params }: Props) {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);

  if (!program) {
    notFound();
  }

  return (
    <main className="font-poppins">
      <ProgramDetail program={program} />
    </main>
  );
}

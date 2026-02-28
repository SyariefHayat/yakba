import { notFound } from "next/navigation"
import ProgramDetailHero from "@/components/modules/landing/programs/program-detail-hero"
import ProgramDetailContent from "@/components/modules/landing/programs/program-detail-content"
import CtaSection from "@/components/modules/landing/home/cta-section"
import Footer from "@/components/modules/landing/home/footer"
import { getProgramById, PROGRAMS_DATA } from "@/lib/programs-data"

// Generate static params for all programs
export async function generateStaticParams() {
    return PROGRAMS_DATA.map((program) => ({
        id: program.id,
    }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const program = getProgramById(id)

    if (!program) {
        return {
            title: "Program Tidak Ditemukan - YAKBA Kindergarten",
        }
    }

    return {
        title: `${program.title} - Program YAKBA Kindergarten`,
        description: program.description,
    }
}

const ProgramDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const program = getProgramById(id)

    if (!program) {
        notFound()
    }

    return (
        <main className="font-poppins">
            <ProgramDetailHero program={program} />
            <ProgramDetailContent program={program} />
            <CtaSection />
            <Footer />
        </main>
    )
}

export default ProgramDetailPage

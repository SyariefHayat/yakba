import ArticleHeroSection from "@/components/modules/landing/article/article-hero-section"
import ArticleListSection from "@/components/modules/landing/article/article-list-section"
import CtaSection from "@/components/modules/landing/home/cta-section"
import Footer from "@/components/modules/landing/home/footer"

const Article = () => {
    return (
        <main className="font-poppins">
            <ArticleHeroSection />
            <ArticleListSection />
            <CtaSection />
            <Footer />
        </main>
    )
}

export default Article
import Tree from "../elements/tree";
import { Button } from "@/components/ui/button";
import { FEATURES_ITEMS } from "@/lib/constants";

const FeatureSection = () => {
  return (
    <section
      aria-labelledby="features-heading"
      className="w-full min-h-screen flex flex-col items-center justify-center gap-10 sm:gap-20 bg-[#FFD502] overflow-hidden relative"
    >
      <div className="w-[90%] max-w-5xl bg-white p-6 sm:px-10 sm:py-14 md:px-20 md:py-20 rounded-3xl space-y-14 md:space-y-20">
        {FEATURES_ITEMS.map(
          ({ id, title, description, imageAlt, isReverse }) => (
            <article
              key={id}
              aria-labelledby={`feature-${id}`}
              className={`w-full flex flex-col gap-8 items-center
              md:flex-row md:items-center md:justify-between md:gap-10
              ${isReverse ? "md:flex-row-reverse" : "md:flex-row"}`}
            >
              {/* Teks */}
              <div className="w-full md:w-[40%] flex flex-col items-start gap-4">
                <h3
                  id={`feature-${id}`}
                  className="font-mochi text-2xl sm:text-3xl md:text-4xl"
                >
                  {title}
                </h3>
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                  {description}
                </p>
                <Button className="px-5 py-2.5 text-white bg-green-600 hover:bg-green-700 transition-colors">
                  Lihat lebih detail
                </Button>
              </div>

              {/* Gambar */}
              <figure
                className="w-full md:w-1/2 h-56 sm:h-72 md:h-80 bg-red-500 rounded-2xl m-0 shrink-0"
                role="img"
                aria-label={imageAlt}
              />
            </article>
          ),
        )}
      </div>

      {/* ── CTA + Tree ── */}
      <div className="w-full flex justify-center mb-35 sm:mb-25 lg:mb-20 px-4">
        {/* Teks CTA */}
        <div className="w-full sm:w-[90%] lg:w-[70%] max-w-3xl text-center space-y-6 sm:space-y-7 z-10">
          <h2
            id="features-heading"
            className="font-mochi text-3xl sm:text-5xl md:text-6xl text-[#1A3F26]"
          >
            Belajar Doa Anak dengan Cara Bermain, Bernyanyi, dan Bercerita
          </h2>
          <p className="w-[95%] sm:w-[90%] text-base sm:text-xl text-center mx-auto leading-relaxed">
            Yakba Learning Center menghadirkan video pembelajaran islami yang
            membantu anak belajar doa dan nilai Islam dengan cara yang
            menyenangkan.
          </p>
          <Button className="p-5 text-white bg-green-600 hover:bg-green-700 transition-colors">
            Bergabung Sekarang
          </Button>
        </div>

        {/* Tree kiri */}
        <div className="absolute left-0 -bottom-3 sm:hidden">
          <Tree side="left" size="sm" />
        </div>
        <div className="absolute left-0 bottom-0 hidden sm:block">
          <Tree side="left" size="lg" />
        </div>

        {/* Tree kanan */}
        <div className="absolute right-0 -bottom-3 sm:hidden">
          <Tree side="right" size="sm" />
        </div>
        <div className="absolute right-0 bottom-0 hidden sm:block">
          <Tree side="right" size="lg" />
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;

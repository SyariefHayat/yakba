import Tree from "../elements/tree";
import { Button } from "@/components/ui/button";
import { FEATURES_ITEMS } from "@/lib/constants";

const FeatureSection = () => {
  return (
    <section
      aria-labelledby="features-heading"
      className="w-full min-h-screen flex flex-col items-center justify-center gap-20 bg-[#FFD502] overflow-hidden relative"
    >
      <div className="w-[80%] space-y-20 bg-white p-20 rounded-4xl">
        {FEATURES_ITEMS.map(
          ({ id, title, description, imageAlt, isReverse }) => (
            <article
              key={id}
              aria-labelledby={`feature-${id}`}
              className={`w-full flex items-center justify-between gap-10 ${
                isReverse ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div className="w-[35%] flex flex-col items-start justify-center gap-5">
                <h3 id={`feature-${id}`} className="font-mochi text-4xl">
                  {title}
                </h3>
                <p className="text-black text-lg leading-relaxed">
                  {description}
                </p>
                <Button className="p-5 text-white bg-green-600 hover:bg-green-700 transition-colors">
                  Lihat lebih detail
                </Button>
              </div>

              <figure
                className="w-1/2 h-80 bg-red-500 rounded-2xl m-0"
                role="img"
                aria-label={imageAlt}
              />
            </article>
          ),
        )}
      </div>

      <div className="w-[70%] text-center space-y-7 mb-20">
        <h2
          id="features-heading"
          className="font-mochi text-6xl text-[#1A3F26]"
        >
          Program Pembelajaran Sesuai Tahap Perkembangan Anak
        </h2>
        <p className="w-[90%] text-xl text-center mx-auto leading-relaxed">
          Di Yakba, setiap anak didampingi untuk berkembang secara optimal
          melalui pendekatan Montessori yang mendorong kemandirian, kreativitas,
          serta kecintaan belajar sepanjang hayat.
        </p>
        <Button className="p-5 text-white bg-green-600 hover:bg-green-700 transition-colors">
          Bergabung Sekarang
        </Button>
      </div>

      <Tree side="right" />
      <Tree side="left" />
    </section>
  );
};

export default FeatureSection;

import { Button } from "@/components/ui/button";
import { PROGRAM_ITEMS } from "@/lib/constants";

const ProgramSection = () => {
  return (
    <section aria-labelledby="program-heading" className="px-10 py-20">
      <div className="flex items-center justify-between gap-10">
        <h2
          id="program-heading"
          className="w-1/2 font-mochi text-6xl leading-tight"
        >
          Program untuk Setiap Tahap Pertumbuhan Awal
        </h2>
        <p className="w-[40%] text-lg leading-relaxed text-gray-600">
          Di Yakba, kami memupuk potensi unik setiap anak melalui metode
          Montessori — menumbuhkan kemandirian, kreativitas, dan kecintaan
          belajar sepanjang hayat.
        </p>
      </div>

      <ul className="w-full my-20 flex items-stretch justify-between gap-10">
        {PROGRAM_ITEMS.map(({ id, title, description }) => (
          <li key={id} className="flex-1">
            <article
              aria-labelledby={`program-${id}`}
              className="flex flex-col gap-4 h-full"
            >
              <figure className="w-full h-60 bg-black rounded-2xl m-0" />

              <div className="flex flex-col gap-3 flex-1">
                <h3
                  id={`program-${id}`}
                  className="font-mochi text-4xl leading-tight"
                >
                  {title}
                </h3>
                <p className="text-gray-600 leading-relaxed flex-1">
                  {description}
                </p>
                <Button className="w-fit bg-green-600 hover:bg-green-700 transition-colors text-white">
                  Lihat lebih detail
                </Button>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProgramSection;

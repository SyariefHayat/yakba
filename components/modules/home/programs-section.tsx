import { Button } from "@/components/ui/button";
import { PROGRAM_ITEMS } from "@/lib/constants";
import Link from "next/link";

const ProgramSection = () => {
  return (
    <section aria-labelledby="program-heading" className="px-10 pt-20">
      <div className="flex items-center justify-between gap-10">
        <h2
          id="program-heading"
          className="w-[40%] font-mochi text-5xl leading-tight"
        >
          Program untuk Setiap Tahap Pertumbuhan Awal
        </h2>
        <div className="w-[40%] space-y-5">
          <p className="text-lg leading-relaxed text-gray-600">
            Di Yakba, kami memupuk potensi unik setiap anak melalui metode
            Montessori — menumbuhkan kemandirian, kreativitas, dan kecintaan
            belajar sepanjang hayat.
          </p>
          <Link href="/program">
            <Button className="bg-green-600 hover:bg-green-700 transition-colors text-white cursor-pointer">
              Lihat Semua Program →
            </Button>
          </Link>
        </div>
      </div>

      <ul className="w-full mt-20 flex items-stretch justify-between gap-10">
        {PROGRAM_ITEMS.map(({ id, title, description }) => (
          <li key={id} className="flex-1">
            <article
              aria-labelledby={`program-${id}`}
              className="flex flex-col gap-4 h-full"
            >
              <figure className="w-full h-60 bg-black rounded-2xl m-0" />

              <div className="flex flex-col gap-3 flex-1">
                <h4
                  id={`program-${id}`}
                  className="font-mochi text-3xl leading-tight"
                >
                  {title}
                </h4>
                <p className="text-gray-600 leading-relaxed flex-1">
                  {description}
                </p>
                <Link href="#">
                  <Button className="w-fit bg-green-600 hover:bg-green-700 transition-colors text-white cursor-pointer">
                    Lihat lebih detail
                  </Button>
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProgramSection;

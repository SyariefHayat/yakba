import { Button } from "@/components/ui/button";
import { PROGRAM_ITEMS } from "@/lib/constants";
import Link from "next/link";

const ProgramSection = () => {
  return (
    <section
      aria-labelledby="program-heading"
      className="px-5 sm:px-10 pt-14 sm:pt-20"
    >
      {/* Header */}
      <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
        <h2
          id="program-heading"
          className="w-full sm:w-1/2 lg:w-[40%] font-mochi text-3xl sm:text-4xl md:text-5xl leading-tight"
        >
          Program untuk Setiap Tahap Pertumbuhan Awal
        </h2>
        <div className="w-full sm:w-[45%] space-y-4 sm:space-y-5">
          <p className="text-base sm:text-lg leading-relaxed text-gray-600">
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
      </header>

      {/* Program Cards */}
      <ul className="w-full mt-12 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {PROGRAM_ITEMS.map(({ id, title, description }) => (
          <li key={id}>
            <article
              aria-labelledby={`program-${id}`}
              className="flex flex-col gap-4 h-full"
            >
              <figure className="w-full h-52 sm:h-60 bg-black rounded-2xl m-0" />

              <div className="flex flex-col gap-3 flex-1">
                <h4
                  id={`program-${id}`}
                  className="font-mochi text-2xl sm:text-3xl leading-tight"
                >
                  {title}
                </h4>
                <p className="text-gray-600 leading-relaxed flex-1 text-sm sm:text-base">
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

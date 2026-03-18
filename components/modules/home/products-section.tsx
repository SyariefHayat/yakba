import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PRODUCT_ITEMS } from "@/lib/constants";

const ProductSection = () => {
  return (
    <section
      aria-labelledby="product-heading"
      className="px-5 sm:px-10 py-14 sm:py-20"
    >
      {/* Header */}
      <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
        <h2
          id="product-heading"
          className="w-full sm:w-1/2 lg:w-[40%] font-mochi text-3xl sm:text-4xl md:text-5xl leading-tight"
        >
          Produk Edukasi Anak dari Yakba
        </h2>
        <div className="w-full sm:w-[45%] space-y-4 sm:space-y-5">
          <p className="text-base sm:text-lg leading-relaxed text-gray-600">
            Produk pembelajaran islami yang membantu anak belajar doa, mengenal
            huruf hijaiyah, dan mengembangkan kreativitas sejak dini.
          </p>
          <Link href="/product">
            <Button className="bg-green-600 hover:bg-green-700 transition-colors text-white cursor-pointer">
              Lihat Semua Produk →
            </Button>
          </Link>
        </div>
      </header>

      {/* Product Cards */}
      <ul className="w-full mt-12 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {PRODUCT_ITEMS.map(({ id, title, description, icon, color }) => (
          <li key={id}>
            <article
              aria-labelledby={`product-${id}`}
              className="flex flex-col gap-4 h-full"
            >
              <figure
                className="w-full h-52 sm:h-60 rounded-2xl m-0 flex items-center justify-center"
                style={{ backgroundColor: `${color}15` }}
              >
                <span className="text-6xl sm:text-7xl">{icon}</span>
              </figure>

              <div className="flex flex-col gap-3 flex-1">
                <h4
                  id={`product-${id}`}
                  className="font-mochi text-2xl sm:text-3xl leading-tight"
                >
                  {title}
                </h4>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed flex-1">
                  {description}
                </p>
                <Link href="#">
                  <Button className="w-fit bg-green-600 hover:bg-green-700 transition-colors text-white cursor-pointer">
                    Lihat Produk
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

export default ProductSection;

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PRODUCT_ITEMS } from "@/lib/constants";

const ProductSection = () => {
  return (
    <section aria-labelledby="product-heading" className="px-10 py-20">
      <div className="flex items-center justify-between gap-10">
        <h2
          id="product-heading"
          className="w-[40%] font-mochi text-5xl leading-tight"
        >
          Disayangi oleh orang tua, digemari oleh anak-anak
        </h2>
        <div className="w-[40%] space-y-5">
          <p className="text-lg leading-relaxed text-gray-600">
            Produk edukatif islami yang dirancang khusus untuk menemani tumbuh
            kembang anak — dari buku mewarnai hingga video pembelajaran
            interaktif.
          </p>
          <Link href="/product">
            <Button className="bg-green-600 hover:bg-green-700 transition-colors text-white cursor-pointer">
              Lihat Semua Produk →
            </Button>
          </Link>
        </div>
      </div>

      <ul className="w-full mt-20 flex items-stretch justify-between gap-10">
        {PRODUCT_ITEMS.map(({ id, title, description, icon, color }) => (
          <li key={id} className="flex-1">
            <article
              aria-labelledby={`product-${id}`}
              className="flex flex-col gap-4 h-full"
            >
              <figure
                className="w-full h-60 rounded-2xl m-0 flex items-center justify-center"
                style={{ backgroundColor: `${color}15` }}
              >
                <span className="text-7xl">{icon}</span>
              </figure>

              <div className="flex flex-col gap-3 flex-1">
                <h4
                  id={`product-${id}`}
                  className="font-mochi text-3xl leading-tight"
                >
                  {title}
                </h4>
                <p className="text-gray-600 leading-relaxed flex-1">
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

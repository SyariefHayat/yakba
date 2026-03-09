import ProductHero from "@/components/modules/product/product-hero";
import ProductCatalog from "@/components/modules/product/product-catalog";
import { getAllProducts, getAllCategories } from "@/lib/queries";

export default async function ProdukPage() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
  ]);

  return (
    <main className="font-poppins">
      <ProductHero />
      <ProductCatalog products={products} categories={categories} />
    </main>
  );
}

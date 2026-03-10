import { getProductBySlug } from "@/lib/queries";
import ProductDetail from "@/components/modules/product/product-detail";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Produk Tidak Ditemukan | Yakba Learning Center" };
  }

  return {
    title: `${product.seo?.metaTitle || product.name} | Yakba Learning Center`,
    description:
      product.seo?.metaDescription || product.shortDescription,
  };
}

export default async function ProdukDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="font-poppins">
      <ProductDetail product={product} />
    </main>
  );
}

import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Modul Calistung Level 1",
    desc: "Modul belajar membaca & menulis untuk usia 4–5 tahun.",
    price: "Rp 49.000",
    img: "/products/calistung1.jpg",
    tag: "Modul Belajar",
  },
  {
    id: 2,
    name: "Worksheet Anak Ceria",
    desc: "50 lembar worksheet aktivitas kreatif untuk stimulasi motorik.",
    price: "Rp 35.000",
    img: "/products/worksheet.jpg",
    tag: "Worksheet",
  },
  {
    id: 3,
    name: "Paket Flashcard Huruf & Angka",
    desc: "Flashcard edukatif untuk mengenalkan huruf & angka.",
    price: "Rp 39.000",
    img: "/products/flashcard.jpg",
    tag: "Flashcard",
  },
  {
    id: 4,
    name: "Poster Pendidikan Dinding",
    desc: "Poster warna-warni berisi alfabet & angka untuk kelas.",
    price: "Rp 29.000",
    img: "/products/poster.jpg",
    tag: "Poster",
  },
];

const ProductPage = () => {
  return (
    <main className="min-h-screen bg-linear-to-b from-sky-50 via-white to-pink-50">
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16 space-y-14">
        <div className="text-center space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-1 text-[11px] font-semibold text-violet-700">
            🛍️ Produk Edukasi
          </span>

          <h1 className="text-3xl md:text-4xl font-extrabold text-sky-900">
            Produk Pembelajaran{" "}
            <span className="text-pink-500">Yakba Kinder</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-600">
            Koleksi produk edukasi untuk membantu anak belajar sambil bermain —
            mulai dari modul, worksheet, flashcard, hingga materi kreatif.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group rounded-3xl bg-white/80 border border-sky-100 shadow-sm hover:shadow-md transition"
            >
              <div className="relative aspect-4/3 overflow-hidden rounded-t-3xl">
                <Image
                  src={product.img}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-4 space-y-2">
                <p className="text-[11px] text-sky-600 font-semibold">
                  {product.tag}
                </p>

                <h3 className="text-sm md:text-base font-bold text-sky-900 line-clamp-2">
                  {product.name}
                </h3>

                <p className="text-[12px] text-slate-600 line-clamp-2">
                  {product.desc}
                </p>

                <p className="text-sm font-bold text-pink-600 mt-1">
                  {product.price}
                </p>

                <a
                  href={`/produk/${product.id}`}
                  className="inline-block text-[12px] font-semibold text-sky-600 hover:text-sky-800 mt-2"
                >
                  Lihat Detail →
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-2xl bg-white/70 border border-sky-100 px-6 py-6 md:py-7 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-sky-900">
              Ingin membeli produk dalam jumlah banyak?
            </p>
            <p className="text-xs md:text-sm text-slate-600">
              Hubungi kami untuk pemesanan grosir atau lembaga.
            </p>
          </div>

          <a
            href="/kontak"
            className="rounded-full bg-sky-500 px-4 py-2 text-xs md:text-sm font-semibold text-white hover:bg-sky-600 transition"
          >
            Hubungi Kami
          </a>
        </div>
      </section>
    </main>
  );
};

export default ProductPage;

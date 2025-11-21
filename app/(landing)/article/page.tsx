import Image from "next/image";

const articles = [
  {
    id: 1,
    title: "5 Manfaat Kegiatan Mewarnai untuk Perkembangan Anak",
    excerpt:
      "Mewarnai adalah aktivitas sederhana namun memiliki banyak manfaat seperti melatih motorik halus, konsentrasi, dan kreativitas anak.",
    image: "/articles/mewarnai.jpg",
    category: "Perkembangan Anak",
  },
  {
    id: 2,
    title: "Kenapa Bermain Adalah Cara Terbaik Anak Belajar?",
    excerpt:
      "Belajar melalui permainan dapat membantu anak memahami konsep baru dengan cara yang menyenangkan dan natural.",
    image: "/articles/bermain.jpg",
    category: "Metode Belajar",
  },
  {
    id: 3,
    title: "Membangun Karakter Anak Sejak Usia Dini",
    excerpt:
      "Nilai-nilai seperti sopan santun, berbagi, dan peduli sesama mulai tumbuh sejak anak sering meniru lingkungan sekitarnya.",
    image: "/articles/karakter.jpg",
    category: "Karakter",
  },
];

const ArticlePage = () => {
  return (
    <main className="min-h-screen bg-linear-to-b from-sky-50 via-white to-pink-50">
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16 space-y-10">
        <div className="text-center space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-4 py-1 text-[11px] font-semibold text-pink-700">
            📰 Artikel & Edukasi
          </span>

          <h1 className="text-3xl md:text-4xl font-extrabold text-sky-900">
            Artikel Terbaru dari{" "}
            <span className="text-pink-500">Yakba Kinder</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-600">
            Yuk baca berbagai artikel yang bermanfaat seputar tumbuh kembang,
            pendidikan, dan aktivitas anak usia dini.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {articles.map((item) => (
            <article
              key={item.id}
              className="group rounded-3xl bg-white/80 border border-sky-100 overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <div className="relative w-full aspect-4/3 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="px-4 py-4 space-y-2">
                <span className="text-[11px] font-semibold text-sky-600">
                  {item.category}
                </span>

                <h2 className="text-sm font-bold text-sky-900 group-hover:text-pink-500 transition line-clamp-2">
                  {item.title}
                </h2>

                <p className="text-[12px] text-slate-600 line-clamp-3">
                  {item.excerpt}
                </p>

                <a
                  href={`/artikel/${item.id}`}
                  className="inline-block text-[12px] font-semibold text-sky-600 hover:text-sky-700 mt-1"
                >
                  Baca Selengkapnya →
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-4 rounded-2xl bg-white/70 border border-sky-100 px-4 py-4 md:px-6 md:py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs md:text-sm text-slate-600">
            Kamu ingin membaca lebih banyak artikel edukasi? Kami update setiap
            minggu! ✨
          </p>

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

export default ArticlePage;

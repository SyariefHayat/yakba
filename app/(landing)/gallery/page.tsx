import Image from "next/image";

const photos = [
  {
    id: 1,
    src: "",
    title: "Kegiatan Mewarnai",
    tag: "Kegiatan Kelas",
  },
  {
    id: 2,
    src: "",
    title: "Belajar Huruf Bersama",
    tag: "Kegiatan Kelas",
  },
  {
    id: 3,
    src: "",
    title: "Bermain di Halaman",
    tag: "Outdoor",
  },
  {
    id: 4,
    src: "",
    title: "Senam Pagi",
    tag: "Outdoor",
  },
  {
    id: 5,
    src: "",
    title: "Perayaan Hari Kartini",
    tag: "Acara Khusus",
  },
  {
    id: 6,
    src: "",
    title: "Pentas Seni Akhir Tahun",
    tag: "Acara Khusus",
  },
];

const GalleryPage = () => {
  return (
    <main className="min-h-screen bg-linear-to-b from-sky-50 via-white to-pink-50">
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16 space-y-10">
        <div className="text-center space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-1 text-[11px] font-semibold text-sky-700">
            📸 Galeri Kegiatan Anak
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-sky-900">
            Momen Ceria di <span className="text-pink-500">Yakba Kinder</span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-600">
            Kami percaya bahwa masa kecil harus diisi dengan tawa, permainan,
            dan pengalaman belajar yang menyenangkan. Inilah beberapa momen
            terbaik anak-anak selama di sekolah.
          </p>

          <div className="flex flex-wrap justify-center gap-2 pt-2 text-[11px] md:text-xs">
            <span className="rounded-full bg-white border border-sky-200 px-3 py-1 text-sky-700">
              Semua Kegiatan
            </span>
            <span className="rounded-full bg-sky-50 border border-sky-100 px-3 py-1 text-sky-700">
              Kegiatan Kelas
            </span>
            <span className="rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1 text-emerald-700">
              Outdoor
            </span>
            <span className="rounded-full bg-pink-50 border border-pink-100 px-3 py-1 text-pink-700">
              Acara Khusus
            </span>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {photos.map((photo) => (
            <figure
              key={photo.id}
              className="group relative overflow-hidden rounded-3xl bg-white/70 border border-sky-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="flex items-center justify-between px-3.5 py-3">
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-slate-800">
                    {photo.title}
                  </p>
                  <p className="text-[11px] text-slate-500">{photo.tag}</p>
                </div>
                <span className="rounded-full bg-sky-50 px-2.5 py-1 text-[10px] font-semibold text-sky-700">
                  Lihat Momen
                </span>
              </div>
            </figure>
          ))}
        </div>

        <div className="mt-4 rounded-2xl bg-white/70 border border-sky-100 px-4 py-4 md:px-6 md:py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs md:text-sm text-slate-600">
            Ini hanya sebagian kecil dari momen yang terekam. Setiap hari di
            kelas, ada cerita baru yang dibawa pulang anak-anak. ✨
          </p>
          <a
            href="/kontak"
            className="rounded-full bg-sky-500 px-4 py-2 text-xs md:text-sm font-semibold text-white hover:bg-sky-600 transition"
          >
            Jadwalkan Kunjungan
          </a>
        </div>
      </section>
    </main>
  );
};

export default GalleryPage;

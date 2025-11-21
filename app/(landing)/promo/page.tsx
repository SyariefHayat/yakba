const promotions = [
  {
    id: 1,
    title: "Diskon Pendaftaran Siswa Baru 20%",
    tag: "Promo Spesial",
    period: "Berlaku hingga 30 Juni 2025",
    desc: "Dapatkan potongan biaya pendaftaran untuk siswa baru Yakba Kinder. Cocok untuk orang tua yang ingin mulai di tahun ajaran ini.",
    highlight: "Kuota terbatas untuk 20 pendaftar pertama.",
  },
  {
    id: 2,
    title: "Trial Class Gratis 1x Pertemuan",
    tag: "Trial Class",
    period: "Setiap Sabtu, jam 09.00–10.30",
    desc: "Ajak anak merasakan suasana belajar di Yakba Kinder secara langsung sebelum mendaftar.",
    highlight: "Wajib reservasi dulu melalui admin.",
  },
  {
    id: 3,
    title: "Open House & Talkshow Parenting",
    tag: "Event Khusus",
    period: "Tanggal 15 Mei 2025",
    desc: "Kunjungi sekolah, lihat fasilitas, bertemu guru, dan ikut sesi berbagi seputar tumbuh kembang anak.",
    highlight: "Peserta mendapatkan e-sertifikat & goodie bag.",
  },
];

const PromotionPage = () => {
  return (
    <main className="min-h-screen bg-linear-to-b from-sky-50 via-white to-pink-50">
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16 space-y-12">
        <div className="text-center space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-1 text-[11px] font-semibold text-rose-700">
            🎉 Event & Promo Yakba Kinder
          </span>

          <h1 className="text-3xl md:text-4xl font-extrabold text-sky-900">
            Promo & Acara Spesial{" "}
            <span className="text-pink-500">Untuk Orang Tua & Anak</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-600">
            Dapatkan informasi terbaru tentang diskon pendaftaran, trial class,
            open house, dan berbagai event seru di Yakba Kinder.
          </p>
        </div>

        <div className="space-y-5">
          {promotions.map((promo) => (
            <article
              key={promo.id}
              className="rounded-3xl bg-white/90 border border-sky-100 shadow-sm px-5 py-5 md:px-6 md:py-6 flex flex-col md:flex-row gap-4 md:gap-6"
            >
              <div className="flex md:flex-col items-start gap-3 min-w-[120px] md:min-w-[140px]">
                <span className="rounded-full bg-sky-50 px-3 py-1 text-[11px] font-semibold text-sky-700">
                  {promo.tag}
                </span>
                <span className="text-[11px] text-slate-500 md:mt-1">
                  {promo.period}
                </span>
              </div>

              <div className="flex-1 space-y-2">
                <h2 className="text-base md:text-lg font-bold text-sky-900">
                  {promo.title}
                </h2>
                <p className="text-xs md:text-sm text-slate-600">
                  {promo.desc}
                </p>
                <p className="text-[11px] md:text-xs font-semibold text-pink-600">
                  {promo.highlight}
                </p>
              </div>

              <div className="flex md:flex-col items-end justify-between gap-2 md:gap-3 md:min-w-40">
                <p className="text-[11px] text-slate-500 text-right md:text-left">
                  Untuk info & pendaftaran:
                </p>
                <a
                  href="/kontak"
                  className="rounded-full bg-sky-500 px-4 py-1.5 text-[11px] font-semibold text-white hover:bg-sky-600 transition"
                >
                  Hubungi Admin
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-4 rounded-2xl bg-white/80 border border-sky-100 px-5 py-5 md:px-6 md:py-6 space-y-3">
          <p className="text-sm font-semibold text-sky-900">
            Catatan Penting untuk Orang Tua
          </p>
          <ul className="text-xs md:text-sm text-slate-600 space-y-1.5">
            <li>
              • Beberapa promo memiliki kuota terbatas dan periode tertentu.
            </li>
            <li>• Jadwal event dapat berubah, pastikan konfirmasi ke admin.</li>
            <li>
              • Untuk trial class, sebaiknya booking H-1 agar slot tersedia.
            </li>
          </ul>
        </div>

        <div className="rounded-2xl bg-sky-50 border border-sky-100 px-6 py-6 md:py-7 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-sky-900">
              Ingin selalu update promo terbaru Yakba Kinder?
            </p>
            <p className="text-xs md:text-sm text-slate-600">
              Simpan halaman ini atau follow media sosial kami. Kamu juga bisa
              langsung tanyakan ke admin tentang promo yang sedang berjalan.
            </p>
          </div>

          <a
            href="/kontak"
            className="rounded-full bg-pink-500 px-4 py-2 text-xs md:text-sm font-semibold text-white hover:bg-pink-600 transition"
          >
            Tanya Promo Sekarang
          </a>
        </div>
      </section>
    </main>
  );
};

export default PromotionPage;

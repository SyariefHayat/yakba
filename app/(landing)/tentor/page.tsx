const vacancies = [
  {
    id: 1,
    title: "Tentor Calistung (Membaca, Menulis, Berhitung)",
    type: "Part-Time",
    location: "Gresik, Jawa Timur",
    desc: "Mengajar anak usia dini dengan metode bermain sambil belajar. Cocok untuk kamu yang sabar dan kreatif menghadapi anak kecil.",
    requirement: [
      "Minimal SMA/SMK (lebih disukai D1–S1 PAUD/PGSD)",
      "Sabar & suka anak-anak",
      "Mampu mengajar Calistung dasar",
      "Berpenampilan rapi & komunikatif",
    ],
  },
  {
    id: 2,
    title: "Tentor Kelas Online (Zoom/Google Meet)",
    type: "Part-Time / Remote",
    location: "Online",
    desc: "Mengajar kelas online anak usia 4–6 tahun menggunakan perangkat digital. Modul sudah disediakan.",
    requirement: [
      "Mampu mengajar via Zoom/Meet",
      "Memiliki laptop & koneksi stabil",
      "Komunikatif & ceria",
      "Percaya diri tampil di kamera",
    ],
  },
];

const TentorPage = () => {
  return (
    <main className="min-h-screen bg-linear-to-b from-sky-50 via-white to-pink-50">
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16 space-y-12">
        <div className="text-center space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-1 text-[11px] font-semibold text-yellow-700">
            💼 Lowongan Tentor Yakba Kinder
          </span>

          <h1 className="text-3xl md:text-4xl font-extrabold text-sky-900">
            Bergabung Menjadi{" "}
            <span className="text-pink-500">Tentor Ceria</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-600">
            Kami mencari tentor yang ceria, sabar, kreatif, dan menyukai dunia
            anak-anak. Jadilah bagian dari Yakba Kinder untuk membimbing
            generasi kecil menjadi lebih percaya diri dan cerdas.
          </p>
        </div>

        <div className="space-y-6">
          {vacancies.map((v) => (
            <article
              key={v.id}
              className="rounded-3xl bg-white/90 border border-sky-100 shadow-sm px-5 py-6 md:px-6 md:py-7 space-y-4"
            >
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-sky-900">{v.title}</h2>
                <div className="flex flex-wrap gap-2 text-[11px] font-semibold">
                  <span className="rounded-full bg-sky-50 px-3 py-1 text-sky-700 border border-sky-100">
                    {v.type}
                  </span>
                  <span className="rounded-full bg-pink-50 px-3 py-1 text-pink-600 border border-pink-100">
                    {v.location}
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-600">{v.desc}</p>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-sky-700">
                  Kualifikasi:
                </p>
                <ul className="text-sm text-slate-600 space-y-1">
                  {v.requirement.map((r, i) => (
                    <li key={i}>• {r}</li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-[11px] text-slate-500">
                  Kirim CV & portofolio mengajar kamu.
                </p>

                <a
                  href="/kontak"
                  className="rounded-full bg-sky-500 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-600 transition"
                >
                  Lamar Sekarang
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="rounded-2xl bg-sky-50 border border-sky-100 px-6 py-6 md:py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-sky-900">
              Belum menemukan posisi yang cocok?
            </p>
            <p className="text-xs md:text-sm text-slate-600">
              Kamu tetap bisa kirimkan CV untuk program cadangan pengajar.
            </p>
          </div>

          <a
            href="/kontak"
            className="rounded-full bg-pink-500 px-4 py-2 text-xs md:text-sm font-semibold text-white hover:bg-pink-600 transition"
          >
            Kirim CV Sekarang
          </a>
        </div>
      </section>
    </main>
  );
};

export default TentorPage;

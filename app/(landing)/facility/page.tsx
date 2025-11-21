const FacilityPage = () => {
  return (
    <main className="min-h-screen bg-linear-to-b from-sky-50 via-white to-pink-50">
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16 space-y-14">
        <div className="text-center space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1 text-[11px] font-semibold text-emerald-700">
            🏫 Fasilitas Yakba Kinder
          </span>

          <h1 className="text-3xl md:text-4xl font-extrabold text-sky-900">
            Fasilitas <span className="text-pink-500">Offline & Online</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-600">
            Kami menghadirkan pengalaman belajar terbaik melalui fasilitas fisik
            yang nyaman dan fasilitas digital modern bagi orang tua & anak.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl md:text-2xl font-bold text-sky-900">
            🧱 Fasilitas Offline (di Sekolah)
          </h2>

          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-3xl bg-white/90 border border-sky-100 p-5 shadow-sm">
              <div className="text-3xl mb-2">🎨</div>
              <h3 className="font-semibold text-sky-900">
                Ruang Kelas Warna-warni
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Desain ceria, aman, dan menyenangkan bagi anak.
              </p>
            </div>

            <div className="rounded-3xl bg-white/90 border border-pink-100 p-5 shadow-sm">
              <div className="text-3xl mb-2">🛝</div>
              <h3 className="font-semibold text-sky-900">Playground Outdoor</h3>
              <p className="text-xs text-slate-600 mt-1">
                Perosotan, ayunan, dan area motorik anak.
              </p>
            </div>

            <div className="rounded-3xl bg-white/90 border border-emerald-100 p-5 shadow-sm">
              <div className="text-3xl mb-2">📚</div>
              <h3 className="font-semibold text-sky-900">Perpustakaan Mini</h3>
              <p className="text-xs text-slate-600 mt-1">
                Buku cerita bergambar & buku edukasi.
              </p>
            </div>

            <div className="rounded-3xl bg-white/90 border border-yellow-100 p-5 shadow-sm">
              <div className="text-3xl mb-2">🎭</div>
              <h3 className="font-semibold text-sky-900">
                Ruang Seni & Kreativitas
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Mewarnai, menggambar, prakarya, dan ekspresi seni bebas.
              </p>
            </div>

            <div className="rounded-3xl bg-white/90 border border-purple-100 p-5 shadow-sm">
              <div className="text-3xl mb-2">🪑</div>
              <h3 className="font-semibold text-sky-900">
                Ruang Belajar Nyaman
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Meja kursi kecil, alas bermain, dan ventilasi udara yang baik.
              </p>
            </div>

            <div className="rounded-3xl bg-white/90 border border-rose-100 p-5 shadow-sm">
              <div className="text-3xl mb-2">🧸</div>
              <h3 className="font-semibold text-sky-900">
                Area Bermain Indoor
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Mainan edukatif untuk sensory play & cognitive play.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl md:text-2xl font-bold text-sky-900">
            💻 Fasilitas Online (Digital)
          </h2>

          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-3xl bg-white/90 border border-sky-100 p-5 shadow-sm">
              <div className="text-3xl mb-2">🎥</div>
              <h3 className="font-semibold text-sky-900">
                Kelas Online Interaktif
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Belajar lewat Zoom/Google Meet dengan guru langsung.
              </p>
            </div>

            <div className="rounded-3xl bg-white/90 border border-pink-100 p-5 shadow-sm">
              <div className="text-3xl mb-2">📱</div>
              <h3 className="font-semibold text-sky-900">
                Dashboard Orang Tua
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Melihat progres anak, nilai, dan laporan harian.
              </p>
            </div>

            <div className="rounded-3xl bg-white/90 border border-emerald-100 p-5 shadow-sm">
              <div className="text-3xl mb-2">📘</div>
              <h3 className="font-semibold text-sky-900">
                Materi Belajar Digital
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Video, worksheet, dan modul yang bisa diunduh.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-sky-50 border border-sky-100 px-6 py-6 md:py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-sky-900">
              Ingin melihat fasilitas secara langsung?
            </p>
            <p className="text-xs md:text-sm text-slate-600">
              Silakan hubungi kami untuk jadwal tur sekolah.
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

export default FacilityPage;

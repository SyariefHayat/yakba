const BimbelPage = () => {
  return (
    <main className="min-h-screen bg-linear-to-b from-sky-50 via-white to-pink-50">
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16 space-y-14">
        <div className="text-center space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-1 text-[11px] font-semibold text-yellow-700">
            ✏️ Program Bimbel
          </span>

          <h1 className="text-3xl md:text-4xl font-extrabold text-sky-900">
            Bimbingan Belajar{" "}
            <span className="text-pink-500">Yakba Kinder</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-600">
            Program bimbel yang dirancang khusus untuk anak PAUD & TK—belajar
            membaca, menulis, berhitung, dan akhlak dasar dalam suasana yang
            menyenangkan.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl bg-white/80 border border-sky-100 p-5 shadow-sm">
            <div className="text-3xl mb-2">🔤</div>
            <h3 className="font-semibold text-sky-900">Calistung Dasar</h3>
            <p className="text-xs text-slate-600 mt-1">
              Belajar membaca, menulis, dan berhitung secara bertahap.
            </p>
          </div>

          <div className="rounded-3xl bg-white/80 border border-pink-100 p-5 shadow-sm">
            <div className="text-3xl mb-2">📘</div>
            <h3 className="font-semibold text-sky-900">Pembelajaran Tematik</h3>
            <p className="text-xs text-slate-600 mt-1">
              Materi dibuat sesuai tema mingguan, agar anak mudah memahami.
            </p>
          </div>

          <div className="rounded-3xl bg-white/80 border border-emerald-100 p-5 shadow-sm">
            <div className="text-3xl mb-2">😊</div>
            <h3 className="font-semibold text-sky-900">
              Pendekatan Ramah Anak
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Menggunakan metode bermain sambil belajar agar anak tidak bosan.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-sky-900">
            Kenapa Bimbel Yakba Kinder Berbeda?
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-white/80 border border-sky-100 p-6 space-y-3">
              <p className="text-lg">👩‍🏫</p>
              <h3 className="font-semibold text-sky-900">Guru Berpengalaman</h3>
              <p className="text-sm text-slate-600">
                Guru bersertifikasi PAUD yang sabar & sangat memahami psikologi
                anak usia dini.
              </p>
            </div>

            <div className="rounded-2xl bg-white/80 border border-pink-100 p-6 space-y-3">
              <p className="text-lg">🎨</p>
              <h3 className="font-semibold text-sky-900">
                Belajar dengan Aktivitas Kreatif
              </h3>
              <p className="text-sm text-slate-600">
                Menggambar, bernyanyi, mewarnai, dan storytelling untuk
                memperkuat ingatan anak.
              </p>
            </div>

            <div className="rounded-2xl bg-white/80 border border-emerald-100 p-6 space-y-3">
              <p className="text-lg">📚</p>
              <h3 className="font-semibold text-sky-900">
                Modul Cetak & Digital
              </h3>
              <p className="text-sm text-slate-600">
                Materi menarik berbentuk lembar kerja, video singkat, dan kartu
                belajar.
              </p>
            </div>

            <div className="rounded-2xl bg-white/80 border border-violet-100 p-6 space-y-3">
              <p className="text-lg">🔁</p>
              <h3 className="font-semibold text-sky-900">Evaluasi Berkala</h3>
              <p className="text-sm text-slate-600">
                Orang tua mendapatkan laporan perkembangan setiap minggu.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-sky-50 border border-sky-100 px-6 py-6 md:py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-sky-900">
              Ingin mencoba kelas bimbel pertama secara gratis?
            </p>
            <p className="text-xs md:text-sm text-slate-600">
              Kami menyediakan 1x sesi trial untuk anak-anak baru. Yuk ikut!
            </p>
          </div>

          <a
            href="/kontak"
            className="rounded-full bg-sky-500 px-4 py-2 text-xs md:text-sm font-semibold text-white hover:bg-sky-600 transition"
          >
            Daftar Sekarang
          </a>
        </div>
      </section>
    </main>
  );
};

export default BimbelPage;

const AboutUsPage = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 md:py-14 space-y-12">
      <div className="grid gap-10 md:grid-cols-[1.3fr,1fr] items-center">
        <div className="space-y-5">
          <span className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-1 text-[11px] font-semibold text-yellow-700">
            🌈 TK Ceria & Ramah Anak
          </span>

          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-sky-900">
            Tentang <span className="text-pink-500">Kami</span>
          </h1>

          <p className="text-sm md:text-base text-slate-600 max-w-xl">
            Kami adalah sekolah anak usia dini yang percaya bahwa setiap anak
            belajar paling baik saat mereka merasa senang, aman, dan dicintai.
            Di sini, belajar terasa seperti bermain — tapi tetap terarah dan
            penuh makna.
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/90 p-4 border border-sky-100">
              <p className="text-[11px] font-semibold text-slate-500">
                Usia Anak
              </p>
              <p className="text-lg font-bold text-sky-900">3–6 Tahun</p>
              <p className="text-[11px] text-slate-500">
                Kelompok Bermain & TK
              </p>
            </div>
            <div className="rounded-2xl bg-white/90 p-4 border border-pink-100">
              <p className="text-[11px] font-semibold text-slate-500">
                Rasio Kelas
              </p>
              <p className="text-lg font-bold text-sky-900">Kecil</p>
              <p className="text-[11px] text-slate-500">
                Guru lebih fokus ke setiap anak
              </p>
            </div>
            <div className="rounded-2xl bg-white/90 p-4 border border-emerald-100">
              <p className="text-[11px] font-semibold text-slate-500">
                Suasana
              </p>
              <p className="text-lg font-bold text-sky-900">Hangat</p>
              <p className="text-[11px] text-slate-500">
                Serasa rumah kedua anak
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-6 -left-4 h-20 w-20 rounded-3xl bg-pink-200/70 blur-2xl" />
          <div className="absolute -bottom-8 -right-4 h-20 w-20 rounded-3xl bg-sky-200/70 blur-2xl" />

          <div className="relative rounded-3xl bg-white/90 p-6 border border-sky-100 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-sky-500">
                  Visi Kami
                </p>
                <p className="text-sm font-medium text-slate-800">
                  Menjadi tempat bermain dan belajar yang menumbuhkan akhlak,
                  kemandirian, dan rasa ingin tahu anak sejak dini.
                </p>
              </div>
              <span className="text-3xl">🧸</span>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-1 text-center text-[11px]">
              <div className="rounded-2xl bg-sky-50 px-2 py-3">
                <div className="text-xl mb-1">📚</div>
                <p className="font-semibold text-sky-800">Belajar</p>
                <p className="text-slate-500">Konsep dini yang menyenangkan</p>
              </div>
              <div className="rounded-2xl bg-pink-50 px-2 py-3">
                <div className="text-xl mb-1">🤝</div>
                <p className="font-semibold text-pink-800">Karakter</p>
                <p className="text-slate-500">Belajar berbagi & peduli</p>
              </div>
              <div className="rounded-2xl bg-emerald-50 px-2 py-3">
                <div className="text-xl mb-1">✨</div>
                <p className="font-semibold text-emerald-800">Kreatif</p>
                <p className="text-slate-500">Mengeksplorasi imajinasi</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-10 md:grid-cols-2 items-start">
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-sky-900">
            Cerita Singkat Kami
          </h2>
          <p className="text-sm md:text-base text-slate-600 leading-relaxed">
            Berawal dari keinginan untuk menghadirkan tempat belajar yang
            benar-benar ramah anak, kami membangun sekolah ini dengan konsep
            &quot;belajar sambil bermain&quot;. Setiap sudut kelas dirancang
            agar anak merasa nyaman bereksplorasi, bertanya, dan mencoba hal-hal
            baru.
          </p>
          <p className="text-sm md:text-base text-slate-600 leading-relaxed">
            Kami juga percaya bahwa kerja sama dengan orang tua adalah kunci.
            Karena itu, kami rutin memberikan laporan perkembangan anak dan
            membuka ruang dialog dengan orang tua.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-sky-900">
            Apa yang Membuat Kami Berbeda?
          </h3>
          <ul className="space-y-3 text-sm md:text-base">
            <li className="flex gap-3">
              <span className="mt-1 text-lg">🎨</span>
              <div>
                <p className="font-semibold text-slate-800">
                  Kelas penuh warna & aktivitas kreatif
                </p>
                <p className="text-slate-600 text-sm">
                  Anak diajak menggambar, mewarnai, bernyanyi, dan bercerita
                  untuk melatih motorik dan imajinasi.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 text-lg">📖</span>
              <div>
                <p className="font-semibold text-slate-800">
                  Penanaman nilai-nilai karakter
                </p>
                <p className="text-slate-600 text-sm">
                  Belajar sopan santun, berbagi, antri, dan menghargai teman
                  menjadi bagian dari kegiatan harian.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 text-lg">👩‍🏫</span>
              <div>
                <p className="font-semibold text-slate-800">
                  Guru yang sabar dan sayang anak
                </p>
                <p className="text-slate-600 text-sm">
                  Guru-guru kami terlatih dalam pendidikan anak usia dini dan
                  memahami kebutuhan emosional anak.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="space-y-5">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-sky-900">
          Nilai & Kegiatan Utama
        </h2>
        <p className="text-center text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
          Kami menggabungkan kegiatan bermain, belajar, dan pembentukan karakter
          dalam satu pengalaman yang menyenangkan setiap hari.
        </p>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl bg-white/90 p-4 border border-sky-100">
            <div className="text-2xl mb-1">🧩</div>
            <p className="font-semibold text-slate-800 mb-1 text-sm">
              Belajar Melalui Permainan
            </p>
            <p className="text-[12px] text-slate-600">
              Puzzle, balok, dan permainan edukatif untuk melatih logika dan
              fokus.
            </p>
          </div>
          <div className="rounded-3xl bg-white/90 p-4 border border-pink-100">
            <div className="text-2xl mb-1">🎵</div>
            <p className="font-semibold text-slate-800 mb-1 text-sm">
              Musik & Gerak
            </p>
            <p className="text-[12px] text-slate-600">
              Bernyanyi dan menari bersama untuk melatih kepercayaan diri.
            </p>
          </div>
          <div className="rounded-3xl bg-white/90 p-4 border border-emerald-100">
            <div className="text-2xl mb-1">📚</div>
            <p className="font-semibold text-slate-800 mb-1 text-sm">
              Dasar Literasi & Numerasi
            </p>
            <p className="text-[12px] text-slate-600">
              Pengenalan huruf, angka, warna, dan bentuk secara bertahap.
            </p>
          </div>
          <div className="rounded-3xl bg-white/90 p-4 border border-violet-100">
            <div className="text-2xl mb-1">🤗</div>
            <p className="font-semibold text-slate-800 mb-1 text-sm">
              Sosial & Emosional
            </p>
            <p className="text-[12px] text-slate-600">
              Belajar mengungkapkan perasaan dan bekerja sama dengan teman.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl bg-sky-50 px-5 py-4 border border-sky-100">
        <div>
          <p className="text-sm font-semibold text-sky-900">
            Ingin tahu lebih banyak tentang sekolah kami?
          </p>
          <p className="text-xs md:text-sm text-slate-600">
            Kamu bisa melihat halaman fasilitas atau langsung hubungi kami untuk
            jadwal kunjungan.
          </p>
        </div>
        <div className="flex gap-3">
          <a
            href="/fasilitas"
            className="rounded-full bg-sky-500 px-4 py-2 text-xs md:text-sm font-semibold text-white hover:bg-sky-600 transition"
          >
            Lihat Fasilitas
          </a>
          <a
            href="/kontak"
            className="rounded-full border border-sky-400 bg-white px-4 py-2 text-xs md:text-sm font-semibold text-sky-700 hover:bg-sky-50 transition"
          >
            Hubungi Kami
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutUsPage;

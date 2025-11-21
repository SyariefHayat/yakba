const WhySection = () => {
  return (
    <section className="w-full bg-amber-300">
      <div className="mx-auto max-w-6xl px-4 md:px-8 lg:px-16 py-16 md:py-24 lg:py-32 flex flex-col items-center text-center text-white gap-10">
        {/* TITLE & DESCRIPTION */}
        <div className="space-y-4 max-w-3xl">
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Kenapa Memilih Yakba?
          </h3>
          <p className="text-base md:text-lg lg:text-xl leading-relaxed">
            Yakba Learning Center menghadirkan pembelajaran yang ceria dan
            bernilai Islami. Setiap anak diajak untuk menggali potensi, berpikir
            kreatif, dan tumbuh dengan akhlak yang mulia.
          </p>
        </div>

        {/* FEATURE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <div className="rounded-3xl bg-amber-400/40 shadow-lg px-6 py-6 md:py-8">
            <div className="text-3xl mb-3">😊</div>
            <h4 className="font-semibold text-lg md:text-xl mb-2">
              Belajar Ceria & Menyenangkan
            </h4>
            <p className="text-sm md:text-base">
              Anak belajar lewat permainan, cerita, dan aktivitas kreatif
              sehingga tidak merasa terbebani.
            </p>
          </div>

          <div className="rounded-3xl bg-amber-400/40 shadow-lg px-6 py-6 md:py-8">
            <div className="text-3xl mb-3">🌙</div>
            <h4 className="font-semibold text-lg md:text-xl mb-2">
              Nilai Islami Sejak Dini
            </h4>
            <p className="text-sm md:text-base">
              Kurikulum dipadukan dengan adab, doa harian, dan pengenalan
              Al-Qur&apos;an.
            </p>
          </div>

          <div className="rounded-3xl bg-amber-400/40 shadow-lg px-6 py-6 md:py-8">
            <div className="text-3xl mb-3">🎨</div>
            <h4 className="font-semibold text-lg md:text-xl mb-2">
              Kembangkan Potensi Anak
            </h4>
            <p className="text-sm md:text-base">
              Fokus pada kreativitas, percaya diri, dan kemampuan sosial anak.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;

const CtaSection = () => {
  return (
    <section className="w-full bg-red-500 px-6 md:px-12 lg:px-20 py-24 text-white">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        {/* TITLE */}
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-extrabold">
          Yuk Bergabung Bersama Yakba!
        </h3>

        {/* DESCRIPTION */}
        <p className="text-base md:text-lg lg:text-xl opacity-90">
          Daftarkan buah hati Anda dan temukan pembelajaran ceria yang Islami,
          kreatif, dan menyenangkan setiap hari.
        </p>

        {/* CTA BUTTON */}
        <div className="mt-8">
          <a
            href="#daftar"
            className="
              inline-block bg-white text-red-600 font-semibold
              px-8 md:px-10 py-3 md:py-4 rounded-full 
              text-lg md:text-xl shadow-lg
              hover:bg-red-100 transition-all
            "
          >
            Daftar Sekarang
          </a>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;

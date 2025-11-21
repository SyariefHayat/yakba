import SectionLayout from "@/components/layouts/sectionLayout";

const ProgramSection = () => {
  return (
    <SectionLayout>
      <div className="w-full flex flex-col items-center text-center space-y-6">
        {/* TITLE */}
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-extrabold">
          Program Kami
        </h3>

        {/* SUBTITLE */}
        <p className="max-w-2xl text-gray-600 text-base md:text-lg">
          Program pembelajaran yang dirancang untuk mendukung perkembangan anak
          secara menyeluruh — dari akhlak, kreativitas, hingga kemampuan
          akademik.
        </p>

        {/* PROGRAM CARDS */}
        <div
          className="
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8
          w-full mt-10
        "
        >
          {/* CARD 1 */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 flex flex-col items-center text-center space-y-3">
            {/* <Image src="/icons/play.png" alt="Icon" width={60} height={60} /> */}
            <h4 className="text-xl font-semibold">Kelas Bermain</h4>
            <p className="text-gray-500 text-sm">
              Belajar sambil bermain dengan aktivitas sensorik, motorik, dan
              kreativitas.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 flex flex-col items-center text-center space-y-3">
            {/* <Image src="/icons/quran.png" alt="Icon" width={60} height={60} /> */}
            <h4 className="text-xl font-semibold">Kelas Qur’an</h4>
            <p className="text-gray-500 text-sm">
              Pengenalan huruf hijaiyah, doa-doa harian, dan adab Islami.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 flex flex-col items-center text-center space-y-3">
            {/* <Image
              src="/icons/creative.png"
              alt="Icon"
              width={60}
              height={60}
            /> */}
            <h4 className="text-xl font-semibold">Kreativitas & Seni</h4>
            <p className="text-gray-500 text-sm">
              Mengembangkan potensi seni melalui gambar, musik, dan kerajinan
              tangan.
            </p>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
};

export default ProgramSection;

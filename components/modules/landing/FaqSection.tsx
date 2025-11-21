"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Berapa usia minimal anak untuk ikut program Yakba?",
    a: "Anak usia 4 tahun ke atas dapat mengikuti kelas pengenalan, sedangkan program lanjutan dimulai dari usia 6 tahun.",
  },
  {
    q: "Apakah tersedia kelas online?",
    a: "Ya, tersedia kelas online interaktif dengan guru langsung dan monitoring perkembangan anak.",
  },
  {
    q: "Bagaimana keamanan dan lingkungan belajar?",
    a: "Guru bersertifikasi, kelas berjumlah terbatas, materi ramah anak, dan lingkungan belajar nyaman.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-blue-500 px-6 md:px-12 lg:px-20 py-20 text-white">
      {/* TITLE */}
      <h3 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-12">
        Tanya Jawab Umum
      </h3>

      {/* FAQ LIST */}
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((item, index) => (
          <div
            key={index}
            className="bg-white/20 backdrop-blur-md p-5 rounded-2xl cursor-pointer transition-all"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            {/* QUESTION */}
            <div className="flex justify-between items-center">
              <h4 className="text-lg md:text-xl font-semibold">{item.q}</h4>
              <span className="text-2xl font-bold">
                {openIndex === index ? "−" : "+"}
              </span>
            </div>

            {/* ANSWER */}
            {openIndex === index && (
              <p className="mt-3 text-sm md:text-base text-blue-50">{item.a}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;

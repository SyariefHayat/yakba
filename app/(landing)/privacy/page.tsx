import { COLORS, YAKBA_LETTERS } from "@/lib/constants"
import Navbar from "@/components/modules/landing/shared/navbar"
import Footer from "@/components/modules/landing/home/footer"
import Image from "next/image"

export const metadata = {
    title: "Kebijakan Privasi - YAKBA Kindergarten",
    description: "Kebijakan privasi dan perlindungan data YAKBA Kindergarten",
}

const PrivacyPage = () => {
    return (
        <main className="font-poppins">
            {/* Hero Section */}
            <section className="relative w-full h-[30vh] bg-sky-100 overflow-hidden">
                <Navbar />
                <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-30 px-4">
                    <h1 className="text-2xl md:text-4xl font-mochi-boom" style={{ color: COLORS.navy }}>
                        Kebijakan Privasi
                    </h1>
                </div>
                <Image
                    src="/land.png"
                    alt="Land decoration"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="absolute -bottom-10 md:-bottom-20 lg:-bottom-40 left-0 w-full h-auto z-20"
                />
            </section>

            {/* Content Section */}
            <section className="w-full py-12 md:py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 md:px-8">
                    <div className="prose prose-lg max-w-none font-poppins">
                        <h2 className="text-xl font-mochi-boom" style={{ color: COLORS.blue }}>
                            <span className="font-poppins">1.</span> Informasi yang Kami Kumpulkan
                        </h2>
                        <p className="text-gray-700 mb-6">
                            Kami mengumpulkan informasi yang Anda berikan saat mendaftarkan anak, termasuk nama, tanggal lahir,
                            alamat, nomor telepon, dan informasi kesehatan yang relevan. Informasi ini diperlukan untuk
                            memberikan layanan pendidikan terbaik.
                        </p>

                        <h2 className="text-xl font-mochi-boom" style={{ color: COLORS.green }}>
                            <span className="font-poppins">2.</span> Penggunaan Informasi
                        </h2>
                        <p className="text-gray-700 mb-6">
                            Informasi yang dikumpulkan digunakan untuk: mengelola pendaftaran dan administrasi, berkomunikasi
                            dengan orang tua/wali, memantau perkembangan anak, dan memastikan keselamatan siswa. Kami tidak
                            akan menjual atau menyewakan data pribadi Anda kepada pihak ketiga.
                        </p>

                        <h2 className="text-xl font-mochi-boom" style={{ color: COLORS.pink }}>
                            <span className="font-poppins">3.</span> Perlindungan Data
                        </h2>
                        <p className="text-gray-700 mb-6">
                            Kami menerapkan langkah-langkah keamanan yang sesuai untuk melindungi informasi pribadi dari
                            akses yang tidak sah, perubahan, pengungkapan, atau penghancuran. Data disimpan di server yang
                            aman dan hanya dapat diakses oleh staf yang berwenang.
                        </p>

                        <h2 className="text-xl font-mochi-boom" style={{ color: COLORS.blue }}>
                            <span className="font-poppins">4.</span> Foto dan Video
                        </h2>
                        <p className="text-gray-700 mb-6">
                            Kami mungkin mengambil foto atau video anak selama kegiatan sekolah untuk dokumentasi dan
                            publikasi. Persetujuan orang tua akan diminta sebelum menggunakan materi tersebut untuk
                            keperluan promosi atau media sosial.
                        </p>

                        <h2 className="text-xl font-mochi-boom" style={{ color: COLORS.green }}>
                            <span className="font-poppins">5.</span> Hak Orang Tua
                        </h2>
                        <p className="text-gray-700 mb-6">
                            Orang tua/wali memiliki hak untuk mengakses, memperbarui, atau meminta penghapusan data pribadi
                            anak mereka. Permintaan dapat diajukan melalui administrasi sekolah atau email resmi kami.
                        </p>

                        <h2 className="text-xl font-mochi-boom" style={{ color: COLORS.pink }}>
                            <span className="font-poppins">6.</span> Perubahan Kebijakan
                        </h2>
                        <p className="text-gray-700 mb-6">
                            Kebijakan privasi ini dapat diperbarui dari waktu ke waktu. Perubahan signifikan akan
                            dikomunikasikan kepada orang tua/wali melalui pengumuman resmi.
                        </p>

                        <h2 className="text-xl font-mochi-boom" style={{ color: COLORS.blue }}>
                            <span className="font-poppins">7.</span> Hubungi Kami
                        </h2>
                        <p className="text-gray-700 mb-6">
                            Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan hubungi kami melalui
                            halaman Hubungi Kami atau email ke privacy@yakba.id.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}

export default PrivacyPage

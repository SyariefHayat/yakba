import { COLORS, YAKBA_LETTERS } from "@/lib/constants"
import Navbar from "@/components/modules/landing/shared/navbar"
import Footer from "@/components/modules/landing/home/footer"
import Image from "next/image"

export const metadata = {
    title: "Syarat & Ketentuan - YAKBA Kindergarten",
    description: "Syarat dan ketentuan penggunaan layanan YAKBA Kindergarten",
}

const TermsPage = () => {
    return (
        <main className="font-poppins">
            {/* Hero Section */}
            <section className="relative w-full h-[30vh] bg-sky-100 overflow-hidden">
                <Navbar />
                <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-30 px-4">
                    <h1 className="text-2xl md:text-4xl font-mochi-boom" style={{ color: COLORS.navy }}>
                        Syarat & Ketentuan
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
                            <span className="font-poppins">1.</span> Penerimaan Ketentuan
                        </h2>
                        <p className="text-gray-700 mb-6">
                            Dengan mengakses dan menggunakan layanan YAKBA Kindergarten, Anda menyetujui untuk terikat oleh
                            syarat dan ketentuan ini. Jika Anda tidak menyetujui ketentuan ini, mohon untuk tidak menggunakan
                            layanan kami.
                        </p>

                        <h2 className="text-xl font-mochi-boom" style={{ color: COLORS.green }}>
                            <span className="font-poppins">2.</span> Layanan Pendidikan
                        </h2>
                        <p className="text-gray-700 mb-6">
                            YAKBA Kindergarten menyediakan layanan pendidikan anak usia dini yang mencakup berbagai program
                            pembelajaran. Kami berhak untuk mengubah, memodifikasi, atau menghentikan layanan kapan saja
                            dengan pemberitahuan yang wajar kepada orang tua/wali.
                        </p>

                        <h2 className="text-xl font-mochi-boom" style={{ color: COLORS.pink }}>
                            <span className="font-poppins">3.</span> Pendaftaran dan Biaya
                        </h2>
                        <p className="text-gray-700 mb-6">
                            Pendaftaran siswa memerlukan kelengkapan dokumen yang ditentukan. Biaya pendidikan harus dibayar
                            sesuai dengan jadwal yang ditetapkan. Kebijakan pengembalian biaya akan diinformasikan pada saat
                            pendaftaran.
                        </p>

                        <h2 className="text-xl font-mochi-boom" style={{ color: COLORS.blue }}>
                            <span className="font-poppins">4.</span> Tanggung Jawab Orang Tua
                        </h2>
                        <p className="text-gray-700 mb-6">
                            Orang tua/wali bertanggung jawab untuk memastikan anak hadir tepat waktu, memberikan informasi
                            kesehatan yang akurat, dan berkomunikasi secara aktif dengan pihak sekolah mengenai perkembangan anak.
                        </p>

                        <h2 className="text-xl font-mochi-boom" style={{ color: COLORS.green }}>
                            <span className="font-poppins">5.</span> Keselamatan dan Keamanan
                        </h2>
                        <p className="text-gray-700 mb-6">
                            Keselamatan anak adalah prioritas utama kami. Kami menerapkan protokol keamanan yang ketat dan
                            hanya akan menyerahkan anak kepada orang yang telah terdaftar sebagai penjemput yang sah.
                        </p>

                        <h2 className="text-xl font-mochi-boom" style={{ color: COLORS.pink }}>
                            <span className="font-poppins">6.</span> Kontak
                        </h2>
                        <p className="text-gray-700 mb-6">
                            Jika Anda memiliki pertanyaan tentang syarat dan ketentuan ini, silakan hubungi kami melalui
                            halaman Hubungi Kami atau email ke info@yakba.id.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}

export default TermsPage

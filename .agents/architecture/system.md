# Arsitektur Sistem (MVP)

## Gambaran Umum
Website Yakba adalah sistem web content-driven untuk branding + katalog + konversi ke WhatsApp.

## Alur Data Utama
1. Pengunjung membuka halaman (landing/katalog/program).
2. Frontend mengambil konten dari CMS atau data source backend.
3. User melihat detail dan menekan CTA WhatsApp.
4. User diarahkan ke WhatsApp dengan pesan terprefill.
5. Event interaksi dikirim ke analytics.

## Komponen Sistem
- Frontend Web: rendering halaman publik dan CTA.
- CMS/Admin: manajemen konten produk/program.
- Analytics: pelacakan funnel kunjungan hingga klik CTA.
- Auth Admin: kontrol akses role-based untuk tim internal.

## Batasan MVP
- Tidak ada modul checkout/pembayaran internal.
- Tidak ada modul manajemen siswa.
- Tidak ada sistem pembelajaran online.

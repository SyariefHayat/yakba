# Aturan Pengembangan

## Standar Umum
- Prioritaskan pengembangan MVP dengan scope ketat sesuai PRD.
- Gunakan arsitektur modular agar fitur v1.1 dan v2.0 mudah ditambahkan.
- Semua halaman wajib responsif untuk breakpoint 360, 768, 1024, 1440 px.

## Kualitas Teknis
- HTTPS wajib di semua environment produksi.
- Uptime target produksi >= 99,5% per bulan.
- Lighthouse mobile untuk 3 halaman trafik tertinggi minimal 75 (Performance).
- Event analytics utama wajib tercatat: `page_view`, `product_view`, `program_view`, `cta_whatsapp_click`.

## Konten dan CMS
- Data produk/program harus dapat diubah via CMS/admin tanpa deploy ulang.
- Role minimum: `admin` dan `editor`.
- Audit log perubahan konten direkomendasikan aktif.

## Keamanan Minimum
- Batasi percobaan login admin (rate limit).
- Password policy kuat untuk akun admin.
- Jangan simpan data pembayaran karena pembayaran tidak diproses di website MVP.

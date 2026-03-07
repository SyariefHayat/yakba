# Keputusan Stack Teknologi MVP

## Ringkasan Keputusan
Stack MVP yang dipilih:
- Frontend: **Next.js (App Router) + TypeScript + Tailwind CSS**
- Backend: **Backend minimal via Next.js Route Handlers** (tanpa service backend terpisah pada MVP)
- CMS: **Sanity (Headless CMS, hosted)**
- Hosting: **Vercel**
- Analytics: **Google Analytics 4 (GA4) + Google Tag Manager (GTM) + Google Search Console**

Keputusan ini dioptimalkan untuk timeline 6-8 minggu, kebutuhan website marketing, katalog produk, alur checkout berbasis WhatsApp, kemudahan update konten, dan SEO.

## Alasan Pemilihan

## 1) Kecepatan delivery (6-8 minggu)
- Next.js + Vercel mempercepat setup, preview, dan deploy production.
- Tidak membuat backend terpisah mengurangi kompleksitas dan risiko keterlambatan.
- Sanity mempercepat pembuatan model konten produk/program tanpa membangun admin panel dari nol.

## 2) SEO-friendly untuk website branding/marketing
- Next.js mendukung SSR/SSG/ISR untuk performa dan crawlability.
- Metadata per halaman (title, description, Open Graph), sitemap, dan robots dapat dikontrol penuh.
- Struktur konten dari Sanity memudahkan optimasi halaman program dan produk.

## 3) Katalog produk + konten mudah dikelola
- Sanity cocok untuk konten dinamis: produk digital/fisik, program, partnership, halaman statis.
- Role-based access (`admin`, `editor`) sesuai PRD.
- Tim operasional bisa update konten tanpa deploy kode.

## 4) WhatsApp checkout tanpa payment gateway
- Next.js cukup untuk generate deep link WhatsApp dengan pesan terprefill.
- Tracking klik CTA WhatsApp dapat dicatat via GTM/GA4 (`cta_whatsapp_click`) sesuai KPI.
- Tidak ada penyimpanan data pembayaran, selaras dengan constraint produk MVP.

## Detail Arsitektur Stack

## Frontend
- Framework: Next.js (App Router)
- Bahasa: TypeScript
- Styling: Tailwind CSS
- Rendering strategy:
  - SSG/ISR untuk halaman marketing utama (landing, tentang, program, partnership)
  - ISR/SSR untuk katalog & detail produk jika frekuensi update tinggi
- SEO implementation:
  - Metadata API Next.js
  - `sitemap.xml` dan `robots.txt`
  - Struktur heading semantik dan internal linking

## Backend
- Pendekatan: Backend minimal (BFF) di Next.js Route Handlers
- Fungsi backend MVP:
  - Normalisasi/generasi URL WhatsApp dengan parameter pesan
  - Endpoint ringan untuk kebutuhan tracking server-side opsional
  - Middleware keamanan dasar (rate limit pada endpoint sensitif bila ada)
- Tidak ada microservice terpisah pada MVP.

## CMS
- Platform: Sanity (hosted)
- Content models minimum:
  - `product` (kategori, harga, stok fisik, media, status publish)
  - `program` (usia target, learning outcomes, jadwal, kurikulum)
  - `page` (tentang, partnership, kontak)
- Workflow:
  - Draft/publish
  - Role `admin` dan `editor`

## Hosting & Delivery
- Hosting frontend: Vercel
- CDN: Vercel Edge Network
- CI/CD: otomatis dari Git branch
- Environment: preview (staging-like) dan production
- Target non-fungsional:
  - HTTPS aktif
  - Uptime >= 99,5%
  - Lighthouse mobile >= 75 untuk 3 halaman utama

## Analytics & Measurement
- Tagging: Google Tag Manager
- Product analytics: Google Analytics 4
- SEO monitoring: Google Search Console
- Event minimum (sesuai PRD):
  - `page_view`
  - `product_view`
  - `program_view`
  - `cta_whatsapp_click`
- KPI monitoring:
  - 3.000-5.000 monthly visitors
  - CTR WhatsApp 10-15%
  - >=50 transaksi/bulan (rekonsiliasi manual dari data operasional WhatsApp)

## Konsekuensi & Batasan
- Transaksi tetap manual via WhatsApp; website hanya mengarahkan dan mengukur klik/conversion proxy.
- Karena tidak ada payment system, metrik transaksi final tetap perlu pencatatan operasional.
- Jika volume naik tajam, tahap v1.1/v2.0 perlu meninjau otomasi order dan integrasi pembayaran.

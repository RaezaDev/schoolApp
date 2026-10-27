# 🏫 SchoolBuilder - Web App Builder & Sistem PPDB Sekolah Modern (Rp 0 / Zero Budget)

Platform pembuat website profil sekolah profesional dan sistem penerimaan peserta didik baru (PPDB) online berbasis **Next.js 15**, **Tailwind CSS**, **Framer Motion**, **Firebase**, dan **Cloudinary**.

---

## ✨ Fitur Utama

1. **🎨 Studio Visual Drag-and-Drop Builder**:
   - Susun dan seret blok halaman (Hero, Sambutan Kepsek, Sarana/Fasilitas, Guru & Staf, Prestasi, Galeri, Kontak/Peta) dengan animasi mulus via Framer Motion.
   - Kustomisasi warna tema sekolah (Primary & Accent color) secara real-time.
   - Responsive Device Preview: Desktop, Tablet, dan Smartphone.
   - Sembunyikan atau tampilkan blok sesuai kebutuhan sekolah.

2. **📋 Sistem PPDB Terpadu (Zero-Budget Architecture)**:
   - Formulir pendaftaran calon siswa baru multi-langkah (*Multi-Step Form*): Jalur Masuk ➜ Biodata Siswa ➜ Biodata Orang Tua ➜ Konfirmasi.
   - Penerbitan otomatis **Kartu Bukti Pendaftaran Digital** dengan Nomor Registrasi unik dan tombol cetak PDF.
   - **Fitur Cek Status Seleksi Mandiri** (dengan penyamaran/masking data sensitif NIK & No HP sesuai standar UU PDP).
   - **Notifikasi WhatsApp 0 Biaya**: Menggunakan direct redirect `wa.me/` tanpa biaya API vendor.

3. **👥 Dashboard Panitia PPDB**:
   - Monitoring pendaftar real-time berdasarkan status (*Pending*, *Verified*, *Accepted*, *Need Revision*).
   - Verifikasi data & catatan perbaikan berkas.
   - **Export Data Pendaftar ke Excel (.xlsx)** dengan 1 klik.

---

## 🛠️ Tech Stack & Strategi Bebas Biaya (Rp 0)

| Komponen | Teknologi | Strategi Bebas Biaya |
|---|---|---|
| Framework | **Next.js 15 (App Router)** | Vercel Free Hobby Tier |
| Styling | **Tailwind CSS v4** | CSS Variables dinamis untuk palet warna sekolah |
| Animasi & Drag-Drop | **Framer Motion** | Reorder.Group native tanpa library berat eksternal |
| Database & Auth | **Firebase (Spark Plan)** | 50.000 read/hari, token pendaftar tanpa akun (hemat 100% auth quota) |
| Media Hosting | **Cloudinary (Free Tier)** | 25 Credits/bln, transformasi otomatis `f_auto,q_auto,w_800` |
| Ekspor Laporan | **XLSX (SheetJS)** | Dijalankan langsung di browser panitia (0 server compute) |

---

## 🚀 Panduan Menjalankan Proyek

### 1. Jalankan Development Server:
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

### 2. Navigasi Halaman Utama:
- **Landing Page Platform**: `/`
- **Studio Visual Drag-and-Drop**: `/builder`
- **Website Profil Sekolah Publik**: `/s/smpn1-teladan`
- **Portal Pendaftaran PPDB Siswa**: `/s/smpn1-teladan/ppdb`
- **Portal Berita & Pengumuman Publik**: `/s/smpn1-teladan/berita`
- **Dashboard Panitia PPDB & Export Excel**: `/dashboard/ppdb`
- **Dashboard Manajemen Staf (RBAC)**: `/dashboard/staf`
- **Dashboard CMS Publikasi Berita**: `/dashboard/posts`

---

## 📁 Struktur Folder Proyek

```
webAppBuilder/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Landing Page Platform
│   │   ├── builder/page.tsx         # Studio Visual Drag & Drop Builder
│   │   ├── dashboard/ppdb/page.tsx  # Dashboard Panitia PPDB & Export Excel
│   │   ├── s/[slug]/page.tsx        # Website Profil Sekolah Publik
│   │   ├── s/[slug]/ppdb/page.tsx   # Formulir PPDB & Cek Status
│   │   ├── api/cloudinary-sign/     # Route handler direct upload
│   │   ├── globals.css              # Tailwind CSS v4 & theme variables
│   │   └── layout.tsx
│   ├── components/
│   │   ├── blocks/                  # Blok-blok website profil sekolah
│   │   │   ├── HeroBlock.tsx
│   │   │   ├── SambutanBlock.tsx
│   │   │   ├── FasilitasBlock.tsx
│   │   │   ├── GuruStafBlock.tsx
│   │   │   ├── PrestasiBlock.tsx
│   │   │   ├── GaleriBlock.tsx
│   │   │   ├── FaqBlock.tsx
│   │   │   ├── VideoProfilBlock.tsx
│   │   │   ├── ProgramJurusanBlock.tsx
│   │   │   ├── TestimoniBlock.tsx
│   │   │   ├── CtaPpdbBlock.tsx
│   │   │   ├── KontakPetaBlock.tsx
│   │   │   └── SectionRenderer.tsx
│   │   ├── school/                  # Header & Footer Profil Sekolah
│   │   │   ├── SchoolNavbar.tsx
│   │   │   └── SchoolFooter.tsx
│   │   └── ui/                      # Reusable UI Components
│   │       └── ImageUploader.tsx    # Direct Cloudinary Image Uploader
│   ├── lib/
│   │   ├── firebase/client.ts       # Firebase Client SDK Singleton
│   │   ├── mockData.ts              # Data demo realistis & fallback
│   │   ├── utils.ts                 # WhatsApp generator, date & masking helper
│   │   └── cloudinary.ts            # Client direct upload & image optimizer
│   └── types/
│       └── builder.ts               # Tipe data TypeScript lengkap
```

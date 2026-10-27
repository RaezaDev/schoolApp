import { SchoolSite, PPDBApplicant, SchoolPost, SchoolStaffMember } from "@/types/builder";

export const initialDemoSchool: SchoolSite = {
  id: "sch_smpn1_teladan",
  slug: "smpn1-teladan",
  name: "SMP Negeri 1 Teladan",
  jenjang: "SMP",
  npsn: "20109988",
  tagline: "Membentuk Generasi Unggul, Berkarakter, dan Berwawasan Global",
  logoUrl: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=150&auto=format&fit=crop&q=80",
  ownerId: "user_admin_demo",
  theme: {
    primaryColor: "#1e3a8a", // Blue 900
    secondaryColor: "#f59e0b", // Amber 500
    accentColor: "#10b981", // Emerald 500
    fontHeading: "Inter",
    fontBody: "Inter",
    borderRadius: "xl",
    mode: "light",
  },
  status: "published",
  createdAt: 1714500000000,
  updatedAt: 1714500000000,
  ppdbConfig: {
    isOpen: true,
    academicYear: "2026/2027",
    startDate: "2026-05-01",
    endDate: "2026-06-30",
    announcementDate: "2026-07-05",
    contactWhatsApp: "081234567890",
    tracks: [
      {
        id: "zonasi",
        name: "Jalur Zonasi",
        quota: 120,
        description: "Berdasarkan jarak tempat tinggal domisili siswa ke sekolah (radius maks 3 km).",
      },
      {
        id: "prestasi",
        name: "Jalur Prestasi",
        quota: 60,
        description: "Berdasarkan nilai rapor rata-rata >= 85 atau piagam juara lomba resmi.",
      },
      {
        id: "afirmasi",
        name: "Jalur Afirmasi",
        quota: 40,
        description: "Bagi calon peserta didik dari keluarga pemegang KIP/PKH/KKS.",
      },
      {
        id: "perpindahan",
        name: "Jalur Perpindahan Tugas",
        quota: 10,
        description: "Bagi calon siswa yang orang tuanya pindah tugas dinas resmi.",
      },
    ],
  },
  sections: [
    {
      id: "sec_hero_1",
      type: "hero",
      order: 0,
      isActive: true,
      title: "Hero Banner",
      data: {
        badgeText: "🚀 Pendaftaran Siswa Baru (PPDB) 2026/2027 Telah Dibuka",
        headline: "Wujudkan Masa Depan Gemilang Bersama SMP Negeri 1 Teladan",
        subheadline:
          "Sekolah ramah anak dengan kurikulum berstandar nasional dan pembinaan karakter religius serta penguasaan teknologi digital.",
        ctaPrimaryText: "Daftar PPDB Sekarang",
        ctaPrimaryLink: "/s/smpn1-teladan/ppdb",
        ctaSecondaryText: "Pelajari Profil Sekolah",
        ctaSecondaryLink: "#profil",
        backgroundImageUrl:
          "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&auto=format&fit=crop&q=80",
        stats: [
          { label: "Siswa Aktif", value: "720+" },
          { label: "Guru Profesional", value: "48" },
          { label: "Prestasi Juara", value: "85+" },
          { label: "Akreditasi", value: "A Unggul" },
        ],
      },
    },
    {
      id: "sec_sambutan_2",
      type: "sambutan_kepsek",
      order: 1,
      isActive: true,
      title: "Sambutan Kepala Sekolah",
      data: {
        kepsekName: "Dr. H. Bambang Sujarwo, M.Pd.",
        kepsekTitle: "Kepala SMP Negeri 1 Teladan",
        kepsekPhotoUrl:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=80",
        greetingMessage:
          "Assalamu'alaikum Warahmatullahi Wabarakatuh. Selamat datang di portal resmi SMP Negeri 1 Teladan. Kami berkomitmen menyediakan lingkungan belajar yang aman, inspiratif, dan menantang bagi setiap murid untuk mengembangkan potensi terbaik mereka.",
        visi: "Terwujudnya Generasi yang Beriman, Cerdas, Berkarakter Pancasila, dan Berdaya Saing Global.",
        misi: [
          "Menyelenggarakan pembelajaran berdiferensiasi yang berpusat pada murid.",
          "Membiasakan nilai-nilai akhlak mulia dan budaya gotong royong.",
          "Mengintegrasikan literasi sains dan teknologi digital dalam proses pembelajaran.",
          "Menumbuhkan kepedulian lingkungan hidup menuju sekolah Adiwiyata mandiri.",
        ],
      },
    },
    {
      id: "sec_fasilitas_3",
      type: "fasilitas",
      order: 2,
      isActive: true,
      title: "Fasilitas & Sarana Belajar",
      data: {
        facilities: [
          {
            id: "f1",
            title: "Laboratorium Komputer & AI",
            description: "40 unit PC modern dengan koneksi internet serat optik kecepatan tinggi.",
            imageUrl:
              "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80",
          },
          {
            id: "f2",
            title: "Perpustakaan Digital",
            description: "Koleksi lebih dari 8.000 buku fisik dan ribuan e-book referensi terakreditasi.",
            imageUrl:
              "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&auto=format&fit=crop&q=80",
          },
          {
            id: "f3",
            title: "Laboratorium IPA Terpadu",
            description: "Alat praktikum fisika, biologi, dan kimia lengkap bersertifikasi keselamatan.",
            imageUrl:
              "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&auto=format&fit=crop&q=80",
          },
          {
            id: "f4",
            title: "Gedung Olahraga Serbaguna",
            description: "Lapangan basket, futsal, dan bulutangkis tertutup standar nasional.",
            imageUrl:
              "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80",
          },
        ],
      },
    },
    {
      id: "sec_prestasi_4",
      type: "prestasi",
      order: 3,
      isActive: true,
      title: "Koleksi Prestasi Siswa",
      data: {
        achievements: [
          {
            id: "p1",
            title: "Medali Emas Olimpiade Sains Nasional (OSN) Matematika",
            level: "Nasional",
            year: "2025",
            studentName: "Ahmad Rizky Pratama",
            imageUrl:
              "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&auto=format&fit=crop&q=80",
          },
          {
            id: "p2",
            title: "Juara 1 Lomba Robotik & Inovasi Teknologi Pelajar",
            level: "Provinsi",
            year: "2025",
            studentName: "Tim Robotika SMP 1",
            imageUrl:
              "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&auto=format&fit=crop&q=80",
          },
          {
            id: "p3",
            title: "Juara 2 Festival Paduan Suara & Musik Tradisional",
            level: "Nasional",
            year: "2024",
            studentName: "Paduan Suara Gita Teladan",
            imageUrl:
              "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&auto=format&fit=crop&q=80",
          },
        ],
      },
    },
    {
      id: "sec_guru_5",
      type: "guru_staf",
      order: 4,
      isActive: true,
      title: "Guru & Tenaga Pendidik",
      data: {
        staffList: [
          {
            id: "g1",
            name: "Siti Rahmawati, S.Pd., M.Si.",
            role: "Guru Senior",
            subject: "Matematika",
            photoUrl:
              "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
          },
          {
            id: "g2",
            name: "Agus Prasetyo, S.Kom.",
            role: "Guru & Pembina IT",
            subject: "Informatika & Robotik",
            photoUrl:
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
          },
          {
            id: "g3",
            name: "Nurul Hidayah, S.Pd.",
            role: "Guru Bahasa",
            subject: "Bahasa Inggris",
            photoUrl:
              "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=400&auto=format&fit=crop&q=80",
          },
          {
            id: "g4",
            name: "Drs. Hendro Wibowo",
            role: "Wakil Kepala Sekolah",
            subject: "Bidang Kesiswaan",
            photoUrl:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
          },
        ],
      },
    },
    {
      id: "sec_galeri_6",
      type: "galeri",
      order: 5,
      isActive: true,
      title: "Galeri Kegiatan Sekolah",
      data: {
        categories: ["Semua", "Upacara", "Ekstrakurikuler", "Praktikum"],
        images: [
          {
            id: "im1",
            url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80",
            caption: "Upacara Peringatan Hari Pendidikan Nasional",
            category: "Upacara",
          },
          {
            id: "im2",
            url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80",
            caption: "Diskusi Kelompok Pembelajaran Aktif di Kelas",
            category: "Praktikum",
          },
          {
            id: "im3",
            url: "https://images.unsplash.com/photo-1526676037777-05a232554f77?w=800&auto=format&fit=crop&q=80",
            caption: "Latihan Rutin Marching Band Gita Suara",
            category: "Ekstrakurikuler",
          },
          {
            id: "im4",
            url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop&q=80",
            caption: "Pentas Seni & Gelar Karya P5 Pelajar Pancasila",
            category: "Ekstrakurikuler",
          },
        ],
      },
    },
    {
      id: "sec_kontak_7",
      type: "kontak_peta",
      order: 6,
      isActive: true,
      title: "Hubungi & Kunjungi Kami",
      data: {
        address: "Jl. Pendidikan No. 45, Kebayoran Baru, Jakarta Selatan 12150",
        phone: "(021) 7208899",
        whatsapp: "081234567890",
        email: "info@smpn1teladan.sch.id",
        operationalHours: "Senin - Jumat: 07.00 - 15.30 WIB",
        googleMapsEmbedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2974900139975!2d106.80004!3d-6.22444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTMnMjguMCJTIDEwNsKwNDgnMDAuMSJF!5e0!3m2!1sid!2sid!4v1600000000000!5m2!1sid!2sid",
      },
    },
  ],
};

export const initialDemoApplicants: PPDBApplicant[] = [
  {
    id: "app_1",
    schoolId: "sch_smpn1_teladan",
    registrationNumber: "REG-2026-SMP1-001",
    trackId: "prestasi",
    status: "accepted",
    adminNotes: "Nilai rapor rata-rata 92.5 dan sertifikat OSN terverifikasi asli.",
    student: {
      fullName: "Muhammad Fadhil Al-Ghifari",
      nisn: "0081234567",
      nik: "3171012304090001",
      gender: "L",
      birthPlace: "Jakarta",
      birthDate: "2012-04-15",
      previousSchool: "SD Negeri 01 Menteng",
      address: "Jl. Teuku Umar No. 12, Menteng, Jakarta Pusat",
    },
    parent: {
      fatherName: "Ir. Gunawan Wibisono",
      motherName: "dr. Kartika Sari, Sp.A",
      whatsappNumber: "081288889999",
      parentJob: "Pegawai BUMN / Dokter",
    },
    documents: {
      photoUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=300&auto=format&fit=crop&q=80",
      kartuKeluargaUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&auto=format&fit=crop&q=80",
      aktaKelahiranUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&auto=format&fit=crop&q=80",
      raporOrPiagamUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&auto=format&fit=crop&q=80",
    },
    submittedAt: Date.now() - 86400000 * 3,
    updatedAt: Date.now() - 86400000 * 1,
  },
  {
    id: "app_2",
    schoolId: "sch_smpn1_teladan",
    registrationNumber: "REG-2026-SMP1-002",
    trackId: "zonasi",
    status: "verified",
    adminNotes: "Jarak koordinat domisili 850 meter. Berkas lengkap.",
    student: {
      fullName: "Anindya Keisha Putri",
      nisn: "0089876543",
      nik: "3171025510120003",
      gender: "P",
      birthPlace: "Bandung",
      birthDate: "2012-10-25",
      previousSchool: "SD Islam Al-Azhar 1",
      address: "Jl. Senopati No. 88, Kebayoran Baru, Jakarta Selatan",
    },
    parent: {
      fatherName: "Darmawan Hartanto",
      motherName: "Dewi Anggraini",
      whatsappNumber: "081377776666",
      parentJob: "Wiraswasta",
    },
    documents: {
      photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80",
      kartuKeluargaUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&auto=format&fit=crop&q=80",
    },
    submittedAt: Date.now() - 86400000 * 2,
    updatedAt: Date.now() - 86400000 * 1,
  },
  {
    id: "app_3",
    schoolId: "sch_smpn1_teladan",
    registrationNumber: "REG-2026-SMP1-003",
    trackId: "zonasi",
    status: "pending",
    student: {
      fullName: "Raffi Bintang Ramadhan",
      nisn: "0087654321",
      nik: "3171031207120005",
      gender: "L",
      birthPlace: "Jakarta",
      birthDate: "2012-07-12",
      previousSchool: "SD Negeri 03 Kramat Pela",
      address: "Jl. Barito II No. 14, Kebayoran Baru, Jakarta Selatan",
    },
    parent: {
      fatherName: "Budi Santoso",
      motherName: "Nurul Aini",
      whatsappNumber: "081911223344",
      parentJob: "Karyawan Swasta",
    },
    documents: {
      photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80",
    },
    submittedAt: Date.now() - 86400000 * 1,
    updatedAt: Date.now() - 86400000 * 1,
  },
  {
    id: "app_4",
    schoolId: "sch_smpn1_teladan",
    registrationNumber: "REG-2026-SMP1-004",
    trackId: "afirmasi",
    status: "need_revision",
    adminNotes: "Foto Kartu Keluarga (KK) terpotong/buram. Mohon foto ulang dengan jelas.",
    student: {
      fullName: "Siti Rahmania",
      nisn: "0084567890",
      nik: "3171044403120002",
      gender: "P",
      birthPlace: "Depok",
      birthDate: "2012-03-04",
      previousSchool: "SD Negeri 05 Gandaria",
      address: "Jl. Gandaria Tengah No. 5, Kebayoran Baru",
    },
    parent: {
      fatherName: "Agus Salim",
      motherName: "Aminah",
      whatsappNumber: "085712345678",
      parentJob: "Pedagang",
    },
    documents: {
      photoUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&auto=format&fit=crop&q=80",
    },
    submittedAt: Date.now() - 3600000 * 5,
    updatedAt: Date.now() - 3600000 * 1,
  },
];

export const initialDemoPosts: SchoolPost[] = [
  {
    id: "post_1",
    schoolId: "sch_smpn1_teladan",
    title: "Pelaksanaan Asesmen Nasional Berbasis Komputer (ANBK) Berjalan Lancar",
    slug: "anbk-2026-berjalan-lancar",
    category: "Berita",
    summary:
      "Sebanyak 90 peserta didik perwakilan kelas VIII mengikuti pelaksanaan ANBK gelombang pertama di laboratorium komputer utama dengan sarana optimal.",
    content: `Pelaksanaan Asesmen Nasional Berbasis Komputer (ANBK) di SMP Negeri 1 Teladan berjalan dengan sangat tertib, lancar, dan tanpa kendala teknis berarti. 

Kepala Sekolah menyampaikan apresiasi kepada seluruh proktor dan teknisi yang telah mempersiapkan infrastruktur jaringan serat optik serta cadangan daya UPS sehingga seluruh sesi berjalan tepat waktu.

Diharapkan hasil ANBK ini dapat terus meningkatkan mutu rapor pendidikan dan literasi numerasi sekolah ke tingkat yang lebih membanggakan.`,
    coverImageUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
    authorName: "Tim Humas SMP 1",
    publishedAt: Date.now() - 86400000 * 2,
    isPublished: true,
  },
  {
    id: "post_2",
    schoolId: "sch_smpn1_teladan",
    title: "Jadwal Verifikasi Berkas Fisik & Seleksi PPDB Gelombang 1",
    slug: "jadwal-verifikasi-ppdb-gelombang-1",
    category: "Pengumuman",
    summary:
      "Pemberitahuan kepada seluruh calon wali murid yang telah memperoleh nomor registrasi untuk memperhatikan jadwal verifikasi berkas dan wawancara.",
    content: `Diumumkan kepada seluruh calon peserta didik baru dan orang tua/wali yang telah mendaftar melalui portal PPDB online:

1. Verifikasi berkas jalur Prestasi dan Afirmasi akan dilaksanakan pada tanggal 10 - 15 Juni 2026.
2. Harap membawa dokumen asli: Kartu Keluarga, Akta Kelahiran, dan Piagam Asli.
3. Jam operasional sekretariat panitia: pukul 08.00 - 14.00 WIB di Aula Utama.

Informasi lebih lanjut dapat menghubungi nomor WhatsApp sekretariat panitia yang tertera di website.`,
    coverImageUrl:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80",
    authorName: "Panitia PPDB",
    publishedAt: Date.now() - 86400000 * 4,
    isPublished: true,
  },
  {
    id: "post_3",
    schoolId: "sch_smpn1_teladan",
    title: "Siswa SMP 1 Teladan Raih Medali Emas Olimpiade Sains Nasional",
    slug: "raih-medali-emas-osn-2025",
    category: "Prestasi",
    summary:
      "Selamat kepada ananda Ahmad Rizky Pratama atas capaian gemilang medali emas bidang Matematika pada ajang OSN tingkat Nasional.",
    content: `Keluarga besar SMP Negeri 1 Teladan mengucap syukur dan bangga atas prestasi yang diukir oleh ananda Ahmad Rizky Pratama.

Setelah melalui seleksi ketat bertingkat mulai dari tingkat kota dan provinsi, Rizky berhasil mempersembahkan medali emas pada babak final Olimpiade Sains Nasional.

Semoga capaian ini menginspirasi seluruh siswa untuk terus bersemangat mengejar cita-cita dan berprestasi di bidang yang diminati.`,
    coverImageUrl:
      "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&auto=format&fit=crop&q=80",
    authorName: "Waka Kesiswaan",
    publishedAt: Date.now() - 86400000 * 7,
    isPublished: true,
  },
];

export const initialDemoStaff: SchoolStaffMember[] = [
  {
    id: "staff_1",
    schoolId: "sch_smpn1_teladan",
    name: "Dr. H. Bambang Sujarwo, M.Pd.",
    email: "kepsek@smpn1teladan.sch.id",
    role: "kepala_sekolah",
    phone: "081211112222",
    isActive: true,
    assignedAt: Date.now() - 86400000 * 90,
  },
  {
    id: "staff_2",
    schoolId: "sch_smpn1_teladan",
    name: "Siti Rahmawati, S.Pd.",
    email: "operator.tu@smpn1teladan.sch.id",
    role: "admin_sekolah",
    phone: "081233334444",
    isActive: true,
    assignedAt: Date.now() - 86400000 * 80,
  },
  {
    id: "staff_3",
    schoolId: "sch_smpn1_teladan",
    name: "Drs. Hendro Wibowo",
    email: "ppdb.hendro@smpn1teladan.sch.id",
    role: "panitia_ppdb",
    phone: "081255556666",
    isActive: true,
    assignedAt: Date.now() - 86400000 * 30,
  },
  {
    id: "staff_4",
    schoolId: "sch_smpn1_teladan",
    name: "Agus Prasetyo, S.Kom.",
    email: "humas.it@smpn1teladan.sch.id",
    role: "editor_humas",
    phone: "081277778888",
    isActive: true,
    assignedAt: Date.now() - 86400000 * 45,
  },
];


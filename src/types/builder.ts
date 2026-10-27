// ==========================================
// TIPE DATA INTI WEB APP BUILDER & PPDB
// ==========================================

export type UserRole =
  | "super_admin"
  | "admin_sekolah"
  | "panitia_ppdb"
  | "editor_humas"
  | "kepala_sekolah";

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  schoolId: string;
  avatarUrl?: string;
  createdAt: number;
}

export type ThemeBorderRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";

export interface SchoolTheme {
  primaryColor: string;     // cth: "#1e40af" (Blue 800)
  secondaryColor: string;   // cth: "#f59e0b" (Amber 500)
  accentColor: string;      // cth: "#10b981" (Emerald 500)
  fontHeading: string;      // cth: "Inter", "Poppins", "Merriweather"
  fontBody: string;         // cth: "Inter", "Roboto"
  borderRadius: ThemeBorderRadius;
  mode: "light" | "dark";
}

export type SectionType =
  | "hero"
  | "sambutan_kepsek"
  | "profil_singkat"
  | "program_jurusan"
  | "guru_staf"
  | "fasilitas"
  | "prestasi"
  | "galeri"
  | "berita_terbaru"
  | "kontak_peta"
  | "cta_ppdb"
  | "faq"
  | "video_profil"
  | "testimoni";

export interface BaseSection {
  id: string;
  type: SectionType;
  order: number;
  isActive: boolean;
  title?: string;
  subtitle?: string;
}

export interface HeroSectionData extends BaseSection {
  type: "hero";
  data: {
    headline: string;
    subheadline: string;
    ctaPrimaryText: string;
    ctaPrimaryLink: string;
    ctaSecondaryText?: string;
    ctaSecondaryLink?: string;
    backgroundImageUrl?: string;
    badgeText?: string;
    stats?: Array<{ label: string; value: string }>;
  };
}

export interface SambutanSectionData extends BaseSection {
  type: "sambutan_kepsek";
  data: {
    kepsekName: string;
    kepsekTitle: string;
    kepsekPhotoUrl?: string;
    greetingMessage: string;
    visi: string;
    misi: string[];
  };
}

export interface GuruStafSectionData extends BaseSection {
  type: "guru_staf";
  data: {
    staffList: Array<{
      id: string;
      name: string;
      role: string;
      subject?: string;
      photoUrl?: string;
    }>;
  };
}

export interface FasilitasSectionData extends BaseSection {
  type: "fasilitas";
  data: {
    facilities: Array<{
      id: string;
      title: string;
      description: string;
      imageUrl: string;
      iconName?: string;
    }>;
  };
}

export interface PrestasiSectionData extends BaseSection {
  type: "prestasi";
  data: {
    achievements: Array<{
      id: string;
      title: string;
      level: "Kota/Kab" | "Provinsi" | "Nasional" | "Internasional";
      year: string;
      studentName: string;
      imageUrl?: string;
    }>;
  };
}

export interface GaleriSectionData extends BaseSection {
  type: "galeri";
  data: {
    categories: string[];
    images: Array<{
      id: string;
      url: string;
      caption: string;
      category: string;
    }>;
  };
}

export interface KontakPetaSectionData extends BaseSection {
  type: "kontak_peta";
  data: {
    address: string;
    phone: string;
    whatsapp: string;
    email: string;
    operationalHours: string;
    googleMapsEmbedUrl?: string;
  };
}

export interface FaqSectionData extends BaseSection {
  type: "faq";
  data: {
    badge?: string;
    description?: string;
    items: Array<{
      id: string;
      question: string;
      answer: string;
    }>;
  };
}

export interface VideoProfilSectionData extends BaseSection {
  type: "video_profil";
  data: {
    headline?: string;
    subheadline?: string;
    videoUrl: string; // YouTube embed or watch link
    thumbnailUrl?: string;
  };
}

export interface ProgramJurusanSectionData extends BaseSection {
  type: "program_jurusan";
  data: {
    badge?: string;
    description?: string;
    programs: Array<{
      id: string;
      code: string;
      name: string;
      description: string;
      imageUrl?: string;
      features?: string[];
    }>;
  };
}

export interface TestimoniSectionData extends BaseSection {
  type: "testimoni";
  data: {
    badge?: string;
    description?: string;
    testimonials: Array<{
      id: string;
      name: string;
      role: string;
      quote: string;
      photoUrl?: string;
      rating?: number;
    }>;
  };
}

export interface CtaPpdbSectionData extends BaseSection {
  type: "cta_ppdb";
  data: {
    badge?: string;
    headline: string;
    subheadline: string;
    ctaButtonText: string;
    ctaButtonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
    backgroundImageUrl?: string;
  };
}

export type SectionBlock =
  | HeroSectionData
  | SambutanSectionData
  | GuruStafSectionData
  | FasilitasSectionData
  | PrestasiSectionData
  | GaleriSectionData
  | KontakPetaSectionData
  | FaqSectionData
  | VideoProfilSectionData
  | ProgramJurusanSectionData
  | TestimoniSectionData
  | CtaPpdbSectionData
  | (BaseSection & { data: Record<string, any> });

export interface SchoolHeaderConfig {
  showLogo?: boolean;
  showSchoolName?: boolean;
  showNpsnBadge?: boolean;
  isSticky?: boolean;
  showPpdbButton?: boolean;
  ppdbButtonText?: string;
  navLinks?: Array<{ label: string; href: string }>;
}

export interface SchoolFooterConfig {
  aboutText?: string;
  copyrightText?: string;
  showQuickLinks?: boolean;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
    whatsapp?: string;
    tiktok?: string;
  };
  addressOverride?: string;
  phoneOverride?: string;
  emailOverride?: string;
  hoursOverride?: string;
}

export interface SchoolSite {
  id: string;
  slug: string;             // cth: "smpn1-teladan"
  name: string;             // "SMP Negeri 1 Teladan"
  jenjang: "SD" | "SMP" | "SMA" | "SMK" | "Madrasah" | "Yayasan";
  npsn: string;
  tagline: string;
  logoUrl?: string;
  faviconUrl?: string;
  ownerId: string;
  theme: SchoolTheme;
  status: "draft" | "published";
  sections: SectionBlock[];
  ppdbConfig: PPDBConfig;
  headerConfig?: SchoolHeaderConfig;
  footerConfig?: SchoolFooterConfig;
  createdAt?: number;
  updatedAt?: number;
}

// ==========================================
// TIPE DATA PPDB (ADMISSION SYSTEM)
// ==========================================

export type PPDBStatus =
  | "pending"       // Menunggu Verifikasi
  | "need_revision" // Perlu Perbaikan Berkas
  | "verified"      // Berkas Terverifikasi
  | "accepted"      // Diterima / Lulus Seleksi
  | "rejected"      // Tidak Lolos
  | "reserved";     // Cadangan

export interface PPDBTrack {
  id: string;
  name: string;       // "Zonasi", "Prestasi", "Afirmasi", "Reguler"
  quota: number;
  description: string;
}

export interface PPDBConfig {
  isOpen: boolean;
  academicYear: string; // "2026/2027"
  startDate: string;
  endDate: string;
  tracks: PPDBTrack[];
  majors?: string[];   // ["IPA", "IPS"] atau ["RPL", "TKJ"]
  contactWhatsApp: string;
  announcementDate: string;
}

export interface PPDBApplicant {
  id: string;
  schoolId: string;
  registrationNumber: string; // cth: "REG-2026-SMP1-0023"
  trackId: string;
  selectedMajor?: string;
  status: PPDBStatus;
  adminNotes?: string;

  // Biodata Calon Siswa
  student: {
    fullName: string;
    nisn: string;
    nik: string;
    gender: "L" | "P";
    birthPlace: string;
    birthDate: string;
    previousSchool: string;
    address: string;
  };

  // Biodata Orang Tua / Wali
  parent: {
    fatherName: string;
    motherName: string;
    guardianName?: string;
    whatsappNumber: string;
    parentJob: string;
  };

  // Berkas Dokumen (Cloudinary URLs)
  documents: {
    photoUrl?: string;
    kartuKeluargaUrl?: string;
    aktaKelahiranUrl?: string;
    raporOrPiagamUrl?: string;
  };

  submittedAt: number;
  updatedAt: number;
}

// ==========================================
// TIPE DATA ARTIKEL & BERITA SEKOLAH
// ==========================================

export interface SchoolPost {
  id: string;
  schoolId: string;
  title: string;
  slug: string;
  category: "Berita" | "Pengumuman" | "Prestasi" | "Agenda";
  content: string;
  summary: string;
  coverImageUrl?: string;
  authorName: string;
  publishedAt: number;
  isPublished: boolean;
}

// ==========================================
// TIPE DATA MANAJEMEN STAF SEKOLAH
// ==========================================

export interface SchoolStaffMember {
  id: string;
  schoolId: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  isActive: boolean;
  assignedAt: number;
}


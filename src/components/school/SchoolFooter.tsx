import React from "react";
import { SchoolSite } from "@/types/builder";
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Clock,
  Heart,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
} from "lucide-react";

interface SchoolFooterProps {
  school: SchoolSite;
}

export function SchoolFooter({ school }: SchoolFooterProps) {
  const theme = school.theme;
  const footer = school.footerConfig || {};
  const social = footer.socialMedia || {};

  // Cari kontak section untuk fallback jika override tidak diisi
  const kontakSection = school.sections.find((s) => s.type === "kontak_peta");
  const kontakData = (kontakSection?.data as any) || {};

  const address =
    footer.addressOverride ||
    kontakData.address ||
    "Jl. Pendidikan No. 45, Kebayoran Baru, Jakarta Selatan";
  const phone =
    footer.phoneOverride ||
    kontakData.phone ||
    kontakData.whatsapp ||
    "081234567890";
  const email =
    footer.emailOverride ||
    kontakData.email ||
    "info@sekolah.sch.id";
  const hours =
    footer.hoursOverride ||
    kontakData.operationalHours ||
    "Senin - Jumat (07:00 - 15:30 WIB)";

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Kolom 1: Profil Singkat & Sosmed */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {school.logoUrl ? (
                <img
                  src={school.logoUrl}
                  alt={school.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-700"
                />
              ) : (
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  <GraduationCap className="w-5 h-5" />
                </div>
              )}
              <span className="font-bold text-white text-lg">{school.name}</span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              {footer.aboutText ||
                school.tagline ||
                "Mendidik generasi cerdas berakhlak mulia dengan wawasan global dan penguasaan teknologi."}
            </p>

            <div className="text-xs text-slate-500">
              NPSN: <span className="font-mono text-slate-300">{school.npsn}</span>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-2 pt-2">
              {social.instagram && (
                <a
                  href={social.instagram.startsWith("http") ? social.instagram : `https://instagram.com/${social.instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  title="Instagram Resmi"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {social.youtube && (
                <a
                  href={social.youtube.startsWith("http") ? social.youtube : `https://youtube.com/${social.youtube}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  title="Kanal YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
              {social.facebook && (
                <a
                  href={social.facebook.startsWith("http") ? social.facebook : `https://facebook.com/${social.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  title="Halaman Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {social.whatsapp && (
                <a
                  href={`https://wa.me/${social.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  title="WhatsApp Admin"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Kolom 2: Tautan Cepat */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Jelajahi Profil
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#sambutan_kepsek" className="hover:text-white transition-colors">
                  Visi & Misi Sekolah
                </a>
              </li>
              <li>
                <a href="#fasilitas" className="hover:text-white transition-colors">
                  Sarana & Prasarana
                </a>
              </li>
              <li>
                <a href="#guru_staf" className="hover:text-white transition-colors">
                  Direktori Tenaga Pendidik
                </a>
              </li>
              <li>
                <a href="#prestasi" className="hover:text-white transition-colors">
                  Galeri Prestasi Siswa
                </a>
              </li>
              <li>
                <a href="#galeri" className="hover:text-white transition-colors">
                  Dokumentasi Kegiatan
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Tanya Jawab (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 3: PPDB & Layanan */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Penerimaan Siswa
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={`/s/${school.slug}/ppdb`} className="hover:text-white transition-colors">
                  Pendaftaran PPDB Online
                </a>
              </li>
              <li>
                <a href={`/s/${school.slug}/ppdb`} className="hover:text-white transition-colors">
                  Cek Status Kelulusan
                </a>
              </li>
              <li>
                <span className="text-xs inline-block px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 mt-2">
                  Tahun Ajaran {school.ppdbConfig.academicYear} {school.ppdbConfig.isOpen ? "Aktif" : "Ditutup"}
                </span>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Kontak Cepat */}
          <div className="space-y-3 text-sm">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Sekretariat Sekolah
            </h4>
            <div className="flex items-start gap-2.5 text-slate-400">
              <MapPin className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
              <span className="text-xs leading-relaxed">{address}</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-400">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="text-xs">{phone}</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-400">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="text-xs">{email}</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-400">
              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="text-xs">{hours}</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            {footer.copyrightText ||
              `© ${new Date().getFullYear()} ${school.name}. Hak Cipta Dilindungi.`}
          </p>
          <p className="flex items-center gap-1">
            Dibuat dengan <Heart className="w-3.5 h-3.5 text-red-500 inline fill-red-500" /> menggunakan Web App Builder Sekolah
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SchoolSite, SectionBlock } from "@/types/builder";
import { initialDemoSchool } from "@/lib/mockData";
import { SchoolNavbar } from "@/components/school/SchoolNavbar";
import { SchoolFooter } from "@/components/school/SchoolFooter";
import { SectionRenderer } from "@/components/blocks/SectionRenderer";
import { Reorder, motion, AnimatePresence } from "framer-motion";
import { ImageUploader } from "@/components/ui/ImageUploader";
import {
  GripVertical,
  Eye,
  EyeOff,
  Palette,
  Layout,
  Settings,
  Globe,
  Smartphone,
  Tablet,
  Monitor,
  Save,
  Check,
  ArrowLeft,
  Edit3,
  X,
  Users,
  Newspaper,
  Plus,
  Trash2,
  Sliders,
  HelpCircle,
  Video,
  BookOpen,
  GraduationCap,
  Sparkles,
  Layers,
  Phone,
  Mail,
  Clock,
  Instagram,
  Youtube,
  Facebook,
  MessageCircle,
} from "lucide-react";

export default function BuilderStudioPage() {
  const [school, setSchool] = useState<SchoolSite>(initialDemoSchool);
  const [activeTab, setActiveTab] = useState<"sections" | "header_footer" | "theme" | "settings">("sections");
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");

  // Section yang sedang diedit kontennya
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);

  // Modal Tambah Section Baru
  const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState(false);

  // Load from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem("school_site_data");
    if (saved) {
      try {
        setSchool(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing saved site data", e);
      }
    }
  }, []);

  const handleSave = () => {
    setSaveStatus("saving");
    localStorage.setItem("school_site_data", JSON.stringify(school));
    setTimeout(() => {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2500);
    }, 600);
  };

  const handleReorder = (newSections: SectionBlock[]) => {
    const updated = newSections.map((sec, idx) => ({ ...sec, order: idx }));
    setSchool({ ...school, sections: updated });
  };

  const toggleSectionActive = (id: string) => {
    const updated = school.sections.map((sec) =>
      sec.id === id ? { ...sec, isActive: !sec.isActive } : sec
    );
    setSchool({ ...school, sections: updated });
  };

  const handleDeleteSection = (id: string, title?: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus blok "${title || id}"?`)) {
      const updated = school.sections
        .filter((s) => s.id !== id)
        .map((s, idx) => ({ ...s, order: idx }));
      setSchool({ ...school, sections: updated });
      if (editingSectionId === id) setEditingSectionId(null);
    }
  };

  // Tambah Section Baru dari Katalog Template
  const handleAddNewSection = (type: string) => {
    const newId = `sec_${type}_${Date.now()}`;
    let newSection: SectionBlock;

    switch (type) {
      case "faq":
        newSection = {
          id: newId,
          type: "faq",
          order: school.sections.length,
          isActive: true,
          title: "Pertanyaan yang Sering Diajukan",
          data: {
            badge: "Tanya Jawab & Informasi",
            description: "Temukan jawaban seputar pendaftaran PPDB, kurikulum, fasilitas, seragam, dan tata tertib sekolah kami.",
            items: [
              {
                id: `faq_1`,
                question: "Kapan periode pendaftaran PPDB dibuka?",
                answer: "Pendaftaran daring dibuka sesuai jadwal yang tertera di menu PPDB. Orang tua dapat melengkapi data siswa kapan saja selama gelombang pendaftaran aktif.",
              },
              {
                id: `faq_2`,
                question: "Apakah dikenakan biaya pendaftaran?",
                answer: "Pendaftaran PPDB di sekolah kami 100% bebas biaya (Gratis). Seluruh proses pendaftaran dan verifikasi berkas dilakukan secara transparan.",
              },
              {
                id: `faq_3`,
                question: "Berkas apa saja yang harus diunggah?",
                answer: "Pasfoto terbaru, Kartu Keluarga (KK), Akta Kelahiran, dan scan piagam prestasi / rapor sesuai jalur penerimaan yang dipilih.",
              },
            ],
          },
        };
        break;

      case "video_profil":
        newSection = {
          id: newId,
          type: "video_profil",
          order: school.sections.length,
          isActive: true,
          title: "Video Profil Sekolah",
          data: {
            headline: "Mengenal Lebih Dekat Lingkungan dan Budaya Belajar Kami",
            subheadline: "Saksikan sekilas lingkungan belajar, fasilitas modern, serta keceriaan aktivitas siswa dan guru di sekolah kami.",
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          },
        };
        break;

      case "program_jurusan":
        newSection = {
          id: newId,
          type: "program_jurusan",
          order: school.sections.length,
          isActive: true,
          title: "Program Keahlian & Pilihan Jurusan",
          data: {
            badge: "Kompetensi Masa Depan",
            description: "Pilihan peminatan dan keahlian untuk membekali siswa dengan keahlian teknis dan karakter unggul.",
            programs: [
              {
                id: `prog_1`,
                code: "RPL",
                name: "Rekayasa Perangkat Lunak (Software Engineering)",
                description: "Mempelajari pengembangan aplikasi web, mobile app, basis data, dan kecerdasan buatan.",
                imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
                features: ["Pengembangan Full-Stack Web", "Mobile App Flutter & Android", "Cloud Computing & DevOps"],
              },
              {
                id: `prog_2`,
                code: "TKJ",
                name: "Teknik Komputer & Jaringan",
                description: "Mempelajari infrastruktur jaringan internet, keamanan siber, dan administrasi server.",
                imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&auto=format&fit=crop&q=80",
                features: ["Sertifikasi MikroTik & Cisco", "Keamanan Siber (Cyber Security)", "Fiber Optic & Wireless"],
              },
            ],
          },
        };
        break;

      case "testimoni":
        newSection = {
          id: newId,
          type: "testimoni",
          order: school.sections.length,
          isActive: true,
          title: "Kisah Sukses Alumni & Suara Orang Tua",
          data: {
            badge: "Testimoni & Pengalaman",
            description: "Pengalaman nyata dari mereka yang telah menempuh proses pembelajaran dan bertumbuh bersama keluarga besar sekolah kami.",
            testimonials: [
              {
                id: `testi_1`,
                name: "Nabila Aurelia, S.T.",
                role: "Alumni 2022 • Software Engineer di Unicorn Tech",
                quote: "Guru-guru di sini tidak hanya mengajarkan materi pelajaran, tapi juga menanamkan pola pikir pemecahan masalah dan disiplin yang sangat terasa saat kuliah dan bekerja.",
                photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
                rating: 5,
              },
              {
                id: `testi_2`,
                name: "Ir. Hendra Gunawan",
                role: "Orang Tua Siswa Kelas IX",
                quote: "Sistem pelaporan dan komunikasi sekolah sangat transparan. Anak saya mengalami kemajuan karakter yang sangat baik serta semakin percaya diri.",
                photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
                rating: 5,
              },
            ],
          },
        };
        break;

      case "cta_ppdb":
        newSection = {
          id: newId,
          type: "cta_ppdb",
          order: school.sections.length,
          isActive: true,
          title: "Banner Ajakan PPDB",
          data: {
            badge: "Gelombang Terbuka",
            headline: "Siap Bergabung dengan Keluarga Besar Sekolah Kami?",
            subheadline: "Segera daftarkan putra-putri Anda sebelum kuota setiap jalur terpenuhi. Proses mudah, cepat, dan transparan.",
            ctaButtonText: "Daftar PPDB Online Sekarang",
            ctaButtonLink: `/s/${school.slug}/ppdb`,
            secondaryButtonText: "Konsultasi via WhatsApp",
            secondaryButtonLink: `https://wa.me/${school.ppdbConfig.contactWhatsApp.replace(/[^0-9]/g, "")}`,
          },
        };
        break;

      default:
        return;
    }

    const updatedSections = [...school.sections, newSection];
    setSchool({ ...school, sections: updatedSections });
    setIsAddSectionModalOpen(false);
    setEditingSectionId(newSection.id);
  };

  const updateThemeColor = (key: "primaryColor" | "secondaryColor", value: string) => {
    setSchool({
      ...school,
      theme: {
        ...school.theme,
        [key]: value,
      },
    });
  };

  // Helper update header config
  const updateHeader = (key: string, value: any) => {
    setSchool({
      ...school,
      headerConfig: {
        ...(school.headerConfig || {}),
        [key]: value,
      },
    });
  };

  // Helper update footer config
  const updateFooter = (key: string, value: any) => {
    setSchool({
      ...school,
      footerConfig: {
        ...(school.footerConfig || {}),
        [key]: value,
      },
    });
  };

  const updateFooterSocial = (platform: string, value: string) => {
    setSchool({
      ...school,
      footerConfig: {
        ...(school.footerConfig || {}),
        socialMedia: {
          ...((school.footerConfig || {}).socialMedia || {}),
          [platform]: value,
        },
      },
    });
  };

  // Helper update section data
  const updateSectionField = (sectionId: string, fieldPath: string[], value: any) => {
    const updatedSections = school.sections.map((sec) => {
      if (sec.id === sectionId) {
        const newData: Record<string, any> = { ...(sec.data as any) };
        if (fieldPath.length === 1) {
          newData[fieldPath[0]] = value;
        } else if (fieldPath.length === 2) {
          newData[fieldPath[0]] = {
            ...(newData[fieldPath[0]] || {}),
            [fieldPath[1]]: value,
          };
        }
        return { ...sec, data: newData } as SectionBlock;
      }
      return sec;
    });
    setSchool({ ...school, sections: updatedSections });
  };

  // Helper untuk memodifikasi array item dalam section (fasilitas, prestasi, guru, galeri, faq, program, testimoni)
  const updateSectionArrayItem = (sectionId: string, arrayKey: string, index: number, field: string, value: any) => {
    const updatedSections = school.sections.map((sec) => {
      if (sec.id === sectionId) {
        const currentArray = [...((sec.data as any)[arrayKey] || [])];
        if (currentArray[index]) {
          currentArray[index] = { ...currentArray[index], [field]: value };
        }
        return { ...sec, data: { ...sec.data, [arrayKey]: currentArray } } as SectionBlock;
      }
      return sec;
    });
    setSchool({ ...school, sections: updatedSections });
  };

  const addSectionArrayItem = (sectionId: string, arrayKey: string, newItem: any) => {
    const updatedSections = school.sections.map((sec) => {
      if (sec.id === sectionId) {
        const currentArray = [...((sec.data as any)[arrayKey] || [])];
        currentArray.push(newItem);
        return { ...sec, data: { ...sec.data, [arrayKey]: currentArray } } as SectionBlock;
      }
      return sec;
    });
    setSchool({ ...school, sections: updatedSections });
  };

  const removeSectionArrayItem = (sectionId: string, arrayKey: string, index: number) => {
    const updatedSections = school.sections.map((sec) => {
      if (sec.id === sectionId) {
        const currentArray = [...((sec.data as any)[arrayKey] || [])];
        currentArray.splice(index, 1);
        return { ...sec, data: { ...sec.data, [arrayKey]: currentArray } } as SectionBlock;
      }
      return sec;
    });
    setSchool({ ...school, sections: updatedSections });
  };

  // Color preset options
  const colorPresets = [
    { name: "Biru Resmi (SMP/SMA)", primary: "#1e3a8a", secondary: "#f59e0b" },
    { name: "Hijau Islami (Madrasah)", primary: "#065f46", secondary: "#eab308" },
    { name: "Merah Edukasi (SD)", primary: "#991b1b", secondary: "#2563eb" },
    { name: "Navy Modern (SMK)", primary: "#0f172a", secondary: "#3b82f6" },
    { name: "Teal Alam (Sekolah Alam)", primary: "#0f766e", secondary: "#f97316" },
  ];

  const currentEditingSection = school.sections.find((s) => s.id === editingSectionId);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-900 text-slate-100">
      {/* ======================================================== */}
      {/* 1. LEFT SIDEBAR: CONTROLS & REORDER                      */}
      {/* ======================================================== */}
      <aside className="w-80 sm:w-96 bg-slate-950 border-r border-slate-800 flex flex-col shrink-0 z-30">
        {/* Header Sidebar */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <span className="block font-bold text-sm text-white leading-tight">
                Studio Web Builder
              </span>
              <span className="block text-[11px] text-slate-400 truncate max-w-[170px]">
                {school.name}
              </span>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saveStatus === "saving"}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-xs transition-all cursor-pointer"
          >
            {saveStatus === "saved" ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>Tersimpan!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>{saveStatus === "saving" ? "Menyimpan..." : "Simpan"}</span>
              </>
            )}
          </button>
        </div>

        {/* Tab Navigation (4 Tabs) */}
        <div className="grid grid-cols-4 border-b border-slate-800 bg-slate-900/50 text-[11px]">
          <button
            onClick={() => {
              setActiveTab("sections");
              setEditingSectionId(null);
            }}
            className={`py-3 font-semibold flex flex-col items-center justify-center gap-1 border-b-2 transition-all cursor-pointer ${
              activeTab === "sections"
                ? "border-blue-500 text-blue-400 bg-slate-900"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Layout className="w-3.5 h-3.5" />
            <span>Tata Letak</span>
          </button>

          <button
            onClick={() => setActiveTab("header_footer")}
            className={`py-3 font-semibold flex flex-col items-center justify-center gap-1 border-b-2 transition-all cursor-pointer ${
              activeTab === "header_footer"
                ? "border-blue-500 text-blue-400 bg-slate-900"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Nav & Footer</span>
          </button>

          <button
            onClick={() => setActiveTab("theme")}
            className={`py-3 font-semibold flex flex-col items-center justify-center gap-1 border-b-2 transition-all cursor-pointer ${
              activeTab === "theme"
                ? "border-blue-500 text-blue-400 bg-slate-900"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Warna</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`py-3 font-semibold flex flex-col items-center justify-center gap-1 border-b-2 transition-all cursor-pointer ${
              activeTab === "settings"
                ? "border-blue-500 text-blue-400 bg-slate-900"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Profil</span>
          </button>
        </div>

        {/* Content Tab Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* ======================================================== */}
          {/* TAB 1: SECTIONS REORDER & INLINE CONTENT EDITOR           */}
          {/* ======================================================== */}
          {activeTab === "sections" && (
            <div className="space-y-4">
              {/* JIKA SEDANG EDIT SECTION TERTENTU: TAMPILKAN FORM INLINE */}
              {editingSectionId && currentEditingSection ? (
                <div className="space-y-4 bg-slate-900 p-4 rounded-2xl border border-blue-500/40">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5 truncate max-w-[220px]">
                      <Edit3 className="w-3.5 h-3.5 shrink-0" />
                      <span>Edit: {currentEditingSection.title || currentEditingSection.type}</span>
                    </span>
                    <button
                      onClick={() => setEditingSectionId(null)}
                      className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* FORM EDIT HERO SECTION */}
                  {currentEditingSection.type === "hero" && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-slate-400 font-medium mb-1">Badge Teks</label>
                        <input
                          type="text"
                          value={currentEditingSection.data.badgeText || ""}
                          onChange={(e) =>
                            updateSectionField(currentEditingSection.id, ["badgeText"], e.target.value)
                          }
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 font-medium mb-1">Judul Utama (Headline)</label>
                        <textarea
                          rows={2}
                          value={currentEditingSection.data.headline || ""}
                          onChange={(e) =>
                            updateSectionField(currentEditingSection.id, ["headline"], e.target.value)
                          }
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 font-medium mb-1">Sub-Headline</label>
                        <textarea
                          rows={3}
                          value={currentEditingSection.data.subheadline || ""}
                          onChange={(e) =>
                            updateSectionField(currentEditingSection.id, ["subheadline"], e.target.value)
                          }
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 font-medium mb-1">Teks Tombol Aksi</label>
                        <input
                          type="text"
                          value={currentEditingSection.data.ctaPrimaryText || ""}
                          onChange={(e) =>
                            updateSectionField(currentEditingSection.id, ["ctaPrimaryText"], e.target.value)
                          }
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                        />
                      </div>

                      <div className="pt-1">
                        <ImageUploader
                          label="Foto Banner Utama (Background)"
                          value={currentEditingSection.data.backgroundImageUrl || ""}
                          onChange={(newUrl) =>
                            updateSectionField(currentEditingSection.id, ["backgroundImageUrl"], newUrl)
                          }
                          folder="hero_banners"
                        />
                      </div>
                    </div>
                  )}

                  {/* FORM EDIT SAMBUTAN KEPSEK */}
                  {currentEditingSection.type === "sambutan_kepsek" && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-slate-400 font-medium mb-1">Nama Kepala Sekolah</label>
                        <input
                          type="text"
                          value={currentEditingSection.data.kepsekName || ""}
                          onChange={(e) =>
                            updateSectionField(currentEditingSection.id, ["kepsekName"], e.target.value)
                          }
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 font-medium mb-1">Gelar / Jabatan</label>
                        <input
                          type="text"
                          value={currentEditingSection.data.kepsekTitle || ""}
                          onChange={(e) =>
                            updateSectionField(currentEditingSection.id, ["kepsekTitle"], e.target.value)
                          }
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 font-medium mb-1">Kutipan Sambutan</label>
                        <textarea
                          rows={4}
                          value={currentEditingSection.data.greetingMessage || ""}
                          onChange={(e) =>
                            updateSectionField(currentEditingSection.id, ["greetingMessage"], e.target.value)
                          }
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 font-medium mb-1">Visi Sekolah</label>
                        <textarea
                          rows={2}
                          value={currentEditingSection.data.visi || ""}
                          onChange={(e) =>
                            updateSectionField(currentEditingSection.id, ["visi"], e.target.value)
                          }
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white resize-none"
                        />
                      </div>

                      <div className="pt-1">
                        <ImageUploader
                          label="Foto Resmi Kepala Sekolah"
                          value={currentEditingSection.data.kepsekPhotoUrl || ""}
                          onChange={(newUrl) =>
                            updateSectionField(currentEditingSection.id, ["kepsekPhotoUrl"], newUrl)
                          }
                          folder="kepsek_photos"
                        />
                      </div>
                    </div>
                  )}

                  {/* FORM EDIT FASILITAS */}
                  {currentEditingSection.type === "fasilitas" && (
                    <div className="space-y-4 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-300">
                          Daftar Fasilitas ({currentEditingSection.data.facilities?.length || 0})
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            addSectionArrayItem(currentEditingSection.id, "facilities", {
                              id: `f_${Date.now()}`,
                              title: "Fasilitas Baru",
                              description: "Deskripsi sarana dan prasarana belajar yang tersedia...",
                              imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80",
                            })
                          }
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-medium transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Tambah</span>
                        </button>
                      </div>

                      <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                        {currentEditingSection.data.facilities?.map((f: any, idx: number) => (
                          <div key={f.id || idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-300 text-[11px]">Fasilitas #{idx + 1}</span>
                              <button
                                type="button"
                                onClick={() => removeSectionArrayItem(currentEditingSection.id, "facilities", idx)}
                                className="p-1 rounded-md text-slate-500 hover:text-rose-400 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <input
                              type="text"
                              value={f.title || ""}
                              onChange={(e) => updateSectionArrayItem(currentEditingSection.id, "facilities", idx, "title", e.target.value)}
                              placeholder="Nama Fasilitas"
                              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                            />
                            <textarea
                              rows={2}
                              value={f.description || ""}
                              onChange={(e) => updateSectionArrayItem(currentEditingSection.id, "facilities", idx, "description", e.target.value)}
                              placeholder="Deskripsi fasilitas"
                              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs resize-none"
                            />
                            <ImageUploader
                              label="Foto Fasilitas"
                              value={f.imageUrl || ""}
                              onChange={(url) => updateSectionArrayItem(currentEditingSection.id, "facilities", idx, "imageUrl", url)}
                              folder="fasilitas"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* FORM EDIT PRESTASI */}
                  {currentEditingSection.type === "prestasi" && (
                    <div className="space-y-4 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-300">
                          Daftar Prestasi ({currentEditingSection.data.achievements?.length || 0})
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            addSectionArrayItem(currentEditingSection.id, "achievements", {
                              id: `p_${Date.now()}`,
                              title: "Juara Lomba Baru",
                              level: "Provinsi",
                              year: "2026",
                              studentName: "Nama Siswa / Tim",
                              imageUrl: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&auto=format&fit=crop&q=80",
                            })
                          }
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-medium transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Tambah</span>
                        </button>
                      </div>

                      <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                        {currentEditingSection.data.achievements?.map((ach: any, idx: number) => (
                          <div key={ach.id || idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-300 text-[11px]">Prestasi #{idx + 1}</span>
                              <button
                                type="button"
                                onClick={() => removeSectionArrayItem(currentEditingSection.id, "achievements", idx)}
                                className="p-1 rounded-md text-slate-500 hover:text-rose-400 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <input
                              type="text"
                              value={ach.title || ""}
                              onChange={(e) => updateSectionArrayItem(currentEditingSection.id, "achievements", idx, "title", e.target.value)}
                              placeholder="Nama Kejuaraan"
                              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                            />
                            <div className="grid grid-cols-2 gap-2">
                              <select
                                value={ach.level || "Provinsi"}
                                onChange={(e) => updateSectionArrayItem(currentEditingSection.id, "achievements", idx, "level", e.target.value)}
                                className="w-full px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                              >
                                <option value="Kota/Kab">Kota/Kabupaten</option>
                                <option value="Provinsi">Provinsi</option>
                                <option value="Nasional">Nasional</option>
                                <option value="Internasional">Internasional</option>
                              </select>
                              <input
                                type="text"
                                value={ach.year || "2026"}
                                onChange={(e) => updateSectionArrayItem(currentEditingSection.id, "achievements", idx, "year", e.target.value)}
                                placeholder="Tahun"
                                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                              />
                            </div>
                            <input
                              type="text"
                              value={ach.studentName || ""}
                              onChange={(e) => updateSectionArrayItem(currentEditingSection.id, "achievements", idx, "studentName", e.target.value)}
                              placeholder="Nama Siswa Peraih"
                              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                            />
                            <ImageUploader
                              label="Foto Piagam / Piala"
                              value={ach.imageUrl || ""}
                              onChange={(url) => updateSectionArrayItem(currentEditingSection.id, "achievements", idx, "imageUrl", url)}
                              folder="prestasi"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* FORM EDIT GURU & TENDIK */}
                  {currentEditingSection.type === "guru_staf" && (
                    <div className="space-y-4 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-300">
                          Daftar Guru ({currentEditingSection.data.staffList?.length || 0})
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            addSectionArrayItem(currentEditingSection.id, "staffList", {
                              id: `g_${Date.now()}`,
                              name: "Nama Guru Baru, S.Pd.",
                              role: "Guru Mata Pelajaran",
                              subject: "Bidang Studi",
                              photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
                            })
                          }
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-medium transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Tambah</span>
                        </button>
                      </div>

                      <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                        {currentEditingSection.data.staffList?.map((staff: any, idx: number) => (
                          <div key={staff.id || idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-300 text-[11px]">Guru #{idx + 1}</span>
                              <button
                                type="button"
                                onClick={() => removeSectionArrayItem(currentEditingSection.id, "staffList", idx)}
                                className="p-1 rounded-md text-slate-500 hover:text-rose-400 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <input
                              type="text"
                              value={staff.name || ""}
                              onChange={(e) => updateSectionArrayItem(currentEditingSection.id, "staffList", idx, "name", e.target.value)}
                              placeholder="Nama & Gelar"
                              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                            />
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                value={staff.role || ""}
                                onChange={(e) => updateSectionArrayItem(currentEditingSection.id, "staffList", idx, "role", e.target.value)}
                                placeholder="Jabatan"
                                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                              />
                              <input
                                type="text"
                                value={staff.subject || ""}
                                onChange={(e) => updateSectionArrayItem(currentEditingSection.id, "staffList", idx, "subject", e.target.value)}
                                placeholder="Mapel"
                                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                              />
                            </div>
                            <ImageUploader
                              label="Foto Guru"
                              value={staff.photoUrl || ""}
                              onChange={(url) => updateSectionArrayItem(currentEditingSection.id, "staffList", idx, "photoUrl", url)}
                              folder="guru_staf"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* FORM EDIT GALERI */}
                  {currentEditingSection.type === "galeri" && (
                    <div className="space-y-4 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-300">
                          Foto Galeri ({currentEditingSection.data.images?.length || 0})
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            addSectionArrayItem(currentEditingSection.id, "images", {
                              id: `im_${Date.now()}`,
                              url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80",
                              caption: "Dokumentasi Kegiatan Siswa",
                              category: "Upacara",
                            })
                          }
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-medium transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Tambah Foto</span>
                        </button>
                      </div>

                      <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                        {currentEditingSection.data.images?.map((img: any, idx: number) => (
                          <div key={img.id || idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-300 text-[11px]">Foto #{idx + 1}</span>
                              <button
                                type="button"
                                onClick={() => removeSectionArrayItem(currentEditingSection.id, "images", idx)}
                                className="p-1 rounded-md text-slate-500 hover:text-rose-400 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <input
                              type="text"
                              value={img.caption || ""}
                              onChange={(e) => updateSectionArrayItem(currentEditingSection.id, "images", idx, "caption", e.target.value)}
                              placeholder="Keterangan Foto"
                              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                            />
                            <input
                              type="text"
                              value={img.category || "Umum"}
                              onChange={(e) => updateSectionArrayItem(currentEditingSection.id, "images", idx, "category", e.target.value)}
                              placeholder="Kategori"
                              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                            />
                            <ImageUploader
                              label="Foto Kegiatan"
                              value={img.url || ""}
                              onChange={(url) => updateSectionArrayItem(currentEditingSection.id, "images", idx, "url", url)}
                              folder="galeri"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* FORM EDIT FAQ / TANYA JAWAB (BARU) */}
                  {currentEditingSection.type === "faq" && (
                    <div className="space-y-4 text-xs">
                      <div>
                        <label className="block text-slate-400 font-medium mb-1">Judul Seksi</label>
                        <input
                          type="text"
                          value={currentEditingSection.title || ""}
                          onChange={(e) => {
                            const updated = school.sections.map((s) =>
                              s.id === currentEditingSection.id ? { ...s, title: e.target.value } : s
                            );
                            setSchool({ ...school, sections: updated });
                          }}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 font-medium mb-1">Deskripsi Singkat</label>
                        <textarea
                          rows={2}
                          value={currentEditingSection.data.description || ""}
                          onChange={(e) => updateSectionField(currentEditingSection.id, ["description"], e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white resize-none"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="font-semibold text-slate-300">
                          Daftar Tanya Jawab ({currentEditingSection.data.items?.length || 0})
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            addSectionArrayItem(currentEditingSection.id, "items", {
                              id: `faq_${Date.now()}`,
                              question: "Pertanyaan Baru?",
                              answer: "Tuliskan jawaban yang jelas dan informatif di sini...",
                            })
                          }
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-medium transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Tambah Tanya Jawab</span>
                        </button>
                      </div>

                      <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                        {currentEditingSection.data.items?.map((item: any, idx: number) => (
                          <div key={item.id || idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-300 text-[11px]">FAQ #{idx + 1}</span>
                              <button
                                type="button"
                                onClick={() => removeSectionArrayItem(currentEditingSection.id, "items", idx)}
                                className="p-1 rounded-md text-slate-500 hover:text-rose-400 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <input
                              type="text"
                              value={item.question || ""}
                              onChange={(e) => updateSectionArrayItem(currentEditingSection.id, "items", idx, "question", e.target.value)}
                              placeholder="Tuliskan pertanyaan..."
                              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                            />
                            <textarea
                              rows={3}
                              value={item.answer || ""}
                              onChange={(e) => updateSectionArrayItem(currentEditingSection.id, "items", idx, "answer", e.target.value)}
                              placeholder="Tuliskan jawaban lengkap..."
                              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs resize-none"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* FORM EDIT VIDEO PROFIL (BARU) */}
                  {currentEditingSection.type === "video_profil" && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-slate-400 font-medium mb-1">URL Video YouTube</label>
                        <input
                          type="url"
                          value={currentEditingSection.data.videoUrl || ""}
                          onChange={(e) => updateSectionField(currentEditingSection.id, ["videoUrl"], e.target.value)}
                          placeholder="https://www.youtube.com/watch?v=..."
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                        />
                        <span className="text-[10px] text-slate-500 mt-1 block">
                          Mendukung link YouTube standar, youtu.be, atau iframe embed URL.
                        </span>
                      </div>
                      <div>
                        <label className="block text-slate-400 font-medium mb-1">Judul Seksi Video</label>
                        <input
                          type="text"
                          value={currentEditingSection.title || ""}
                          onChange={(e) => {
                            const updated = school.sections.map((s) =>
                              s.id === currentEditingSection.id ? { ...s, title: e.target.value } : s
                            );
                            setSchool({ ...school, sections: updated });
                          }}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 font-medium mb-1">Deskripsi Singkat</label>
                        <textarea
                          rows={3}
                          value={currentEditingSection.data.subheadline || ""}
                          onChange={(e) => updateSectionField(currentEditingSection.id, ["subheadline"], e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white resize-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* FORM EDIT PROGRAM JURUSAN (BARU) */}
                  {currentEditingSection.type === "program_jurusan" && (
                    <div className="space-y-4 text-xs">
                      <div>
                        <label className="block text-slate-400 font-medium mb-1">Judul Seksi</label>
                        <input
                          type="text"
                          value={currentEditingSection.title || ""}
                          onChange={(e) => {
                            const updated = school.sections.map((s) =>
                              s.id === currentEditingSection.id ? { ...s, title: e.target.value } : s
                            );
                            setSchool({ ...school, sections: updated });
                          }}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="font-semibold text-slate-300">
                          Daftar Program ({currentEditingSection.data.programs?.length || 0})
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            addSectionArrayItem(currentEditingSection.id, "programs", {
                              id: `prog_${Date.now()}`,
                              code: "JUR",
                              name: "Program Keahlian Baru",
                              description: "Deskripsi bidang keahlian dan kurikulum unggulan...",
                              imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
                              features: ["Kompetensi Unggulan 1", "Sertifikasi Industri"],
                            })
                          }
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-medium transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Tambah Jurusan</span>
                        </button>
                      </div>

                      <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                        {currentEditingSection.data.programs?.map((prog: any, idx: number) => (
                          <div key={prog.id || idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-300 text-[11px]">Program #{idx + 1}</span>
                              <button
                                type="button"
                                onClick={() => removeSectionArrayItem(currentEditingSection.id, "programs", idx)}
                                className="p-1 rounded-md text-slate-500 hover:text-rose-400 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              <input
                                type="text"
                                value={prog.code || ""}
                                onChange={(e) => updateSectionArrayItem(currentEditingSection.id, "programs", idx, "code", e.target.value)}
                                placeholder="Kode (RPL/IPA)"
                                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs uppercase"
                              />
                              <input
                                type="text"
                                value={prog.name || ""}
                                onChange={(e) => updateSectionArrayItem(currentEditingSection.id, "programs", idx, "name", e.target.value)}
                                placeholder="Nama Lengkap Jurusan"
                                className="col-span-2 w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                              />
                            </div>
                            <textarea
                              rows={2}
                              value={prog.description || ""}
                              onChange={(e) => updateSectionArrayItem(currentEditingSection.id, "programs", idx, "description", e.target.value)}
                              placeholder="Deskripsi program..."
                              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs resize-none"
                            />
                            <ImageUploader
                              label="Foto Jurusan"
                              value={prog.imageUrl || ""}
                              onChange={(url) => updateSectionArrayItem(currentEditingSection.id, "programs", idx, "imageUrl", url)}
                              folder="jurusan"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* FORM EDIT TESTIMONI (BARU) */}
                  {currentEditingSection.type === "testimoni" && (
                    <div className="space-y-4 text-xs">
                      <div>
                        <label className="block text-slate-400 font-medium mb-1">Judul Seksi Testimoni</label>
                        <input
                          type="text"
                          value={currentEditingSection.title || ""}
                          onChange={(e) => {
                            const updated = school.sections.map((s) =>
                              s.id === currentEditingSection.id ? { ...s, title: e.target.value } : s
                            );
                            setSchool({ ...school, sections: updated });
                          }}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="font-semibold text-slate-300">
                          Daftar Ulasan ({currentEditingSection.data.testimonials?.length || 0})
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            addSectionArrayItem(currentEditingSection.id, "testimonials", {
                              id: `t_${Date.now()}`,
                              name: "Nama Alumni / Orang Tua",
                              role: "Alumni / Orang Tua Siswa",
                              quote: "Pengalaman belajar yang sangat memuaskan dan berkesan...",
                              photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
                              rating: 5,
                            })
                          }
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-medium transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Tambah Testimoni</span>
                        </button>
                      </div>

                      <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                        {currentEditingSection.data.testimonials?.map((t: any, idx: number) => (
                          <div key={t.id || idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-300 text-[11px]">Testimoni #{idx + 1}</span>
                              <button
                                type="button"
                                onClick={() => removeSectionArrayItem(currentEditingSection.id, "testimonials", idx)}
                                className="p-1 rounded-md text-slate-500 hover:text-rose-400 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <input
                              type="text"
                              value={t.name || ""}
                              onChange={(e) => updateSectionArrayItem(currentEditingSection.id, "testimonials", idx, "name", e.target.value)}
                              placeholder="Nama Pemberi Ulasan"
                              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                            />
                            <input
                              type="text"
                              value={t.role || ""}
                              onChange={(e) => updateSectionArrayItem(currentEditingSection.id, "testimonials", idx, "role", e.target.value)}
                              placeholder="Status / Pekerjaan (cth: Alumni 2024)"
                              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                            />
                            <textarea
                              rows={3}
                              value={t.quote || ""}
                              onChange={(e) => updateSectionArrayItem(currentEditingSection.id, "testimonials", idx, "quote", e.target.value)}
                              placeholder="Kutipan ulasan pengalaman..."
                              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs resize-none"
                            />
                            <ImageUploader
                              label="Foto Avatar"
                              value={t.photoUrl || ""}
                              onChange={(url) => updateSectionArrayItem(currentEditingSection.id, "testimonials", idx, "photoUrl", url)}
                              folder="testimoni"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* FORM EDIT CTA PPDB (BARU) */}
                  {currentEditingSection.type === "cta_ppdb" && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-slate-400 font-medium mb-1">Headline Spanduk</label>
                        <textarea
                          rows={2}
                          value={currentEditingSection.data.headline || ""}
                          onChange={(e) => updateSectionField(currentEditingSection.id, ["headline"], e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 font-medium mb-1">Sub-Headline</label>
                        <textarea
                          rows={3}
                          value={currentEditingSection.data.subheadline || ""}
                          onChange={(e) => updateSectionField(currentEditingSection.id, ["subheadline"], e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 font-medium mb-1">Teks Tombol Utama</label>
                        <input
                          type="text"
                          value={currentEditingSection.data.ctaButtonText || ""}
                          onChange={(e) => updateSectionField(currentEditingSection.id, ["ctaButtonText"], e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 font-medium mb-1">Teks Tombol Kedua (Opsional)</label>
                        <input
                          type="text"
                          value={currentEditingSection.data.secondaryButtonText || ""}
                          onChange={(e) => updateSectionField(currentEditingSection.id, ["secondaryButtonText"], e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                        />
                      </div>
                    </div>
                  )}

                  {/* FORM EDIT KONTAK & LOKASI */}
                  {currentEditingSection.type === "kontak_peta" && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-slate-400 font-medium mb-1">Alamat Lengkap</label>
                        <textarea
                          rows={2}
                          value={currentEditingSection.data.address || ""}
                          onChange={(e) => updateSectionField(currentEditingSection.id, ["address"], e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 font-medium mb-1">Nomor Telepon</label>
                        <input
                          type="text"
                          value={currentEditingSection.data.phone || ""}
                          onChange={(e) => updateSectionField(currentEditingSection.id, ["phone"], e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 font-medium mb-1">WhatsApp Panitia</label>
                        <input
                          type="text"
                          value={currentEditingSection.data.whatsapp || ""}
                          onChange={(e) => updateSectionField(currentEditingSection.id, ["whatsapp"], e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 font-medium mb-1">Email Resmi</label>
                        <input
                          type="email"
                          value={currentEditingSection.data.email || ""}
                          onChange={(e) => updateSectionField(currentEditingSection.id, ["email"], e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                        />
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => setEditingSectionId(null)}
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer transition-colors"
                  >
                    Selesai Edit Konten
                  </button>
                </div>
              ) : (
                /* LIST SECTIONS DENGAN REORDER DAN TOMBOL EDIT */
                <>
                  <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                    <span>Seret untuk susun urutan:</span>
                    <button
                      type="button"
                      onClick={() => setIsAddSectionModalOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambah Section</span>
                    </button>
                  </div>

                  <Reorder.Group
                    axis="y"
                    values={school.sections}
                    onReorder={handleReorder}
                    className="space-y-2"
                  >
                    {school.sections.map((section) => (
                      <Reorder.Item
                        key={section.id}
                        value={section}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 shadow-xs cursor-grab active:cursor-grabbing transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <GripVertical className="w-4 h-4 text-slate-500 shrink-0" />
                          <div>
                            <span className="block font-medium text-xs text-slate-200">
                              {section.title || section.type}
                            </span>
                            <span className="block text-[10px] text-slate-500 uppercase font-mono">
                              {section.type}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setEditingSectionId(section.id)}
                            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-blue-400 transition-colors cursor-pointer"
                            title="Edit Konten Blok Ini"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSectionActive(section.id);
                            }}
                            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                            title={section.isActive ? "Sembunyikan Blok" : "Tampilkan Blok"}
                          >
                            {section.isActive ? (
                              <Eye className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <EyeOff className="w-4 h-4 text-slate-600" />
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteSection(section.id, section.title);
                            }}
                            className="p-1.5 rounded-lg hover:bg-rose-950/80 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                            title="Hapus Blok Ini"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </Reorder.Item>
                    ))}
                  </Reorder.Group>
                </>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: HEADER & FOOTER CUSTOMIZATION                      */}
          {/* ======================================================== */}
          {activeTab === "header_footer" && (
            <div className="space-y-6 text-xs">
              {/* PENGATURAN HEADER */}
              <div className="space-y-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <h3 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-blue-400" />
                  <span>Pengaturan Header (Navbar)</span>
                </h3>

                <label className="flex items-center justify-between p-2 rounded-xl bg-slate-950 cursor-pointer">
                  <span className="text-slate-300">Tampilkan Logo Sekolah</span>
                  <input
                    type="checkbox"
                    checked={school.headerConfig?.showLogo !== false}
                    onChange={(e) => updateHeader("showLogo", e.target.checked)}
                    className="w-4 h-4 rounded-sm text-blue-600"
                  />
                </label>

                <label className="flex items-center justify-between p-2 rounded-xl bg-slate-950 cursor-pointer">
                  <span className="text-slate-300">Tampilkan Nama Sekolah</span>
                  <input
                    type="checkbox"
                    checked={school.headerConfig?.showSchoolName !== false}
                    onChange={(e) => updateHeader("showSchoolName", e.target.checked)}
                    className="w-4 h-4 rounded-sm text-blue-600"
                  />
                </label>

                <label className="flex items-center justify-between p-2 rounded-xl bg-slate-950 cursor-pointer">
                  <span className="text-slate-300">Tampilkan Badge NPSN & Akreditasi</span>
                  <input
                    type="checkbox"
                    checked={school.headerConfig?.showNpsnBadge !== false}
                    onChange={(e) => updateHeader("showNpsnBadge", e.target.checked)}
                    className="w-4 h-4 rounded-sm text-blue-600"
                  />
                </label>

                <label className="flex items-center justify-between p-2 rounded-xl bg-slate-950 cursor-pointer">
                  <span className="text-slate-300">Header Melayang Saat Di-scroll (Sticky)</span>
                  <input
                    type="checkbox"
                    checked={school.headerConfig?.isSticky !== false}
                    onChange={(e) => updateHeader("isSticky", e.target.checked)}
                    className="w-4 h-4 rounded-sm text-blue-600"
                  />
                </label>

                <label className="flex items-center justify-between p-2 rounded-xl bg-slate-950 cursor-pointer">
                  <span className="text-slate-300">Tampilkan Tombol PPDB di Header</span>
                  <input
                    type="checkbox"
                    checked={school.headerConfig?.showPpdbButton !== false}
                    onChange={(e) => updateHeader("showPpdbButton", e.target.checked)}
                    className="w-4 h-4 rounded-sm text-blue-600"
                  />
                </label>

                <div>
                  <label className="block text-slate-400 mb-1">Teks Tombol PPDB</label>
                  <input
                    type="text"
                    value={school.headerConfig?.ppdbButtonText || ""}
                    placeholder={`PPDB ${school.ppdbConfig.academicYear}`}
                    onChange={(e) => updateHeader("ppdbButtonText", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
              </div>

              {/* PENGATURAN FOOTER */}
              <div className="space-y-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <h3 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-blue-400" />
                  <span>Pengaturan Footer & Media Sosial</span>
                </h3>

                <div>
                  <label className="block text-slate-400 mb-1">Ringkasan Profil Sekolah di Footer</label>
                  <textarea
                    rows={2}
                    value={school.footerConfig?.aboutText || ""}
                    placeholder="Mendidik generasi cerdas berakhlak mulia..."
                    onChange={(e) => updateFooter("aboutText", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white resize-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Teks Hak Cipta (Copyright)</label>
                  <input
                    type="text"
                    value={school.footerConfig?.copyrightText || ""}
                    placeholder={`© ${new Date().getFullYear()} ${school.name}. Hak Cipta Dilindungi.`}
                    onChange={(e) => updateFooter("copyrightText", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>

                <div className="pt-2 border-t border-slate-800 space-y-2">
                  <span className="text-[11px] font-semibold text-slate-300 block">Tautan Media Sosial:</span>
                  <div className="flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
                    <input
                      type="text"
                      value={school.footerConfig?.socialMedia?.instagram || ""}
                      placeholder="Username / URL Instagram"
                      onChange={(e) => updateFooterSocial("instagram", e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Youtube className="w-4 h-4 text-red-400 shrink-0" />
                    <input
                      type="text"
                      value={school.footerConfig?.socialMedia?.youtube || ""}
                      placeholder="Kanal YouTube"
                      onChange={(e) => updateFooterSocial("youtube", e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Facebook className="w-4 h-4 text-blue-400 shrink-0" />
                    <input
                      type="text"
                      value={school.footerConfig?.socialMedia?.facebook || ""}
                      placeholder="Halaman Facebook"
                      onChange={(e) => updateFooterSocial("facebook", e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <input
                      type="text"
                      value={school.footerConfig?.socialMedia?.whatsapp || ""}
                      placeholder="Nomor WhatsApp Admin (08xxx)"
                      onChange={(e) => updateFooterSocial("whatsapp", e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: THEME CUSTOMIZATION                               */}
          {/* ======================================================== */}
          {activeTab === "theme" && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Palet Warna Cepat (Presets)
                </label>
                <div className="space-y-2">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => {
                        setSchool({
                          ...school,
                          theme: {
                            ...school.theme,
                            primaryColor: preset.primary,
                            secondaryColor: preset.secondary,
                          },
                        });
                      }}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all text-left cursor-pointer"
                    >
                      <span className="text-xs font-medium text-slate-300">{preset.name}</span>
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-4 h-4 rounded-full border border-slate-700"
                          style={{ backgroundColor: preset.primary }}
                        />
                        <span
                          className="w-4 h-4 rounded-full border border-slate-700"
                          style={{ backgroundColor: preset.secondary }}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Color Pickers */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Warna Utama (Primary Color)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={school.theme.primaryColor}
                      onChange={(e) => updateThemeColor("primaryColor", e.target.value)}
                      className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <input
                      type="text"
                      value={school.theme.primaryColor}
                      onChange={(e) => updateThemeColor("primaryColor", e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Warna Aksen / Tombol PPDB
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={school.theme.secondaryColor}
                      onChange={(e) => updateThemeColor("secondaryColor", e.target.value)}
                      className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <input
                      type="text"
                      value={school.theme.secondaryColor}
                      onChange={(e) => updateThemeColor("secondaryColor", e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 4: SCHOOL INFO & LOGO UPLOAD                          */}
          {/* ======================================================== */}
          {activeTab === "settings" && (
            <div className="space-y-4 text-xs">
              {/* UPLOAD LOGO SEKOLAH */}
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                <span className="font-bold text-white uppercase tracking-wider block">
                  Identitas & Logo Resmi
                </span>
                <ImageUploader
                  label="Logo Resmi Sekolah (PNG Transparan Disarankan)"
                  value={school.logoUrl || ""}
                  onChange={(url) => setSchool({ ...school, logoUrl: url })}
                  folder="school_logos"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">
                  Jenjang Pendidikan *
                </label>
                <select
                  value={school.jenjang}
                  onChange={(e) => setSchool({ ...school, jenjang: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                >
                  <option value="SD">SD (Sekolah Dasar)</option>
                  <option value="SMP">SMP (Sekolah Menengah Pertama)</option>
                  <option value="SMA">SMA (Sekolah Menengah Atas)</option>
                  <option value="SMK">SMK (Sekolah Menengah Kejuruan)</option>
                  <option value="Madrasah">Madrasah (MI / MTs / MA)</option>
                  <option value="Yayasan">Yayasan / Pesantren</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">
                  Nama Resmi Sekolah
                </label>
                <input
                  type="text"
                  value={school.name}
                  onChange={(e) => setSchool({ ...school, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Nomor Pokok Sekolah Nasional (NPSN)</label>
                <input
                  type="text"
                  value={school.npsn}
                  onChange={(e) => setSchool({ ...school, npsn: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">
                  Slogan / Visi Singkat
                </label>
                <textarea
                  rows={3}
                  value={school.tagline}
                  onChange={(e) => setSchool({ ...school, tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white resize-none"
                />
              </div>

              <div className="pt-2 bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                <span className="font-bold text-white uppercase tracking-wider block">
                  Status Penerimaan Siswa Baru (PPDB)
                </span>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={school.ppdbConfig.isOpen}
                    onChange={(e) =>
                      setSchool({
                        ...school,
                        ppdbConfig: { ...school.ppdbConfig, isOpen: e.target.checked },
                      })
                    }
                    className="w-4 h-4 rounded-sm text-blue-600 bg-slate-950 border-slate-800"
                  />
                  <span className="text-slate-200 font-medium">
                    Buka Pendaftaran PPDB Online
                  </span>
                </label>

                <div>
                  <label className="block text-slate-400 mb-1">Tahun Ajaran</label>
                  <input
                    type="text"
                    value={school.ppdbConfig.academicYear}
                    onChange={(e) =>
                      setSchool({
                        ...school,
                        ppdbConfig: { ...school.ppdbConfig, academicYear: e.target.value },
                      })
                    }
                    placeholder="2026/2027"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">WhatsApp Panitia PPDB</label>
                  <input
                    type="text"
                    value={school.ppdbConfig.contactWhatsApp}
                    onChange={(e) =>
                      setSchool({
                        ...school,
                        ppdbConfig: { ...school.ppdbConfig, contactWhatsApp: e.target.value },
                      })
                    }
                    placeholder="081234567890"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Sidebar: Quick Navigation Links */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 space-y-2">
          <Link
            href={`/s/${school.slug}`}
            target="_blank"
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-all cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span>Lihat Website Publik (/s/{school.slug})</span>
          </Link>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/dashboard/staf"
              className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-[11px] text-slate-400 hover:text-white"
            >
              <Users className="w-3 h-3 text-purple-400" />
              <span>Kelola Staf</span>
            </Link>
            <Link
              href="/dashboard/posts"
              className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-[11px] text-slate-400 hover:text-white"
            >
              <Newspaper className="w-3 h-3 text-emerald-400" />
              <span>Tulis Berita</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* ======================================================== */}
      {/* 2. MAIN AREA: LIVE CANVAS & DEVICE RESPONSIVE PREVIEW    */}
      {/* ======================================================== */}
      <main className="flex-1 flex flex-col overflow-hidden bg-slate-950">
        {/* Top Control Bar */}
        <header className="h-14 border-b border-slate-800 bg-slate-900/60 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live Interactive Preview</span>
          </div>

          {/* Device Toggles */}
          <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setPreviewDevice("desktop")}
              className={`p-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                previewDevice === "desktop"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              title="Desktop View"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPreviewDevice("tablet")}
              className={`p-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                previewDevice === "tablet"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              title="Tablet View"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPreviewDevice("mobile")}
              className={`p-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                previewDevice === "mobile"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              title="Smartphone View"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/ppdb"
              className="text-xs font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              Kelola PPDB
            </Link>
          </div>
        </header>

        {/* Canvas Workspace Viewport */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center canvas-grid">
          <div
            className={`transition-all duration-300 bg-white text-slate-900 shadow-2xl overflow-y-auto ${
              previewDevice === "desktop"
                ? "w-full max-w-6xl rounded-2xl border border-slate-800"
                : previewDevice === "tablet"
                ? "w-[768px] rounded-3xl border-8 border-slate-800 h-[92vh]"
                : "w-[390px] rounded-4xl border-8 border-slate-800 h-[88vh]"
            }`}
          >
            {/* Live School Website Render inside Canvas */}
            <div className="min-h-full flex flex-col">
              <SchoolNavbar school={school} isBuilderMode={true} />

              <div className="flex-1">
                {school.sections
                  .slice()
                  .sort((a, b) => a.order - b.order)
                  .map((section) => (
                    <SectionRenderer
                      key={section.id}
                      section={section}
                      theme={school.theme}
                      isBuilderMode={true}
                    />
                  ))}
              </div>

              <SchoolFooter school={school} />
            </div>
          </div>
        </div>
      </main>

      {/* ======================================================== */}
      {/* 3. MODAL TAMBAH SECTION BARU                            */}
      {/* ======================================================== */}
      {isAddSectionModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-400" />
                  <span>Katalog Template Section Baru</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Pilih jenis blok konten yang ingin ditambahkan ke halaman profil sekolah Anda:
                </p>
              </div>
              <button
                onClick={() => setIsAddSectionModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Template Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Option 1: FAQ */}
              <button
                type="button"
                onClick={() => handleAddNewSection("faq")}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500 text-left transition-all group cursor-pointer hover:bg-slate-900"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-white mb-1">Pertanyaan Umum (FAQ)</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Daftar akordeon tanya-jawab seputar PPDB, SPP, seragam, kurikulum, dan tata tertib.
                </p>
              </button>

              {/* Option 2: Video Profil */}
              <button
                type="button"
                onClick={() => handleAddNewSection("video_profil")}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500 text-left transition-all group cursor-pointer hover:bg-slate-900"
              >
                <div className="w-9 h-9 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Video className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-white mb-1">Video Profil Sekolah</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Sematkan video dokumenter atau profil YouTube untuk memperlihatkan suasana belajar.
                </p>
              </button>

              {/* Option 3: Program Keahlian / Jurusan */}
              <button
                type="button"
                onClick={() => handleAddNewSection("program_jurusan")}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500 text-left transition-all group cursor-pointer hover:bg-slate-900"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-white mb-1">Program & Jurusan</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Menampilkan kartu konsentrasi keahlian (SMK), peminatan IPA/IPS, atau kelas unggulan.
                </p>
              </button>

              {/* Option 4: Testimoni Alumni */}
              <button
                type="button"
                onClick={() => handleAddNewSection("testimoni")}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500 text-left transition-all group cursor-pointer hover:bg-slate-900"
              >
                <div className="w-9 h-9 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-white mb-1">Testimoni Alumni & Ortu</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Ulasan pengalaman belajar berharga dari lulusan berprestasi dan orang tua siswa.
                </p>
              </button>

              {/* Option 5: CTA Banner PPDB */}
              <button
                type="button"
                onClick={() => handleAddNewSection("cta_ppdb")}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500 text-left transition-all group cursor-pointer hover:bg-slate-900 sm:col-span-2"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-white mb-1">Banner Ajakan PPDB (Call to Action)</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Spanduk konversi besar dengan ajakan bertindak cepat untuk mendaftar daring atau konsultasi via WhatsApp.
                </p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

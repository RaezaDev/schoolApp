"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SchoolSite, PPDBApplicant, SchoolPost, SchoolStaffMember } from "@/types/builder";
import {
  initialDemoSchool,
  initialDemoApplicants,
  initialDemoPosts,
  initialDemoStaff,
} from "@/lib/mockData";
import {
  Layout,
  Users,
  Newspaper,
  UserCheck,
  Globe,
  Settings,
  ArrowRight,
  Sparkles,
  TrendingUp,
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  Shield,
  Palette,
} from "lucide-react";

export default function DashboardOverviewPage() {
  const [school, setSchool] = useState<SchoolSite>(initialDemoSchool);
  const [applicants, setApplicants] = useState<PPDBApplicant[]>(initialDemoApplicants);
  const [posts, setPosts] = useState<SchoolPost[]>(initialDemoPosts);
  const [staff, setStaff] = useState<SchoolStaffMember[]>(initialDemoStaff);

  useEffect(() => {
    const savedSchool = localStorage.getItem("school_site_data");
    if (savedSchool) {
      try {
        setSchool(JSON.parse(savedSchool));
      } catch (e) {
        console.error(e);
      }
    }

    const savedApplicants = localStorage.getItem("school_ppdb_applicants");
    if (savedApplicants) {
      try {
        const parsed = JSON.parse(savedApplicants);
        setApplicants([...parsed, ...initialDemoApplicants]);
      } catch (e) {
        console.error(e);
      }
    }

    const savedPosts = localStorage.getItem("school_posts");
    if (savedPosts) {
      try {
        setPosts(JSON.parse(savedPosts));
      } catch (e) {
        console.error(e);
      }
    }

    const savedStaff = localStorage.getItem("school_staff_members");
    if (savedStaff) {
      try {
        setStaff(JSON.parse(savedStaff));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const pendingPPDB = applicants.filter((a) => a.status === "pending").length;
  const acceptedPPDB = applicants.filter((a) => a.status === "accepted").length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-500/20"
          >
            SB
          </Link>
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              <span>{school.name}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                Website Live
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">Pusat Kendali Profil Sekolah & PPDB</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/s/${school.slug}`}
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span>Lihat Website</span>
          </Link>

          <Link
            href="/builder"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-0.5"
          >
            <Layout className="w-3.5 h-3.5" />
            <span>Buka Studio Builder</span>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-blue-900/40 via-indigo-900/30 to-slate-900 border border-blue-800/40 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tahun Ajaran {school.ppdbConfig.academicYear} Aktif</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Selamat Datang di Dashboard {school.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Kelola desain tampilan website, verifikasi calon peserta didik baru, terbitkan berita kegiatan,
              dan atur hak akses tim pengajar dari satu tempat.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/builder"
              className="px-5 py-3 rounded-xl bg-white text-slate-900 font-bold text-xs sm:text-sm shadow-xl hover:bg-slate-100 transition-all"
            >
              Kustomisasi Desain Web
            </Link>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-medium">Total Pendaftar PPDB</span>
              <UserCheck className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">{applicants.length}</div>
            <p className="text-[11px] text-slate-500">
              <span className="text-amber-400 font-semibold">{pendingPPDB}</span> perlu verifikasi berkas
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-medium">Siswa Diterima</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold text-emerald-400">{acceptedPPDB}</div>
            <p className="text-[11px] text-slate-500">Dari total 4 jalur seleksi aktif</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-medium">Artikel & Berita</span>
              <Newspaper className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">{posts.length}</div>
            <p className="text-[11px] text-slate-500">Terbit di website sekolah</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-medium">Tim Staf & Guru</span>
              <Users className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">{staff.length}</div>
            <p className="text-[11px] text-slate-500">Dengan hak akses RBAC aktif</p>
          </div>
        </div>

        {/* Quick Menu Hub */}
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span>Pusat Navigasi Modul</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Kartu 1: Modul PPDB */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white">Penerimaan Siswa (PPDB)</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Verifikasi berkas persyaratan calon siswa baru, ubah status kelulusan, dan unduh
                  laporan rekapitulasi format Excel (.xlsx).
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/dashboard/ppdb"
                  className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
                >
                  <span>Buka Dashboard PPDB</span>
                  <ArrowRight className="w-4 h-4 text-blue-400" />
                </Link>
              </div>
            </div>

            {/* Kartu 2: CMS Berita */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
                  <Newspaper className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white">Pusat Berita & Pengumuman</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Publikasikan artikel kegiatan belajar, dokumentasi upacara, kalender akademik, dan
                  kejuaraan lomba siswa untuk pembaca publik.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/dashboard/posts"
                  className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
                >
                  <span>Kelola Berita Humas</span>
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                </Link>
              </div>
            </div>

            {/* Kartu 3: Manajemen Staf */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white">Akun Staf & Hak Akses (RBAC)</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Daftarkan guru dan operator tata usaha, tentukan peran Panitia PPDB atau Humas, dan
                  batasi hak akses secara aman.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/dashboard/staf"
                  className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
                >
                  <span>Atur Anggota Staf</span>
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  Layout,
  CheckCircle2,
  Users,
  ShieldCheck,
  FileSpreadsheet,
  Globe,
  Sliders,
} from "lucide-react";

export default function PlatformLandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Platform Navigation */}
      <nav className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                SchoolBuilder<span className="text-blue-500">.id</span>
              </span>
              <span className="block text-[10px] text-slate-400 font-mono tracking-wider uppercase">
                Zero Budget Platform
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/s/smpn1-teladan"
              className="text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Demo Web Sekolah
            </Link>
            <Link
              href="/dashboard"
              className="hidden sm:inline-block text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/login"
              className="text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Masuk
            </Link>
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-0.5"
            >
              <span>Buka Studio Builder</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32 flex-1 flex flex-col justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/25 via-slate-950 to-slate-950 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs sm:text-sm font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Platform Web Profil & PPDB Sekolah 100% Bebas Biaya (Rp 0)</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-tight">
            Bangun Website Sekolah & Sistem PPDB{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-300 to-sky-400">
              Tanpa Coding
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Dilengkapi Visual Drag-and-Drop Editor, kustomisasi warna & logo sekolah, serta sistem
            penerimaan siswa baru (PPDB) online dengan ekspor Excel dan notifikasi WhatsApp.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/builder"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-xl shadow-blue-600/30 transition-all transform hover:-translate-y-0.5"
            >
              <Layout className="w-5 h-5" />
              <span>Mulai Desain Website Sekolah</span>
            </Link>

            <Link
              href="/s/smpn1-teladan"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-base transition-all"
            >
              <Globe className="w-5 h-5 text-blue-400" />
              <span>Lihat Demo Web Publik</span>
            </Link>
          </div>

          {/* Quick Metrics */}
          <div className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto border-t border-slate-800/80 text-left">
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              <Sliders className="w-5 h-5 text-blue-400 mb-2" />
              <div className="font-bold text-white text-base">Drag & Drop</div>
              <p className="text-xs text-slate-400">Atur urutan blok sekolah sefleksibel Canva.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              <Users className="w-5 h-5 text-emerald-400 mb-2" />
              <div className="font-bold text-white text-base">Modul PPDB</div>
              <p className="text-xs text-slate-400">Pendaftaran multi-step tanpa pusing bikin akun.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              <FileSpreadsheet className="w-5 h-5 text-amber-400 mb-2" />
              <div className="font-bold text-white text-base">Export Excel</div>
              <p className="text-xs text-slate-400">Download rekap calon siswa dengan 1 klik.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              <ShieldCheck className="w-5 h-5 text-purple-400 mb-2" />
              <div className="font-bold text-white text-base">0 Budget</div>
              <p className="text-xs text-slate-400">Arsitektur hemat kuota Spark Tier selamanya.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Footer */}
      <footer className="py-8 border-t border-slate-900 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} SchoolBuilder Platform. Dirancang untuk kemajuan pendidikan Indonesia.</p>
      </footer>
    </div>
  );
}

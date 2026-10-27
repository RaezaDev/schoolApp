"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { initialDemoSchool } from "@/lib/mockData";
import { SchoolSite } from "@/types/builder";

export default function RegisterSchoolPage() {
  const router = useRouter();

  const [schoolName, setSchoolName] = useState("");
  const [jenjang, setJenjang] = useState<"SD" | "SMP" | "SMA" | "SMK" | "Madrasah">("SMP");
  const [npsn, setNpsn] = useState("");
  const [slug, setSlug] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedSlug = slug
      .toLowerCase()
      .replace(/[^\w-]/g, "")
      .replace(/\s+/g, "-");

    const newSchool: SchoolSite = {
      ...initialDemoSchool,
      id: `sch_${Date.now()}`,
      name: schoolName,
      jenjang,
      npsn,
      slug: formattedSlug || "sekolah-baru",
      status: "draft",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    // Save to localStorage as the active customized school
    localStorage.setItem("school_site_data", JSON.stringify(newSchool));

    // Redirect to builder
    router.push("/builder");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 selection:bg-blue-600 selection:text-white">
      <div className="max-w-xl w-full mx-auto space-y-8">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link
            href="/"
            className="inline-flex w-12 h-12 rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600 items-center justify-center text-white shadow-xl shadow-blue-500/20 mb-2"
          >
            <GraduationCap className="w-7 h-7" />
          </Link>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Buat Website Profil Sekolah Anda
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            100% Gratis Tanpa Biaya. Siap digunakan dalam hitungan menit.
          </p>
        </div>

        {/* Registration Form Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <form onSubmit={handleRegister} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block text-slate-300 font-medium mb-1.5">Nama Resmi Sekolah *</label>
              <input
                type="text"
                required
                placeholder="Contoh: SMA Negeri 2 Teladan"
                value={schoolName}
                onChange={(e) => {
                  setSchoolName(e.target.value);
                  if (!slug) {
                    setSlug(
                      e.target.value
                        .toLowerCase()
                        .replace(/[^\w\s-]/g, "")
                        .replace(/\s+/g, "-")
                    );
                  }
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-blue-500 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1.5">Jenjang Pendidikan *</label>
                <select
                  value={jenjang}
                  onChange={(e) => setJenjang(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-blue-500 text-xs"
                >
                  <option value="SD">Sekolah Dasar (SD/MI)</option>
                  <option value="SMP">Sekolah Menengah Pertama (SMP/MTs)</option>
                  <option value="SMA">Sekolah Menengah Atas (SMA/MA)</option>
                  <option value="SMK">Sekolah Menengah Kejuruan (SMK)</option>
                  <option value="Madrasah">Madrasah / Pesantren</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1.5">NPSN (8 Digit) *</label>
                <input
                  type="text"
                  required
                  maxLength={8}
                  placeholder="Contoh: 20109988"
                  value={npsn}
                  onChange={(e) => setNpsn(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-blue-500 text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1.5">
                Alamat Subdomain Website *
              </label>
              <div className="flex items-center rounded-xl bg-slate-950 border border-slate-800 overflow-hidden focus-within:border-blue-500">
                <input
                  type="text"
                  required
                  placeholder="sman2teladan"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-transparent text-white placeholder-slate-500 focus:outline-hidden text-xs font-mono"
                />
                <span className="px-3 text-xs text-slate-500 font-mono bg-slate-900/60 border-l border-slate-800">
                  .webbuilder.id
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
              <div>
                <label className="block text-slate-300 font-medium mb-1.5">Email Administrator *</label>
                <input
                  type="email"
                  required
                  placeholder="admin@sekolah.sch.id"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-blue-500 text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1.5">Kata Sandi Baru *</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-blue-500 text-xs font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-blue-600/30 transition-all cursor-pointer mt-4"
            >
              <span>Buat Website & Masuk ke Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
            Sudah memiliki website sekolah terdaftar?{" "}
            <Link href="/login" className="text-blue-400 hover:text-blue-300 font-semibold">
              Masuk ke Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

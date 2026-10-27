"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap, Shield, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to dashboard
    router.push("/dashboard");
  };

  // Demo 1-Click Role Switcher
  const quickDemoLogin = (role: "admin_sekolah" | "panitia_ppdb" | "editor_humas") => {
    if (role === "admin_sekolah") {
      router.push("/dashboard");
    } else if (role === "panitia_ppdb") {
      router.push("/dashboard/ppdb");
    } else if (role === "editor_humas") {
      router.push("/dashboard/posts");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 selection:bg-blue-600 selection:text-white">
      <div className="max-w-md w-full mx-auto space-y-8">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link
            href="/"
            className="inline-flex w-12 h-12 rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600 items-center justify-center text-white shadow-xl shadow-blue-500/20 mb-2"
          >
            <GraduationCap className="w-7 h-7" />
          </Link>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Masuk ke Portal Sekolah
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Akses dashboard operator tata usaha, panitia PPDB, dan humas sekolah.
          </p>
        </div>

        {/* 1-Click Quick Demo Login Switcher */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-blue-400 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mode Demo 1-Klik (Pilih Role):</span>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => quickDemoLogin("admin_sekolah")}
              className="w-full py-2 px-3 rounded-xl bg-purple-950/60 hover:bg-purple-900/80 border border-purple-800/80 text-purple-200 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
            >
              <span>1. Masuk sebagai Admin Sekolah (TU)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => quickDemoLogin("panitia_ppdb")}
              className="w-full py-2 px-3 rounded-xl bg-blue-950/60 hover:bg-blue-900/80 border border-blue-800/80 text-blue-200 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
            >
              <span>2. Masuk sebagai Panitia PPDB</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => quickDemoLogin("editor_humas")}
              className="w-full py-2 px-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-800/80 text-emerald-200 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
            >
              <span>3. Masuk sebagai Tim Humas (Berita)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Regular Login Form */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <form onSubmit={handleLogin} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block text-slate-300 font-medium mb-1.5">Email Staf Sekolah</label>
              <input
                type="email"
                required
                placeholder="operator@smpn1teladan.sch.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-blue-500 text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1.5">Kata Sandi</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-blue-500 text-xs font-mono"
              />
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-400">
                <input type="checkbox" className="rounded-sm bg-slate-950 border-slate-800" />
                <span>Ingat saya</span>
              </label>
              <a href="#" className="text-blue-400 hover:text-blue-300">
                Lupa kata sandi?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition-all cursor-pointer mt-2"
            >
              Masuk ke Dashboard
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
            Sekolah Anda belum terdaftar?{" "}
            <Link href="/register" className="text-blue-400 hover:text-blue-300 font-semibold">
              Daftar Website Baru
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

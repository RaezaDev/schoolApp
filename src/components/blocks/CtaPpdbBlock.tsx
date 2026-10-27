"use client";

import React from "react";
import Link from "next/link";
import { CtaPpdbSectionData, SchoolTheme } from "@/types/builder";
import { ArrowRight, HelpCircle, Sparkles } from "lucide-react";

interface CtaPpdbBlockProps {
  section: CtaPpdbSectionData;
  theme: SchoolTheme;
  isBuilderMode?: boolean;
}

export function CtaPpdbBlock({ section, theme, isBuilderMode }: CtaPpdbBlockProps) {
  const data = section.data;

  return (
    <section id="cta_ppdb" className="py-20 relative overflow-hidden">
      {/* Background with Theme Primary Tint */}
      <div
        className="absolute inset-0 opacity-95"
        style={{
          background: `linear-gradient(135deg, ${theme.primaryColor} 0%, #0f172a 100%)`,
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-white">
        {data.badge && (
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider mb-6 text-amber-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{data.badge}</span>
          </div>
        )}

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight max-w-3xl mx-auto">
          {data.headline || "Daftarkan Putra-Putri Anda di Gelombang PPDB Terbaru"}
        </h2>

        <p className="mt-4 text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
          {data.subheadline ||
            "Kuota terbatas untuk setiap jalur penerimaan. Lengkapi berkas secara daring sekarang dan dapatkan kemudahan verifikasi instan."}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={isBuilderMode ? "#" : data.ctaButtonLink || "/dashboard/ppdb"}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-bold text-base text-white shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1"
            style={{ backgroundColor: theme.secondaryColor }}
          >
            <span>{data.ctaButtonText || "Mulai Pendaftaran Online"}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

          {data.secondaryButtonText && (
            <Link
              href={isBuilderMode ? "#" : data.secondaryButtonLink || "#kontak_peta"}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-semibold text-sm text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all"
            >
              <HelpCircle className="w-4 h-4" />
              <span>{data.secondaryButtonText}</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

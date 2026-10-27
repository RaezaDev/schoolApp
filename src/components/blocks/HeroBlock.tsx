"use client";

import React from "react";
import Link from "next/link";
import { HeroSectionData, SchoolTheme } from "@/types/builder";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface HeroBlockProps {
  section: HeroSectionData;
  theme: SchoolTheme;
  isBuilderMode?: boolean;
}

export function HeroBlock({ section, theme, isBuilderMode }: HeroBlockProps) {
  const { data } = section;

  return (
    <section
      id="hero"
      className="relative overflow-hidden py-20 lg:py-28 bg-linear-to-b from-slate-50 via-white to-slate-100"
    >
      {/* Decorative gradient blur background */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 opacity-15 blur-3xl pointer-events-none rounded-full"
        style={{
          background: `radial-gradient(circle, ${theme.primaryColor} 0%, ${theme.secondaryColor} 100%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Teks & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {data.badgeText && (
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide border shadow-2xs"
                style={{
                  backgroundColor: `${theme.primaryColor}10`,
                  color: theme.primaryColor,
                  borderColor: `${theme.primaryColor}30`,
                }}
              >
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>{data.badgeText}</span>
              </div>
            )}

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {data.headline}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {data.subheadline}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href={isBuilderMode ? "#" : data.ctaPrimaryLink || "#ppdb"}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                style={{ backgroundColor: theme.primaryColor }}
              >
                <span>{data.ctaPrimaryText || "Daftar PPDB"}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              {data.ctaSecondaryText && (
                <a
                  href={isBuilderMode ? "#" : data.ctaSecondaryLink || "#profil"}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 shadow-2xs transition-all"
                >
                  <span>{data.ctaSecondaryText}</span>
                </a>
              )}
            </div>

            {/* Statistik Ringkas */}
            {data.stats && data.stats.length > 0 && (
              <div className="pt-8 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {data.stats.map((stat, idx) => (
                  <div key={idx} className="text-center lg:text-left">
                    <div
                      className="text-2xl sm:text-3xl font-extrabold tracking-tight"
                      style={{ color: theme.primaryColor }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-500 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Gambar Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div
                className="absolute -inset-2 rounded-3xl opacity-30 blur-xl transform -rotate-1"
                style={{ backgroundColor: theme.secondaryColor }}
              />
              <div className="relative overflow-hidden rounded-2xl border-4 border-white shadow-2xl bg-white">
                <img
                  src={
                    data.backgroundImageUrl ||
                    "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&auto=format&fit=crop&q=80"
                  }
                  alt="Suasana Sekolah"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="p-4 bg-white/95 backdrop-blur-xs flex items-center justify-between border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Lingkungan Belajar Asri & Berkarakter</span>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-sm bg-slate-100 text-slate-600">
                    Akreditasi A
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { ProgramJurusanSectionData, SchoolTheme } from "@/types/builder";
import { BookOpen, CheckCircle, Sparkles } from "lucide-react";

interface ProgramJurusanBlockProps {
  section: ProgramJurusanSectionData;
  theme: SchoolTheme;
}

export function ProgramJurusanBlock({ section, theme }: ProgramJurusanBlockProps) {
  const data = section.data;
  const programs = data.programs || [];

  return (
    <section id="program_jurusan" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 shadow-xs"
            style={{
              backgroundColor: `${theme.primaryColor}15`,
              color: theme.primaryColor,
            }}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{data.badge || "Pilihan Program Keahlian"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {section.title || "Konsentrasi & Program Unggulan"}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            {data.description ||
              "Kurikulum berbasis kompetensi masa depan yang menyiapkan peserta didik siap kerja, siap wirausaha, maupun melanjutkan ke perguruan tinggi ternama."}
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((prog, idx) => (
            <div
              key={prog.id || idx}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
            >
              {prog.imageUrl && (
                <div className="h-48 overflow-hidden bg-slate-100 relative">
                  <img
                    src={prog.imageUrl}
                    alt={prog.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {prog.code && (
                    <div
                      className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md uppercase tracking-wider"
                      style={{ backgroundColor: theme.primaryColor }}
                    >
                      {prog.code}
                    </div>
                  )}
                </div>
              )}

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2.5">
                    {prog.name}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {prog.description}
                  </p>
                </div>

                {prog.features && prog.features.length > 0 && (
                  <div className="pt-4 border-t border-slate-100 space-y-2">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Kompetensi & Prospek
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {prog.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { PrestasiSectionData, SchoolTheme } from "@/types/builder";
import { Trophy, Award } from "lucide-react";
import { motion } from "framer-motion";

interface PrestasiBlockProps {
  section: PrestasiSectionData;
  theme: SchoolTheme;
}

export function PrestasiBlock({ section, theme }: PrestasiBlockProps) {
  const { data } = section;

  return (
    <section id="prestasi" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background glow decoration */}
      <div
        className="absolute top-1/2 right-0 w-96 h-96 opacity-10 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: theme.secondaryColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5" />
            <span>Koleksi Prestasi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Tradisi Juara & Kebanggaan Sekolah
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Bukti nyata dedikasi dan kerja keras para murid di berbagai ajang kompetisi sains,
            teknologi, olahraga, dan seni.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.achievements.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-800/90 border border-slate-700/80 rounded-2xl overflow-hidden hover:border-slate-500 transition-all flex flex-col justify-between"
            >
              {item.imageUrl && (
                <div className="h-48 overflow-hidden bg-slate-700">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      <Award className="w-3 h-3" />
                      Tingkat {item.level}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{item.year}</span>
                  </div>
                  <h3 className="font-bold text-white text-base leading-snug">{item.title}</h3>
                </div>
                <div className="pt-3 border-t border-slate-700/60 text-xs text-slate-400">
                  Peraih: <span className="text-slate-200 font-medium">{item.studentName}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

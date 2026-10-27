"use client";

import React, { useState } from "react";
import { GaleriSectionData, SchoolTheme } from "@/types/builder";
import { Camera, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GaleriBlockProps {
  section: GaleriSectionData;
  theme: SchoolTheme;
}

export function GaleriBlock({ section, theme }: GaleriBlockProps) {
  const { data } = section;
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filteredImages =
    activeCategory === "Semua"
      ? data.images
      : data.images.filter((img) => img.category === activeCategory);

  return (
    <section id="galeri" className="py-20 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 text-slate-700 text-xs font-semibold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5" />
            <span>Dokumentasi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Galeri Kehidupan & Kegiatan Sekolah
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Momen-momen berharga dalam kebersamaan belajar, berkarya, dan berprestasi di lingkungan sekolah.
          </p>
        </div>

        {/* Filter Kategori */}
        {data.categories && data.categories.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {data.categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "text-white shadow-md shadow-blue-500/20"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
                style={{
                  backgroundColor: activeCategory === cat ? theme.primaryColor : undefined,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Grid Gambar */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredImages.map((img) => (
              <motion.div
                layout
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative h-64 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 bg-slate-200 cursor-pointer"
              >
                <img
                  src={img.url}
                  alt={img.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 mb-1">
                    {img.category}
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-white leading-snug">
                    {img.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

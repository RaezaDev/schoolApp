"use client";

import React from "react";
import { SambutanSectionData, SchoolTheme } from "@/types/builder";
import { Quote, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface SambutanBlockProps {
  section: SambutanSectionData;
  theme: SchoolTheme;
}

export function SambutanBlock({ section, theme }: SambutanBlockProps) {
  const { data } = section;

  return (
    <section id="sambutan_kepsek" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Foto Kepala Sekolah */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 text-center"
          >
            <div className="relative inline-block">
              <div
                className="absolute -inset-3 rounded-2xl opacity-20 blur-lg"
                style={{ backgroundColor: theme.primaryColor }}
              />
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-slate-100">
                <img
                  src={
                    data.kepsekPhotoUrl ||
                    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=80"
                  }
                  alt={data.kepsekName}
                  className="w-72 sm:w-80 h-96 object-cover object-top"
                />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-bold text-slate-900">{data.kepsekName}</h3>
              <p className="text-sm font-medium text-slate-500">{data.kepsekTitle}</p>
            </div>
          </motion.div>

          {/* Isi Sambutan & Visi Misi */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-6"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Quote className="w-8 h-8 opacity-60" style={{ color: theme.secondaryColor }} />
                <span
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: theme.primaryColor }}
                >
                  Kata Sambutan
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
                Mendidik dengan Hati, Menyiapkan Pemimpin Masa Depan
              </h2>
            </div>

            <p className="text-slate-600 leading-relaxed text-base italic">
              "{data.greetingMessage}"
            </p>

            {/* Kotak Visi & Misi */}
            <div className="pt-4 space-y-4">
              <div
                className="p-5 rounded-xl border border-slate-200/80 bg-slate-50/80 shadow-2xs"
                style={{ borderLeftColor: theme.primaryColor, borderLeftWidth: "4px" }}
              >
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Visi Sekolah
                </h4>
                <p className="text-slate-800 font-semibold text-sm leading-relaxed">
                  "{data.visi}"
                </p>
              </div>

              {data.misi && data.misi.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    Misi Utama
                  </h4>
                  <ul className="space-y-2">
                    {data.misi.map((m, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <CheckCircle
                          className="w-4 h-4 shrink-0 mt-0.5"
                          style={{ color: theme.primaryColor }}
                        />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

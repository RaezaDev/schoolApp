"use client";

import React from "react";
import { GuruStafSectionData, SchoolTheme } from "@/types/builder";
import { motion } from "framer-motion";

interface GuruStafBlockProps {
  section: GuruStafSectionData;
  theme: SchoolTheme;
}

export function GuruStafBlock({ section, theme }: GuruStafBlockProps) {
  const { data } = section;

  return (
    <section id="guru_staf" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span
            className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
            style={{ backgroundColor: `${theme.primaryColor}15`, color: theme.primaryColor }}
          >
            Tenaga Pengajar
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Guru & Pendidik Berdedikasi
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Dibimbing oleh pendidik berpengalaman, berpendidikan linier, dan tersertifikasi profesional
            yang siap membimbing potensi siswa.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.staffList.map((staff, idx) => (
            <motion.div
              key={staff.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center group"
            >
              <div className="relative mx-auto w-44 h-44 mb-4 rounded-full overflow-hidden border-4 border-slate-100 shadow-md group-hover:border-slate-300 transition-all">
                <img
                  src={
                    staff.photoUrl ||
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
                  }
                  alt={staff.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-bold text-slate-900 text-base">{staff.name}</h3>
              <p className="text-xs font-medium text-slate-500 mt-1">{staff.role}</p>
              {staff.subject && (
                <span
                  className="inline-block mt-2 text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${theme.primaryColor}10`,
                    color: theme.primaryColor,
                  }}
                >
                  {staff.subject}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { TestimoniSectionData, SchoolTheme } from "@/types/builder";
import { Quote, Star, Award, GraduationCap } from "lucide-react";

interface TestimoniBlockProps {
  section: TestimoniSectionData;
  theme: SchoolTheme;
}

export function TestimoniBlock({ section, theme }: TestimoniBlockProps) {
  const data = section.data;
  const testimonials = data.testimonials || [];

  return (
    <section id="testimoni" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 shadow-xs"
            style={{
              backgroundColor: `${theme.primaryColor}15`,
              color: theme.primaryColor,
            }}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{data.badge || "Kisah Sukses & Suara Komunitas"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {section.title || "Apa Kata Alumni & Orang Tua Siswa"}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            {data.description ||
              "Pengalaman nyata dari mereka yang telah menempuh proses pembelajaran dan bertumbuh bersama keluarga besar sekolah kami."}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={item.id || idx}
              className="p-7 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative group hover:-translate-y-1"
            >
              <div>
                {/* Star rating */}
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {Array.from({ length: item.rating || 5 }).map((_, sIdx) => (
                    <Star key={sIdx} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-700 text-sm leading-relaxed italic mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author profile */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-slate-200">
                {item.photoUrl ? (
                  <img
                    src={item.photoUrl}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover border border-slate-300"
                  />
                ) : (
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-xs"
                    style={{ backgroundColor: theme.primaryColor }}
                  >
                    {item.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{item.name}</h4>
                  <span className="text-xs text-slate-500 font-medium block">
                    {item.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

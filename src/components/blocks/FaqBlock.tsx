"use client";

import React, { useState } from "react";
import { FaqSectionData, SchoolTheme } from "@/types/builder";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

interface FaqBlockProps {
  section: FaqSectionData;
  theme: SchoolTheme;
}

export function FaqBlock({ section, theme }: FaqBlockProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const data = section.data;
  const items = data.items || [];

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 shadow-xs"
            style={{
              backgroundColor: `${theme.primaryColor}15`,
              color: theme.primaryColor,
            }}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{data.badge || "Tanya Jawab & Informasi"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {section.title || "Pertanyaan yang Sering Diajukan"}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            {data.description ||
              "Temukan jawaban seputar pendaftaran PPDB, kurikulum, fasilitas, seragam, dan tata tertib sekolah kami."}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.id || idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-white border-slate-300 shadow-md ring-1 ring-slate-200"
                    : "bg-white/80 border-slate-200 hover:border-slate-300 shadow-xs"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden"
                >
                  <span
                    className={`font-semibold text-sm sm:text-base transition-colors ${
                      isOpen ? "text-slate-900" : "text-slate-700"
                    }`}
                  >
                    {item.question}
                  </span>
                  <div
                    className={`p-1.5 rounded-lg shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-slate-100" : "text-slate-400"
                    }`}
                    style={isOpen ? { color: theme.primaryColor } : {}}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

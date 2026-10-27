"use client";

import React from "react";
import { KontakPetaSectionData, SchoolTheme } from "@/types/builder";
import { MapPin, Phone, MessageSquare, Mail, Clock } from "lucide-react";
import { generateWhatsAppLink } from "@/lib/utils";

interface KontakPetaBlockProps {
  section: KontakPetaSectionData;
  theme: SchoolTheme;
}

export function KontakPetaBlock({ section, theme }: KontakPetaBlockProps) {
  const { data } = section;

  const waLink = generateWhatsAppLink(
    data.whatsapp || "081234567890",
    "Halo Admin/Panitia PPDB, saya ingin bertanya tentang informasi sekolah dan pendaftaran."
  );

  return (
    <section id="kontak_peta" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span
            className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
            style={{ backgroundColor: `${theme.primaryColor}15`, color: theme.primaryColor }}
          >
            Sekretariat & Lokasi
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Hubungi & Kunjungi Sekolah Kami
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Kami siap melayani konsultasi pendaftaran, kunjungan kampus, maupun kemitraan edukasi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Info Card & Tombol Chat */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xs">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-4">
                Informasi Kontak
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-2xs">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Alamat Kampus
                    </span>
                    <span className="text-slate-800 font-medium leading-relaxed">
                      {data.address}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-2xs">
                    <Phone className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Telepon Kantor
                    </span>
                    <span className="text-slate-800 font-medium">{data.phone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-2xs">
                    <Mail className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Email Resmi
                    </span>
                    <span className="text-slate-800 font-medium">{data.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-2xs">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Jam Layanan
                    </span>
                    <span className="text-slate-800 font-medium">{data.operationalHours}</span>
                  </div>
                </div>
              </div>

              {/* Tombol WhatsApp Gratis */}
              <div className="pt-2">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat WhatsApp Panitia Langsung</span>
                </a>
              </div>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="lg:col-span-7 h-[420px] rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
            <iframe
              src={
                data.googleMapsEmbedUrl ||
                "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2974900139975!2d106.80004!3d-6.22444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTMnMjguMCJTIDEwNsKwNDgnMDAuMSJF!5e0!3m2!1sid!2sid!4v1600000000000!5m2!1sid!2sid"
              }
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Lokasi Sekolah"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

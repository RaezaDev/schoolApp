"use client";

import React from "react";
import { VideoProfilSectionData, SchoolTheme } from "@/types/builder";
import { Play, Video } from "lucide-react";

interface VideoProfilBlockProps {
  section: VideoProfilSectionData;
  theme: SchoolTheme;
}

export function VideoProfilBlock({ section, theme }: VideoProfilBlockProps) {
  const data = section.data;

  // Helper konversi URL YouTube biasa ke format embed
  const getEmbedUrl = (rawUrl: string) => {
    if (!rawUrl) return "";
    if (rawUrl.includes("embed/")) return rawUrl;

    // Format: https://www.youtube.com/watch?v=VIDEO_ID
    const matchWatch = rawUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/);
    if (matchWatch && matchWatch[1]) {
      return `https://www.youtube.com/embed/${matchWatch[1]}`;
    }

    return rawUrl;
  };

  const embedUrl = getEmbedUrl(data.videoUrl || "https://www.youtube.com/watch?v=dQw4w9WgXcQ");

  return (
    <section id="video_profil" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 shadow-xs"
            style={{
              backgroundColor: `${theme.primaryColor}15`,
              color: theme.primaryColor,
            }}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Dokumenter & Profil</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {section.title || "Video Profil & Suasana Belajar"}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            {data.subheadline ||
              "Saksikan sekilas lingkungan belajar, fasilitas modern, serta keceriaan aktivitas siswa dan guru di sekolah kami."}
          </p>
        </div>

        {/* Video Card Container */}
        <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-950 aspect-video relative group">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={section.title || "Video Profil Sekolah"}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-3">
              <Play className="w-12 h-12 text-slate-600" />
              <span className="text-sm">Video URL belum dikonfigurasi</span>
            </div>
          )}
        </div>

        {data.headline && (
          <div className="text-center mt-6">
            <p className="text-sm font-medium text-slate-500 italic">
              &ldquo;{data.headline}&rdquo;
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

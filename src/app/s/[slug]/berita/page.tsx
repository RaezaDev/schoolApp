"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { SchoolSite, SchoolPost } from "@/types/builder";
import { initialDemoSchool, initialDemoPosts } from "@/lib/mockData";
import { SchoolNavbar } from "@/components/school/SchoolNavbar";
import { SchoolFooter } from "@/components/school/SchoolFooter";
import { formatDate } from "@/lib/utils";
import { Newspaper, Calendar, User, ArrowLeft, ArrowRight, Search } from "lucide-react";

export default function PublicSchoolNewsPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [school, setSchool] = useState<SchoolSite>(initialDemoSchool);
  const [posts, setPosts] = useState<SchoolPost[]>(initialDemoPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const savedSchool = localStorage.getItem("school_site_data");
    if (savedSchool) {
      try {
        setSchool(JSON.parse(savedSchool));
      } catch (e) {
        console.error(e);
      }
    }

    const savedPosts = localStorage.getItem("school_posts");
    if (savedPosts) {
      try {
        setPosts(JSON.parse(savedPosts));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const filteredPosts = posts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ? true : p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <SchoolNavbar school={school} isBuilderMode={false} />

      <main className="flex-1 py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span
            className="inline-block text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border shadow-2xs"
            style={{
              backgroundColor: `${school.theme.primaryColor}10`,
              color: school.theme.primaryColor,
              borderColor: `${school.theme.primaryColor}30`,
            }}
          >
            Kabar & Pengumuman Resmi
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Berita & Informasi Terkini
          </h1>
          <p className="text-sm text-slate-600">
            Ikuti berbagai aktivitas edukatif, capaian prestasi murid, dan pengumuman resmi dari
            keluarga besar {school.name}.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari artikel berita..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white text-slate-900 focus:outline-blue-600"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            {["all", "Berita", "Pengumuman", "Prestasi", "Agenda"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {cat === "all" ? "Semua Kategori" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
            >
              {post.coverImageUrl && (
                <div className="h-48 overflow-hidden bg-slate-100 relative">
                  <img
                    src={post.coverImageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold bg-white/95 text-slate-800 shadow-xs uppercase tracking-wider backdrop-blur-xs">
                    {post.category}
                  </span>
                </div>
              )}

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatDate(new Date(post.publishedAt).toISOString())}</span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 leading-snug line-clamp-2 hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">{post.authorName}</span>
                  <div className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-700">
                    <span>Baca Lengkap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <SchoolFooter school={school} />
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { SchoolSite, SchoolPost } from "@/types/builder";
import { initialDemoSchool, initialDemoPosts } from "@/lib/mockData";
import { SchoolNavbar } from "@/components/school/SchoolNavbar";
import { SchoolFooter } from "@/components/school/SchoolFooter";
import { formatDate } from "@/lib/utils";
import { Calendar, User, ArrowLeft, Share2, Bookmark } from "lucide-react";

export default function SingleArticleReaderPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const postSlug = params?.postSlug as string;

  const [school, setSchool] = useState<SchoolSite>(initialDemoSchool);
  const [post, setPost] = useState<SchoolPost | null>(null);

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
    let allPosts = initialDemoPosts;
    if (savedPosts) {
      try {
        allPosts = [...JSON.parse(savedPosts), ...initialDemoPosts];
      } catch (e) {
        console.error(e);
      }
    }

    const found = allPosts.find((p) => p.slug === postSlug || p.id === postSlug);
    if (found) {
      setPost(found);
    } else {
      // Default to first post if slug not matched
      setPost(allPosts[0]);
    }
  }, [postSlug]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-600">
        Memuat artikel...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SchoolNavbar school={school} isBuilderMode={false} />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href={`/s/${school.slug}/berita`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Daftar Berita</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="space-y-4 mb-8">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">
            {post.category}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-xs text-slate-500 border-y border-slate-100 py-3">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-slate-400" />
              <span>Oleh: <strong className="text-slate-800">{post.authorName}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>{formatDate(new Date(post.publishedAt).toISOString())}</span>
            </div>
          </div>
        </header>

        {/* Cover Photo */}
        {post.coverImageUrl && (
          <div className="rounded-3xl overflow-hidden mb-10 shadow-lg border border-slate-200 max-h-[460px]">
            <img
              src={post.coverImageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Summary Lead */}
        {post.summary && (
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 mb-8 text-sm sm:text-base font-medium text-slate-700 leading-relaxed italic">
            "{post.summary}"
          </div>
        )}

        {/* Article Body Content */}
        <div className="prose prose-slate max-w-none text-slate-800 leading-relaxed text-base space-y-5">
          {post.content.split("\n\n").map((paragraph, idx) => (
            <p key={idx} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Footer Share */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex items-center justify-between">
          <Link
            href={`/s/${school.slug}/berita`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Lihat Artikel Lainnya</span>
          </Link>

          <Link
            href={`/s/${school.slug}/ppdb`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-md transition-all"
          >
            <span>Daftar PPDB Online</span>
          </Link>
        </div>
      </main>

      <SchoolFooter school={school} />
    </div>
  );
}

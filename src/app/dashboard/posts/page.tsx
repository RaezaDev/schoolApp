"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SchoolPost } from "@/types/builder";
import { initialDemoPosts } from "@/lib/mockData";
import { formatDate } from "@/lib/utils";
import { ImageUploader } from "@/components/ui/ImageUploader";
import {
  Newspaper,
  Plus,
  Search,
  ArrowLeft,
  Calendar,
  User,
  Trash2,
  CheckCircle2,
  Eye,
} from "lucide-react";

export default function PostsManagementDashboard() {
  const [posts, setPosts] = useState<SchoolPost[]>(initialDemoPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  // Modal Create Post
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<"Berita" | "Pengumuman" | "Prestasi" | "Agenda">("Berita");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("school_posts");
    if (saved) {
      try {
        setPosts(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();

    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    const newPost: SchoolPost = {
      id: `post_${Date.now()}`,
      schoolId: "sch_smpn1_teladan",
      title,
      slug,
      category,
      summary,
      content,
      coverImageUrl:
        coverImageUrl ||
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
      authorName: "Tim Humas",
      publishedAt: Date.now(),
      isPublished: true,
    };

    const updated = [newPost, ...posts];
    setPosts(updated);
    localStorage.setItem("school_posts", JSON.stringify(updated));

    // Reset & close
    setTitle("");
    setSummary("");
    setContent("");
    setCoverImageUrl("");
    setIsModalOpen(false);
  };

  const handleDeletePost = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus artikel ini?")) {
      const updated = posts.filter((p) => p.id !== id);
      setPosts(updated);
      localStorage.setItem("school_posts", JSON.stringify(updated));
    }
  };

  const filteredPosts = posts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = filterCategory === "all" ? true : p.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Topbar */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link
            href="/builder"
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-sm font-bold text-white">Pusat Publikasi Berita & Pengumuman</h1>
            <p className="text-[11px] text-slate-400">Portal CMS Tim Humas Sekolah</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/s/smpn1-teladan/berita"
            target="_blank"
            className="text-xs font-medium text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800 transition-colors"
          >
            Lihat Halaman Publik
          </Link>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tulis Artikel Baru</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-400 font-medium">Total Artikel</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {posts.length}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-blue-400 font-medium">Berita Kegiatan</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 mt-1">
              {posts.filter((p) => p.category === "Berita").length}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-amber-400 font-medium">Pengumuman</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 mt-1">
              {posts.filter((p) => p.category === "Pengumuman").length}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-emerald-400 font-medium">Prestasi Siswa</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1">
              {posts.filter((p) => p.category === "Prestasi").length}
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari Judul Artikel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            {["all", "Berita", "Pengumuman", "Prestasi", "Agenda"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  filterCategory === cat
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {cat === "all" ? "Semua Kategori" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              {post.coverImageUrl && (
                <div className="h-44 overflow-hidden bg-slate-800">
                  <img
                    src={post.coverImageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-950 text-blue-300 border border-blue-800 uppercase">
                      {post.category}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {formatDate(new Date(post.publishedAt).toISOString())}
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-base line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
                  <span>Oleh: {post.authorName}</span>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/s/smpn1-teladan/berita`}
                      target="_blank"
                      className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
                      title="Lihat Pratinjau"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="p-1.5 rounded-lg hover:bg-rose-950 text-slate-400 hover:text-rose-400 cursor-pointer"
                      title="Hapus Artikel"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* MODAL TULIS ARTIKEL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-blue-400" />
                <span>Tulis Artikel / Pengumuman Baru</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Judul Artikel *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pembagian Rapor Semester Ganjil Tahun Ajaran 2026"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Kategori *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-blue-500"
                >
                  <option value="Berita">Berita Sekolah</option>
                  <option value="Pengumuman">Pengumuman Resmi</option>
                  <option value="Prestasi">Prestasi Juara</option>
                  <option value="Agenda">Agenda Kegiatan</option>
                </select>
              </div>

              <div className="pt-1">
                <ImageUploader
                  label="Foto Sampul Artikel (Cloudinary Upload / Link URL)"
                  value={coverImageUrl}
                  onChange={setCoverImageUrl}
                  folder="berita_covers"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">
                  Ringkasan Singkat (Summary) *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Ringkasan 1-2 kalimat untuk kartu berita..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-blue-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">
                  Isi Konten Lengkap *
                </label>
                <textarea
                  rows={6}
                  required
                  placeholder="Tuliskan berita atau instruksi pengumuman secara lengkap di sini..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-blue-500 resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold cursor-pointer"
                >
                  Publikasikan Sekarang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SchoolStaffMember, UserRole } from "@/types/builder";
import { initialDemoStaff } from "@/lib/mockData";
import { formatDate } from "@/lib/utils";
import {
  Users,
  UserPlus,
  Shield,
  Mail,
  Phone,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Search,
  Filter,
} from "lucide-react";

export default function StaffManagementDashboard() {
  const [staffList, setStaffList] = useState<SchoolStaffMember[]>(initialDemoStaff);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState<string>("all");

  // Modal Add Staff State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newRole, setNewRole] = useState<UserRole>("panitia_ppdb");

  // Load from localStorage if any
  useEffect(() => {
    const saved = localStorage.getItem("school_staff_members");
    if (saved) {
      try {
        setStaffList(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();

    const newStaff: SchoolStaffMember = {
      id: `staff_${Date.now()}`,
      schoolId: "sch_smpn1_teladan",
      name: newName,
      email: newEmail,
      phone: newPhone || "-",
      role: newRole,
      isActive: true,
      assignedAt: Date.now(),
    };

    const updated = [newStaff, ...staffList];
    setStaffList(updated);
    localStorage.setItem("school_staff_members", JSON.stringify(updated));

    // Reset & close modal
    setNewName("");
    setNewEmail("");
    setNewPhone("");
    setNewRole("panitia_ppdb");
    setIsModalOpen(false);
  };

  const toggleStaffStatus = (id: string) => {
    const updated = staffList.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s));
    setStaffList(updated);
    localStorage.setItem("school_staff_members", JSON.stringify(updated));
  };

  const filteredStaff = staffList.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === "all" ? true : s.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case "admin_sekolah":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-950 text-purple-300 border border-purple-800">
            <Shield className="w-3 h-3 text-purple-400" />
            Admin Sekolah (TU)
          </span>
        );
      case "panitia_ppdb":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-950 text-blue-300 border border-blue-800">
            <Shield className="w-3 h-3 text-blue-400" />
            Panitia PPDB
          </span>
        );
      case "editor_humas":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
            <Shield className="w-3 h-3 text-emerald-400" />
            Editor Humas
          </span>
        );
      case "kepala_sekolah":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
            <Shield className="w-3 h-3 text-amber-400" />
            Kepala Sekolah
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-800 text-slate-300">
            Staf
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link
            href="/builder"
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-sm font-bold text-white">Manajemen Akun & Hak Akses Staf</h1>
            <p className="text-[11px] text-slate-400">
              Role-Based Access Control (RBAC) Tim Sekolah
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Tambah Anggota Staf</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-6">
        {/* Quick Role Info */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-400 font-medium">Total Anggota</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {staffList.length}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-blue-400 font-medium">Panitia PPDB</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 mt-1">
              {staffList.filter((s) => s.role === "panitia_ppdb").length}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-emerald-400 font-medium">Editor Humas</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1">
              {staffList.filter((s) => s.role === "editor_humas").length}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-purple-400 font-medium">Admin TU</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 mt-1">
              {staffList.filter((s) => s.role === "admin_sekolah").length}
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari Nama atau Email Staf..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            {[
              { id: "all", label: "Semua Role" },
              { id: "admin_sekolah", label: "Admin TU" },
              { id: "panitia_ppdb", label: "Panitia PPDB" },
              { id: "editor_humas", label: "Editor Humas" },
              { id: "kepala_sekolah", label: "Kepsek" },
            ].map((r) => (
              <button
                key={r.id}
                onClick={() => setFilterRole(r.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  filterRole === r.id
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Staff Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider border-b border-slate-800 text-[11px]">
                <tr>
                  <th className="px-5 py-3.5">Nama Staf</th>
                  <th className="px-5 py-3.5">Email Akun</th>
                  <th className="px-5 py-3.5">Peran / Role</th>
                  <th className="px-5 py-3.5">Kontak</th>
                  <th className="px-5 py-3.5">Status Akun</th>
                  <th className="px-5 py-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {filteredStaff.map((staff) => (
                  <tr key={staff.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-4 font-semibold text-white">{staff.name}</td>
                    <td className="px-5 py-4 font-mono text-slate-400">{staff.email}</td>
                    <td className="px-5 py-4">{getRoleBadge(staff.role)}</td>
                    <td className="px-5 py-4 text-slate-400">{staff.phone || "-"}</td>
                    <td className="px-5 py-4">
                      {staff.isActive ? (
                        <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Aktif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs text-rose-400 font-medium">
                          <XCircle className="w-3.5 h-3.5" />
                          Nonaktif
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => toggleStaffStatus(staff.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                          staff.isActive
                            ? "bg-slate-800 hover:bg-rose-950 hover:text-rose-300 text-slate-400"
                            : "bg-emerald-950 text-emerald-400 hover:bg-emerald-900"
                        }`}
                      >
                        {staff.isActive ? "Nonaktifkan" : "Aktifkan"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* MODAL TAMBAH STAF */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-blue-400" />
                <span>Tambah Anggota Staf Baru</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddStaff} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Nama Lengkap & Gelar *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Dra. Nurhayati, M.Pd."
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Email Sekolah *</label>
                <input
                  type="email"
                  required
                  placeholder="nurhayati@smpn1teladan.sch.id"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Nomor WhatsApp</label>
                <input
                  type="tel"
                  placeholder="0812xxxxxxxx"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Pilih Peran (Role) *</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as UserRole)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-blue-500"
                >
                  <option value="panitia_ppdb">Panitia PPDB (Verifikasi Pendaftar & Nilai)</option>
                  <option value="editor_humas">Editor Humas (Publikasi Berita & Galeri)</option>
                  <option value="kepala_sekolah">Kepala Sekolah (Executive Read-Only)</option>
                  <option value="admin_sekolah">Admin Sekolah / Operator TU (Full Access)</option>
                </select>
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
                  Simpan & Buat Akun
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

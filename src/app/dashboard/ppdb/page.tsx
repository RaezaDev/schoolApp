"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PPDBApplicant, PPDBStatus } from "@/types/builder";
import { initialDemoApplicants } from "@/lib/mockData";
import { generateWhatsAppLink, formatDate } from "@/lib/utils";
import * as XLSX from "xlsx";
import {
  FileSpreadsheet,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  MessageSquare,
  Eye,
  ArrowLeft,
  Users,
  Download,
  Check,
} from "lucide-react";

export default function PanitiaPPDBDashboard() {
  const [applicants, setApplicants] = useState<PPDBApplicant[]>(initialDemoApplicants);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedApplicant, setSelectedApplicant] = useState<PPDBApplicant | null>(null);
  const [adminNotesInput, setAdminNotesInput] = useState("");

  // Load applicants from localStorage + merge with demo
  useEffect(() => {
    const saved = localStorage.getItem("school_ppdb_applicants");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setApplicants([...parsed, ...initialDemoApplicants]);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const updateStatus = (id: string, newStatus: PPDBStatus) => {
    const updated = applicants.map((a) => {
      if (a.id === id) {
        return {
          ...a,
          status: newStatus,
          adminNotes: adminNotesInput || a.adminNotes,
          updatedAt: Date.now(),
        };
      }
      return a;
    });

    setApplicants(updated);
    localStorage.setItem("school_ppdb_applicants", JSON.stringify(updated));

    if (selectedApplicant && selectedApplicant.id === id) {
      setSelectedApplicant({
        ...selectedApplicant,
        status: newStatus,
        adminNotes: adminNotesInput || selectedApplicant.adminNotes,
      });
    }
    setAdminNotesInput("");
  };

  // Export to Excel function
  const handleExportExcel = () => {
    const exportData = applicants.map((a, idx) => ({
      No: idx + 1,
      "No. Registrasi": a.registrationNumber,
      "Nama Siswa": a.student.fullName,
      NISN: a.student.nisn,
      NIK: a.student.nik,
      Gender: a.student.gender === "L" ? "Laki-laki" : "Perempuan",
      "Asal Sekolah": a.student.previousSchool,
      Jalur: a.trackId.toUpperCase(),
      Status: a.status.toUpperCase(),
      "Nama Wali": a.parent.fatherName || a.parent.motherName,
      "No. WhatsApp": a.parent.whatsappNumber,
      Catatan: a.adminNotes || "-",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Pendaftar PPDB");
    XLSX.writeFile(workbook, `Rekap_PPDB_2026_${Date.now()}.xlsx`);
  };

  // Filtered applicants
  const filteredApplicants = applicants.filter((a) => {
    const matchesSearch =
      a.student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.student.nisn.includes(searchQuery);

    const matchesFilter = filterStatus === "all" ? true : a.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const countPending = applicants.filter((a) => a.status === "pending").length;
  const countVerified = applicants.filter((a) => a.status === "verified").length;
  const countAccepted = applicants.filter((a) => a.status === "accepted").length;
  const countRevision = applicants.filter((a) => a.status === "need_revision").length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Dashboard Topbar */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-sm font-bold text-white">Dashboard Panitia PPDB 2026/2027</h1>
            <p className="text-[11px] text-slate-400">Verifikasi & Seleksi Penerimaan Siswa Baru</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/builder"
            className="text-xs font-medium text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800 transition-colors"
          >
            Studio Builder
          </Link>
          <button
            onClick={handleExportExcel}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Excel (.xlsx)</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-400 font-medium">Total Pendaftar</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {applicants.length}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-amber-400 font-medium">Perlu Verifikasi</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 mt-1">
              {countPending}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-blue-400 font-medium">Berkas Lengkap</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 mt-1">
              {countVerified}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-emerald-400 font-medium">Lulus / Diterima</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1">
              {countAccepted}
            </div>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari Nama / No. Reg / NISN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            {["all", "pending", "verified", "accepted", "need_revision"].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  filterStatus === st
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {st === "all" ? "Semua Status" : st}
              </button>
            ))}
          </div>
        </div>

        {/* Applicants Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider border-b border-slate-800 text-[11px]">
                <tr>
                  <th className="px-5 py-3.5">No. Registrasi</th>
                  <th className="px-5 py-3.5">Nama Calon Siswa</th>
                  <th className="px-5 py-3.5">Jalur</th>
                  <th className="px-5 py-3.5">Asal Sekolah</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">WhatsApp Wali</th>
                  <th className="px-5 py-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {filteredApplicants.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-4 font-mono font-bold text-blue-400">
                      {app.registrationNumber}
                    </td>
                    <td className="px-5 py-4 font-semibold text-white">
                      {app.student.fullName}
                      <span className="block text-[11px] text-slate-500 font-mono">
                        NISN: {app.student.nisn}
                      </span>
                    </td>
                    <td className="px-5 py-4 uppercase font-medium">{app.trackId}</td>
                    <td className="px-5 py-4 text-slate-400">{app.student.previousSchool}</td>
                    <td className="px-5 py-4">
                      {app.status === "accepted" && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                          Diterima
                        </span>
                      )}
                      {app.status === "verified" && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-950 text-blue-400 border border-blue-800">
                          Terverifikasi
                        </span>
                      )}
                      {app.status === "pending" && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-950 text-amber-400 border border-amber-800">
                          Pending
                        </span>
                      )}
                      {app.status === "need_revision" && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-950 text-rose-400 border border-rose-800">
                          Revisi
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <a
                        href={generateWhatsAppLink(
                          app.parent.whatsappNumber,
                          `Halo Bpk/Ibu wali dari ${app.student.fullName} (No. Reg: ${app.registrationNumber}), kami dari Panitia PPDB ingin mengonfirmasikan status berkas Anda.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-mono"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{app.parent.whatsappNumber}</span>
                      </a>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => setSelectedApplicant(app)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-colors cursor-pointer"
                      >
                        Verifikasi
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODAL / DRAWER DETAIL VERIFIKASI */}
        {selectedApplicant && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-xs text-slate-400">Detail Pendaftar</span>
                  <h3 className="text-lg font-bold text-white">
                    {selectedApplicant.student.fullName}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedApplicant(null)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-500">Nomor Registrasi:</span>
                  <p className="font-mono font-bold text-blue-400">
                    {selectedApplicant.registrationNumber}
                  </p>
                </div>
                <div>
                  <span className="text-slate-500">NISN / NIK:</span>
                  <p className="font-mono text-slate-200">
                    {selectedApplicant.student.nisn} / {selectedApplicant.student.nik}
                  </p>
                </div>
                <div>
                  <span className="text-slate-500">TTL / Jenis Kelamin:</span>
                  <p className="text-slate-200">
                    {selectedApplicant.student.birthPlace},{" "}
                    {formatDate(selectedApplicant.student.birthDate)} (
                    {selectedApplicant.student.gender === "L" ? "Laki-laki" : "Perempuan"})
                  </p>
                </div>
                <div>
                  <span className="text-slate-500">Asal Sekolah:</span>
                  <p className="text-slate-200">{selectedApplicant.student.previousSchool}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-500">Alamat Tempat Tinggal:</span>
                  <p className="text-slate-200">{selectedApplicant.student.address}</p>
                </div>
              </div>

              {/* Input Catatan Panitia */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-400">
                  Catatan Panitia / Alasan Perbaikan Berkas:
                </label>
                <input
                  type="text"
                  placeholder="Misal: Foto KK buram / Nilai terverifikasi valid"
                  value={adminNotesInput}
                  onChange={(e) => setAdminNotesInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                />
              </div>

              {/* Status Update Buttons */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="block text-xs font-semibold text-slate-400">
                  Ubah Status Verifikasi:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => updateStatus(selectedApplicant.id, "verified")}
                    className="py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Set Terverifikasi
                  </button>
                  <button
                    onClick={() => updateStatus(selectedApplicant.id, "accepted")}
                    className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Set Lulus (Diterima)
                  </button>
                  <button
                    onClick={() => updateStatus(selectedApplicant.id, "need_revision")}
                    className="py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Minta Revisi
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

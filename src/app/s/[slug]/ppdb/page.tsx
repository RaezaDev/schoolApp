"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { SchoolSite, PPDBApplicant, PPDBStatus } from "@/types/builder";
import { initialDemoSchool, initialDemoApplicants } from "@/lib/mockData";
import { SchoolNavbar } from "@/components/school/SchoolNavbar";
import { SchoolFooter } from "@/components/school/SchoolFooter";
import { maskSensitive, generateWhatsAppLink, formatDate } from "@/lib/utils";
import {
  FileText,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Printer,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  Upload,
  User,
  Users,
  Building,
  GraduationCap,
} from "lucide-react";

export default function PublicPPDBPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [school, setSchool] = useState<SchoolSite>(initialDemoSchool);

  // Tab State: "daftar" atau "cek_status"
  const [activeTab, setActiveTab] = useState<"daftar" | "cek_status">("daftar");

  // Multi-step Form State
  const [step, setStep] = useState(1);
  const [selectedTrack, setSelectedTrack] = useState("zonasi");

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [nisn, setNisn] = useState("");
  const [nik, setNik] = useState("");
  const [gender, setGender] = useState<"L" | "P">("L");
  const [birthPlace, setBirthPlace] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [previousSchool, setPreviousSchool] = useState("");
  const [address, setAddress] = useState("");

  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [parentJob, setParentJob] = useState("");

  // Submitted Success Result
  const [submittedApplicant, setSubmittedApplicant] = useState<PPDBApplicant | null>(null);

  // Cek Status State
  const [searchRegNumber, setSearchRegNumber] = useState("");
  const [searchBirthDate, setSearchBirthDate] = useState("");
  const [searchResult, setSearchResult] = useState<PPDBApplicant | null>(null);
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("school_site_data");
    if (saved) {
      try {
        setSchool(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate unique registration number
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const regNumber = `REG-2026-SMP1-${randomDigits}`;

    const newApplicant: PPDBApplicant = {
      id: `app_${Date.now()}`,
      schoolId: school.id,
      registrationNumber: regNumber,
      trackId: selectedTrack,
      status: "pending",
      student: {
        fullName,
        nisn,
        nik,
        gender,
        birthPlace,
        birthDate,
        previousSchool,
        address,
      },
      parent: {
        fatherName,
        motherName,
        whatsappNumber,
        parentJob,
      },
      documents: {
        photoUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=300&auto=format&fit=crop&q=80",
      },
      submittedAt: Date.now(),
      updatedAt: Date.now(),
    };

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem("school_ppdb_applicants") || "[]");
    const updated = [newApplicant, ...existing];
    localStorage.setItem("school_ppdb_applicants", JSON.stringify(updated));

    setSubmittedApplicant(newApplicant);
  };

  const handleSearchStatus = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError("");
    setSearchResult(null);

    // Ambil dari localStorage + fallback demo
    const local = JSON.parse(localStorage.getItem("school_ppdb_applicants") || "[]");
    const allApplicants = [...local, ...initialDemoApplicants];

    const found = allApplicants.find(
      (a) =>
        a.registrationNumber.trim().toUpperCase() === searchRegNumber.trim().toUpperCase() &&
        a.student.birthDate === searchBirthDate
    );

    if (found) {
      setSearchResult(found);
    } else {
      setSearchError(
        "Data pendaftaran tidak ditemukan. Pastikan Nomor Registrasi dan Tanggal Lahir sesuai."
      );
    }
  };

  const getStatusBadge = (status: PPDBStatus) => {
    switch (status) {
      case "accepted":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            LULUS / DITERIMA
          </span>
        );
      case "verified":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            BERKAS TERVERIFIKASI
          </span>
        );
      case "need_revision":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            PERLU PERBAIKAN BERKAS
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
            <XCircle className="w-4 h-4 text-rose-600" />
            TIDAK LOLOS
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-300">
            <Clock className="w-4 h-4 text-slate-500" />
            MENUNGGU VERIFIKASI
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <SchoolNavbar school={school} isBuilderMode={false} />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        {/* Banner Header */}
        <div className="text-center mb-10 space-y-3">
          <span
            className="inline-block text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border shadow-2xs"
            style={{
              backgroundColor: `${school.theme.primaryColor}10`,
              color: school.theme.primaryColor,
              borderColor: `${school.theme.primaryColor}30`,
            }}
          >
            Penerimaan Peserta Didik Baru (PPDB) Online
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tahun Ajaran {school.ppdbConfig.academicYear}
          </h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Selamat datang di portal pendaftaran calon siswa baru {school.name}. Silakan isi formulir
            secara lengkap dan teliti.
          </p>

          {/* Toggle Tab: Formulir vs Cek Status */}
          <div className="inline-flex p-1 rounded-xl bg-slate-200 border border-slate-300 mt-4">
            <button
              onClick={() => {
                setActiveTab("daftar");
                setSubmittedApplicant(null);
              }}
              className={`px-6 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "daftar"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Formulir Pendaftaran
            </button>
            <button
              onClick={() => setActiveTab("cek_status")}
              className={`px-6 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "cek_status"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Cek Status Seleksi
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: FORMULIR PENDAFTARAN                               */}
        {/* ========================================================= */}
        {activeTab === "daftar" && (
          <div>
            {/* JIKA BERHASIL SUBMIT: TAMPILKAN KARTU BUKTI DAFTAR */}
            {submittedApplicant ? (
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl max-w-2xl mx-auto text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900">
                    Pendaftaran Berhasil Dikirim!
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Simpan dan catat Nomor Registrasi Anda di bawah ini untuk mengecek status seleksi.
                  </p>
                </div>

                {/* Kartu Registrasi */}
                <div
                  id="print-card"
                  className="p-6 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 text-left space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div>
                      <span className="text-xs font-semibold text-slate-500 uppercase">
                        Nomor Registrasi
                      </span>
                      <div
                        className="text-xl sm:text-2xl font-extrabold font-mono tracking-wider"
                        style={{ color: school.theme.primaryColor }}
                      >
                        {submittedApplicant.registrationNumber}
                      </div>
                    </div>
                    {getStatusBadge(submittedApplicant.status)}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400">Nama Calon Siswa:</span>
                      <p className="font-bold text-slate-800 text-sm">
                        {submittedApplicant.student.fullName}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-400">NISN / Asal Sekolah:</span>
                      <p className="font-bold text-slate-800 text-sm">
                        {submittedApplicant.student.nisn} ({submittedApplicant.student.previousSchool})
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-400">Jalur Masuk:</span>
                      <p className="font-semibold text-slate-800 uppercase">
                        {submittedApplicant.trackId}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-400">Tanggal Pengajuan:</span>
                      <p className="font-semibold text-slate-800">
                        {formatDate(submittedApplicant.student.birthDate)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tombol Aksi: Cetak & WhatsApp */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => window.print()}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Cetak Kartu Bukti (PDF)</span>
                  </button>

                  <a
                    href={generateWhatsAppLink(
                      school.ppdbConfig.contactWhatsApp || "081234567890",
                      `Halo Panitia PPDB ${school.name}, saya telah mendaftar ananda ${submittedApplicant.student.fullName} dengan No. Registrasi: ${submittedApplicant.registrationNumber}. Mohon informasinya.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Konfirmasi ke WhatsApp Panitia</span>
                  </a>
                </div>
              </div>
            ) : (
              /* MULTI-STEP FORM PENDAFTARAN */
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md">
                {/* Step Indicators */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 text-xs font-semibold">
                  <div
                    className={`flex items-center gap-2 ${
                      step >= 1 ? "text-blue-600" : "text-slate-400"
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full flex items-center justify-center bg-blue-100 text-blue-700 text-xs">
                      1
                    </span>
                    <span className="hidden sm:inline">Pilih Jalur</span>
                  </div>
                  <div
                    className={`flex items-center gap-2 ${
                      step >= 2 ? "text-blue-600" : "text-slate-400"
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full flex items-center justify-center bg-blue-100 text-blue-700 text-xs">
                      2
                    </span>
                    <span className="hidden sm:inline">Data Siswa</span>
                  </div>
                  <div
                    className={`flex items-center gap-2 ${
                      step >= 3 ? "text-blue-600" : "text-slate-400"
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full flex items-center justify-center bg-blue-100 text-blue-700 text-xs">
                      3
                    </span>
                    <span className="hidden sm:inline">Data Orang Tua</span>
                  </div>
                  <div
                    className={`flex items-center gap-2 ${
                      step >= 4 ? "text-blue-600" : "text-slate-400"
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full flex items-center justify-center bg-blue-100 text-blue-700 text-xs">
                      4
                    </span>
                    <span className="hidden sm:inline">Konfirmasi</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* STEP 1: PILIH JALUR */}
                  {step === 1 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-slate-900 mb-2">
                        Pilih Jalur Pendaftaran
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {school.ppdbConfig.tracks.map((track) => (
                          <div
                            key={track.id}
                            onClick={() => setSelectedTrack(track.id)}
                            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                              selectedTrack === track.id
                                ? "border-blue-600 bg-blue-50/50 shadow-xs"
                                : "border-slate-200 hover:border-slate-300 bg-white"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-sm text-slate-900">
                                {track.name}
                              </span>
                              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                                Kuota: {track.quota}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed">
                              {track.description}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="pt-6 flex justify-end">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-all"
                        >
                          <span>Lanjut: Data Siswa</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: DATA SISWA */}
                  {step === 2 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-slate-900 mb-2">
                        Biodata Calon Siswa
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Nama Lengkap Siswa *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Sesuai akta kelahiran"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-blue-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            NISN (10 Digit) *
                          </label>
                          <input
                            type="text"
                            required
                            maxLength={10}
                            placeholder="Contoh: 0081234567"
                            value={nisn}
                            onChange={(e) => setNisn(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-blue-600 font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            NIK (16 Digit) *
                          </label>
                          <input
                            type="text"
                            required
                            maxLength={16}
                            placeholder="Sesuai Kartu Keluarga"
                            value={nik}
                            onChange={(e) => setNik(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-blue-600 font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Tempat Lahir *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Kota/Kabupaten"
                            value={birthPlace}
                            onChange={(e) => setBirthPlace(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-blue-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Tanggal Lahir *
                          </label>
                          <input
                            type="date"
                            required
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-blue-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Jenis Kelamin *
                          </label>
                          <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value as "L" | "P")}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-blue-600 bg-white"
                          >
                            <option value="L">Laki-Laki</option>
                            <option value="P">Perempuan</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Asal Sekolah Sebelumnya *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Contoh: SD Negeri 01 Pagi"
                            value={previousSchool}
                            onChange={(e) => setPreviousSchool(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-blue-600"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Alamat Tempat Tinggal Lengkap *
                          </label>
                          <textarea
                            rows={2}
                            required
                            placeholder="Jalan, RT/RW, Kelurahan, Kecamatan, Kota"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-blue-600 resize-none"
                          />
                        </div>
                      </div>

                      <div className="pt-6 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-medium text-sm hover:bg-slate-50 transition-all"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Kembali</span>
                        </button>

                        <button
                          type="button"
                          disabled={!fullName || !nisn || !birthDate}
                          onClick={() => setStep(3)}
                          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 disabled:opacity-50 text-white font-semibold text-sm hover:bg-blue-700 transition-all"
                        >
                          <span>Lanjut: Data Orang Tua</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: DATA ORTU */}
                  {step === 3 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-slate-900 mb-2">
                        Data Orang Tua / Wali
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Nama Ayah Kandung *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Nama lengkap ayah"
                            value={fatherName}
                            onChange={(e) => setFatherName(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-blue-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Nama Ibu Kandung *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Nama lengkap ibu"
                            value={motherName}
                            onChange={(e) => setMotherName(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-blue-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Nomor WhatsApp Aktif *
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="Contoh: 081234567890"
                            value={whatsappNumber}
                            onChange={(e) => setWhatsappNumber(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-blue-600 font-mono"
                          />
                          <span className="block text-[11px] text-slate-500 mt-1">
                            Notifikasi dan panggilan verifikasi akan dikirim ke nomor ini.
                          </span>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Pekerjaan Orang Tua / Wali
                          </label>
                          <input
                            type="text"
                            placeholder="Contoh: Karyawan Swasta / Wiraswasta"
                            value={parentJob}
                            onChange={(e) => setParentJob(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-blue-600"
                          />
                        </div>
                      </div>

                      <div className="pt-6 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-medium text-sm hover:bg-slate-50 transition-all"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Kembali</span>
                        </button>

                        <button
                          type="button"
                          disabled={!fatherName || !whatsappNumber}
                          onClick={() => setStep(4)}
                          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 disabled:opacity-50 text-white font-semibold text-sm hover:bg-blue-700 transition-all"
                        >
                          <span>Lanjut: Konfirmasi</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: REVIEW & SUBMIT */}
                  {step === 4 && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-bold text-slate-900">
                        Konfirmasi & Pernyataan Kebenaran Data
                      </h3>

                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm space-y-3">
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                          <span className="text-slate-500">Jalur Pilihan:</span>
                          <span className="font-bold text-slate-900 uppercase">
                            {selectedTrack}
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                          <span className="text-slate-500">Nama Siswa:</span>
                          <span className="font-bold text-slate-900">{fullName}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                          <span className="text-slate-500">NISN / NIK:</span>
                          <span className="font-mono text-slate-900">
                            {nisn} / {nik}
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                          <span className="text-slate-500">Wali & WhatsApp:</span>
                          <span className="font-medium text-slate-900">
                            {fatherName} ({whatsappNumber})
                          </span>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                        <span>
                          Saya menyatakan bahwa data yang diisikan adalah benar dan dapat
                          dipertanggungjawabkan sesuai dokumen resmi yang berlaku.
                        </span>
                      </div>

                      <div className="pt-4 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setStep(3)}
                          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-medium text-sm hover:bg-slate-50 transition-all"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Periksa Ulang</span>
                        </button>

                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Kirim Pendaftaran Sekarang</span>
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: CEK STATUS PENDAFTARAN MANDIRI                     */}
        {/* ========================================================= */}
        {activeTab === "cek_status" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Cek Status Kelulusan PPDB
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Masukkan Nomor Registrasi dan Tanggal Lahir calon siswa yang tertera pada Kartu Bukti Pendaftaran.
              </p>

              <form onSubmit={handleSearchStatus} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nomor Registrasi *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: REG-2026-SMP1-001"
                    value={searchRegNumber}
                    onChange={(e) => setSearchRegNumber(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-blue-600 font-mono uppercase"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tanggal Lahir Calon Siswa *
                  </label>
                  <input
                    type="date"
                    required
                    value={searchBirthDate}
                    onChange={(e) => setSearchBirthDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-blue-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Cari Status Pendaftaran</span>
                </button>
              </form>
            </div>

            {/* Error Message */}
            {searchError && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{searchError}</span>
              </div>
            )}

            {/* HASIL PENCARIAN STATUS */}
            {searchResult && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs text-slate-400 font-medium">Nomor Registrasi</span>
                    <h4 className="text-xl font-bold font-mono text-slate-900">
                      {searchResult.registrationNumber}
                    </h4>
                  </div>
                  <div>{getStatusBadge(searchResult.status)}</div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-400 block">Nama Calon Siswa:</span>
                    <span className="font-bold text-slate-900">{searchResult.student.fullName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Jalur Masuk:</span>
                    <span className="font-semibold text-slate-800 uppercase">{searchResult.trackId}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">NIK (Disamarkan):</span>
                    <span className="font-mono text-slate-700">
                      {maskSensitive(searchResult.student.nik, 4, 3)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">WhatsApp Wali:</span>
                    <span className="font-mono text-slate-700">
                      {maskSensitive(searchResult.parent.whatsappNumber, 4, 3)}
                    </span>
                  </div>
                </div>

                {searchResult.adminNotes && (
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                    <span className="font-bold block mb-1">Catatan Panitia PPDB:</span>
                    <p>{searchResult.adminNotes}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      <SchoolFooter school={school} />
    </div>
  );
}

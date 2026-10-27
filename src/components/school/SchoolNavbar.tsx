"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SchoolSite } from "@/types/builder";
import { Menu, X, GraduationCap, ArrowRight } from "lucide-react";

interface SchoolNavbarProps {
  school: SchoolSite;
  isBuilderMode?: boolean;
}

export function SchoolNavbar({ school, isBuilderMode = false }: SchoolNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = school.theme;
  const header = school.headerConfig || {};

  const showLogo = header.showLogo !== false;
  const showSchoolName = header.showSchoolName !== false;
  const showNpsnBadge = header.showNpsnBadge !== false;
  const isSticky = header.isSticky !== false;
  const showPpdb = header.showPpdbButton !== false && school.ppdbConfig.isOpen;
  const ppdbText = header.ppdbButtonText || `PPDB ${school.ppdbConfig.academicYear}`;

  const defaultNavLinks = [
    { label: "Beranda", href: isBuilderMode ? "#" : `/s/${school.slug}#hero` },
    { label: "Profil & Visi", href: isBuilderMode ? "#" : `/s/${school.slug}#sambutan_kepsek` },
    { label: "Fasilitas", href: isBuilderMode ? "#" : `/s/${school.slug}#fasilitas` },
    { label: "Guru & Staf", href: isBuilderMode ? "#" : `/s/${school.slug}#guru_staf` },
    { label: "Prestasi", href: isBuilderMode ? "#" : `/s/${school.slug}#prestasi` },
    { label: "Galeri", href: isBuilderMode ? "#" : `/s/${school.slug}#galeri` },
    { label: "Berita", href: isBuilderMode ? "#" : `/s/${school.slug}/berita` },
    { label: "Kontak", href: isBuilderMode ? "#" : `/s/${school.slug}#kontak_peta` },
  ];

  const navLinks = header.navLinks && header.navLinks.length > 0 ? header.navLinks : defaultNavLinks;

  return (
    <header
      className={`${
        isSticky ? "sticky top-0 z-40" : "relative z-30"
      } bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & School Name */}
          <div className="flex items-center gap-3">
            {showLogo && (
              school.logoUrl ? (
                <img
                  src={school.logoUrl}
                  alt={school.name}
                  className="w-12 h-12 rounded-full object-cover border border-slate-200 shadow-xs"
                />
              ) : (
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-xs shrink-0"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  <GraduationCap className="w-6 h-6" />
                </div>
              )
            )}

            {showSchoolName && (
              <div>
                <span className="block font-bold text-lg text-slate-900 leading-tight">
                  {school.name}
                </span>
                {showNpsnBadge && (
                  <span className="block text-xs text-slate-500 font-medium">
                    NPSN: {school.npsn} • Terakreditasi A
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={isBuilderMode ? undefined : link.href}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* PPDB Button */}
          <div className="hidden sm:flex items-center gap-3">
            {showPpdb && (
              <Link
                href={isBuilderMode ? "#" : `/s/${school.slug}/ppdb`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm text-white shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
                style={{ backgroundColor: theme.secondaryColor }}
              >
                <span>{ppdbText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100"
            >
              {link.label}
            </a>
          ))}
          {showPpdb && (
            <div className="pt-4">
              <Link
                href={`/s/${school.slug}/ppdb`}
                className="block text-center w-full py-2.5 rounded-lg text-sm font-semibold text-white shadow-xs"
                style={{ backgroundColor: theme.secondaryColor }}
              >
                {ppdbText} - Daftar Sekarang
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

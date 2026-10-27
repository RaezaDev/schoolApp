import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SchoolBuilder - Platform Web Profil & PPDB Sekolah Modern",
  description: "Bangun website profil sekolah profesional dan sistem PPDB online dalam hitungan menit tanpa coding.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased min-h-screen flex flex-col bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}

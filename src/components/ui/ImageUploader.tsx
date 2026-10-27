"use client";

import React, { useState, useRef } from "react";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { Upload, Link as LinkIcon, Image as ImageIcon, Loader2, CheckCircle2 } from "lucide-react";

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (newUrl: string) => void;
  folder?: string;
  placeholder?: string;
}

export function ImageUploader({
  label,
  value,
  onChange,
  folder = "school_assets",
  placeholder = "https://images.unsplash.com/...",
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadSuccess(false);

    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

      // Jika kredensial Cloudinary sudah diset (bukan demo/dummy), upload ke Cloudinary
      if (cloudName && cloudName !== "demo_cloud" && preset) {
        const url = await uploadToCloudinary(file, folder);
        onChange(url);
      } else {
        // Fallback: baca sebagai Data URL lokal agar langsung tampil di canvas preview
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as string;
          onChange(result);
        };
        reader.readAsDataURL(file);
      }

      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (error) {
      console.error("Gagal upload gambar:", error);
      alert("Gagal mengunggah gambar. Mengalihkan ke mode input URL.");
      setMode("url");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-[11px] font-medium text-slate-400">{label}</label>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer ${
              mode === "upload" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer ${
              mode === "url" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Link URL
          </button>
        </div>
      </div>

      {mode === "upload" ? (
        <div className="flex items-center gap-3">
          {/* Thumbnail Preview */}
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shrink-0 flex items-center justify-center">
            {value ? (
              <img src={value} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <ImageIcon className="w-5 h-5 text-slate-600" />
            )}
          </div>

          <div className="flex-1">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/jpeg,image/png,image/webp,image/jpg"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-400" />
                  <span>Mengunggah ke Cloudinary...</span>
                </>
              ) : uploadSuccess ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Foto Terpasang!</span>
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5 text-blue-400" />
                  <span>Pilih Foto dari Perangkat</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* Mode URL Manual */
        <div className="flex items-center gap-2">
          <input
            type="url"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono"
          />
        </div>
      )}
    </div>
  );
}

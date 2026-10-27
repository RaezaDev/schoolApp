/**
 * Helper optimasi URL gambar Cloudinary (Zero-Budget Strategy)
 * Menggunakan format otomatis (f_auto) dan kompresi kualitas cerdas (q_auto)
 */
export function getOptimizedCloudinaryUrl(
  url: string,
  width: number = 800,
  height?: number
): string {
  if (!url || !url.includes("cloudinary.com")) return url;

  const parts = url.split("/upload/");
  if (parts.length !== 2) return url;

  const cropTransform = height
    ? `w_${width},h_${height},c_fill,g_auto,f_auto,q_auto`
    : `w_${width},c_limit,f_auto,q_auto`;

  return `${parts[0]}/upload/${cropTransform}/${parts[1]}`;
}

/**
 * Upload langsung ke Cloudinary dari browser (Direct Client Upload)
 * Menghemat 100% beban serverless Next.js & kuota Spark Plan
 */
export async function uploadToCloudinary(file: File, folder?: string): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "zsfbsmfu";
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "schoolApp";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  if (folder) {
    formData.append("folder", folder);
  }

  let res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  });

  // Fallback jika unsigned preset menolak parameter folder khusus
  if (!res.ok && folder) {
    const fallbackFormData = new FormData();
    fallbackFormData.append("file", file);
    fallbackFormData.append("upload_preset", uploadPreset);
    res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: fallbackFormData,
    });
  }

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData?.error?.message || "Gagal mengunggah gambar ke Cloudinary");
  }

  const data = await res.json();
  return data.secure_url;
}

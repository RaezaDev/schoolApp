import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateTime(timestamp: number): string {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(timestamp));
}

export function formatDate(dateString: string): string {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function maskSensitive(text: string, visibleStart = 4, visibleEnd = 4): string {
  if (!text || text.length <= visibleStart + visibleEnd) return "****";
  const start = text.slice(0, visibleStart);
  const end = text.slice(-visibleEnd);
  const masked = "*".repeat(Math.max(4, text.length - visibleStart - visibleEnd));
  return `${start}${masked}${end}`;
}

export function generateWhatsAppLink(phone: string, message: string): string {
  // Format nomor HP ke 62xxxx
  let cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("0")) {
    cleaned = "62" + cleaned.slice(1);
  }
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${cleaned}?text=${encoded}`;
}

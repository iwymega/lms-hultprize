import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
});

/**
 * Memotong teks dan menambahkan ellipsis jika melebihi panjang maksimal.
 *
 * @param text - Teks asli
 * @param maxLength - Panjang maksimal sebelum dipotong
 * @param suffix - (Opsional) Suffix setelah dipotong, default: "..."
 * @returns Teks yang sudah dipotong jika perlu
 */
export function truncateText(text: string, maxLength: number, suffix = "..."): string {
  if (typeof text !== "string") return "";
  if (text.length <= maxLength) return text;

  return text.slice(0, maxLength - suffix.length) + suffix;
}

export function getInitials(name: string): string {
  if (!name) return "";

  const words = name.trim().split(/\s+/);
  const initials = words
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

  return initials;
}

export function formatDateToLong(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

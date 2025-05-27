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

const tailwindBgColorClasses = [
  'bg-red-500', 'bg-orange-500', 'bg-amber-500', 'bg-yellow-500', 'bg-lime-500',
  'bg-green-500', 'bg-emerald-500', 'bg-teal-500', 'bg-cyan-500', 'bg-sky-500',
  'bg-blue-500', 'bg-indigo-500', 'bg-violet-500', 'bg-purple-500',
  'bg-fuchsia-500', 'bg-pink-500', 'bg-rose-500'
];

// Fungsi untuk menentukan text color berdasarkan shade (angka di class)
function getTextColorFromBgClass(bgClass: string): string {
  // bgClass contoh: 'bg-red-500'
  // ambil angka shade-nya (misal '500')
  const shadeMatch = bgClass.match(/-(\d{3})$/);
  const shade = shadeMatch ? parseInt(shadeMatch[1], 10) : 500;

  // Anggap shade >= 600 itu gelap → text putih, lainnya → text hitam
  return shade >= 600 ? 'text-white' : 'text-black';
}

export function getRandomBgAndTextColor(): { bgColor: string; textColor: string } {
  const bgColor = tailwindBgColorClasses[
    Math.floor(Math.random() * tailwindBgColorClasses.length)
  ];
  const textColor = getTextColorFromBgClass(bgColor);
  return { bgColor, textColor };
}


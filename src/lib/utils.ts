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

// Warna yang lebih baik pakai text-white walaupun shade 500
const forceWhiteTextForColors = new Set([
  'red', 'orange', 'amber', 'lime', 'emerald', 'teal', 'cyan', 'sky', 'violet', 'purple', 'fuchsia', 'rose'
]);

function getTextColorFromBgClass(bgClass: string): string {
  const match = bgClass.match(/^bg-([a-z]+)-(\d{3})$/);
  if (!match) return 'text-black'; // fallback

  const [, color, shadeStr] = match;
  const shade = parseInt(shadeStr, 10);

  if (shade >= 600) return 'text-white';

  // Jika warna ada di daftar force white, walau shade 500, pakai text-white
  if (forceWhiteTextForColors.has(color)) return 'text-white';

  return 'text-black';
}

export function getRandomBgAndTextColor(): { bgColor: string; textColor: string } {
  const bgColor = tailwindBgColorClasses[
    Math.floor(Math.random() * tailwindBgColorClasses.length)
  ];
  const textColor = getTextColorFromBgClass(bgColor);
  return { bgColor, textColor };
}


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

const tailwindColors = ['slate', 'gray', 'zinc', 'neutral', 'stone',
  'red', 'orange', 'amber', 'yellow', 'lime',
  'green', 'emerald', 'teal', 'cyan', 'sky',
  'blue', 'indigo', 'violet', 'purple', 'fuchsia',
  'pink', 'rose']


const colorShades = ['500', '600', '700']; // bisa disesuaikan

export function getRandomTailwindColorClass(type: 'bg' | 'text' = 'bg'): string {
  const color = tailwindColors[Math.floor(Math.random() * tailwindColors.length)];
  const shade = colorShades[Math.floor(Math.random() * colorShades.length)];
  return `${type}-${color}-${shade}`;
}


// Fungsi untuk menghasilkan kombinasi bg dan text dengan kontras
export function getContrastingTailwindColors(): { bgColor: string; textColor: string } {
  const color = tailwindColors[Math.floor(Math.random() * tailwindColors.length)];
  const shade = colorShades[Math.floor(Math.random() * colorShades.length)];
  const bgColor = `bg-${color}-${shade}`;

  // Anggap shade 600+ sebagai gelap → text putih, lainnya → text hitam
  const isDark = parseInt(shade, 10) >= 600;
  const textColor = isDark ? 'text-white' : 'text-black';

  return { bgColor, textColor };
}


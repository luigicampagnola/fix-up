import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const API_URL = process.env.API_URL || 'http://localhost:1337';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFullImagePath(url: string): string {
  return /^https?:\/\//i.test(url)
    ? url
    : `${API_URL.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
}

export function imageOptimizer({
  url,
  width,
  quality,
}: {
  url: string;
  width?: number;
  quality?: number;
}) {
  return `${BASE_URL}/_next/image?url=${encodeURIComponent(url)}&w=${width || 1200
    }&q=${quality || 75}`;
};
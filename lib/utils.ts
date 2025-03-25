import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const API_URL = process.env.API_URL || 'http://localhost:1337';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function fullImagePath(url: string): string {
  return /^https?:\/\//i.test(url)
    ? url
    : `${API_URL.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
}
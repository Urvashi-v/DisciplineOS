import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind class names, resolving conflicts so the last utility wins.
 * The canonical class-composition helper for every component in the system.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

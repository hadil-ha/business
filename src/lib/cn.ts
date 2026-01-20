import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes with tailwind-merge to handle conflicts
 *
 * @example
 * cn('px-4 py-2', isActive && 'bg-primary-500', 'px-8')
 * // Returns: 'py-2 bg-primary-500 px-8' (px-4 is overwritten by px-8)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

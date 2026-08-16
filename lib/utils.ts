import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function periodYears(period: string) {
  const years = (period.match(/\d{4}/g) ?? ["0"]).map(Number)
  return { start: Math.min(...years), end: Math.max(...years) }
}

/**
 * Date utility functions for feast day handling
 */

/**
 * Format a Date object as YYYY-MM-DD string
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Get today's month and day
 */
export function getTodayMonthDay(): { month: number; day: number } {
  const today = new Date();
  return {
    month: today.getMonth() + 1,
    day: today.getDate(),
  };
}

/**
 * Format month and day as MM-DD string (for indexing)
 */
export function formatMonthDay(month: number, day: number): string {
  return `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

/**
 * Check if given month/day is today
 */
export function isToday(month: number, day: number): boolean {
  const today = getTodayMonthDay();
  return today.month === month && today.day === day;
}

/**
 * Get month name in Korean
 */
export function getMonthNameKo(month: number): string {
  return `${month}월`;
}

/**
 * Format feast day for display (e.g., "10월 4일")
 */
export function formatFeastDayKo(month: number, day: number): string {
  return `${month}월 ${day}일`;
}

/**
 * Get days in a month
 */
export function getDaysInMonth(month: number, year?: number): number {
  const y = year ?? new Date().getFullYear();
  return new Date(y, month, 0).getDate();
}

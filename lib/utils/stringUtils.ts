/**
 * String utility functions for search and display
 */

/**
 * Normalize string for search comparison
 * - Converts to lowercase
 * - Trims whitespace
 * - Preserves Korean characters
 */
export function normalizeString(str: string): string {
  return str.toLowerCase().trim();
}

/**
 * Get initials from a name for avatar display
 * - Returns first character of the name
 * - Returns '?' for empty or whitespace-only strings
 */
export function getInitials(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) {
    return '?';
  }
  return trimmed.charAt(0).toUpperCase();
}

/**
 * Check if a string contains Korean characters
 */
export function containsKorean(str: string): boolean {
  const koreanRegex = /[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/;
  return koreanRegex.test(str);
}

/**
 * Remove diacritics and special characters from Latin text
 */
export function removeDiacritics(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength - 1) + '…';
}

/**
 * Format years for display (e.g., "1182-1226" or "?-1226")
 */
export function formatYearRange(birthYear?: number, deathYear?: number): string {
  const birth = birthYear?.toString() ?? '?';
  const death = deathYear?.toString() ?? '?';
  return `${birth}-${death}`;
}

/**
 * Catholic Saints Search - Data Contracts
 *
 * This file defines the TypeScript interfaces and Zod schemas
 * for the saint data model used throughout the application.
 *
 * Note: This is a contract definition file, not implementation.
 * Actual implementation will be in lib/store/
 */

import { z } from 'zod';

// =============================================================================
// Enums & Constants
// =============================================================================

export const PATRONAGE_CATEGORIES = [
  'occupation', // 직업
  'location', // 지역/국가
  'situation', // 상황
  'illness', // 질병
  'cause', // 대의
  'other', // 기타
] as const;

export type PatronageCategory = (typeof PATRONAGE_CATEGORIES)[number];

// =============================================================================
// Zod Schemas (Runtime Validation)
// =============================================================================

export const PatronageCategorySchema = z.enum(PATRONAGE_CATEGORIES);

export const SaintSchema = z.object({
  // Identity
  id: z.string().regex(/^[a-z0-9-]+$/, 'ID must be lowercase alphanumeric with hyphens'),

  // Names
  nameKo: z.string().min(1, 'Korean name is required'),
  nameEn: z.string().min(1, 'English name is required'),
  nameLatin: z.string().optional(),
  shortName: z.string().min(1, 'Short name is required'),

  // Feast Day
  feastMonth: z.number().int().min(1).max(12),
  feastDay: z.number().int().min(1).max(31),

  // Patronage
  patronages: z.array(z.string()),
  patronageCategories: z.array(PatronageCategorySchema),

  // Biography
  biography: z.string().min(50, 'Biography must be at least 50 characters'),

  // Dates
  birthYear: z.number().int().optional(),
  deathYear: z.number().int().optional(),
  canonizationYear: z.number().int().optional(),

  // Display
  initials: z.string().length(1),
});

export const FavoriteSchema = z.object({
  saintId: z.string(),
  addedAt: z.number().int().positive(),
});

export const SaintsDataSchema = z.object({
  saints: z.array(SaintSchema),
  version: z.string(),
  lastUpdated: z.string().datetime(),
});

// =============================================================================
// TypeScript Interfaces (Static Typing)
// =============================================================================

export type Saint = z.infer<typeof SaintSchema>;
export type Favorite = z.infer<typeof FavoriteSchema>;
export type SaintsData = z.infer<typeof SaintsDataSchema>;

// =============================================================================
// Search Contracts
// =============================================================================

export interface SearchOptions {
  query: string;
  type: 'name' | 'patronage';
  limit?: number;
}

export interface SearchResult {
  saint: Saint;
  score: number; // 0-1, higher is better match
  matchedField: string; // Which field matched (nameKo, nameEn, etc.)
}

export interface FeastDayQuery {
  month: number;
  day: number;
}

// =============================================================================
// Store Contracts
// =============================================================================

export interface SaintsStore {
  // Read operations
  getSaint(id: string): Saint | undefined;
  getAllSaints(): Saint[];
  searchSaints(options: SearchOptions): SearchResult[];
  getSaintsByFeastDay(query: FeastDayQuery): Saint[];
  getSaintsByPatronageCategory(category: PatronageCategory): Saint[];

  // Initialization
  initialize(data: SaintsData): void;
  isInitialized(): boolean;
}

export interface FavoritesStore {
  // Read operations
  getFavorites(): Favorite[];
  isFavorite(saintId: string): boolean;

  // Write operations
  addFavorite(saintId: string): void;
  removeFavorite(saintId: string): void;
  toggleFavorite(saintId: string): void;

  // Persistence
  load(): Promise<void>;
  save(): Promise<void>;
}

// =============================================================================
// Component Props Contracts
// =============================================================================

export interface SaintCardProps {
  saint: Saint;
  onPress: (saint: Saint) => void;
  isFavorite?: boolean;
  onFavoriteToggle?: (saintId: string) => void;
}

export interface SaintDetailProps {
  saint: Saint;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  onBack: () => void;
}

export interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  searchType: 'name' | 'patronage';
  onSearchTypeChange: (type: 'name' | 'patronage') => void;
}

export interface DatePickerProps {
  selectedDate: { month: number; day: number };
  onDateChange: (date: { month: number; day: number }) => void;
}

// =============================================================================
// Hook Return Types
// =============================================================================

export interface UseSaintResult {
  saint: Saint | undefined;
  isLoading: boolean;
  error: Error | null;
}

export interface UseSearchResult {
  results: SearchResult[];
  isSearching: boolean;
  search: (query: string) => void;
  clear: () => void;
}

export interface UseFavoritesResult {
  favorites: Saint[];
  isFavorite: (saintId: string) => boolean;
  toggleFavorite: (saintId: string) => void;
  isLoading: boolean;
}

export interface UseFeastDayResult {
  saints: Saint[];
  selectedDate: { month: number; day: number };
  setDate: (date: { month: number; day: number }) => void;
  isLoading: boolean;
}

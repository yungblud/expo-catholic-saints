import { z } from 'zod';

// Patronage Categories
export const PATRONAGE_CATEGORIES = [
  'occupation', // 직업
  'location', // 지역/국가
  'situation', // 상황
  'illness', // 질병
  'cause', // 대의
  'other', // 기타
] as const;

export type PatronageCategory = (typeof PATRONAGE_CATEGORIES)[number];

export const PatronageCategorySchema = z.enum(PATRONAGE_CATEGORIES);

// Saint Schema
export const SaintSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, 'ID must be lowercase alphanumeric with hyphens'),
  nameKo: z.string().min(1, 'Korean name is required'),
  nameEn: z.string().min(1, 'English name is required'),
  nameLatin: z.string().optional(),
  shortName: z.string().min(1, 'Short name is required'),
  feastMonth: z.number().int().min(1).max(12),
  feastDay: z.number().int().min(1).max(31),
  patronages: z.array(z.string()),
  patronageCategories: z.array(PatronageCategorySchema),
  biography: z.string().min(50, 'Biography must be at least 50 characters'),
  birthYear: z.number().int().optional(),
  deathYear: z.number().int().optional(),
  canonizationYear: z.number().int().optional(),
  initials: z.string().length(1),
});

export type Saint = z.infer<typeof SaintSchema>;

// Favorite Schema
export const FavoriteSchema = z.object({
  saintId: z.string(),
  addedAt: z.number().int().positive(),
});

export type Favorite = z.infer<typeof FavoriteSchema>;

// Saints Data Schema (for JSON file)
export const SaintsDataSchema = z.object({
  saints: z.array(SaintSchema),
  version: z.string(),
  lastUpdated: z.string(),
});

export type SaintsData = z.infer<typeof SaintsDataSchema>;

// Search Types
export interface SearchOptions {
  query: string;
  type: 'name' | 'patronage';
  limit?: number;
}

export interface SearchResult {
  saint: Saint;
  score: number;
  matchedField: string;
}

export interface FeastDayQuery {
  month: number;
  day: number;
}

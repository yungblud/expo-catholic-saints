import Fuse, { IFuseOptions } from 'fuse.js';
import { getAllSaints } from '@/lib/store/saints';
import { Saint, SearchResult } from '@/lib/types/saints';

export type SearchMode = 'name' | 'patronage';

// Fuse.js options for name search
const nameSearchOptions: IFuseOptions<Saint> = {
  keys: [
    { name: 'nameKo', weight: 2 },
    { name: 'nameEn', weight: 1.5 },
    { name: 'nameLatin', weight: 1 },
    { name: 'shortName', weight: 2 },
  ],
  threshold: 0.3,
  includeScore: true,
  ignoreLocation: true,
  minMatchCharLength: 1,
};

// Fuse.js options for patronage search
const patronageSearchOptions: IFuseOptions<Saint> = {
  keys: [{ name: 'patronages', weight: 1 }],
  threshold: 0.2,
  includeScore: true,
  ignoreLocation: true,
  minMatchCharLength: 1,
};

// Cached Fuse instances
let nameFuse: Fuse<Saint> | null = null;
let patronageFuse: Fuse<Saint> | null = null;

/**
 * Initialize or get the Fuse.js instance for name search
 */
function getNameFuse(): Fuse<Saint> {
  if (!nameFuse) {
    const saints = getAllSaints();
    nameFuse = new Fuse(saints, nameSearchOptions);
  }
  return nameFuse;
}

/**
 * Initialize or get the Fuse.js instance for patronage search
 */
function getPatronageFuse(): Fuse<Saint> {
  if (!patronageFuse) {
    const saints = getAllSaints();
    patronageFuse = new Fuse(saints, patronageSearchOptions);
  }
  return patronageFuse;
}

/**
 * Reset cached Fuse instances (call after data changes)
 */
export function resetSearchCache(): void {
  nameFuse = null;
  patronageFuse = null;
}

/**
 * Search saints by name or patronage
 */
export function searchSaints(
  query: string,
  mode: SearchMode = 'name',
  limit: number = 50
): SearchResult[] {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return [];
  }

  const fuse = mode === 'name' ? getNameFuse() : getPatronageFuse();
  const results = fuse.search(trimmedQuery, { limit });

  return results.map((result) => ({
    saint: result.item,
    score: 1 - (result.score ?? 0), // Convert to 0-1 where 1 is best
    matchedField: result.matches?.[0]?.key ?? (mode === 'name' ? 'nameKo' : 'patronages'),
  }));
}

/**
 * Search saints by name only
 */
export function searchSaintsByName(query: string, limit?: number): SearchResult[] {
  return searchSaints(query, 'name', limit);
}

/**
 * Search saints by patronage only
 */
export function searchSaintsByPatronage(query: string, limit?: number): SearchResult[] {
  return searchSaints(query, 'patronage', limit);
}

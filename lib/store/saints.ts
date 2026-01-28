import { createStore, Store } from 'tinybase';
import saintsData from '@/data/saints.json';
import { Saint, SaintsData, SaintSchema } from '@/lib/types/saints';
import { formatMonthDay } from '@/lib/utils/dateUtils';

// Create TinyBase store
const store: Store = createStore();

// Feast day index for O(1) lookup
let feastDayIndex: Record<string, string[]> = {};

// Initialization flag
let isInitialized = false;

/**
 * Initialize the saints store with data from JSON
 */
export function initializeSaintsStore(): void {
  if (isInitialized) {
    return;
  }

  const data = saintsData as SaintsData;

  // Populate store and build feast day index
  feastDayIndex = {};

  data.saints.forEach((saint) => {
    // Validate saint data
    const result = SaintSchema.safeParse(saint);
    if (!result.success) {
      console.warn(`Invalid saint data for ${saint.id}:`, result.error);
      return;
    }

    // Add to TinyBase store
    store.setRow('saints', saint.id, {
      id: saint.id,
      nameKo: saint.nameKo,
      nameEn: saint.nameEn,
      nameLatin: saint.nameLatin ?? '',
      shortName: saint.shortName,
      feastMonth: saint.feastMonth,
      feastDay: saint.feastDay,
      patronages: JSON.stringify(saint.patronages),
      patronageCategories: JSON.stringify(saint.patronageCategories),
      biography: saint.biography,
      birthYear: saint.birthYear ?? 0,
      deathYear: saint.deathYear ?? 0,
      canonizationYear: saint.canonizationYear ?? 0,
      initials: saint.initials,
    });

    // Build feast day index
    const key = formatMonthDay(saint.feastMonth, saint.feastDay);
    if (!feastDayIndex[key]) {
      feastDayIndex[key] = [];
    }
    feastDayIndex[key].push(saint.id);
  });

  isInitialized = true;
}

/**
 * Get a saint by ID
 */
export function getSaint(id: string): Saint | undefined {
  const row = store.getRow('saints', id);
  if (!row || Object.keys(row).length === 0) {
    return undefined;
  }
  return rowToSaint(row);
}

/**
 * Get all saints
 */
export function getAllSaints(): Saint[] {
  const table = store.getTable('saints');
  return Object.values(table).map(rowToSaint);
}

/**
 * Get saints by feast day
 */
export function getSaintsByFeastDay(month: number, day: number): Saint[] {
  const key = formatMonthDay(month, day);
  const ids = feastDayIndex[key] ?? [];
  return ids.map((id) => getSaint(id)).filter((s): s is Saint => s !== undefined);
}

/**
 * Get the TinyBase store instance
 */
export function getStore(): Store {
  return store;
}

/**
 * Check if store is initialized
 */
export function isStoreInitialized(): boolean {
  return isInitialized;
}

/**
 * Convert TinyBase row to Saint type
 */
function rowToSaint(row: Record<string, unknown>): Saint {
  return {
    id: row.id as string,
    nameKo: row.nameKo as string,
    nameEn: row.nameEn as string,
    nameLatin: (row.nameLatin as string) || undefined,
    shortName: row.shortName as string,
    feastMonth: row.feastMonth as number,
    feastDay: row.feastDay as number,
    patronages: JSON.parse(row.patronages as string) as string[],
    patronageCategories: JSON.parse(row.patronageCategories as string),
    biography: row.biography as string,
    birthYear: (row.birthYear as number) || undefined,
    deathYear: (row.deathYear as number) || undefined,
    canonizationYear: (row.canonizationYear as number) || undefined,
    initials: row.initials as string,
  };
}

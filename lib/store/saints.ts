import saintsData from '@/data/saints.json';
import { Saint, SaintSchema, SaintsData } from '@/lib/types/saints';
import { formatMonthDay } from '@/lib/utils/dateUtils';
import { createStore, Store } from 'tinybase';

// Create TinyBase store
const store: Store = createStore();

// Lazy-initialized persister (expo-sqlite is not available during web static rendering)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let persister: any = null;

function getPersister() {
  if (!persister) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const SQLite = require('expo-sqlite');
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { createExpoSqlitePersister } = require('tinybase/persisters/persister-expo-sqlite');
    const sqliteDB = SQLite.openDatabaseSync('saints.db');
    persister = createExpoSqlitePersister(store, sqliteDB);
  }
  return persister;
}

// Feast day index for O(1) lookup
let feastDayIndex: Record<string, string[]> = {};

// Initialization flag
let isInitialized = false;

/**
 * Initialize the saints store with data from JSON
 */
export async function initializeSaintsStore(): Promise<void> {
  const p = getPersister();
  await p.load();
  const migrations = store.getTable('saint.migrations');
  const isAlreadyMigrated = migrations[saintsData.version] !== undefined;
  if (isAlreadyMigrated) {
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

  store.setTable('saint.migrations', {
    [saintsData.version]: {
      version: saintsData.version,
      appliedAt: Date.now(),
    },
  });

  await p.save();

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

export async function toggleFavorite(saintId: string): Promise<void> {
  const store = getStore();
  const isFavorite = store.getCell('favorites', saintId, 'isFavorite');
  if (isFavorite) {
    store.setCell('favorites', saintId, 'isFavorite', false);
  } else {
    store.setCell('favorites', saintId, 'isFavorite', true);
  }
  await getPersister().save();
}

export function isFavorite(saintId: string): boolean {
  const store = getStore();
  return store.getCell('favorites', saintId, 'isFavorite') as boolean;
}

export function getFavorites(): string[] {
  const store = getStore();
  return Object.keys(store.getTable('favorites')).filter(
    (id) => store.getCell('favorites', id, 'isFavorite') as boolean
  );
}

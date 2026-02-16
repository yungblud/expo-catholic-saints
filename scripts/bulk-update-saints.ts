/**
 * Saints Data Bulk Update Script
 *
 * Usage: npx tsx scripts/bulk-update-saints.ts <batch-file.json>
 *
 * Reads a batch JSON file containing new saint entries,
 * merges with existing data/saints.json, validates all entries,
 * and writes the updated file.
 *
 * Batch file format: { "saints": [ { ...saintFields }, ... ] }
 */
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { z } from 'zod';

const PATRONAGE_CATEGORIES = [
  'occupation',
  'location',
  'situation',
  'illness',
  'cause',
  'other',
] as const;

const PatronageCategorySchema = z.enum(PATRONAGE_CATEGORIES);

const SaintSchema = z.object({
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

type Saint = z.infer<typeof SaintSchema>;

function main() {
  const batchFile = process.argv[2];
  if (!batchFile) {
    console.error('Usage: npx tsx scripts/bulk-update-saints.ts <batch-file.json>');
    process.exit(1);
  }

  const saintsJsonPath = resolve(__dirname, '..', 'data', 'saints.json');
  const batchPath = resolve(batchFile);

  // Read existing data
  console.log(`Reading existing saints from ${saintsJsonPath}...`);
  const existingData = JSON.parse(readFileSync(saintsJsonPath, 'utf-8'));
  const existingIds = new Set(existingData.saints.map((s: Saint) => s.id));
  console.log(`  Found ${existingData.saints.length} existing saints`);

  // Read batch data
  console.log(`Reading batch from ${batchPath}...`);
  const batchData = JSON.parse(readFileSync(batchPath, 'utf-8'));
  const newSaints: Saint[] = batchData.saints;
  console.log(`  Found ${newSaints.length} saints in batch`);

  // Deduplicate
  const added: string[] = [];
  const skipped: string[] = [];
  for (const saint of newSaints) {
    if (existingIds.has(saint.id)) {
      skipped.push(saint.id);
    } else {
      existingData.saints.push(saint);
      existingIds.add(saint.id);
      added.push(saint.id);
    }
  }

  if (skipped.length > 0) {
    console.log(`  Skipped ${skipped.length} duplicates: ${skipped.join(', ')}`);
  }
  console.log(`  Adding ${added.length} new saints`);

  // Validate all data
  console.log('Validating all saints data...');
  const errors: string[] = [];
  for (const saint of existingData.saints) {
    const result = SaintSchema.safeParse(saint);
    if (!result.success) {
      errors.push(`  ${saint.id}: ${result.error.issues.map((i) => i.message).join(', ')}`);
    }
  }

  if (errors.length > 0) {
    console.error(`Validation failed for ${errors.length} saints:`);
    errors.forEach((e) => console.error(e));
    process.exit(1);
  }
  console.log(`  All ${existingData.saints.length} saints passed validation`);

  // Check for duplicate feast days (informational)
  const feastMap = new Map<string, string[]>();
  for (const saint of existingData.saints) {
    const key = `${saint.feastMonth}-${saint.feastDay}`;
    if (!feastMap.has(key)) feastMap.set(key, []);
    feastMap.get(key)!.push(saint.id);
  }

  // Update version and timestamp
  const [major, minor, patch] = existingData.version.split('.').map(Number);
  existingData.version = `${major}.${minor}.${patch + 1}`;
  existingData.lastUpdated = new Date().toISOString().split('T')[0] + 'T00:00:00Z';

  // Write updated file
  console.log(`Writing updated saints.json (version ${existingData.version})...`);
  writeFileSync(saintsJsonPath, JSON.stringify(existingData, null, 2) + '\n', 'utf-8');
  console.log(`Done! Total saints: ${existingData.saints.length} (added ${added.length} new)`);

  // Summary by month
  const monthCounts = new Map<number, number>();
  for (const saint of existingData.saints) {
    monthCounts.set(saint.feastMonth, (monthCounts.get(saint.feastMonth) || 0) + 1);
  }
  console.log('\nSaints by feast month:');
  for (let m = 1; m <= 12; m++) {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    console.log(`  ${months[m - 1]}: ${monthCounts.get(m) || 0}`);
  }
}

main();

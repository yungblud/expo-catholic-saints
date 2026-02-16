/**
 * Post-build script: convert flat .html files in subdirectories to directory-style.
 *
 * SST v3's CloudFront routing expects extensionless URLs to resolve to
 * <path>/index.html, but Expo static export produces <path>.html.
 *
 * This script converts:
 *   dist/saint/name.html  ->  dist/saint/name/index.html
 *
 * Root-level .html files (dist/*.html) are left as-is because SST resolves
 * them through KVS lookup with a .html suffix.
 */

import { readdirSync, mkdirSync, renameSync } from 'fs';
import { join, basename, extname } from 'path';

const DIST_DIR = 'dist';

function convertDir(dirPath) {
  for (const entry of readdirSync(dirPath, { withFileTypes: true })) {
    const fullPath = join(dirPath, entry.name);

    if (entry.isDirectory()) {
      if (!entry.name.startsWith('_') && entry.name !== 'assets') {
        convertDir(fullPath);
      }
      continue;
    }

    if (!entry.name.endsWith('.html') || entry.name === 'index.html') {
      continue;
    }

    const stem = basename(entry.name, extname(entry.name));
    const targetDir = join(dirPath, stem);
    const targetFile = join(targetDir, 'index.html');

    mkdirSync(targetDir, { recursive: true });
    renameSync(fullPath, targetFile);
  }
}

// Only process subdirectories of dist, not root-level files
for (const entry of readdirSync(DIST_DIR, { withFileTypes: true })) {
  if (entry.isDirectory() && !entry.name.startsWith('_') && entry.name !== 'assets') {
    convertDir(join(DIST_DIR, entry.name));
  }
}

console.log('Static HTML files converted to directory-style.');

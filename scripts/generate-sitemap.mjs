import fs from 'fs';
import path from 'path';
import saintsData from '../data/saints.json' with { type: 'json' };

const BASE_URL = 'https://cursed-by-jesus.coldsurf.io';

const staticRoutes = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/search', priority: 0.8, changefreq: 'monthly' },
  { path: '/favorites', priority: 0.7, changefreq: 'monthly' },
  { path: '/privacy-policy', priority: 0.6, changefreq: 'monthly' },
];

const saintRoutes = saintsData.saints.map((saint) => ({
  path: `/saint/${saint.id}`,
  priority: 0.5,
  changefreq: 'monthly',
}));

const routes = [...staticRoutes, ...saintRoutes];

const generateSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(process.cwd(), 'public/sitemap.xml'), sitemap);
  console.log('✅ sitemap.xml generated');
};

generateSitemap();

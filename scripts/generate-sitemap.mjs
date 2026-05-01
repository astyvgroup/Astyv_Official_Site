#!/usr/bin/env node
// =====================================================================
//  ASTYV — sitemap.xml generator
//  Run with: node scripts/generate-sitemap.mjs
//  Output: public/sitemap.xml
//
//  Wired into the build via package.json:
//    "prebuild": "node scripts/generate-sitemap.mjs"
// =====================================================================
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

// Import our launch config to get the site URL
const launchModule = await import(join(root, 'src/config/content/_launch.js'));
const SITE_URL = launchModule.default.siteUrl || 'https://astyv.com';

const today = new Date().toISOString().split('T')[0];

// Pages and their relative priority + change frequency
const pages = [
  { path: '/',             priority: 1.0,  changefreq: 'weekly' },
  { path: '/about',        priority: 0.9,  changefreq: 'monthly' },
  { path: '/services',     priority: 0.95, changefreq: 'monthly' },
  { path: '/case-studies', priority: 0.85, changefreq: 'monthly' },
  { path: '/careers',      priority: 0.85, changefreq: 'weekly' },
  { path: '/contact',      priority: 0.8,  changefreq: 'monthly' },
  { path: '/privacy',      priority: 0.3,  changefreq: 'yearly' },
  { path: '/terms',        priority: 0.3,  changefreq: 'yearly' },
  { path: '/cookies',      priority: 0.3,  changefreq: 'yearly' },
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${pages
  .map(
    (p) => `  <url>
    <loc>${SITE_URL}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

writeFileSync(join(root, 'public/sitemap.xml'), xml, 'utf8');
console.log(`✔ Wrote sitemap.xml with ${pages.length} URLs (${SITE_URL})`);

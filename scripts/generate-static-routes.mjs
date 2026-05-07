#!/usr/bin/env node
// =====================================================================
//  ASTYV — per-route static HTML generator
//  Run with: node scripts/generate-static-routes.mjs
//  Output: dist/<slug>.html for every public route
//
//  Wired into the build via package.json:
//    "postbuild": "node scripts/generate-static-routes.mjs"
//
//  Why: GitHub Pages serves a real HTTP 200 for /about only when a real
//  file exists at /about.html. Without these copies, deep links 404 and
//  Google records "Not found (404)" / "Page with redirect" in GSC.
// =====================================================================
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const seoModule = await import(join(root, 'src/config/content/seo.js'));
const launchModule = await import(join(root, 'src/config/content/_launch.js'));

const seo = seoModule.default;
const SITE_URL = launchModule.default.siteUrl || 'https://astyv.com';

// canonical "/case-studies" → "case-studies.html"
function slugFromCanonical(canonical) {
  return canonical.replace(/^\//, '').replace(/\/$/, '') + '.html';
}

function escapeHtmlAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeHtmlText(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Replace the first match of `pattern` with `replacement`. Throws if absent
// — we'd rather fail loudly than silently ship a stale meta tag.
function replaceOnce(html, pattern, replacement, label) {
  if (!pattern.test(html)) {
    throw new Error(`generate-static-routes: could not find ${label} in dist/index.html`);
  }
  return html.replace(pattern, replacement);
}

const templatePath = join(root, 'dist/index.html');
const template = readFileSync(templatePath, 'utf8');

const written = [];

for (const [key, page] of Object.entries(seo)) {
  if (key === 'defaults') continue;
  if (page.canonical === '/') continue; // home is already dist/index.html

  const slug = slugFromCanonical(page.canonical);
  const canonical = `${SITE_URL}${page.canonical}`;
  const title = escapeHtmlText(page.title);
  const description = escapeHtmlAttr(page.description);
  const titleAttr = escapeHtmlAttr(page.title);

  let html = template;
  html = replaceOnce(
    html,
    /<title>[\s\S]*?<\/title>/,
    `<title>${title}</title>`,
    '<title>',
  );
  html = replaceOnce(
    html,
    /<meta name="description" content="[^"]*"\s*\/>/,
    `<meta name="description" content="${description}" />`,
    'meta description',
  );
  html = replaceOnce(
    html,
    /<link rel="canonical" href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${canonical}" />`,
    'canonical link',
  );
  html = replaceOnce(
    html,
    /<meta property="og:url" content="[^"]*"\s*\/>/,
    `<meta property="og:url" content="${canonical}" />`,
    'og:url',
  );
  html = replaceOnce(
    html,
    /<meta property="og:title" content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${titleAttr}" />`,
    'og:title',
  );
  html = replaceOnce(
    html,
    /<meta property="og:description" content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${description}" />`,
    'og:description',
  );
  html = replaceOnce(
    html,
    /<meta name="twitter:title" content="[^"]*"\s*\/>/,
    `<meta name="twitter:title" content="${titleAttr}" />`,
    'twitter:title',
  );
  html = replaceOnce(
    html,
    /<meta name="twitter:description" content="[^"]*"\s*\/>/,
    `<meta name="twitter:description" content="${description}" />`,
    'twitter:description',
  );

  const outPath = join(root, 'dist', slug);
  writeFileSync(outPath, html, 'utf8');
  written.push(slug);
}

// Internal-only routes: generated so direct URL hits return 200 (otherwise
// GitHub Pages serves 404.html and the React app never gets a chance to
// mount). Each one is hard-flagged noindex,nofollow at every layer
// (static meta + robots.txt + AdminPage runtime meta).
const internalRoutes = [
  { slug: 'admin.html', title: 'Admin | Astyv' },
];

for (const route of internalRoutes) {
  let html = template;
  html = replaceOnce(
    html,
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapeHtmlText(route.title)}</title>`,
    '<title>',
  );
  html = replaceOnce(
    html,
    /<meta name="robots" content="[^"]*"\s*\/>/,
    `<meta name="robots" content="noindex, nofollow" />`,
    'robots meta',
  );
  // Strip the canonical link entirely — internal pages should not advertise
  // a canonical URL to crawlers that ignore robots.
  html = replaceOnce(
    html,
    /\s*<link rel="canonical" href="[^"]*"\s*\/>/,
    '',
    'canonical link',
  );

  const outPath = join(root, 'dist', route.slug);
  writeFileSync(outPath, html, 'utf8');
  written.push(route.slug);
}

console.log(`✔ Wrote ${written.length} per-route HTML files: ${written.join(', ')}`);

#!/usr/bin/env node
// =====================================================================
//  ASTYV — OG / Twitter preview image renderer
//
//  Reads:  public/og-image-v2.svg
//  Writes: public/og-image-v2.png, public/twitter-image-v2.png (1200x630)
//
//  One-off run (no permanent devDep):
//    npx -p @resvg/resvg-js@2 node scripts/render-og.mjs
//
//  Re-run whenever public/og-image-v2.svg changes.
// =====================================================================
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const svg = readFileSync(join(root, 'public/og-image-v2.svg'), 'utf8');

const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
    background: '#0A0A0A',
    font: { loadSystemFonts: true },
});

const png = resvg.render().asPng();

writeFileSync(join(root, 'public/og-image-v2.png'), png);
writeFileSync(join(root, 'public/twitter-image-v2.png'), png);

console.log(`Rendered og-image-v2.png and twitter-image-v2.png (${png.length} bytes each)`);

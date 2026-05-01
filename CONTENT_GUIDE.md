# Astyv Website — Content & Operations Guide

A plain-English reference for everyday updates to **astyv.com**.
Written so a non-engineer can change copy, swap fonts/colors, add jobs, deploy, and troubleshoot — without breaking anything.

---

## Quick orientation (where things live)

```
Site/
├── src/
│   ├── config/
│   │   ├── design.js              ← FONTS + COLORS (single source of truth)
│   │   ├── content/
│   │   │   ├── _launch.js         ← Launch flag (coming-soon vs live)
│   │   │   ├── brand.js           ← Company name, contact, social
│   │   │   ├── home.js            ← Homepage sections
│   │   │   ├── about.js           ← About page
│   │   │   ├── services.js        ← Services page
│   │   │   ├── caseStudies.js     ← Case studies
│   │   │   ├── careers.js         ← Careers page (job listings → see below)
│   │   │   ├── contact.js         ← Contact page
│   │   │   ├── footer.js          ← Site footer
│   │   │   ├── seo.js             ← Per-page titles & descriptions
│   │   │   └── legal.js           ← Privacy / Terms / Cookies
│   │   └── siteContent.js         ← Aggregator (don't edit; it just glues the above)
├── public/
│   ├── data/careers.json          ← Job listings (add/remove openings here)
│   ├── brand/                     ← Logo SVGs (already populated from Branding_New)
│   ├── og-image.png/.svg          ← Social-share card (1200×630)
│   ├── favicon-*.png              ← Browser tab icons
│   ├── CNAME                      ← Custom domain (astyv.com)
│   ├── robots.txt                 ← Search-engine instructions
│   └── sitemap.xml                ← Auto-generated on build
├── scripts/
│   └── generate-sitemap.mjs       ← Builds the sitemap (runs automatically)
└── .github/workflows/deploy.yml   ← Auto-deploy to GitHub Pages on push
```

---

## Common tasks

### 1. Change text on a page

**Goal:** Update a headline, subhead, or any block of copy.

1. Open `src/config/content/<page>.js` (e.g. `home.js` for the homepage).
2. Find the field you want to change. Strings are quoted, so just edit between the quotes:
   ```js
   headline: "We Don't Just Build Software.\nWe Engineer Futures.",
   ```
   (`\n` inserts a line break — keep it if you want a multi-line headline.)
3. Save the file.
4. **Locally to preview:** `npm run dev` → open http://localhost:5173.
5. **To publish:** commit and push to GitHub. The site rebuilds and deploys in ~2 minutes (see "Deployment").

### 2. Add a new job listing

1. Open `public/data/careers.json`.
2. Copy one of the existing entries and paste it at the top.
3. Update `id`, `title`, `department`, `description`, `responsibilities[]`, `requirements[]`, etc.
4. Set `"active": true` (or `false` to hide a role temporarily).
5. Save, commit, push.

### 3. Pause hiring entirely (show "we're not hiring" message)

Set every entry in `careers.json` to `"active": false`. The careers page automatically shows the "Great things are brewing" empty state and still accepts general resume submissions.

### 4. Switch from coming-soon page to full site (or back)

Open `src/config/content/_launch.js`:

```js
launchMode: "live",          // ← change to "coming-soon" to hide the full site
launchDate: "2026-09-01...", // ← only used by coming-soon's countdown
```

- `"coming-soon"` — visitors only see the polished launch page; everything else 404s into it.
- `"live"` — full multi-page site is shown (default).

### 5. Change brand fonts

Open `src/config/design.js`. Edit these three lines:

```js
fonts: {
  heading: 'Manrope',
  body: 'Manrope',
  googleFontsHref: 'https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&...',
}
```

To use a different Google Font:
1. Go to https://fonts.google.com, pick a family, click "Get embed code".
2. Copy the `<link>` href into `googleFontsHref`.
3. Update `heading` and `body` to the family name (e.g. `'Inter'`, `'Plus Jakarta Sans'`).
4. Rebuild & redeploy.

To self-host real Gilroy/Raginy when you have license files:
1. Drop `.woff2` files in `public/fonts/`.
2. Set `selfHostedCss` in `design.js` (commented example provided).
3. Rebuild.

### 6. Change the brand purple (or any color)

Open `src/config/design.js`. Edit the `colors.primary` palette — `500` is the main brand hex. Adjust 50-950 around it for hover/active states.

```js
colors: {
  primary: {
    500: '#852BED', // ← brand
    ...
  }
}
```

That single change updates Tailwind classes (`bg-primary-500`), CSS variables (`--color-primary`), Three.js particles, gradients, glow effects — everywhere.

### 7. Change the company name, email, or address

Open `src/config/content/brand.js`. Update the relevant field. The new value flows to:
- The footer
- Contact page
- Schema.org metadata (Google sees your address)
- Open Graph cards (social shares)

---

## SEO checklist (do this once after first deploy)

To make Astyv the **#1 hit** when someone searches "astyv":

1. **Submit sitemap to Google Search Console**
   - Go to https://search.google.com/search-console
   - Add property → Domain → enter `astyv.com`
   - Verify via DNS TXT record (Google walks you through it)
   - Once verified: Sitemaps → Add new sitemap → enter `https://astyv.com/sitemap.xml`
   - Click "Request indexing" on the homepage URL

2. **Submit to Bing Webmaster Tools** (optional, ~5% of search traffic)
   - https://www.bing.com/webmasters → Add site → Same sitemap URL.

3. **Add the verification meta tags**
   - Once Google/Bing give you a verification token, paste it into `Site/index.html` in the placeholder lines marked "REPLACE_WITH_*_TOKEN".

4. **LinkedIn company page consistency**
   - Make sure https://linkedin.com/company/astyv links back to https://astyv.com.
   - Cross-linking from authoritative profiles boosts brand-search ranking.

5. **Wait 24–72 hours**
   - For brand-exact-match domains like astyv.com, Google typically indexes within 1-3 days. After that, searches for "astyv" should put your site first.

---

## Deployment

The repo has a GitHub Action that **auto-deploys on every push to `main`**:

1. You make changes locally (or via GitHub web UI).
2. `git commit` + `git push origin main`.
3. The Action runs `npm install`, `npm run build`, and publishes `dist/` to GitHub Pages.
4. Within 1-2 minutes, https://astyv.com reflects the new code.

### Manual deploy (fallback)

If the Action fails or you want to test from your laptop:

```bash
cd Site
npm install
npm run build
npm run deploy   # uses gh-pages package; pushes to gh-pages branch
```

### DNS setup (if astyv.com isn't pointing yet)

In your DNS provider (Cloudflare, GoDaddy, etc.):

| Type  | Host | Value                                          |
| ----- | ---- | ---------------------------------------------- |
| A     | @    | `185.199.108.153`                              |
| A     | @    | `185.199.109.153`                              |
| A     | @    | `185.199.110.153`                              |
| A     | @    | `185.199.111.153`                              |
| CNAME | www  | `astyvgroup.github.io`                         |

Then in the GitHub repo: **Settings → Pages → Custom domain** → enter `astyv.com` → check "Enforce HTTPS" once the cert provisions (can take up to 24h).

---

## Troubleshooting

### "astyv.com shows GitHub 404"

Most likely cause: **the repo is private and you're on the GitHub free plan**. GitHub Pages with a custom domain only serves from public repos on the free tier.

Three options:
1. **Make the repo public** (Settings → General → Change visibility). Marketing-site source isn't secret.
2. **Upgrade to GitHub Pro** ($4/mo).
3. **Move hosting** to Cloudflare Pages, Netlify, or Vercel — all support private repos for free with custom domains.

Other things to check:
- Settings → Pages: Source set to "GitHub Actions"? (Or "gh-pages branch" if using manual deploy.)
- `Site/public/CNAME` contains exactly `astyv.com` (no protocol, no trailing slash).
- DNS A records pointing to GitHub Pages IPs (see DNS setup above).
- Wait up to 24 hours after first DNS change for HTTPS cert.

### "Page reload on /about returns 404"

This shouldn't happen because of `public/404.html` (the SPA fallback). If it does:
- Make sure `404.html` made it into `dist/` after build (it should — it's in `public/`).
- Make sure GitHub Pages is serving from the correct branch / artifact.

### "Local dev server shows old colors / fonts"

The Vite plugin only injects design tokens at **build time** for `index.html`. Locally during `npm run dev`, Vite serves the static `index.html` template with placeholder comments still visible — but the components and Tailwind classes pull from `design.js` directly so they're correct.

If you see old colors, do a hard refresh (Cmd+Shift+R on Mac).

### "I see a console warning about missing content fields"

The content validator runs in dev mode only. It tells you which field is missing/empty in `src/config/content/*.js`. The site still renders — just fix the field and save.

---

## Adding a new section to the homepage

1. Create the component in `src/components/sections/home/MyNewSection.jsx` (copy an existing one as a template).
2. Add its content to `src/config/content/home.js`.
3. Import + render it in `src/pages/HomePage.jsx`, in the order you want it.
4. Save, dev-test, push.

---

## File-by-file quick reference

| Want to change… | Edit… |
| --- | --- |
| Headlines / paragraphs on a page | `src/config/content/<page>.js` |
| Site colors | `src/config/design.js` (colors.primary) |
| Site fonts | `src/config/design.js` (fonts) |
| Logo / icon | `public/brand/*` (drop new SVGs in) |
| Social links | `src/config/content/brand.js` |
| Job listings | `public/data/careers.json` |
| Page titles / SEO descriptions | `src/config/content/seo.js` |
| Footer columns / links | `src/config/content/footer.js` |
| Coming-soon countdown date | `src/config/content/_launch.js` (`launchDate`) |
| Privacy / Terms / Cookies copy | `src/config/content/legal.js` |
| Add a new page | Create in `src/pages/`, add a route in `src/App.jsx` |

---

## Development commands

```bash
npm run dev        # Local dev server at http://localhost:5173 (hot reload)
npm run build      # Production build → dist/
npm run preview    # Serve the built dist/ locally for testing
npm run deploy     # Build + push to gh-pages branch (manual deploy)
npm run generate:sitemap   # Regenerate sitemap.xml manually
```

---

If anything in this guide is unclear, email Hemanth at hr@astyv.com — improvements to this doc are welcome.

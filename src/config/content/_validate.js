// =====================================================================
//  ASTYV — CONTENT VALIDATOR
// =====================================================================
//  Runs once at app boot in dev mode. If you accidentally delete a
//  required field while editing content, you'll see a friendly warning
//  in the browser console pointing at exactly what's missing.
//  No validation runs in production — this is a dev safety net only.
// =====================================================================

const required = {
  brand: ['name', 'legalName', 'tagline', 'email', 'phone'],
  home: ['hero.headline', 'hero.subheadline', 'cta.heading'],
  about: ['hero.headline', 'mission.text', 'vision.text'],
  services: ['hero.headline', 'offerings'],
  caseStudies: ['hero.headline', 'studies'],
  careers: ['hero.headline', 'applicationForm'],
  contact: ['hero.headline', 'form'],
  footer: ['tagline', 'copyright'],
  seo: ['home', 'about', 'services'],
};

function getPath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc != null ? acc[key] : undefined), obj);
}

export default function validateContent(siteContent) {
  if (typeof window === 'undefined' || import.meta.env.PROD) return;

  const issues = [];
  for (const [section, paths] of Object.entries(required)) {
    if (!siteContent[section]) {
      issues.push(`Missing entire section: ${section}`);
      continue;
    }
    for (const path of paths) {
      const val = getPath(siteContent[section], path);
      if (val == null || (Array.isArray(val) && val.length === 0) || val === '') {
        issues.push(`Missing or empty: ${section}.${path}`);
      }
    }
  }

  if (issues.length > 0) {
    /* eslint-disable no-console */
    console.warn(
      '%c⚠ Astyv content validator',
      'background:#852BED;color:#fff;padding:2px 8px;border-radius:4px;font-weight:bold;',
      `\n${issues.length} issue(s) in src/config/content/*.js:\n  • ${issues.join('\n  • ')}\n\nThe site will still render, but check these fields.`,
    );
  }
}
